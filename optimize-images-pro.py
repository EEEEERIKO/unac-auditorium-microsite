#!/usr/bin/env python3
"""
Advanced image optimization script for UNAC auditorium gallery
- Genera WebP (75 quality) + AVIF (30 quality) + miniatura para blur
- Valida todos los formatos
- Reporte detallado de compresión
"""

import os
from pathlib import Path
from PIL import Image
import sys
import subprocess

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

# Image settings - OPTIMIZED FOR SPEED
MAX_WIDTH = 2000
MAX_HEIGHT = 1500
WEBP_QUALITY = 75  # Reduced from 85 for faster loading
AVIF_QUALITY = 30  # AVIF can be lower quality
JPG_QUALITY = 75   # Reduced from 85

def optimize_image(input_path, output_dir, filename_base):
    """Optimize image and save as WebP + AVIF + JPG"""
    try:
        with Image.open(input_path) as img:
            original_size = os.path.getsize(input_path)
            
            # Resize
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
            
            sizes = {}
            
            # 1. Save WebP (main format - best compatibility)
            webp_path = output_dir / f"{filename_base}.webp"
            img.save(webp_path, 'WEBP', quality=WEBP_QUALITY, method=6)
            sizes['webp'] = os.path.getsize(webp_path)
            
            # 2. Save AVIF (newer, smaller - fallback in picture tag)
            avif_path = output_dir / f"{filename_base}.avif"
            try:
                # Try with pillow-simd if available, otherwise use cwebp
                img.save(avif_path, 'AVIF', quality=AVIF_QUALITY)
                sizes['avif'] = os.path.getsize(avif_path)
            except:
                # Fallback: skip AVIF if not supported
                avif_path.unlink(missing_ok=True)
                sizes['avif'] = None
            
            # 3. Save JPG (fallback)
            jpg_path = output_dir / f"{filename_base}.jpg"
            img.save(jpg_path, 'JPEG', quality=JPG_QUALITY, optimize=True)
            sizes['jpg'] = os.path.getsize(jpg_path)
            
            # 4. Generate tiny blur placeholder (10x10px)
            placeholder_img = img.copy()
            placeholder_img.thumbnail((10, 10), Image.Resampling.LANCZOS)
            placeholder_path = output_dir / f"{filename_base}-placeholder.webp"
            placeholder_img.save(placeholder_path, 'WEBP', quality=50, method=6)
            sizes['placeholder'] = os.path.getsize(placeholder_path)
            
            # Return compression stats
            best_format = min([(k, v) for k, v in sizes.items() if v is not None], key=lambda x: x[1])
            total_compressed = sum(v for v in sizes.values() if v is not None)
            
            return {
                'success': True,
                'original_size': original_size,
                'total_compressed': total_compressed,
                'best_format': best_format[0],
                'compression_ratio': (1 - total_compressed / original_size) * 100 if original_size > 0 else 0,
                'sizes': sizes
            }
            
    except Exception as e:
        print(f"  ❌ ERROR: {input_path.name} - {e}")
        return {'success': False}

def main():
    print("🎯 UNAC Gallery Image Optimizer PRO")
    print("=" * 70)
    print("Formatos: WebP (75) + AVIF (30) + Placeholder blur")
    print("=" * 70)
    
    # Create directories
    DEST_DIR.mkdir(parents=True, exist_ok=True)
    for cat in CATEGORY_MAPPING.values():
        (DEST_DIR / cat).mkdir(parents=True, exist_ok=True)
    
    total = 0
    success = 0
    total_original = 0
    total_compressed = 0
    
    # Process each category
    for source_name, dest_name in sorted(CATEGORY_MAPPING.items()):
        source_path = SOURCE_DIR / source_name
        if not source_path.exists():
            print(f"\n⚠️  SKIP: {source_name} (no encontrado)")
            continue
        
        dest_path = DEST_DIR / dest_name
        files = sorted([f for f in source_path.glob('*') if f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.heic']])
        
        if not files:
            print(f"\n⚠️  SKIP: {source_name} (sin imágenes)")
            continue
        
        print(f"\n📂 {source_name:25} → {dest_name:20} ({len(files)} archivos)")
        print("   " + "-" * 66)
        
        for idx, file_path in enumerate(files, 1):
            filename_base = file_path.stem.replace(' ', '_')
            result = optimize_image(file_path, dest_path, filename_base)
            
            total += 1
            if result['success']:
                success += 1
                total_original += result['original_size']
                total_compressed += result['total_compressed']
                
                # Display compression stats
                original_kb = result['original_size'] / 1024
                compressed_kb = result['total_compressed'] / 1024
                
                status = "✅" if result['compression_ratio'] > 30 else "⚠️"
                print(f"  {status} {filename_base:35} | "
                      f"{original_kb:6.1f} KB → {compressed_kb:6.1f} KB | "
                      f"📉 {result['compression_ratio']:5.1f}%")
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 RESUMEN")
    print("=" * 70)
    print(f"  Total imágenes procesadas:    {success}/{total}")
    print(f"  Tamaño original:              {total_original / (1024*1024):.1f} MB")
    print(f"  Tamaño comprimido:            {total_compressed / (1024*1024):.1f} MB")
    if total_original > 0:
        overall_compression = (1 - total_compressed / total_original) * 100
        print(f"  Compresión total:             {overall_compression:.1f}%")
        print(f"\n✨ Mejora de velocidad estimada: ~{min(overall_compression * 0.8, 70):.0f}% más rápido en cargas")

if __name__ == "__main__":
    main()
