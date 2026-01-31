# Developing on Distiller with VS Code

- [Developing on Distiller with VS Code](#developing-on-distiller-with-vs-code)
  - [Setup](#setup)
  - [Recommended Extensions](#recommended-extensions)
    - [VS Code Extensions](#vs-code-extensions)
    - [Distiller Extensions](#distiller-extensions)
      - [Installing Distiller Extensions for VS Code Remote SSH](#installing-distiller-extensions-for-vs-code-remote-ssh)


## Setup
1. Setup SSH Key for the Distiller User.
2. Install SSH Extension in your Local VS Code.
3. Connect to your Distiller Device via VS Code.

## Recommended Extensions

### VS Code Extensions

- [Claude Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) - AI-powered coding assistant
- [Systemd Unit File](https://marketplace.visualstudio.com/items?itemName=coolbear.systemd-unit-file) - Syntax highlighting for systemd unit files
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - Git supercharged
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatter
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=github.copilot) - AI pair programmer
- [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=github.copilot-chat) - Chat interface for Copilot
- [GitHub Actions](https://marketplace.visualstudio.com/items?itemName=github.vscode-github-actions) - GitHub Actions workflow support
- [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=github.vscode-pull-request-github) - Review and manage PRs
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers) - Develop inside containers
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) - Docker support
- [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) - Kubernetes support
- [Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy) - Python debugging
- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) - Python language support
- [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) - Python language server
- [Python Environments](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-python-envs) - Python environment management
- [Stats Bar](https://marketplace.visualstudio.com/items?itemName=njzy.stats-bar) - System stats in status bar
- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) - YAML language support
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - Spelling checker for code
- [Helm Intellisense](https://marketplace.visualstudio.com/items?itemName=tim-koehler.helm-intellisense) - Helm chart support
- [GitOps Tools](https://marketplace.visualstudio.com/items?itemName=weaveworks.vscode-gitops-tools) - GitOps workflow support
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) - Markdown tools

### Distiller Extensions

The Distiller extensions are pre-installed on code-server but need to be copied to VS Code Server for use with Remote SSH.

- [Device Manager](https://marketplace.visualstudio.com/items?itemName=pamir-ai.device-manager) - Manage Distiller devices
- [Distiller Messaging](https://marketplace.visualstudio.com/items?itemName=pamir-ai.distiller-messaging) - Messaging integration
- [Distiller Ports](https://marketplace.visualstudio.com/items?itemName=pamir-ai.distiller-ports) - Port management
- [Pamir Welcome](https://marketplace.visualstudio.com/items?itemName=pamir-ai.pamir-welcome) - Welcome experience

#### Installing Distiller Extensions for VS Code Remote SSH

The Distiller extensions are not available on the VS Code Marketplace. To use them with VS Code Remote SSH, copy them from the code-server installation to the VS Code Server extensions directory.

Run this command on your Distiller device (via SSH or terminal):

```bash
cp -r ~/.local/share/code-server/extensions/pamir-ai.* ~/.vscode-server/extensions/
```

After copying, reload VS Code (press `Ctrl+Shift+P` and run "Developer: Reload Window") to load the extensions.
