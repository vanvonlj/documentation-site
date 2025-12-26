# GitHub Actions Workflows

This directory contains CI/CD workflows for automated building, testing, and deployment.

## Workflows

### 1. Docker Build & Push (`docker-build-push.yml`)

**Purpose:** Automatically builds and publishes Docker images to GitHub Container Registry.

**Triggers:**

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Git tags matching `v*.*.*` pattern
- Manual workflow dispatch

**Features:**

- Multi-platform builds (AMD64 + ARM64)
- Automatic semantic versioning from tags
- Docker layer caching for faster builds
- Security scanning with Trivy
- Image testing and validation
- Build attestation for supply chain security

**Artifacts:**

- Docker images: `ghcr.io/OWNER/REPO:TAG`
- Security scan results in Security tab
- Build provenance attestation

### 2. Helm Chart Release (`helm-release.yml`)

**Purpose:** Packages and publishes Helm charts for Kubernetes deployment.

**Triggers:**

- Push of version tags (`v*.*.*`)
- Changes to `helm/**` directory
- Manual workflow dispatch

**Features:**

- Helm chart linting
- Chart packaging
- Push to OCI registry (GHCR)
- GitHub release creation with chart archives
- Integration testing with Kind cluster

**Artifacts:**

- Helm chart: `oci://ghcr.io/OWNER/charts/documentation-site`
- Chart archive in GitHub Releases

## Setup Instructions

See [CI-CD.md](../../CI-CD.md) for complete setup instructions.

### Quick Setup

1. **Repository Settings:**
   - Settings → Actions → General
   - Enable "Read and write permissions"
   - Allow GitHub Actions to create releases

2. **Configure Variables (Optional):**
   - Settings → Secrets and variables → Actions → Variables
   - Add `SITE_URL` and `PROXY_BASE_URL` if needed

3. **Push Code:**
   ```bash
   git push origin main
   ```

## Image Tags

The `docker-build-push.yml` workflow generates multiple tags:

| Git Event       | Generated Tags                      |
| --------------- | ----------------------------------- |
| Push to main    | `latest`, `main`, `main-sha-abc123` |
| Push to develop | `develop`, `develop-sha-abc123`     |
| Tag `v1.2.3`    | `v1.2.3`, `v1.2`, `v1`, `latest`    |
| Pull request    | `pr-123`                            |

## Usage Examples

### Pull Latest Image

```bash
docker pull ghcr.io/YOUR-USERNAME/documentation-site:latest
```

### Pull Specific Version

```bash
docker pull ghcr.io/YOUR-USERNAME/documentation-site:v1.0.0
```

### Install Helm Chart

```bash
helm install docs oci://ghcr.io/YOUR-USERNAME/charts/documentation-site \
  --version 1.0.0
```

## Security

- **Trivy Scanning:** All images are scanned for vulnerabilities
- **SARIF Upload:** Results published to Security tab
- **Attestation:** Build provenance for supply chain verification
- **GHCR:** Secure, private-by-default registry

## Monitoring

Check workflow status:

- **Actions Tab:** View workflow runs
- **Security Tab:** View vulnerability scans
- **Packages:** View published images/charts

## Troubleshooting

See [CI-CD.md](../../CI-CD.md#troubleshooting) for common issues and solutions.
