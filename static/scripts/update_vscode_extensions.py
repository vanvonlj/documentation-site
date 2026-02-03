#!/usr/bin/env python3
"""
Update VS Code Server extensions.json with Pamir AI extensions.

This script adds the Distiller/Pamir AI extensions to VS Code Server's
extensions.json file so they are recognized when using Remote SSH.

Usage:
    python3 update_vscode_extensions.py

Requirements:
    - VS Code Server must be installed (~/.vscode-server/extensions/)
    - Pamir AI extensions must be copied to ~/.vscode-server/extensions/
"""

import json
import time
import sys
from pathlib import Path

def main():
    # Path to extensions.json
    extensions_json_path = Path.home() / '.vscode-server' / 'extensions' / 'extensions.json'

    # Check if extensions.json exists
    if not extensions_json_path.exists():
        print(f"Error: {extensions_json_path} not found.")
        print("Make sure you've connected to VS Code Remote SSH at least once.")
        sys.exit(1)

    # Read the current extensions.json
    try:
        with open(extensions_json_path, 'r') as f:
            extensions = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse {extensions_json_path}: {e}")
        sys.exit(1)

    # Pamir AI extensions to add
    pamir_extensions = [
        {
            "id": "pamir-ai.device-manager",
            "version": "1.1.0",
            "relativeLocation": "pamir-ai.device-manager-1.1.0-universal"
        },
        {
            "id": "pamir-ai.distiller-messaging",
            "version": "1.0.0",
            "relativeLocation": "pamir-ai.distiller-messaging-1.0.0-universal"
        },
        {
            "id": "pamir-ai.distiller-ports",
            "version": "1.1.0",
            "relativeLocation": "pamir-ai.distiller-ports-1.1.0-universal"
        },
        {
            "id": "pamir-ai.happy-session-manager",
            "version": "1.1.0",
            "relativeLocation": "pamir-ai.happy-session-manager-1.1.0-universal"
        },
        {
            "id": "pamir-ai.pamir-welcome",
            "version": "1.1.0",
            "relativeLocation": "pamir-ai.pamir-welcome-1.1.0-universal"
        }
    ]

    # Get current timestamp
    timestamp = int(time.time() * 1000)

    # Add each Pamir extension if not already present
    existing_ids = {ext['identifier']['id'] for ext in extensions}
    added_count = 0

    for pamir in pamir_extensions:
        if pamir['id'] not in existing_ids:
            new_ext = {
                "identifier": {
                    "id": pamir['id']
                },
                "version": pamir['version'],
                "location": {
                    "$mid": 1,
                    "path": f"{Path.home()}/.vscode-server/extensions/{pamir['relativeLocation']}",
                    "scheme": "file"
                },
                "relativeLocation": pamir['relativeLocation'],
                "metadata": {
                    "installedTimestamp": timestamp,
                    "source": "vsix",
                    "publisherDisplayName": "Pamir AI",
                    "publisherId": "pamir-ai",
                    "isPreReleaseVersion": False,
                    "hasPreReleaseVersion": False,
                    "preRelease": False
                }
            }
            extensions.append(new_ext)
            print(f"✓ Added: {pamir['id']}")
            added_count += 1
        else:
            print(f"⊙ Already exists: {pamir['id']}")

    # Write back to extensions.json
    try:
        with open(extensions_json_path, 'w') as f:
            json.dump(extensions, f)
    except IOError as e:
        print(f"Error: Failed to write to {extensions_json_path}: {e}")
        sys.exit(1)

    print(f"\n{'='*60}")
    if added_count > 0:
        print(f"✓ Successfully added {added_count} extension(s)")
        print(f"✓ Total extensions: {len(extensions)}")
        print(f"\nNext steps:")
        print(f"  1. Reload VS Code window (Ctrl+Shift+P → 'Developer: Reload Window')")
        print(f"  2. Verify extensions appear in the Extensions panel")
    else:
        print(f"✓ All Pamir AI extensions already registered")
        print(f"✓ Total extensions: {len(extensions)}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
