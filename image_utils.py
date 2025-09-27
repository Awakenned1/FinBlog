"""
Image utilities for downloading and optimizing blog images
"""
import os
import requests
from PIL import Image
from io import BytesIO

def download_and_optimize_image(url, save_path, max_size=(1200, 800)):
    """Download image from URL and optimize it for web use"""
    try:
        # Download image
        response = requests.get(url)
        response.raise_for_status()
        
        # Open image and convert to RGB
        img = Image.open(BytesIO(response.content))
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
            
        # Resize if larger than max_size while maintaining aspect ratio
        if img.size[0] > max_size[0] or img.size[1] > max_size[1]:
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
        # Save optimized image
        img.save(save_path, 'JPEG', quality=85, optimize=True)
        return True
    except Exception as e:
        print(f"Error processing image {url}: {e}")
        return False

# Image URLs for the blog
BLOG_IMAGES = {
    'header': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',  # Student studying finances
    'expense_tracking': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',  # Expense tracking app
    'grocery_shopping': 'https://images.unsplash.com/photo-1542838132-92c53300491e',  # Student grocery shopping
    'student_banking': 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc',  # Mobile banking
    'budgeting_apps': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',  # Student using phone
    'emergency_fund': 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e',  # Piggy bank savings
    'side_hustle': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',  # Students working
    'textbooks': 'https://images.unsplash.com/photo-1527269534026-c86f4009eace',  # Student textbooks
    'transport': 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e',  # Public transport
    'meal_prep': 'https://images.unsplash.com/photo-1512058564366-18510be2db19'  # Meal preparation
}

def download_all_blog_images():
    """Download all blog images"""
    os.makedirs('static/images', exist_ok=True)
    
    for name, url in BLOG_IMAGES.items():
        save_path = f'static/images/{name}.jpg'
        if not os.path.exists(save_path):
            print(f"Downloading {name} image...")
            if download_and_optimize_image(url, save_path):
                print(f"Successfully downloaded and optimized {name}")
            else:
                print(f"Failed to download {name}")

if __name__ == '__main__':
    download_all_blog_images()
