# FluxCD Configuration

This directory contains the FluxCD GitOps configuration for deploying the documentation site to RKE2 clusters.

## Structure

```
flux/
├── base/              # Common resources shared by all environments
│   ├── gitrepository.yaml       # Git source definition
│   ├── helmrelease.yaml         # Helm release specification
│   └── kustomization.yaml       # Base kustomization
├── dev/               # Development environment overlay
│   ├── gitrepository-patch.yaml       # 1m polling for fast iteration
│   ├── imagerepository.yaml           # Registry scanning config
│   ├── imagerepository-patch.yaml     # 1m scanning interval
│   ├── imagepolicy.yaml               # Select develop-* images
│   ├── imageupdateautomation.yaml     # Auto-update develop branch
│   ├── helmrelease-patch.yaml         # Dev-specific Helm values
│   ├── values-configmap.yaml          # Dev configuration
│   └── kustomization.yaml             # Dev overlay
└── prod/              # Production environment overlay
    ├── imagerepository.yaml           # Registry scanning config
    ├── imagepolicy.yaml               # Select main-* images
    ├── imageupdateautomation.yaml     # Auto-update main branch
    ├── helmrelease-patch.yaml         # Prod-specific Helm values
    ├── values-configmap.yaml          # Production configuration
    └── kustomization.yaml             # Prod overlay
```

## Environment Differences

### Development (`flux/dev/`)
- **Branch**: `develop`
- **Namespace**: `documentation-dev`
- **Polling Interval**: 1 minute (fast iteration)
- **Registry Scan**: 1 minute
- **Image Pattern**: `develop-<sha>-<timestamp>`
- **Resources**: Lower limits for cost savings

### Production (`flux/prod/`)
- **Branch**: `main`
- **Namespace**: `documentation-prod`
- **Polling Interval**: 5 minutes (stable)
- **Registry Scan**: 5 minutes
- **Image Pattern**: `main-<sha>-<timestamp>`
- **Resources**: Production-grade limits

## How It Works

1. **Developer pushes code** to `develop` or `main` branch
2. **GitHub Actions** builds and pushes Docker image to GHCR
3. **FluxCD ImageRepository** scans registry for new images
4. **FluxCD ImagePolicy** selects the latest matching image
5. **FluxCD ImageUpdateAutomation** commits the new image tag to Git
6. **FluxCD HelmRelease** deploys the updated version to the cluster

## Deployment

See [DEPLOY-RKE2.md](../DEPLOY-RKE2.md) for full deployment instructions.

### Quick Start

```bash
# Bootstrap dev environment
flux bootstrap github \
  --owner=your-github-username \
  --repository=documentation-site \
  --branch=develop \
  --path=./flux/dev \
  --personal

# Bootstrap prod environment
flux bootstrap github \
  --owner=your-github-username \
  --repository=documentation-site \
  --branch=main \
  --path=./flux/prod \
  --personal
```

## Configuration

Before deploying, update these values:

1. **Image repository** in `dev/imagerepository.yaml` and `prod/imagerepository.yaml`:
   ```yaml
   spec:
     image: ghcr.io/YOUR-USERNAME/documentation-site
   ```

2. **Domain names** in `dev/values-configmap.yaml` and `prod/values-configmap.yaml`:
   ```yaml
   ingress:
     hosts:
       - host: YOUR-DOMAIN.com
   ```

## Monitoring

```bash
# Check all Flux resources
flux get all

# Check image automation
flux get images all

# Force reconciliation
flux reconcile helmrelease documentation-site -n flux-system
```

## Troubleshooting

```bash
# View Flux logs
flux logs --follow --all-namespaces

# Check specific controllers
kubectl logs -n flux-system deploy/source-controller
kubectl logs -n flux-system deploy/helm-controller
kubectl logs -n flux-system deploy/image-automation-controller
```
