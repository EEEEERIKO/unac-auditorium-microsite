#!/bin/bash
# Convert HEIC images to JPG and optimize them

cd "/Users/eriko/Developer/unac-auditorium-microsite" || exit

echo "🖼️  Converting HEIC images..."
echo "========================================"

convert_heic_batch() {
    local source_dir="$1"
    local category="$2"
    local dest_dir="public/gallery/$category"
    
    echo ""
    echo "📁 Converting $category..."
    
    local count=0
    for heic_file in "$source_dir"/*.{heic,HEIC}; do
        [ -f "$heic_file" ] || continue
        count=$((count + 1))
        
        filename=$(basename "$heic_file")
        base_name="${category}_$(printf "%02d" $((count + 40)))"
        jpg_temp="$source_dir/_temp_$count.jpg"
        
        echo -n "  ⚙️  $filename... "
        
        # Convert HEIC to JPG using ImageMagick
        if convert "$heic_file" -quality 85 "$jpg_temp" 2>/dev/null; then
            # Now optimize with Python
            python3 << EOF
from PIL import Image
from pathlib import Path

img = Image.open("$jpg_temp")
img.thumbnail((2000, 1500), Image.Resampling.LANCZOS)
if img.mode != 'RGB':
    img = img.convert('RGB')

webp_path = Path("$dest_dir") / "${base_name}.webp"
jpg_path = Path("$dest_dir") / "${base_name}.jpg"

img.save(webp_path, 'WEBP', quality=85, method=6)
img.save(jpg_path, 'JPEG', quality=85, optimize=True)

webp_size = webp_path.stat().st_size
jpg_size = jpg_path.stat().st_size
print(f"✅ WebP: {webp_size/1024:.0f}KB, JPG: {jpg_size/1024:.0f}KB")
EOF
            rm "$jpg_temp" 2>/dev/null
        else
            echo "❌"
        fi
    done
}

# Convert for each category with HEIC files
convert_heic_batch "Fotos Temporal/Exteriores" "exteriors"
convert_heic_batch "Fotos Temporal/Inerior" "interior"

echo ""
echo "========================================"
echo "✨ HEIC conversion complete!"
