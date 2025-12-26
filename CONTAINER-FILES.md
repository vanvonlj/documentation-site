# Container Support Files Overview

This document provides an overview of all container-related files added to the project.

## 📁 File Structure

```
documentation-site/
├── 🐳 Container Core Files
│   ├── Dockerfile                       # Multi-stage build for dev & prod
│   ├── .dockerignore                    # Optimizes build context
│   ├── docker-compose.yml               # Dev & prod orchestration
│   └── .env.example                     # Environment configuration template
│
├── ⚙️ Build & Deployment Tools
│   └── Makefile                         # Convenient build/deploy commands
│
├── 📚 Documentation
│   ├── DOCKER.md                        # Complete Docker/K8s guide
│   ├── CI-CD.md                         # GitHub Actions setup guide
│   ├── CONTAINER-QUICKSTART.md          # Quick start guide
│   └── CONTAINER-FILES.md               # This file
│
├── 🚀 GitHub Actions Workflows
│   └── .github/workflows/
│       ├── docker-build-push.yml        # Build & push Docker images
│       ├── helm-release.yml             # Package & release Helm charts
│       └── README.md                    # Workflows documentation
│
└── ☸️ Helm Chart (Kubernetes)
    └── helm/documentation-site/
        ├── Chart.yaml                   # Chart metadata
        ├── values.yaml                  # Default configuration
        ├── values-dev.yaml              # Development environment
        ├── values-prod.yaml             # Production environment
        ├── .helmignore                  # Helm ignore patterns
        └── templates/
            ├── _helpers.tpl             # Template helpers
            ├── configmap.yaml           # Configuration data
            ├── deployment.yaml          # Kubernetes deployment
            ├── service.yaml             # Kubernetes service
            ├── ingress.yaml             # Ingress configuration
            ├── serviceaccount.yaml      # Service account
            ├── hpa.yaml                 # Horizontal Pod Autoscaler
            ├── pdb.yaml                 # Pod Disruption Budget
            ├── networkpolicy.yaml       # Network policies
            └── NOTES.txt                # Post-install notes
```

## 📋 File Descriptions

### Container Core Files

#### Dockerfile

Multi-stage Dockerfile with:

- **Development stage**: Hot-reload Node.js server on port 3000
- **Production stage**: Optimized nginx server on port 80
- Multi-platform support (AMD64/ARM64)
- Security best practices (non-root user, read-only filesystem)
- Health checks and nginx optimizations

#### .dockerignore

Optimizes build context by excluding:

- node_modules, build artifacts
- Git files, documentation
- IDE configuration
- Test files

#### docker-compose.yml

Defines two services:

- **dev**: Development with volume mounts for hot-reload
- **prod**: Production nginx server
- Health checks and networking configured

#### .env.example

Template for environment variables:

- SITE_URL, PROXY_BASE_URL
- Registry credentials
- Kubernetes configuration

### Build & Deployment Tools

#### Makefile

Convenient commands for:

- Building images (`make build-prod`)
- Running containers (`make run-dev`)
- Testing (`make test`)
- Helm operations (`make helm-install`)
- Registry operations (`make docker-push`)

### Documentation Files

#### DOCKER.md (Comprehensive Guide)

Complete documentation covering:

- Docker build and run instructions
- Docker Compose usage
- Kubernetes deployment with Helm
- Configuration options
- Troubleshooting guide
- CI/CD integration examples

#### CI-CD.md (GitHub Actions Guide)

Detailed CI/CD setup guide:

- Workflow descriptions
- Setup instructions
- Configuration options
- Usage examples
- Advanced configurations
- Troubleshooting

#### CONTAINER-QUICKSTART.md (Quick Start)

Fast-track guide with:

- Quick start commands
- Common tasks
- Minimal explanations
- Copy-paste ready commands

### GitHub Actions Workflows

#### .github/workflows/docker-build-push.yml

Automated Docker image builds:

- **Triggers**: Push, PR, tags, manual
- **Features**:
  - Multi-platform builds (AMD64 + ARM64)
  - Automatic versioning from Git tags
  - Security scanning with Trivy
  - Image testing
  - Push to GitHub Container Registry
  - Build attestation

#### .github/workflows/helm-release.yml

Helm chart releases:

- **Triggers**: Version tags, helm changes, manual
- **Features**:
  - Chart linting and packaging
  - OCI registry push
  - GitHub releases
  - Integration testing with Kind

### Helm Chart Files

#### Chart.yaml

Chart metadata:

- Name, version, description
- Maintainer information
- Keywords and sources

#### values.yaml (Default)

Default configuration:

- Image repository and tag
- Resource limits
- Replica count
- Service configuration
- Ingress settings
- Security contexts

#### values-dev.yaml

Development overrides:

- Single replica
- Reduced resources
- No ingress
- Latest tag with Always pull policy

#### values-prod.yaml

Production configuration:

- Multiple replicas (3)
- Autoscaling enabled
- Ingress with TLS
- Network policies
- Pod disruption budget
- Anti-affinity rules

#### templates/deployment.yaml

Kubernetes Deployment:

- Pod specification
- Container configuration
- Volume mounts
- Health probes
- Resource limits
- Security contexts

#### templates/service.yaml

Kubernetes Service:

- ClusterIP service
- Port configuration
- Label selectors

#### templates/ingress.yaml

Ingress resource:

- Host configuration
- TLS settings
- Path routing
- Annotations

#### templates/hpa.yaml

Horizontal Pod Autoscaler:

- CPU/memory based scaling
- Min/max replicas
- Target utilization

#### templates/pdb.yaml

Pod Disruption Budget:

- Ensures availability during updates
- Minimum available pods

#### templates/networkpolicy.yaml

Network policies:

- Ingress rules
- Namespace selectors

## 🎯 Quick Reference

### Common Commands

```bash
# Docker
docker build -t docs:prod .
docker run -p 8080:80 docs:prod

# Docker Compose
docker-compose up dev              # Development
docker-compose up prod             # Production

# Makefile
make build-prod                    # Build production image
make test                          # Test image
make helm-install                  # Install to Kubernetes

# GitHub Actions
git tag v1.0.0 && git push --tags  # Trigger release build

# Helm
helm install docs ./helm/documentation-site -f values-prod.yaml
```

### File Locations

| Purpose          | File                       |
| ---------------- | -------------------------- |
| Build image      | `Dockerfile`               |
| Run locally      | `docker-compose.yml`       |
| Quick commands   | `Makefile`                 |
| K8s deployment   | `helm/documentation-site/` |
| CI/CD            | `.github/workflows/`       |
| Config reference | `DOCKER.md`, `CI-CD.md`    |
| Quick start      | `CONTAINER-QUICKSTART.md`  |

## 🔄 Workflow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Development Workflow                      │
├─────────────────────────────────────────────────────────────┤
│ 1. Local Development                                         │
│    └─> docker-compose up dev (auto-reload on file changes)  │
│                                                              │
│ 2. Test Production Build                                    │
│    └─> docker-compose up prod (test locally)                │
│                                                              │
│ 3. Push to GitHub                                           │
│    └─> Triggers GitHub Actions workflow                     │
│                                                              │
│ 4. Automated Build (GitHub Actions)                         │
│    ├─> Build multi-platform Docker images                   │
│    ├─> Security scan with Trivy                            │
│    ├─> Test image functionality                            │
│    └─> Push to GitHub Container Registry                    │
│                                                              │
│ 5. Create Release                                           │
│    └─> git tag v1.0.0 && git push --tags                   │
│        ├─> Triggers versioned image builds                  │
│        └─> Packages and publishes Helm chart               │
│                                                              │
│ 6. Deploy to Kubernetes                                     │
│    └─> helm install docs oci://ghcr.io/.../charts/docs     │
└─────────────────────────────────────────────────────────────┘
```

## ✅ Features Included

- ✅ Multi-stage Docker builds (dev + prod)
- ✅ Docker Compose for local development
- ✅ Production-ready Helm charts
- ✅ GitHub Actions CI/CD pipelines
- ✅ Multi-platform support (AMD64 + ARM64)
- ✅ Security scanning (Trivy)
- ✅ Health checks and probes
- ✅ Autoscaling (HPA)
- ✅ High availability (PDB, anti-affinity)
- ✅ Network policies
- ✅ Resource limits
- ✅ Security contexts (non-root)
- ✅ TLS/Ingress support
- ✅ Build attestation
- ✅ Comprehensive documentation

## 📖 Next Steps

1. **Local Testing**: `docker-compose up dev`
2. **GitHub Setup**: Enable Actions in repository settings
3. **First Build**: Push code to trigger workflow
4. **Create Release**: Tag and push for versioned builds
5. **Deploy**: Use Helm to deploy to Kubernetes

For detailed instructions, see:

- Quick start: [CONTAINER-QUICKSTART.md](CONTAINER-QUICKSTART.md)
- Docker guide: [DOCKER.md](DOCKER.md)
- CI/CD setup: [CI-CD.md](CI-CD.md)
