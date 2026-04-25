#!/bin/bash
# Encode source MOVs from RUYS T7 into web-ready hero/card videos.
# - Trims to highlight window (~5s each)
# - Scales to 1080p max
# - H.264 yuv420p, CRF 24, faststart
# - Strips audio
# - Also exports a JPEG poster from frame 1 of the cut

set -euo pipefail

SRC="/Volumes/RUYS T7/2026/Benita graded"
OUT="/Users/ruy/Hijos De Benita/micro-bakery/public/videos"
POSTERS="/Users/ruy/Hijos De Benita/micro-bakery/public/posters"
mkdir -p "$OUT" "$POSTERS"

# name | source | start_seconds | duration_seconds
clips=(
  "amanzando|amanzando.mov|1.0|5.0"
  "amanzando2|amanzando2.mov|2.5|5.0"
  "benitawater|benitawater.mov|0.0|3.5"
  "details2|details2.mov|0.3|5.0"
  "details5|details5.mov|2.0|5.0"
  "pan|pan.mov|20.0|5.0"
  "remolino|remolino4k.mov|0.5|5.0"
)

for clip in "${clips[@]}"; do
  IFS='|' read -r name source start dur <<< "$clip"
  in="$SRC/$source"
  outmp4="$OUT/$name.mp4"
  outposter="$POSTERS/$name.jpg"

  echo "→ $name  (start=${start}s dur=${dur}s)"

  # MP4 — H.264, 1080p max width, no audio, faststart
  ffmpeg -y -ss "$start" -i "$in" -t "$dur" \
    -vf "scale='min(1920,iw)':-2" \
    -c:v libx264 -preset medium -crf 24 -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    -loglevel error -stats \
    "$outmp4"

  # Poster — frame from middle of the clip
  ffmpeg -y -ss "$(echo "$start + $dur / 2" | bc -l)" -i "$in" -frames:v 1 \
    -vf "scale='min(1920,iw)':-2" \
    -q:v 4 \
    -loglevel error \
    "$outposter"

  size=$(du -h "$outmp4" | cut -f1)
  echo "  ✓ $name.mp4 ($size)"
done

echo ""
echo "Done. Output:"
ls -lh "$OUT"
echo ""
ls -lh "$POSTERS"
