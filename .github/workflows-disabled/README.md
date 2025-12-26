# Disabled Workflows

This directory contains GitHub Actions workflows that have been disabled.

## Why Workflows Are Disabled

These workflows are currently not needed because the site is deployed to GitHub Pages using a simpler static deployment workflow.

## Disabled Workflows

### 1. docker-build-push.yml

**Purpose**: Build and push Docker container images to GitHub Container Registry (GHCR)

**What it does**:

- Builds multi-platform Docker images
- Pushes to ghcr.io registry
- Generates build provenance attestations
- Runs security scans with Trivy
- Tests the built image

**When to re-enable**:

- If you need to deploy using Kubernetes/Docker
- If you want to distribute your docs as a container
- If you need multi-platform container support

**To re-enable**:

```bash
git mv .github/workflows-disabled/docker-build-push.yml .github/workflows/
```

---

### 2. helm-release.yml

**Purpose**: Package and release Helm charts for Kubernetes deployment

**What it does**:

- Lints and packages Helm chart
- Pushes chart to GHCR (OCI registry)
- Creates GitHub releases with chart artifacts
- Tests chart installation on kind cluster

**When to re-enable**:

- If you need to deploy docs on Kubernetes
- If you want to distribute as a Helm chart
- If you're running in a cluster environment

**To re-enable**:

```bash
git mv .github/workflows-disabled/helm-release.yml .github/workflows/
```

---

## Current Active Workflow

**deploy-pages.yml**: Deploys static site to GitHub Pages

- Simpler deployment model
- No containers or Kubernetes needed
- Automatic deployment on push to main
- Site URL: https://vanvonlj.github.io/documentation-site/

---

## Container/Kubernetes Deployment (If Needed Later)

If you decide to re-enable container deployments, here's what you'll need:

### Prerequisites

1. Enable GitHub Container Registry access
2. Configure repository secrets (if needed)
3. Set up Kubernetes cluster (for Helm deployments)

### Deployment Options

**Option 1: GitHub Pages (Current - Active)**

- ✅ Simplest setup
- ✅ Free hosting
- ✅ Automatic SSL
- ✅ CDN included
- Best for: Public documentation sites

**Option 2: Docker Container (Disabled)**

- Container-based deployment
- Can run anywhere (cloud, on-prem, local)
- Requires container registry access
- Best for: Private deployments, enterprise environments

**Option 3: Kubernetes/Helm (Disabled)**

- Full Kubernetes deployment
- Scalable and highly available
- More complex setup
- Best for: Production environments, multiple instances

---

## Notes

- Workflows in this directory are **not executed** by GitHub Actions
- The `.yml` files are preserved for future use
- All container and Helm configurations remain in the repository
- Docker and Kubernetes deployment documentation is still available in:
  - DOCKER.md
  - CONTAINER-QUICKSTART.md
  - CI-CD.md
  - helm/ directory

---

**Last Updated**: 2025-12-24
**Reason**: Simplified deployment to GitHub Pages only
