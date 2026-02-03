# Developing on Distiller with VS Code

- [Developing on Distiller with VS Code](#developing-on-distiller-with-vs-code)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [1. Generate an SSH Key](#1-generate-an-ssh-key)
    - [2. Copy Your SSH Key to the Distiller](#2-copy-your-ssh-key-to-the-distiller)
    - [3. Configure SSH (Optional but Recommended)](#3-configure-ssh-optional-but-recommended)
    - [4. Install Remote - SSH Extension](#4-install-remote---ssh-extension)
    - [5. Connect to Your Distiller](#5-connect-to-your-distiller)
  - [Recommended Extensions](#recommended-extensions)
    - [AI Coding Assistants](#ai-coding-assistants)
    - [Git \& GitHub](#git--github)
    - [Code Quality \& Formatting](#code-quality--formatting)
    - [Python Development](#python-development)
    - [Containers \& Kubernetes](#containers--kubernetes)
    - [Language \& File Support](#language--file-support)
    - [Utilities](#utilities)
    - [Distiller Extensions](#distiller-extensions)
      - [Installing Distiller Extensions for VS Code Remote SSH](#installing-distiller-extensions-for-vs-code-remote-ssh)
  - [Troubleshooting](#troubleshooting)
    - [Cannot connect to Distiller](#cannot-connect-to-distiller)
    - [VS Code Server fails to install](#vs-code-server-fails-to-install)
    - [Extensions not loading after copy](#extensions-not-loading-after-copy)

## Prerequisites

- [VS Code](https://code.visualstudio.com/) installed on your local machine
- Distiller device IP address or hostname (find it via the Distiller web UI or run `hostname -I` on the device)
- Both devices on the same network (or connected via VPN)

## Setup

### 1. Generate an SSH Key

If you don't already have an SSH key, generate one on your local machine:

```bash
ssh-keygen -t ed25519 -C "your-identifier"
```

The `-C` flag is just a comment to help you identify the key later (e.g., `john@macbook` or `work-laptop`). It doesn't affect authentication.

Press Enter to accept the default file location. You can optionally set a passphrase.

### 2. Copy Your SSH Key to the Distiller

Copy your public key to the Distiller device. Replace `DISTILLER_IP` with your device's IP address:

```bash
ssh-copy-id distiller@DISTILLER_IP
```

Enter the Distiller user's password when prompted. After this, you can SSH without a password.

### 3. Configure SSH (Optional but Recommended)

Add the Distiller to your SSH config for easier connections. Edit `~/.ssh/config` on your local machine:

```
Host distiller
    HostName DISTILLER_IP
    User distiller
```

Now you can connect with just `ssh distiller` instead of `ssh distiller@DISTILLER_IP`.

### 4. Install Remote - SSH Extension

Install the [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension in VS Code.

### 5. Connect to Your Distiller

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Palette
2. Type "Remote-SSH: Connect to Host" and select it
3. Choose `distiller` (if configured) or enter `distiller@DISTILLER_IP`
4. VS Code will automatically install VS Code Server on the Distiller on first connection

## Recommended Extensions

The extensions below are grouped by purpose. Install only what you need for your workflow.

### AI Coding Assistants

Choose one or both based on your preference and subscription.

- [Claude Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) - AI-powered coding assistant from Anthropic
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=github.copilot) - AI pair programmer (requires subscription)
- [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=github.copilot-chat) - Chat interface for Copilot

### Git & GitHub

Recommended for most developers working with Git repositories.

- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - Enhanced Git integration with blame, history, and more
- [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=github.vscode-pull-request-github) - Review and manage pull requests
- [GitHub Actions](https://marketplace.visualstudio.com/items?itemName=github.vscode-github-actions) - Edit and debug GitHub Actions workflows

### Code Quality & Formatting

Helpful for maintaining consistent code style.

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Automatic code formatter for JS, TS, CSS, JSON, and more
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - Catch spelling mistakes in code and comments

### Python Development

Required if you're developing Python applications or using the Distiller SDK.

- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) - Python language support
- [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) - Fast, feature-rich language server
- [Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy) - Debugging support
- [Python Environments](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-python-envs) - Manage virtual environments and interpreters

### Containers & Kubernetes

For DevOps workflows, container development, or deploying to Kubernetes.

- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) - Build, manage, and deploy containers
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers) - Develop inside containers
- [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) - Manage clusters and resources
- [Helm Intellisense](https://marketplace.visualstudio.com/items?itemName=tim-koehler.helm-intellisense) - Autocomplete for Helm charts
- [GitOps Tools](https://marketplace.visualstudio.com/items?itemName=weaveworks.vscode-gitops-tools) - Flux and GitOps workflow support

### Language & File Support

Install based on the file types you work with.

- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) - YAML validation and autocomplete (useful for config files, Kubernetes manifests)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) - Shortcuts, preview, and TOC generation for Markdown
- [Systemd Unit File](https://marketplace.visualstudio.com/items?itemName=coolbear.systemd-unit-file) - Syntax highlighting for systemd services

### Utilities

Optional quality-of-life improvements.

- [Stats Bar](https://marketplace.visualstudio.com/items?itemName=njzy.stats-bar) - Display CPU, memory, and network stats in the status bar

### Distiller Extensions

The Distiller extensions are pre-installed on code-server but need to be copied to VS Code Server for use with Remote SSH.

- [Device Manager](https://marketplace.visualstudio.com/items?itemName=pamir-ai.device-manager) - Manage Distiller devices
- [Distiller Messaging](https://marketplace.visualstudio.com/items?itemName=pamir-ai.distiller-messaging) - Messaging integration
- [Distiller Ports](https://marketplace.visualstudio.com/items?itemName=pamir-ai.distiller-ports) - Port management
- [Pamir Welcome](https://marketplace.visualstudio.com/items?itemName=pamir-ai.pamir-welcome) - Welcome experience

#### Installing Distiller Extensions for VS Code Remote SSH

The Distiller extensions are not available on the VS Code Marketplace. To use them with VS Code Remote SSH, you need to:

1. Copy the extensions from code-server to VS Code Server
2. Update the extensions.json file so VS Code recognizes them

> **Note:** The `~/.vscode-server/extensions/` directory is created automatically on your first VS Code Remote SSH connection. Make sure you've connected at least once before running these commands.

##### Step 1: Copy the Extension Files

Run this command on your Distiller device (via SSH or terminal):

```bash
cp -r ~/.local/share/code-server/extensions/pamir-ai.* ~/.vscode-server/extensions/
```

##### Step 2: Update extensions.json

You can either download the script or create it manually.

###### Option A: Download the script (recommended)

```bash
# Download the update script
curl -o /tmp/update_extensions.py https://vanvonlj.github.io/documentation-site/scripts/update_vscode_extensions.py

# Run it
python3 /tmp/update_extensions.py
```

###### Option B: Create the script manually

```bash
cat > /tmp/update_extensions.py << 'EOF'
import json
import time

# Read the current extensions.json
with open('/home/distiller/.vscode-server/extensions/extensions.json', 'r') as f:
    extensions = json.load(f)

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

for pamir in pamir_extensions:
    if pamir['id'] not in existing_ids:
        new_ext = {
            "identifier": {
                "id": pamir['id']
            },
            "version": pamir['version'],
            "location": {
                "$mid": 1,
                "path": f"/home/distiller/.vscode-server/extensions/{pamir['relativeLocation']}",
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
        print(f"Added: {pamir['id']}")
    else:
        print(f"Already exists: {pamir['id']}")

# Write back to extensions.json
with open('/home/distiller/.vscode-server/extensions/extensions.json', 'w') as f:
    json.dump(extensions, f)

print(f"\nUpdated extensions.json with {len(extensions)} total extensions")
EOF

python3 /tmp/update_extensions.py
```

##### Step 3: Reload VS Code

After running the script, reload VS Code to load the extensions:

- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
- Run "Developer: Reload Window"

The Distiller extensions should now appear in your Extensions panel and be fully functional.

## Troubleshooting

### Cannot connect to Distiller

1. **Verify SSH works from terminal first:**

   ```bash
   ssh distiller@DISTILLER_IP
   ```

   If this fails, the issue is with SSH, not VS Code.

2. **Check network connectivity:**

   ```bash
   ping DISTILLER_IP
   ```

3. **Verify SSH key is copied correctly:**

   ```bash
   ssh -v distiller@DISTILLER_IP
   ```

   Look for "Authenticated" in the verbose output.

### VS Code Server fails to install

On the Distiller, ensure there's enough disk space:

```bash
df -h
```

You can also try removing the existing VS Code Server and reconnecting:

```bash
rm -rf ~/.vscode-server
```

### Extensions not loading after copy

1. Make sure the extensions were copied successfully:

   ```bash
   ls ~/.vscode-server/extensions/ | grep pamir
   ```

2. Reload VS Code window: `Ctrl+Shift+P` → "Developer: Reload Window"

3. If still not working, restart the VS Code Server:
   - Close VS Code
   - On Distiller: `pkill -f vscode-server`
   - Reconnect from VS Code
