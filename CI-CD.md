# CI/CD Setup Guide

This guide explains how to set up automated Docker image builds and deployments using GitHub Actions.

## Table of Contents

- [Overview](#overview)
- [GitHub Actions Workflows](#github-actions-workflows)
- [Setup Instructions](#setup-instructions)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

## Overview

This project includes two main GitHub Actions workflows:

1. **Docker Build & Push** - Builds multi-platform Docker images and pushes to GitHub Container Registry
2. **Helm Chart Release** - Packages and releases Helm charts

### Features

- Multi-platform builds (AMD64 and ARM64)
- Automatic versioning using Git tags
- Security scanning with Trivy
- Image testing and validation
- Helm chart packaging and testing
- Artifact attestation for supply chain security

## GitHub Actions Workflows

### 1. Docker Build & Push Workflow

**File:** [.github/workflows/docker-build-push.yml](.github/workflows/docker-build-push.yml)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Git tags matching `v*.*.*`
- Manual workflow dispatch

**Jobs:**
1. **build-and-push**: Builds and pushes Docker images
2. **security-scan**: Scans images for vulnerabilities using Trivy
3. **test-image**: Validates the built image works correctly

**Image Tags Generated:**
- `latest` - Latest commit on main branch
- `main` - Latest commit on main branch
- `develop` - Latest commit on develop branch
- `v1.2.3` - Semantic version tags
- `v1.2` - Major.minor version tags
- `v1` - Major version tags
- `main-sha-abc123` - Branch and commit SHA

### 2. Helm Chart Release Workflow

**File:** [.github/workflows/helm-release.yml](.github/workflows/helm-release.yml)

**Triggers:**
- Push of version tags (`v*.*.*`)
- Changes to `helm/**` directory
- Manual workflow dispatch

**Jobs:**
1. **release-helm-chart**: Packages and publishes Helm chart
2. **test-helm-chart**: Tests chart installation in a Kind cluster

## Setup Instructions

### Prerequisites

1. GitHub repository with admin access
2. GitHub Container Registry (GHCR) enabled
3. (Optional) Kubernetes cluster for deployment

### Step 1: Enable GitHub Container Registry

GHCR is automatically available for GitHub repositories. No additional setup required.

### Step 2: Configure Repository Settings

1. Go to your repository **Settings** → **Actions** → **General**
2. Under "Workflow permissions", ensure:
   - **Read and write permissions** is selected
   - **Allow GitHub Actions to create and approve pull requests** is checked

### Step 3: Set Repository Variables (Optional)

For custom site URLs, set repository variables:

1. Go to **Settings** → **Secrets and variables** → **Actions** → **Variables**
2. Add the following variables:

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `SITE_URL` | Production URL | `https://docs.example.com` |
| `PROXY_BASE_URL` | Base URL path | `/` or `/docs/` |

### Step 4: Enable GitHub Packages

1. Go to repository **Settings** → **Packages**
2. Ensure packages are visible (public or private as needed)

### Step 5: Update Helm Values

Update the image repository in Helm value files:

```yaml
# helm/documentation-site/values-prod.yaml
image:
  repository: ghcr.io/YOUR-GITHUB-USERNAME/documentation-site
  tag: "v1.0.0"
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username or organization name.

## Configuration

### GitHub Actions Secrets

The workflows use `GITHUB_TOKEN` which is automatically provided. No manual secrets needed for basic operation.

#### Optional Secrets

For deployment to external registries or Kubernetes:

| Secret Name | Description | Required For |
|------------|-------------|--------------|
| `DOCKERHUB_USERNAME` | Docker Hub username | Docker Hub registry |
| `DOCKERHUB_TOKEN` | Docker Hub access token | Docker Hub registry |
| `KUBE_CONFIG` | Base64 encoded kubeconfig | K8s deployment |
| `AWS_ACCESS_KEY_ID` | AWS access key | ECR registry |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | ECR registry |

### Customizing Build Arguments

Edit [.github/workflows/docker-build-push.yml](.github/workflows/docker-build-push.yml):

```yaml
build-args: |
  SITE_URL=${{ vars.SITE_URL || 'https://your-domain.com' }}
  PROXY_BASE_URL=${{ vars.PROXY_BASE_URL || '/' }}
```

### Adding Additional Registries

To push to Docker Hub in addition to GHCR:

```yaml
- name: Log in to Docker Hub
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}

- name: Push to Docker Hub
  uses: docker/build-push-action@v5
  with:
    push: true
    tags: ${{ secrets.DOCKERHUB_USERNAME }}/documentation-site:latest
```

## Usage

### Triggering Builds

#### Automatic Builds

Builds trigger automatically on:
- Every push to `main` or `develop`
- Every pull request to `main` or `develop`

#### Manual Builds

Trigger manually via GitHub UI:
1. Go to **Actions** tab
2. Select "Build and Push Docker Images"
3. Click **Run workflow**
4. Select branch and options
5. Click **Run workflow**

#### Release Builds

Create a new release:

```bash
# Create and push a version tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

This will:
- Build Docker image with tag `v1.0.0`
- Package and release Helm chart
- Create GitHub release with artifacts

### Using Built Images

#### Pull from GitHub Container Registry

```bash
# Login to GHCR (requires GitHub personal access token)
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Pull latest image
docker pull ghcr.io/YOUR-USERNAME/documentation-site:latest

# Pull specific version
docker pull ghcr.io/YOUR-USERNAME/documentation-site:v1.0.0
```

#### Make Images Public

By default, GHCR packages are private. To make public:

1. Go to package page: `https://github.com/users/YOUR-USERNAME/packages/container/documentation-site`
2. Click **Package settings**
3. Scroll to **Danger Zone**
4. Click **Change visibility** → **Public**

### Deploying with Helm

#### Install from GHCR

```bash
# Login to Helm registry
echo $GITHUB_TOKEN | helm registry login ghcr.io -u USERNAME --password-stdin

# Install chart
helm install documentation-site \
  oci://ghcr.io/YOUR-USERNAME/charts/documentation-site \
  --version 1.0.0 \
  --namespace docs \
  --create-namespace
```

#### Install from Local Chart

```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/documentation-site.git
cd documentation-site

# Install with production values
helm install documentation-site ./helm/documentation-site \
  -f helm/documentation-site/values-prod.yaml \
  --namespace docs \
  --create-namespace
```

## Workflow Outputs

### Build Artifacts

Each successful build produces:
- Docker images in GHCR
- SBOM (Software Bill of Materials)
- Build provenance attestation
- Security scan results

### Viewing Results

**Docker Images:**
- Navigate to: `https://github.com/YOUR-USERNAME?tab=packages`

**Security Scans:**
- Go to **Security** tab → **Code scanning alerts**

**Workflow Runs:**
- Go to **Actions** tab → Select workflow run

## Advanced Configuration

### Multi-Registry Push

Edit the workflow to push to multiple registries:

```yaml
- name: Build and push to multiple registries
  uses: docker/build-push-action@v5
  with:
    push: true
    tags: |
      ghcr.io/${{ github.repository }}:${{ github.sha }}
      docker.io/${{ secrets.DOCKERHUB_USERNAME }}/documentation-site:${{ github.sha }}
      your-registry.com/documentation-site:${{ github.sha }}
```

### Automated Kubernetes Deployment

Add a deployment job to [.github/workflows/docker-build-push.yml](.github/workflows/docker-build-push.yml):

```yaml
deploy-to-k8s:
  runs-on: ubuntu-latest
  needs: [build-and-push, security-scan, test-image]
  if: github.ref == 'refs/heads/main'
  environment: production

  steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Configure kubectl
      run: |
        echo "${{ secrets.KUBE_CONFIG }}" | base64 -d > kubeconfig
        export KUBECONFIG=./kubeconfig

    - name: Deploy with Helm
      run: |
        helm upgrade --install documentation-site ./helm/documentation-site \
          --set image.tag=${{ github.sha }} \
          -f helm/documentation-site/values-prod.yaml \
          --namespace docs \
          --create-namespace \
          --wait \
          --timeout 5m

    - name: Verify deployment
      run: |
        kubectl rollout status deployment/documentation-site -n docs
        kubectl get pods -n docs
```

### Build Notifications

Add Slack/Discord notifications:

```yaml
- name: Notify on success
  if: success()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "✅ Docker image built successfully: ${{ steps.meta.outputs.tags }}"
      }
```

### Caching Strategies

The workflow uses GitHub Actions cache for:
- Docker layer caching (mode: max)
- Buildx cache

To use external cache (e.g., S3):

```yaml
cache-from: type=s3,region=us-east-1,bucket=my-cache-bucket
cache-to: type=s3,region=us-east-1,bucket=my-cache-bucket,mode=max
```

## Troubleshooting

### Build Failures

**Permission Denied:**
```
Error: Permission denied while trying to connect to the Docker daemon
```
**Solution:** Check workflow permissions in repository settings.

**Image Push Fails:**
```
Error: denied: permission_denied
```
**Solution:** Ensure `GITHUB_TOKEN` has package write permissions.

### Security Scan Issues

**High/Critical Vulnerabilities:**
- Review Trivy output in Security tab
- Update base images in Dockerfile
- Update npm dependencies

**Scan Timeout:**
- Increase timeout in workflow
- Use selective scanning for large images

### Helm Chart Issues

**Chart Already Exists:**
```
Error: chart already exists
```
**Solution:** Increment chart version in `Chart.yaml`

**Template Validation Fails:**
```
Error: YAML parse error
```
**Solution:** Run `helm lint` locally before pushing

### Registry Authentication

**Login Failed:**
```
Error: incorrect username or password
```
**Solutions:**
1. For GHCR: Use personal access token with `write:packages` scope
2. Verify token hasn't expired
3. Check username is correct (lowercase for GHCR)

## Best Practices

1. **Use Semantic Versioning** - Tag releases as `v1.0.0`, `v2.1.3`, etc.
2. **Pin Dependencies** - Use specific versions in Dockerfile
3. **Scan Images** - Review security scan results before deploying
4. **Test Before Deploy** - Use staging environment first
5. **Monitor Builds** - Set up notifications for failures
6. **Cache Wisely** - Use appropriate cache modes for faster builds
7. **Minimize Image Size** - Use multi-stage builds (already implemented)
8. **Sign Images** - Enable artifact attestation (already configured)

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Helm Chart Releaser](https://helm.sh/docs/topics/chart_repository/)
- [Trivy Security Scanner](https://github.com/aquasecurity/trivy)

## Support

For issues with workflows:
1. Check workflow run logs in Actions tab
2. Review this documentation
3. Check GitHub Actions status page
4. Open an issue in the repository
