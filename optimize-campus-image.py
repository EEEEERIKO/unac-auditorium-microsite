#!/usr/bin/env python3
"""
Optimize campus aerial image for web
"""

from pathlib import Path
from PIL import Image
import os
import sys

# Find the campus image
source_file = None
for pattern in ['campus-map.jpg', 'campus-map.jpeg', 'campus.jpg', 'campus.jpeg']:
    path = Path(pattern)
    if path.exists():
        source_file = path
        break

if not source_file:
    print("❌ No campus image found in project root")
    print("Please save the campus image as 'campus-map.jpg' in the project root")
    sys.exit(1)

# Create output directory
output_dir = Path("public/gallery/campus")
output_dir.mkdir(parents=True, exist_ok=True)

print(f"🖼️  Optimizing campus image...")
print(f"Source: {source_file}")
print("-" * 60)

try:
    size_before = source_file.stat().st_size
    print(f"Original size: {size_before / 1024 / 1024:.1f} MB")
    
    # Open and optimize
    with Image.open(source_file) as img:
        # Rotate if needed (check aspect ratio and rotate if portrait)
        if img.height > img.width:
            img = img.rotate(-90, expand=True)
        
        # Convert RGBA to RGB if needed
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1])
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize for web (max 2560px width for high-res displays)
        img.thumbnail((2560, 2560), Image.Resampling.LANCZOS)
        
        # Save WebP
        webp_path = output_dir / "campus-aerial.webp"
        img.save(webp_path, 'WEBP', quality=85, method=6)
        webp_size = webp_path.stat().st_size
        
        # Save JPG fallback
        jpg_path = output_dir / "campus-aerial.jpg"
        img.save(jpg_path, 'JPEG', quality=85, optimize=True)
        jpg_size = jpg_path.stat().st_size
        
        final_size = min(webp_size, jpg_size)
        reduction = ((size_before - final_size) / size_before * 100)
        
        print(f"✅ WebP: {webp_size / 1024 / 1024:.1f} MB")
        print(f"✅ JPG:  {jpg_size / 1024 / 1024:.1f} MB")
        print(f"📊 Reduction: {reduction:.0f}%")
        print(f"\n✨ Images saved to: {output_dir}/")
        print(f"   - campus-aerial.webp")
        print(f"   - campus-aerial.jpg")
        print(f"\n📝 Use in HTML:")
        print(f"""   <picture>
     <source srcSet="/gallery/campus/campus-aerial.webp" type="image/webp" />
     <source srcSet="/gallery/campus/campus-aerial.jpg" type="image/jpeg" />
     <img src="/gallery/campus/campus-aerial.jpg" alt="Campus Aerial View" />
   </picture>""")

except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
