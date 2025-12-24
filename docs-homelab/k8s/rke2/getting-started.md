---
sidebar_position: 1
---

# RKE2 Getting Started

Rancher Kubernetes Engine 2 setup guide.

## What is RKE2?

RKE2 is a fully conformant Kubernetes distribution focused on security and compliance for the U.S. Federal Government.

## Installation

### Server Node

```bash
curl -sfL https://get.rke2.io | sh -
systemctl enable rke2-server.service
systemctl start rke2-server.service
```

### Agent Node

**Get token from server:**
```bash
cat /var/lib/rancher/rke2/server/node-token
```

**On agent node:**
```bash
curl -sfL https://get.rke2.io | INSTALL_RKE2_TYPE="agent" sh -
```

**Configure agent** (`/etc/rancher/rke2/config.yaml`):
```yaml
server: https://server-ip:9345
token: <token-from-server>
```

**Start agent:**
```bash
systemctl enable rke2-agent.service
systemctl start rke2-agent.service
```

## Verify Installation

```bash
export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
kubectl get nodes
```

## Features

- CIS hardened by default
- FIPS 140-2 compliance
- SELinux enforcement
