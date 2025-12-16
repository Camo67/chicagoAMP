#!/usr/bin/env python3
"""
Script to fetch media assets (images, videos, logos, favicons) from the ChicagoAMP website.
"""

import os
import re
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import time

# Configuration
BASE_URL = "https://www.chicagoamp.com/"
OUTPUT_DIR = "downloaded_media"
DELAY = 0.5  # Delay between requests in seconds

# Create output directory
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, "images"), exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, "videos"), exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, "logos"), exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, "favicons"), exist_ok=True)

def download_file(url, folder, filename=None):
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
        return filepath
    except Exception as e:
        print(f"Error downloading {url}: {str(e)}")
        return None

def extract_image_urls(content):
    """
    Extract image URLs from HTML content or plain text.
    """
    # Pattern to match image URLs
    img_pattern = r'https?://[^\s"]+?\.(?:jpg|jpeg|png|gif|webp|svg)'
    urls = re.findall(img_pattern, content, re.IGNORECASE)
    
    # Filter for squarespace-cdn images which seem to be the main media
    squarespace_images = [url for url in urls if 'squarespace-cdn' in url]
    
    return squarespace_images

def fetch_homepage_media():
    """
    Fetch media assets from the homepage.
    """
    print("Fetching homepage content...")
    
    try:
        response = requests.get(BASE_URL, timeout=30)
        response.raise_for_status()
        
        # Save the homepage HTML for reference
        with open(os.path.join(OUTPUT_DIR, "homepage.html"), 'w', encoding='utf-8') as f:
            f.write(response.text)
        
        # Extract image URLs
        image_urls = extract_image_urls(response.text)
        
        print(f"Found {len(image_urls)} image URLs")
        
        # Download images
        for i, img_url in enumerate(image_urls):
            print(f"Processing image {i+1}/{len(image_urls)}: {img_url}")
            
            # Determine subfolder based on image content
            if 'favicon' in img_url.lower():
                folder = os.path.join(OUTPUT_DIR, "favicons")
            elif any(keyword in img_url.lower() for keyword in ['logo', 'brand']):
                folder = os.path.join(OUTPUT_DIR, "logos")
            else:
                folder = os.path.join(OUTPUT_DIR, "images")
            
            # Extract filename from URL
            parsed_url = urlparse(img_url)
            filename = os.path.basename(parsed_url.path)
            
            # Download the file
            download_file(img_url, folder, filename)
            
            # Be respectful to the server
            time.sleep(DELAY)
            
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
                
                download_file(url, folder)
                time.sleep(DELAY)
        except:
            # Ignore errors for these试探性 requests
            pass

def main():
    """
    Main function to orchestrate the media fetching process.
    """
    print("Starting media fetching process...")
    print(f"Base URL: {BASE_URL}")
    print(f"Output directory: {OUTPUT_DIR}")
    
    # Fetch media from homepage
    fetch_homepage_media()
    
    # Try to find additional media
    fetch_additional_media()
    
    print("\nMedia fetching process completed!")
    print(f"All media saved to: {os.path.abspath(OUTPUT_DIR)}")

if __name__ == "__main__":
    main()