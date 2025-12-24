# Docker and Kubernetes Deployment Guide

This document provides comprehensive instructions for deploying the documentation site using Docker, Docker Compose, and Kubernetes (via Helm).

## Table of Contents

- [Docker](#docker)
- [Docker Compose](#docker-compose)
- [Kubernetes with Helm](#kubernetes-with-helm)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Docker

### Building the Docker Image

#### Production Build

```bash
docker build --target production -t documentation-site:latest .
```

With custom build arguments:

```bash
docker build \
  --target production \
  --build-arg SITE_URL=https://docs.example.com \
  --build-arg PROXY_BASE_URL=/ \
  -t documentation-site:latest .
```

#### Development Build

```bash
docker build --target development -t documentation-site:dev .
```

### Running the Container

#### Production Container

```bash
docker run -d \
  --name docs-prod \
  -p 8080:80 \
  documentation-site:latest
```

Access the site at http://localhost:8080

#### Development Container

```bash
docker run -d \
  --name docs-dev \
  -p 3000:3000 \
  -v $(pwd)/docs:/app/docs \
  -v $(pwd)/docs-text-rpg:/app/docs-text-rpg \
  -v $(pwd)/docs-distiller:/app/docs-distiller \
  -v $(pwd)/docs-homelab:/app/docs-homelab \
  -v $(pwd)/src:/app/src \
  documentation-site:dev
```

Access the development server at http://localhost:3000

### Pushing to a Registry

```bash
# Tag the image
docker tag documentation-site:latest your-registry.com/documentation-site:latest

# Push to registry
docker push your-registry.com/documentation-site:latest
```

## Docker Compose

Docker Compose provides an easier way to manage both development and production environments.

### Development Environment

Start the development server with hot-reload:

```bash
docker-compose up dev
```

Or run in detached mode:

```bash
docker-compose up -d dev
```

### Production Environment

Start the production server:

```bash
docker-compose up prod
```

Or with custom environment variables:

```bash
SITE_URL=https://docs.example.com PROXY_BASE_URL=/ docker-compose up -d prod
```

### Useful Docker Compose Commands

```bash
# Stop services
docker-compose down

# View logs
docker-compose logs -f dev

# Rebuild images
docker-compose build

# Clean up everything
docker-compose down -v --rmi all
```

## Kubernetes with Helm

### Prerequisites

- Kubernetes cluster (v1.19+)
- Helm 3.x installed
- kubectl configured to access your cluster

### Installing the Helm Chart

#### Quick Install

```bash
# Install with default values
helm install documentation-site ./helm/documentation-site

# Install in a specific namespace
helm install documentation-site ./helm/documentation-site \
  --namespace docs \
  --create-namespace
```

#### Production Install with Custom Values

Create a custom values file `values-prod.yaml`:

```yaml
replicaCount: 3

image:
  repository: your-registry.com/documentation-site
  tag: "1.0.0"
  pullPolicy: Always

buildArgs:
  siteUrl: "https://docs.example.com"
  proxyBaseUrl: "/"

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
  hosts:
    - host: docs.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: docs-tls
      hosts:
        - docs.example.com

resources:
  limits:
    cpu: 500m
    memory: 256Mi
  requests:
    cpu: 200m
    memory: 128Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

Install with custom values:

```bash
helm install documentation-site ./helm/documentation-site \
  -f values-prod.yaml \
  --namespace docs \
  --create-namespace
```

### Managing the Deployment

#### Upgrade

```bash
# Upgrade with new image version
helm upgrade documentation-site ./helm/documentation-site \
  --set image.tag=1.1.0 \
  --namespace docs

# Upgrade with new values file
helm upgrade documentation-site ./helm/documentation-site \
  -f values-prod.yaml \
  --namespace docs
```

#### Rollback

```bash
# List releases
helm history documentation-site --namespace docs

# Rollback to previous version
helm rollback documentation-site --namespace docs

# Rollback to specific revision
helm rollback documentation-site 2 --namespace docs
```

#### Uninstall

```bash
helm uninstall documentation-site --namespace docs
```

### Helm Chart Customization

#### Key Configuration Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `replicaCount` | Number of replicas | `2` |
| `image.repository` | Image repository | `your-registry/documentation-site` |
| `image.tag` | Image tag | `""` (uses chart appVersion) |
| `buildArgs.siteUrl` | Site URL for build | `https://your-domain.com` |
| `buildArgs.proxyBaseUrl` | Base URL path | `/` |
| `ingress.enabled` | Enable ingress | `false` |
| `autoscaling.enabled` | Enable HPA | `false` |
| `resources.limits.cpu` | CPU limit | `200m` |
| `resources.limits.memory` | Memory limit | `128Mi` |

#### Security Features

The Helm chart includes several security best practices:

- **Pod Security Context**: Runs as non-root user (UID 101)
- **Read-only Root Filesystem**: Enhanced security posture
- **Network Policies**: Optional network isolation
- **Pod Disruption Budget**: Ensures availability during updates
- **Security Headers**: Configured in nginx

#### High Availability

Enable high availability with these settings:

```yaml
replicaCount: 3

affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
            - key: app.kubernetes.io/name
              operator: In
              values:
                - documentation-site
        topologyKey: kubernetes.io/hostname

podDisruptionBudget:
  enabled: true
  minAvailable: 2

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
```

### Monitoring and Health Checks

The deployment includes:

- **Liveness Probe**: Checks `/health` endpoint every 10s
- **Readiness Probe**: Checks `/health` endpoint every 5s
- **Startup Probe**: Implicit via readiness probe

View pod status:

```bash
kubectl get pods -n docs -l app.kubernetes.io/name=documentation-site
```

Check pod health:

```bash
kubectl describe pod <pod-name> -n docs
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SITE_URL` | Production URL of the site | `https://your-domain.com` |
| `PROXY_BASE_URL` | Base path for routing | `/` |
| `NODE_ENV` | Node environment | `production` |

### Build Arguments

Build arguments are used during the Docker build process:

```bash
docker build \
  --build-arg SITE_URL=https://docs.example.com \
  --build-arg PROXY_BASE_URL=/docs/ \
  -t documentation-site:latest .
```

### Nginx Configuration

The production image uses nginx with:

- Gzip compression enabled
- Security headers configured
- Client-side routing support
- Static asset caching (1 year)
- Health check endpoint at `/health`

## Troubleshooting

### Container Won't Start

Check logs:

```bash
# Docker
docker logs documentation-site

# Docker Compose
docker-compose logs dev

# Kubernetes
kubectl logs -n docs -l app.kubernetes.io/name=documentation-site
```

### Development Hot-Reload Not Working

Ensure volumes are properly mounted:

```bash
docker-compose down
docker-compose up dev
```

### Build Failures

Clear Docker cache and rebuild:

```bash
docker build --no-cache -t documentation-site:latest .
```

### Kubernetes Pod Errors

Check pod events:

```bash
kubectl describe pod <pod-name> -n docs
```

Check if image pull is failing:

```bash
kubectl get events -n docs --sort-by='.lastTimestamp'
```

### Ingress Not Working

Verify ingress controller is installed:

```bash
kubectl get ingressclass
```

Check ingress resource:

```bash
kubectl describe ingress documentation-site -n docs
```

### Health Check Failures

Test health endpoint:

```bash
# Docker
curl http://localhost:8080/health

# Kubernetes (port-forward)
kubectl port-forward -n docs svc/documentation-site 8080:80
curl http://localhost:8080/health
```

## Best Practices

1. **Use specific image tags** in production, not `latest`
2. **Enable autoscaling** for production workloads
3. **Configure resource limits** to prevent resource exhaustion
4. **Use secrets** for sensitive configuration
5. **Enable ingress with TLS** for production deployments
6. **Monitor pod metrics** and set up alerts
7. **Use PodDisruptionBudgets** to ensure availability
8. **Implement backup strategies** for persistent data (if any)
9. **Test deployments** in staging before production
10. **Use CI/CD pipelines** for automated deployments

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: |
          docker build -t ${{ secrets.REGISTRY }}/documentation-site:${{ github.sha }} .

      - name: Push to registry
        run: |
          echo ${{ secrets.REGISTRY_PASSWORD }} | docker login -u ${{ secrets.REGISTRY_USERNAME }} --password-stdin
          docker push ${{ secrets.REGISTRY }}/documentation-site:${{ github.sha }}

      - name: Deploy to Kubernetes
        run: |
          helm upgrade --install documentation-site ./helm/documentation-site \
            --set image.tag=${{ github.sha }} \
            --namespace docs
```

## Additional Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Helm Documentation](https://helm.sh/docs/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
