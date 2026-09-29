#!/usr/bin/env bash
# Rasmlarni WebP formatiga o'giradi: images/**/*.png|jpg -> images/opt/**/<nom>.webp
# Nomdagi bo'shliqlar "-" ga almashtiriladi. Talab: cwebp (brew install webp)
set -euo pipefail
cd "$(dirname "$0")/.."
find images -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -not -path 'images/opt/*' | while read -r src; do
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
