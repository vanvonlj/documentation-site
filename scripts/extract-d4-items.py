#!/usr/bin/env python3
"""Extract D4 item names and image IDs from Maxroll build guide HTML."""

import json
import re
import sys
from pathlib import Path

def extract_items_from_html(html_content: str) -> dict[str, str]:
    """
    Extract item names and their image IDs from Maxroll HTML.

    Returns a dict mapping item names to image IDs:
    {"Loyalty's Mantle": "3408472719", ...}
    """
    items = {}

    # Pattern to find item blocks with images and names
    # Matches: background-image: url('.../{ID}.webp') ... <span class="d4-color-unique">{NAME}</span>
    pattern = r'background-image:\s*url\([\'"]https://assets-ng\.maxroll\.gg/d4-tools/images/webp/(\d+)\.webp[\'"]\).*?<span class="d4-color-(?:unique|legendary)">([^<]+)</span>'

    matches = re.finditer(pattern, html_content, re.DOTALL)

    for match in matches:
        image_id = match.group(1)
        item_name = match.group(2).strip()

        # Skip aspect names (they're legendary but not items we want)
        # Items we want are typically longer or contain specific keywords
        if item_name and not item_name.endswith("'s"):
            items[item_name] = image_id
            print(f"Found: {item_name} -> {image_id}")

    return items

def main():
    if len(sys.argv) < 2:
        print("Usage: python extract-d4-items.py <html_file>")
        print("Or paste HTML content and press Ctrl+D (Unix) or Ctrl+Z (Windows)")
        html_content = sys.stdin.read()
    else:
        html_file = Path(sys.argv[1])
        if not html_file.exists():
            print(f"Error: File {html_file} not found")
            sys.exit(1)
        html_content = html_file.read_text()

    items = extract_items_from_html(html_content)

    # Output as JSON
    output = {
        "items": items,
        "count": len(items)
    }

    output_file = Path("d4-items.json")
    output_file.write_text(json.dumps(output, indent=2))
    print(f"\n✓ Extracted {len(items)} items to {output_file}")

    # Also output TypeScript/JavaScript format for easy copy-paste
    ts_output = "export const D4_ITEM_IDS: Record<string, string> = {\n"
    for name, image_id in sorted(items.items()):
        ts_output += f'  "{name}": "{image_id}",\n'
    ts_output += "};\n"

    ts_file = Path("src/data/d4-item-ids.ts")
    ts_file.parent.mkdir(parents=True, exist_ok=True)
    ts_file.write_text(ts_output)
    print(f"✓ Created TypeScript file: {ts_file}")

if __name__ == "__main__":
    main()
