#!/usr/bin/env python3
"""
Simple script to extract image URLs from the downloaded homepage HTML.
"""

import re

def extract_urls_from_file(file_path):
    """
    Extract all image URLs from an HTML file.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match image URLs
    img_pattern = r'https?://[^\s")]+?\.(?:jpg|jpeg|png|gif|webp|svg)'
    urls = re.findall(img_pattern, content, re.IGNORECASE)
    
    # Filter for squarespace-cdn images
    squarespace_images = [url for url in urls if 'squarespace-cdn' in url]
    
    return squarespace_images

def save_urls_to_file(urls, output_file):
    """
    Save URLs to a text file, one per line.
    """
    with open(output_file, 'w') as f:
        for url in urls:
            f.write(url + '\n')

def main():
    # Paths
    homepage_file = 'downloaded_media/homepage.html'
    output_file = 'image_urls.txt'
    
    # Extract URLs
    urls = extract_urls_from_file(homepage_file)
    
    # Save to file
    save_urls_to_file(urls, output_file)
    
    print(f"Extracted {len(urls)} image URLs from {homepage_file}")
    print(f"URLs saved to {output_file}")
    
    # Show first 10 URLs as examples
    print("\nFirst 10 URLs:")
    for i, url in enumerate(urls[:10]):
        print(f"{i+1}. {url}")

if __name__ == "__main__":
    main()