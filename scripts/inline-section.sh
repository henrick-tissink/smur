#!/bin/bash
# inline-section.sh — Process a saved get_design_context tool-result file into
# a Next.js-ready TSX snippet with all Figma asset URLs replaced by local paths.
#
# Usage:
#   inline-section.sh <tool-result-file> <asset-dir> <url-prefix> <output-tsx>
#
# Example:
#   ./scripts/inline-section.sh \
#     ~/.claude/.../tool-results/get_design_context-XXX.txt \
#     public/figma-assets/work/crisp/big-typo \
#     /figma-assets/work/crisp/big-typo \
#     /tmp/crisp-big-typo.jsx
#
# Downloads every asset URL in the JSX in parallel, detects file type
# (SVG/JPEG/PNG/GIF), renames to the variable name + extension, and writes
# out the JSX with URLs rewritten to /<url-prefix>/<varname>.<ext>.

set -euo pipefail

if [ "$#" -ne 4 ]; then
  echo "Usage: $0 <tool-result-file> <asset-dir> <url-prefix> <output-tsx>" >&2
  exit 1
fi

TOOL_RESULT=$1
ASSET_DIR=$2
URL_PREFIX=$3
OUTPUT_FILE=$4

mkdir -p "$ASSET_DIR"

JSX=$(jq -r '.[0].text' "$TOOL_RESULT")

# Extract every `const imgFoo = "URL"` declaration (POSIX-friendly).
NAMES=()
URLS=()
while IFS= read -r line; do
  varname=$(echo "$line" | sed -E 's/^const (img[A-Za-z0-9_]+) = .*/\1/')
  url=$(echo "$line" | sed -E 's/^const img[A-Za-z0-9_]+ = "([^"]+)".*$/\1/')
  NAMES+=("$varname")
  URLS+=("$url")
done < <(echo "$JSX" | grep -oE 'const img[A-Za-z0-9_]+ = "[^"]+"' || true)

echo "Found ${#NAMES[@]} assets"
if [ "${#NAMES[@]}" -eq 0 ]; then
  echo "No const img declarations found — file may be in metadata mode" >&2
  exit 2
fi

# Parallel download
echo "Downloading…"
for i in "${!NAMES[@]}"; do
  printf "%s\t%s\n" "${ASSET_DIR}/${NAMES[$i]}.dl" "${URLS[$i]}"
done | xargs -P 12 -L 1 sh -c 'curl -sS -o "$0" "$1"'

# Detect file types + rename (parallel arrays since macOS bash 3.2 lacks assoc).
EXTS=()
for i in "${!NAMES[@]}"; do
  f="${ASSET_DIR}/${NAMES[$i]}.dl"
  type=$(file -b "$f")
  case "$type" in
    *SVG*) ext=svg ;;
    *JPEG*) ext=jpg ;;
    *PNG*) ext=png ;;
    *GIF*) ext=gif ;;
    *) ext=bin ;;
  esac
  mv "$f" "${ASSET_DIR}/${NAMES[$i]}.${ext}"
  EXTS+=("$ext")
done

# Rewrite URLs → local paths via a single sed pass (much faster than
# bash parameter expansion on 100k+ char strings with hundreds of subs).
SED_SCRIPT=$(mktemp)
for i in "${!NAMES[@]}"; do
  url="${URLS[$i]}"
  local_path="${URL_PREFIX}/${NAMES[$i]}.${EXTS[$i]}"
  # Escape forward slashes in URLs so we can use # as sed delimiter.
  escaped_url=$(printf '%s' "$url" | sed 's/[#&]/\\&/g')
  escaped_path=$(printf '%s' "$local_path" | sed 's/[#&]/\\&/g')
  printf 's#%s#%s#g\n' "$escaped_url" "$escaped_path" >> "$SED_SCRIPT"
done

echo "$JSX" | sed -f "$SED_SCRIPT" > "$OUTPUT_FILE"
rm -f "$SED_SCRIPT"
echo "Wrote $OUTPUT_FILE"
