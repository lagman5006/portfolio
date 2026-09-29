#!/usr/bin/env bash
# Rasmlarni WebP formatiga o'giradi: images/**/*.png|jpg -> images/opt/**/<nom>.webp
# Nomdagi bo'shliqlar "-" ga almashtiriladi. Talab: cwebp (brew install webp)
#
#   ./scripts/optimize-images.sh                  — hamma yangi/o'zgargan rasmlar
#   ./scripts/optimize-images.sh images/toyxona   — faqat shu papka (yoki fayl)
set -euo pipefail
cd "$(dirname "$0")/.."

# WebP kerak bo'lmagan rasmlar — asl holida ishlatiladi yoki umuman ishlatilmaydi
SKIP=(
  "images/avatar.jpg"              # favicon va nav-logo, JPEG holida kerak
  "images/2026-02-15 01.19.14.jpg" # avatar manbasi, saytda ishlatilmaydi
)

targets=("$@")
[ ${#targets[@]} -eq 0 ] && targets=(images)

find "${targets[@]}" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -not -path 'images/opt/*' | while read -r src; do
  for s in "${SKIP[@]}"; do [ "$src" = "$s" ] && continue 2; done
  rel="${src#images/}"
  out="images/opt/${rel%.*}.webp"
  out="${out// /-}"
  [ -f "$out" ] && [ "$out" -nt "$src" ] && continue
  mkdir -p "$(dirname "$out")"
  h=$(sips -g pixelHeight "$src" | awk '/pixelHeight/{print $2}')
  if [ "$h" -gt 1600 ]; then resize="-resize 0 1600"; else resize=""; fi
  cwebp -quiet -q 80 $resize "$src" -o "$out"
  echo "✓ $out"
done
