---
sidebar_position: 1
---

# Proxmox Installation

Complete guide for installing and configuring Proxmox VE.

## Download Proxmox

Get the latest ISO from [proxmox.com](https://www.proxmox.com/en/downloads)

## Installation

### 1. Create Bootable USB

```bash
dd if=proxmox-ve_*.iso of=/dev/sdX bs=1M status=progress
```

### 2. Boot and Install

Follow the installation wizard.

### 3. Initial Configuration

Access the web interface at `https://your-ip:8006`

## Post-Installation

- Update repositories
- Configure storage
- Set up networking
- Create VM templates

## Best Practices

- Regular backups
- Resource allocation
- Security hardening
