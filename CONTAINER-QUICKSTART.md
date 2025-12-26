# Container Quick Start Guide

Get your documentation site running in containers in minutes!

## 🚀 Quick Start Options

### Option 1: Docker Compose (Easiest)

**Development Mode:**

```bash
docker-compose up dev
```

Visit http://localhost:3000 - Changes auto-reload!

**Production Mode:**

```bash
docker-compose up prod
```

Visit http://localhost:8080 - Optimized nginx server

### Option 2: Makefile Commands

```bash
# Build and run production
make build-prod
make run-prod

# Build and run development
make build-dev
make run-dev

# Test the image
make test

# View all commands
make help
```

### Option 3: Docker CLI

**Development:**

```bash
docker build --target development -t docs:dev .
docker run -p 3000:3000 -v $(pwd)/docs:/app/docs docs:dev
```

**Production:**

```bash
docker build --target production -t docs:prod .
docker run -p 8080:80 docs:prod
```

## 🎯 GitHub Actions (Automatic Builds)

When you push code to GitHub, images are automatically built and pushed!

### Setup Steps

1. **Enable GitHub Packages**
   - Images automatically push to GitHub Container Registry (GHCR)
   - No additional setup needed!

2. **Configure Repository**
   - Go to Settings → Actions → General
   - Enable "Read and write permissions"

3. **Push Code**

   ```bash
   git push origin main
   ```

   Images automatically build and push to `ghcr.io/YOUR-USERNAME/documentation-site`

4. **Create Releases**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
   Creates versioned images: `v1.0.0`, `v1.0`, `v1`, `latest`

### Pull Built Images

```bash
# Login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR-USERNAME --password-stdin

# Pull latest
docker pull ghcr.io/YOUR-USERNAME/documentation-site:latest

# Run it
docker run -p 8080:80 ghcr.io/YOUR-USERNAME/documentation-site:latest
```

## ☸️ Kubernetes Quick Deploy

### Using Helm

```bash
# Install
helm install docs ./helm/documentation-site \
  --set image.repository=ghcr.io/YOUR-USERNAME/documentation-site \
  --set image.tag=latest \
  --namespace docs \
  --create-namespace

# Check status
kubectl get pods -n docs

# Access via port-forward
kubectl port-forward -n docs svc/docs-documentation-site 8080:80
```

Visit http://localhost:8080

### Production Deployment

```bash
# Edit values
cp helm/documentation-site/values-prod.yaml my-values.yaml
# Update your-domain.com in my-values.yaml

# Deploy
helm install docs ./helm/documentation-site \
  -f my-values.yaml \
  --namespace docs \
  --create-namespace
```

## 🔧 Common Tasks

### Update Content

**Docker Compose (auto-reloads):**

```bash
# Edit files in docs/, changes appear immediately
docker-compose up dev
```

### Rebuild After Changes

```bash
# Stop current containers
docker-compose down

# Rebuild and restart
docker-compose up --build prod
```

### Push to Your Registry

```bash
# Set variables
export REGISTRY=ghcr.io
export USERNAME=your-username

# Build and tag
docker build -t $REGISTRY/$USERNAME/documentation-site:v1.0.0 .

# Push
docker push $REGISTRY/$USERNAME/documentation-site:v1.0.0
```

### View Logs

```bash
# Docker Compose
docker-compose logs -f dev

# Docker
docker logs -f docs-prod

# Kubernetes
kubectl logs -n docs -l app.kubernetes.io/name=documentation-site
```

### Clean Up

```bash
# Docker Compose
docker-compose down -v

# Docker (remove everything)
make clean

# Kubernetes
helm uninstall docs -n docs
```

## 📊 Health Checks

All containers include health checks at `/health`:

```bash
# Test health endpoint
curl http://localhost:8080/health

# Should return: healthy
```

## 🔒 Security

Images include:

- ✅ Non-root user (nginx user, UID 101)
- ✅ Read-only root filesystem
- ✅ Security headers (X-Frame-Options, etc.)
- ✅ Automated vulnerability scanning
- ✅ Minimal attack surface (alpine-based)

## 📚 Full Documentation

- [DOCKER.md](DOCKER.md) - Complete Docker/Kubernetes guide
- [CI-CD.md](CI-CD.md) - CI/CD setup and configuration
- [README.md](README.md) - Main project documentation

## 🆘 Troubleshooting

**Container won't start:**

```bash
docker logs docs-prod
```

**Port already in use:**

```bash
# Use different port
docker run -p 9090:80 docs:prod
```

**Build fails:**

```bash
# Clear cache and rebuild
docker build --no-cache -t docs:prod .
```

**Health check failing:**

```bash
# Check if nginx is running
docker exec -it docs-prod ps aux

# Check nginx logs
docker exec -it docs-prod cat /var/log/nginx/error.log
```

## 💡 Tips

1. **Development**: Always use `docker-compose up dev` for hot-reload
2. **Production**: Use specific version tags, not `latest`
3. **CI/CD**: Let GitHub Actions build images automatically
4. **Kubernetes**: Use Helm for easier management
5. **Testing**: Run `make test` before deploying

## 🎉 That's It!

You now have a fully containerized documentation site with:

- Docker development and production environments
- Automated CI/CD pipelines
- Kubernetes deployment ready
- Security scanning
- Multi-platform support

Happy documenting! 🚀
