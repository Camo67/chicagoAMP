#!/usr/bin/env python3
"""
Improved script to fetch media assets (images, videos, logos, favicons) from the ChicagoAMP website.
"""

import os
import re
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import time
import json

# Configuration
BASE_URL = "https://www.chicagoamp.com/"
OUTPUT_DIR = "downloaded_media_improved"
DELAY = 0.5  # Delay between requests in seconds

# Create output directory structure
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, "images"), exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, "videos"), exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, "logos"), exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, "favicons"), exist_ok=True)

# Log file to track downloads
LOG_FILE = os.path.join(OUTPUT_DIR, "download_log.json")
download_log = []

def save_log():
    """Save the download log to a JSON file."""
    with open(LOG_FILE, 'w') as f:
        json.dump(download_log, f, indent=2)

def download_file(url, folder, filename=None, description=""):
    """
    Download a file from URL and save it to the specified folder.
    """
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        if not filename:
            parsed_url = urlparse(url)
            filename = os.path.basename(parsed_url.path)
            if not filename:
                filename = "unnamed_file"
        
        # Clean filename
        filename = re.sub(r'[^\w\-_\.]', '_', filename)
        
        filepath = os.path.join(folder, filename)
        
        # Handle duplicate filenames
        counter = 1
        original_filepath = filepath
        while os.path.exists(filepath):
            name, ext = os.path.splitext(original_filepath)
            filepath = f"{name}_{counter}{ext}"
            counter += 1
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"Downloaded: {filepath}")
        
        # Log the download
        download_log.append({
            "url": url,
            "filepath": filepath,
            "filename": os.path.basename(filepath),
            "description": description,
            "filesize": len(response.content)
        })
        
        save_log()
        return filepath
    except Exception as e:
        print(f"Error downloading {url}: {str(e)}")
        return None

def extract_media_with_context(html_content):
    """
    Extract media URLs with their context (alt text, captions, etc.) from HTML.
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    media_items = []
    
    # Find all images
    images = soup.find_all('img')
    for img in images:
        src = img.get('src')
        if src and src.startswith('http'):
            alt_text = img.get('alt', '')
            media_items.append({
                'url': src,
                'type': 'image',
                'description': alt_text
            })
    
    # Find images in CSS background properties
    styles = soup.find_all(attrs={'style': True})
    for style in styles:
        style_text = style['style']
        # Look for background-image properties
        bg_matches = re.findall(r'background-image:\s*url\(["\']?(.*?)["\']?\)', style_text)
        for url in bg_matches:
            if url.startswith('http'):
                media_items.append({
                    'url': url,
                    'type': 'image',
                    'description': 'Background image'
                })
    
    return media_items

def categorize_and_download_media(media_items):
    """
    Categorize media items and download them to appropriate folders.
    """
    print(f"Processing {len(media_items)} media items...")
    
    for i, item in enumerate(media_items):
        url = item['url']
        media_type = item.get('type', 'unknown')
        description = item.get('description', '')
        
        print(f"Processing {i+1}/{len(media_items)}: {url}")
        
        # Determine folder based on content
        folder = os.path.join(OUTPUT_DIR, "images")  # Default folder
        
        # Check for specific categories
        url_lower = url.lower()
        if 'favicon' in url_lower:
            folder = os.path.join(OUTPUT_DIR, "favicons")
        elif any(keyword in url_lower for keyword in ['logo', 'brand']):
            folder = os.path.join(OUTPUT_DIR, "logos")
        elif any(keyword in url_lower for keyword in ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm']):
            folder = os.path.join(OUTPUT_DIR, "videos")
        
        # Generate filename based on description if available
        filename = None
        if description:
            # Clean description for use as filename
            clean_desc = re.sub(r'[^\w\-_]', '_', description.strip())
            if clean_desc:
                # Try to get extension from URL
                parsed_url = urlparse(url)
                ext = os.path.splitext(parsed_url.path)[1]
                if not ext:
                    # Try to guess from Content-Type header
                    try:
                        head_resp = requests.head(url, timeout=10)
                        content_type = head_resp.headers.get('Content-Type', '')
                        if 'jpeg' in content_type or 'jpg' in content_type:
                            ext = '.jpg'
                        elif 'png' in content_type:
                            ext = '.png'
                        elif 'gif' in content_type:
                            ext = '.gif'
                        elif 'webp' in content_type:
                            ext = '.webp'
                    except:
                        ext = '.jpg'  # Default
                
                filename = f"{clean_desc[:50]}{ext}"  # Limit length
        
        # Download the file
        download_file(url, folder, filename, description)
        
        # Be respectful to the server
        time.sleep(DELAY)

def fetch_homepage_media():
    """
    Fetch media assets from the homepage with context.
    """
    print("Fetching homepage content...")
    
    try:
        response = requests.get(BASE_URL, timeout=30)
        response.raise_for_status()
        
        # Save the homepage HTML for reference
        with open(os.path.join(OUTPUT_DIR, "homepage.html"), 'w', encoding='utf-8') as f:
            f.write(response.text)
        
        # Extract media with context
        media_items = extract_media_with_context(response.text)
        
        # Also extract from plain text patterns as fallback
        img_pattern = r'https?://[^\s"]+?\.(?:jpg|jpeg|png|gif|webp|svg)'
        urls = re.findall(img_pattern, response.text, re.IGNORECASE)
        
        # Add URLs that aren't already in media_items
        existing_urls = {item['url'] for item in media_items}
        for url in urls:
            if url not in existing_urls:
                media_items.append({
                    'url': url,
                    'type': 'image',
                    'description': ''
                })
        
        print(f"Found {len(media_items)} media items")
        
        # Download categorized media
        categorize_and_download_media(media_items)
        
    except Exception as e:
        print(f"Error fetching homepage: {str(e)}")

def fetch_additional_media():
    """
    Try to find additional media by exploring common paths.
    """
    print("Searching for additional media...")
    
    # Common paths where media might be located
    common_paths = [
        "favicon.ico",
        "favicon.png",
        "favicon.svg",
        "logo.png",
        "logo.svg",
        "apple-touch-icon.png",
        "android-chrome-192x192.png",
        "android-chrome-512x512.png"
    ]
    
    for path in common_paths:
        url = urljoin(BASE_URL, path)
        try:
            response = requests.head(url, timeout=10)
            if response.status_code == 200:
                print(f"Found favicon/logo: {url}")
                
                # Determine folder
                if 'favicon' in path.lower():
                    folder = os.path.join(OUTPUT_DIR, "favicons")
                else:
                    folder = os.path.join(OUTPUT_DIR, "logos")
                
                download_file(url, folder, path)
                time.sleep(DELAY)
        except:
            # Ignore errors for these试探性 requests
            pass

def main():
    """
    Main function to orchestrate the media fetching process.
    """
    print("Starting improved media fetching process...")
    print(f"Base URL: {BASE_URL}")
    print(f"Output directory: {OUTPUT_DIR}")
    
    # Fetch media from homepage
    fetch_homepage_media()
    
    # Try to find additional media
    fetch_additional_media()
    
    # Print summary
    print(f"\nMedia fetching process completed!")
    print(f"Total files downloaded: {len(download_log)}")
    print(f"All media saved to: {os.path.abspath(OUTPUT_DIR)}")
    
    # Save summary report
    summary_file = os.path.join(OUTPUT_DIR, "summary.txt")
    with open(summary_file, 'w') as f:
        f.write("ChicagoAMP Media Download Summary\n")
        f.write("=" * 40 + "\n")
        f.write(f"Base URL: {BASE_URL}\n")
        f.write(f"Total files downloaded: {len(download_log)}\n")
        f.write(f"Output directory: {os.path.abspath(OUTPUT_DIR)}\n\n")
        
        # Categorize downloads
        images_count = len([d for d in download_log if 'images' in d['filepath']])
        logos_count = len([d for d in download_log if 'logos' in d['filepath']])
        favicons_count = len([d for d in download_log if 'favicons' in d['filepath']])
        videos_count = len([d for d in download_log if 'videos' in d['filepath']])
        
        f.write("Downloads by category:\n")
        f.write(f"  Images: {images_count}\n")
        f.write(f"  Logos: {logos_count}\n")
        f.write(f"  Favicons: {favicons_count}\n")
        f.write(f"  Videos: {videos_count}\n\n")
        
        f.write("Detailed log is available in download_log.json\n")
    
    print(f"Summary report saved to: {summary_file}")

if __name__ == "__main__":
    main()