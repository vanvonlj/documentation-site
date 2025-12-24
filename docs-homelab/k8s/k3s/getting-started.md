---
sidebar_position: 1
---

# K3s Getting Started

Lightweight Kubernetes setup guide.

## What is K3s?

K3s is a lightweight Kubernetes distribution perfect for edge computing, IoT, CI/CD, and homelab environments.

## Installation

### Single Node

```bash
curl -sfL https://get.k3s.io | sh -
```

### Multi-Node Cluster

**On the master node:**
```bash
curl -sfL https://get.k3s.io | sh -s - server --cluster-init
```

**Get the token:**
```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

**On worker nodes:**
```bash
curl -sfL https://get.k3s.io | K3S_URL=https://master-ip:6443 K3S_TOKEN=<token> sh -
```

## Verify Installation

```bash
sudo k3s kubectl get nodes
```

## Next Steps

- Deploy applications
- Configure ingress
- Set up monitoring
