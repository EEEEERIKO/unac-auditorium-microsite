#!/usr/bin/env python3
"""
Simple image optimization script for UNAC auditorium gallery
"""

import os
from pathlib import Path
from PIL import Image
import sys

# Configuration
SOURCE_DIR = Path("Fotos Temporal")
DEST_DIR = Path("public/gallery")

# Category mapping
CATEGORY_MAPPING = {
    "Configuraciones": "setups",
    "Eventos y Ceremonias": "events-ceremonies",
    "Exteriores": "exteriors",
    "Inerior": "interior"
}

# Image settings
MAX_WIDTH = 2000
MAX_HEIGHT = 1500
QUALITY = 85
WEBP_QUALITY = 85

def optimize_image(input_path, output_dir, filename_base):
    """Optimize image and save as WebP + JPG"""
    try:
        with Image.open(input_path) as img:
            # Skip if not a valid image
            img.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.Resampling.LANCZOS)
            
            # Handle RGBA -> RGB
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode != 'RGBA':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if len(img.split()) == 4 else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Save both formats
            webp_path = output_dir / f"{filename_base}.webp"
            img.save(webp_path, 'WEBP', quality=WEBP_QUALITY, method=6)
            
            jpg_path = output_dir / f"{filename_base}.jpg"
            img.save(jpg_path, 'JPEG', quality=QUALITY, optimize=True)
            
            return True
    except Exception as e:
        print(f"  ERROR: {input_path.name} - {e}")
        return False

def main():
    print("🖼️  UNAC Gallery Image Optimizer")
    print("=" * 60)
    
    # Create directories
    DEST_DIR.mkdir(parents=True, exist_ok=True)
    for cat in CATEGORY_MAPPING.values():
        (DEST_DIR / cat).mkdir(parents=True, exist_ok=True)
    
    total = 0
    success = 0
    total_before = 0
    total_after = 0
    
    # Process each category
    for source_name, dest_name in sorted(CATEGORY_MAPPING.items()):
        source_path = SOURCE_DIR / source_name
        if not source_path.exists():
            print(f"\n⚠️  Skipping: {source_name} (not found)")
            continue
        
        dest_path = DEST_DIR / dest_name
        print(f"\n📁 {source_name:25} → public/gallery/{dest_name}/")
        print("-" * 60)
        
        # Find images
        files = []
        for ext in ['*.jpg', '*.jpeg', '*.JPG', '*.JPEG', '*.png', '*.PNG', 
                    '*.webp', '*.WEBP', '*.heic', '*.HEIC']:
            files.extend(source_path.glob(ext))
        
        files = sorted(set(files))  # Remove duplicates and sort
        
        for idx, img_path in enumerate(files, 1):
            if img_path.name.startswith('.'):
                continue
            
            total += 1
            base_name = f"{dest_name}_{idx:02d}"
            size_before = img_path.stat().st_size
            total_before += size_before
            
            # Format-specific handling
            if img_path.suffix.lower() == '.heic':
                # Convert HEIC to JPG first
                try:
                    from PIL import Image
                    img = Image.open(img_path)
                    jpg_data = img.convert('RGB')
                    temp_path = source_path / f"_temp_{idx}.jpg"
                    jpg_data.save(temp_path)
                    img_path = temp_path
                except:
                    print(f"  ⏭️  {img_path.name[:35]:35} (HEIC - unsupported)")
                    continue
            
            sys.stdout.write(f"  ⚙️  {img_path.name[:35]:35} ")
            sys.stdout.flush()
            
            if optimize_image(img_path, dest_path, base_name):
                webp_file = dest_path / f"{base_name}.webp"
                jpg_file = dest_path / f"{base_name}.jpg"
                size_after = min(webp_file.stat().st_size, jpg_file.stat().st_size)
                total_after += size_after
                reduction = ((size_before - size_after) / size_before * 100) if size_before > 0 else 0
                print(f"✅ {size_after/1024:6.0f}KB ({reduction:3.0f}% reduction)")
                success += 1
            else:
                print(f"❌")
        
        if files:
            print(f"   Processed:  {len(files)} files")
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print(f"✅ Processed:        {success}/{total} images")
    print(f"📦 Original size:    {total_before / 1024 / 1024:.1f} MB")
    print(f"📦 Optimized size:   {total_after / 1024 / 1024:.1f} MB")
    if total_before > 0:
        reduction = (total_before - total_after) / total_before * 100
        saved = total_before - total_after
        print(f"🎉 Saved:            {saved / 1024 / 1024:.1f} MB ({reduction:.0f}%)")
    print("\n✨ Images ready at:  public/gallery/")
    print("\nCategory structure:")
    for source, dest in sorted(CATEGORY_MAPPING.items()):
        print(f"  • {dest:20} (from: {source})")

if __name__ == "__main__":
    main()
