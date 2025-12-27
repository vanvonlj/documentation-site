# Deploy to RKE2 with FluxCD (GitOps)

This guide covers deploying the documentation site to RKE2 using **FluxCD** for a production-ready, secure, GitOps-based deployment strategy.

## Prerequisites

- RKE2 cluster up and running
- `kubectl` configured to access your cluster
- Flux CLI installed
- GitHub repository with appropriate permissions
- Container registry (GitHub Container Registry recommended)
- Helm 3.x installed

---

## 🏗️ Docker Build

The Dockerfile uses a multi-stage build:

- **Stage 1**: Build the Docusaurus static site with Node.js
- **Stage 2**: Serve with nginx (non-root, port 8080)

### Build locally

```bash
docker build -t documentation-site:local .
```

### Test locally

```bash
docker run -p 8080:8080 documentation-site:local
```

Access at: <http://localhost:8080>

Or use the provided script:

```bash
./scripts/deploy-local.sh
```

---

## 🔄 GitOps Deployment with FluxCD

### Why FluxCD?

- ✅ **Secure** - No cluster credentials stored in GitHub
- ✅ **GitOps** - Git is the single source of truth
- ✅ **Automatic drift detection** and self-healing
- ✅ **Automatic image updates** without manual intervention
- ✅ **Pull model** - Cluster pulls changes, reducing attack surface
- ✅ **Environment parity** - Same deployment process for dev and prod

### Architecture

```
┌─────────┐      1. git push       ┌──────────┐
│Developer│ ──────────────────────> │  GitHub  │
└─────────┘                         │   Repo   │
                                    └────┬─────┘
                                         │
                                         │ 2. Trigger
                                         ▼
                                   ┌──────────┐
                                   │ GitHub   │
                                   │ Actions  │ 3. Build image
                                   └────┬─────┘
                                        │
                                        │ 4. Push image
                                        ▼
                                   ┌──────────┐
                                   │  GHCR    │
                                   │ Registry │
                                   └────┬─────┘
                                        │
                     5. Poll registry   │
       ┌────────────────────────────────┘
       │
       ▼
┌─────────────┐
│     RKE2    │  6. Detect new image
│   Cluster   │  7. Update Git with new tag
│  + FluxCD   │  8. Deploy automatically
└─────────────┘
```

---

## 🚀 Setup Instructions

### 1. Install Flux CLI

```bash
curl -s https://fluxcd.io/install.sh | sudo bash

# Verify installation
flux --version
```

### 2. Create GitHub Personal Access Token

- Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
- Click "Generate new token (classic)"
- Scopes needed:
  - `repo` (full control of private repositories)
  - `read:packages` (read packages)
  - `write:packages` (write packages)

### 3. Bootstrap Flux for Development Environment

```bash
# Bootstrap Flux for dev (uses develop branch)
flux bootstrap github \
  --owner=your-github-username \
  --repository=documentation-site \
  --branch=develop \
  --path=./flux/dev \
  --personal \
  --token-auth
```

When prompted, enter your GitHub Personal Access Token.

### 4. Bootstrap Flux for Production Environment

```bash
# Bootstrap Flux for prod (uses main branch)
flux bootstrap github \
  --owner=your-github-username \
  --repository=documentation-site \
  --branch=main \
  --path=./flux/prod \
  --personal \
  --token-auth
```

### 5. Create GitHub Container Registry Secret

Both dev and prod environments need access to pull images from GHCR:

```bash
# Create secret for dev
kubectl create secret docker-registry github-registry-credentials \
  --namespace flux-system \
  --docker-server=ghcr.io \
  --docker-username=your-github-username \
  --docker-password=YOUR_GITHUB_TOKEN

# If using separate cluster for prod, repeat for prod cluster
```

### 6. Update Configuration Files

You need to replace placeholder values in the flux configuration:

#### Update image repository

In both `flux/dev/imagerepository.yaml` and `flux/prod/imagerepository.yaml`:

```yaml
spec:
  image: ghcr.io/your-github-username/documentation-site  # Update this
```

#### Update domain names

In `flux/dev/values-configmap.yaml`:

```yaml
hosts:
  - host: dev-docs.your-domain.com  # Update this
```

In `flux/prod/values-configmap.yaml`:

```yaml
hosts:
  - host: docs.your-domain.com  # Update this
```

### 7. Commit and Push Changes

```bash
git add flux/
git commit -m "chore: configure Flux for deployment"

# Push to develop for dev environment
git push origin develop

# Push to main for prod environment
git push origin main
```

### 8. Verify Flux is Working

```bash
# Check Flux components
flux check

# Watch reconciliation
flux get sources git -w

# Check HelmReleases
flux get helmreleases -w

# Check image automation
flux get images all
```

---

## 🔄 Deployment Workflow

### Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes and test locally
npm start

# 3. Commit and push
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature

# 4. Create PR to develop
# GitHub Actions builds image automatically

# 5. Merge PR to develop
# Within 1 minute: Flux detects new image and deploys to dev
```

### Production Workflow

```bash
# 1. Create release PR from develop to main
gh pr create --base main --head develop --title "Release v1.2.3"

# 2. Review and merge PR

# 3. FluxCD automatically deploys to production
# Within 5 minutes: Flux detects new image and deploys to prod
```

### Image Update Flow

1. **GitHub Actions** builds image with tag: `main-abc123-1234567890`
2. **FluxCD ImageRepository** scans registry every interval (1m for dev, 5m for prod)
3. **FluxCD ImagePolicy** selects latest image matching pattern
4. **FluxCD ImageUpdateAutomation** commits new tag to Git
5. **FluxCD HelmRelease** deploys updated version

---

## ⚡ Environment Differences

### Development (Fast Iteration)

- **Git polling**: Every 1 minute
- **Registry scanning**: Every 1 minute
- **Image policy**: Latest `develop-*` image
- **Namespace**: `documentation-dev`
- **Resources**: Lower limits for cost savings

### Production (Stable)

- **Git polling**: Every 5 minutes
- **Registry scanning**: Every 5 minutes
- **Image policy**: Latest `main-*` image
- **Namespace**: `documentation-prod`
- **Resources**: Production-grade limits

---

## 📊 Monitoring Deployment

### Check Deployment Status

```bash
# Check pods
kubectl get pods -n documentation-dev
kubectl get pods -n documentation-prod

# Check deployments
kubectl get deployment -n documentation-dev
kubectl get deployment -n documentation-prod

# Check services
kubectl get svc -n documentation-dev
kubectl get svc -n documentation-prod

# Check ingress
kubectl get ingress -n documentation-dev
kubectl get ingress -n documentation-prod
```

### View Logs

```bash
# Dev logs
kubectl logs -n documentation-dev -l app.kubernetes.io/name=documentation-site --tail=100 -f

# Prod logs
kubectl logs -n documentation-prod -l app.kubernetes.io/name=documentation-site --tail=100 -f
```

### Flux-Specific Monitoring

```bash
# Check HelmRelease status
flux get helmreleases -n flux-system

# Check image automation
flux get images all -n flux-system

# Check Git sources
flux get sources git -n flux-system

# View Flux logs
flux logs --follow --all-namespaces

# Force immediate reconciliation
flux reconcile helmrelease documentation-site -n flux-system
```

---

## 🔄 Rolling Back

One of the best features of GitOps: rollback is just a Git operation!

### Quick Rollback

```bash
# Revert the last commit
git revert HEAD
git push origin main  # or develop

# Flux auto-applies within interval (1-5 minutes)
```

### Rollback to Specific Version

```bash
# Find the commit you want to rollback to
git log --oneline

# Revert to specific commit
git revert <commit-hash>
git push origin main

# Or reset to specific commit (destructive)
git reset --hard <commit-hash>
git push --force origin main  # Use with caution!
```

### Force Immediate Rollback

```bash
# After reverting in Git, force immediate reconciliation
flux reconcile source git documentation-site -n flux-system
flux reconcile helmrelease documentation-site -n flux-system
```

---

## 🔒 Security Best Practices

### Dockerfile

- ✅ Multi-stage build (smaller image size)
- ✅ Non-root user (nginx runs as user 101)
- ✅ Non-privileged port (8080 instead of 80)
- ✅ Read-only filesystem compatible
- ✅ Health checks included
- ✅ Security headers in nginx config

### Kubernetes

- ✅ Pod Security Context (`runAsNonRoot: true`)
- ✅ Security Context (drop ALL capabilities)
- ✅ Resource limits defined
- ✅ Network Policies (recommended)
- ✅ Pod Disruption Budget
- ✅ Readiness & Liveness probes

### FluxCD Security

- ✅ **No cluster credentials stored in GitHub**
- ✅ **Pull-based model** - cluster initiates all connections
- ✅ **Audit trail** - all changes tracked in Git
- ✅ **Easy rollback** - `git revert` is all you need
- ✅ **Drift detection** - automatic reconciliation
- ✅ **RBAC** - Flux runs with minimal permissions

---

## 🆘 Troubleshooting

### Image Pull Errors

```bash
# Check image pull secrets
kubectl get secrets -n documentation-prod
kubectl describe pod POD_NAME -n documentation-prod

# Verify secret is correct
kubectl get secret github-registry-credentials -n flux-system -o yaml
```

### Flux Not Reconciling

```bash
# Check Flux controllers
kubectl get pods -n flux-system

# Check for errors
flux logs --level=error

# Check HelmRelease conditions
kubectl describe helmrelease documentation-site -n flux-system

# Force reconciliation
flux reconcile source git documentation-site
flux reconcile helmrelease documentation-site
```

### Image Automation Not Working

```bash
# Check ImageRepository
flux get image repository documentation-site

# Check ImagePolicy
flux get image policy documentation-site-main

# Check ImageUpdateAutomation
flux get image update documentation-site-prod

# View automation logs
kubectl logs -n flux-system deploy/image-automation-controller
```

### Pod Crashes or CrashLoopBackOff

```bash
# Check events
kubectl get events -n documentation-prod --sort-by='.lastTimestamp'

# Check pod logs
kubectl logs -n documentation-prod POD_NAME

# Check previous container logs
kubectl logs -n documentation-prod POD_NAME --previous

# Describe pod for details
kubectl describe pod POD_NAME -n documentation-prod
```

### DNS or Ingress Issues

```bash
# Check ingress
kubectl get ingress -n documentation-prod
kubectl describe ingress documentation-site -n documentation-prod

# Test service connectivity
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- \
  curl http://documentation-site.documentation-prod.svc.cluster.local:8080
```

---

## 📝 Configuration Files

### Created Files

- `Dockerfile` - Multi-stage production build
- `nginx.conf` - Nginx configuration with security headers
- `.github/workflows/build.yml` - Image build workflow (no deployment)
- `flux/` - FluxCD GitOps configuration
  - `base/` - Common Flux resources (GitRepository, HelmRelease)
  - `dev/` - Development environment (fast polling, develop branch)
  - `prod/` - Production environment (stable polling, main branch)
- `scripts/deploy-local.sh` - Local Docker testing

### Key Files to Update

1. **flux/dev/imagerepository.yaml** - Update `your-org` to your GitHub username
2. **flux/prod/imagerepository.yaml** - Update `your-org` to your GitHub username
3. **flux/dev/values-configmap.yaml** - Update domain name
4. **flux/prod/values-configmap.yaml** - Update domain name

---

## 🎯 Next Steps

1. **Set up monitoring** - Add Prometheus/Grafana for metrics
2. **Configure alerts** - Set up Slack/PagerDuty notifications for Flux
3. **Add staging environment** - Create `flux/staging/` for pre-prod testing
4. **Implement policy enforcement** - Add OPA Gatekeeper or Kyverno
5. **Set up backups** - Configure Velero for cluster backups

---

## 📚 Additional Resources

- [FluxCD Documentation](https://fluxcd.io/docs/)
- [GitOps Principles](https://opengitops.dev/)
- [RKE2 Documentation](https://docs.rke2.io/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)

---

## 💡 Tips

### Speed Up Development

```bash
# Temporarily reduce polling interval
flux get sources git
flux suspend source git documentation-site
# Edit interval in Git
flux resume source git documentation-site
```

### Debug Flux Issues

```bash
# Enable debug logging
flux logs --level=debug --follow

# Check specific controller
kubectl logs -n flux-system deploy/source-controller -f
kubectl logs -n flux-system deploy/helm-controller -f
kubectl logs -n flux-system deploy/image-automation-controller -f
```

### Clean Up

```bash
# Uninstall dev environment
flux uninstall --namespace flux-system --keep-namespace

# Uninstall and remove namespace
flux uninstall
```
