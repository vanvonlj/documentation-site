# Testing GitHub Actions Workflows

There are several ways to test the GitHub Actions workflows without needing any VS Code extensions.

## Method 1: Local Testing with Act (Recommended)

[Act](https://github.com/nektos/act) runs GitHub Actions locally using Docker.

### Install Act

```bash
# macOS
brew install act

# Linux
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Or download binary from: https://github.com/nektos/act/releases
```

### Run Workflows Locally

```bash
# List all workflows
act -l

# Run the Docker build workflow (dry run)
act push --dryrun

# Run the Docker build workflow (full run)
act push -W .github/workflows/docker-build-push.yml

# Run with specific event (pull request)
act pull_request

# Run with specific job
act -j build-and-push

# Run with secrets (if needed)
act push --secret GITHUB_TOKEN=your-token
```

### Test Specific Workflow

```bash
# Test Docker build workflow
act push -W .github/workflows/docker-build-push.yml -j build-and-push

# Test Helm release workflow
act push -W .github/workflows/helm-release.yml
```

## Method 2: Push to GitHub and Monitor

The easiest way if you have a GitHub repository set up.

### Steps

1. **Create a GitHub repository** (if not already done)
   ```bash
   # On GitHub: Create new repository named "documentation-site"
   ```

2. **Add remote and push**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/documentation-site.git
   git push -u origin main
   ```

3. **Monitor the workflow**
   - Go to your repository on GitHub
   - Click the **Actions** tab
   - You'll see the workflows running automatically
   - Click on a workflow run to see detailed logs

4. **Check results**
   - View build logs in real-time
   - Check for any errors
   - Verify images in Packages tab

### Enable Repository Permissions

Before pushing, ensure GitHub Actions has proper permissions:

1. Go to repository **Settings** → **Actions** → **General**
2. Under "Workflow permissions":
   - Select **Read and write permissions**
   - Check **Allow GitHub Actions to create and approve pull requests**
3. Click **Save**

## Method 3: Validate Workflows Locally (No Docker Required)

Use GitHub's action validator to check syntax.

### Install actionlint

```bash
# macOS
brew install actionlint

# Linux
bash <(curl https://raw.githubusercontent.com/rhysd/actionlint/main/scripts/download-actionlint.bash)

# Or download from: https://github.com/rhysd/actionlint/releases
```

### Validate Workflows

```bash
# Validate all workflows
actionlint

# Validate specific workflow
actionlint .github/workflows/docker-build-push.yml

# Verbose output
actionlint -verbose
```

## Method 4: Manual Workflow Dispatch (GitHub UI)

Once pushed to GitHub, you can manually trigger workflows.

### Steps

1. Go to repository **Actions** tab
2. Click on "Build and Push Docker Images" workflow
3. Click **Run workflow** button (top right)
4. Select branch (usually `main`)
5. Configure options (if any)
6. Click **Run workflow**

This is useful for testing without making commits.

## Method 5: Create a Test Branch

Test workflows in isolation without affecting main branch.

```bash
# Create test branch
git checkout -b test-ci-cd

# Make a small change to trigger workflow
echo "# CI/CD Test" >> TEST.md
git add TEST.md
git commit -m "Test CI/CD workflow"

# Push test branch
git push origin test-ci-cd
```

Check the Actions tab to see the workflow run on the test branch.

## Method 6: Docker Build Testing (Without GitHub Actions)

Test the Docker build process locally to catch issues early.

```bash
# Test development build
docker build --target development -t docs:dev .

# Test production build
docker build --target production -t docs:prod .

# Test multi-platform build (requires buildx)
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 -t docs:multi .

# Test with build arguments
docker build \
  --build-arg SITE_URL=https://example.com \
  --build-arg PROXY_BASE_URL=/ \
  -t docs:prod .

# Run and test the image
docker run -d --name test -p 8080:80 docs:prod
curl http://localhost:8080/health
docker stop test && docker rm test
```

## Method 7: Helm Chart Testing

Test the Helm chart before workflows run.

```bash
# Install Helm if not already installed
# macOS: brew install helm
# Linux: curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Lint the chart
helm lint helm/documentation-site

# Validate templates
helm template test-release helm/documentation-site \
  -f helm/documentation-site/values-dev.yaml

# Dry run install
helm install test-release helm/documentation-site \
  --dry-run \
  --debug \
  -f helm/documentation-site/values-dev.yaml

# Test with Kind (local Kubernetes)
kind create cluster --name test
helm install test-release helm/documentation-site \
  -f helm/documentation-site/values-dev.yaml \
  --set image.repository=nginx \
  --set image.tag=alpine
kind delete cluster --name test
```

## Recommended Testing Workflow

Here's the recommended order for testing:

### 1. Local Validation (Before Committing)

```bash
# Validate workflow syntax
actionlint

# Test Docker builds
make build-prod
make test

# Test Helm chart
helm lint helm/documentation-site
helm template test helm/documentation-site
```

### 2. Test with Act (Optional)

```bash
# If you want to test GitHub Actions locally
act push -W .github/workflows/docker-build-push.yml
```

### 3. Push to GitHub

```bash
# Push to trigger actual workflows
git push origin main
```

### 4. Monitor on GitHub

- Go to Actions tab
- Watch workflows execute
- Check for any errors
- Verify packages are created

## Troubleshooting Workflow Issues

### Check Workflow Logs

In GitHub Actions tab:
1. Click on failed workflow run
2. Click on failed job
3. Expand failed step
4. Read error messages

### Common Issues

**Permission Denied:**
- Check repository settings for workflow permissions
- Ensure "Read and write permissions" is enabled

**Image Build Fails:**
- Test Docker build locally first
- Check Dockerfile syntax
- Verify build arguments

**Helm Chart Issues:**
- Run `helm lint` locally
- Check template syntax with `helm template`
- Verify values files are valid YAML

**Secret Not Found:**
- GITHUB_TOKEN is automatic, no setup needed
- For custom secrets, add in repository Settings → Secrets

## Quick Test Checklist

Before pushing to GitHub:

- [ ] Validate workflows: `actionlint`
- [ ] Test Docker build: `make build-prod`
- [ ] Test image: `make test`
- [ ] Lint Helm chart: `helm lint helm/documentation-site`
- [ ] Verify git status: `git status`
- [ ] Push to GitHub: `git push origin main`
- [ ] Monitor Actions tab on GitHub
- [ ] Check Packages tab for images

## Next Steps After Successful Workflow

1. **Check Package Registry**
   - Go to repository Packages tab
   - Verify Docker image was published
   - Note the image URL

2. **Test Published Image**
   ```bash
   docker pull ghcr.io/YOUR-USERNAME/documentation-site:latest
   docker run -p 8080:80 ghcr.io/YOUR-USERNAME/documentation-site:latest
   ```

3. **Create a Release**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```
   This triggers versioned builds and Helm chart release.

4. **Deploy to Kubernetes**
   ```bash
   helm install docs oci://ghcr.io/YOUR-USERNAME/charts/documentation-site \
     --version 1.0.0
   ```

## Resources

- [Act Documentation](https://github.com/nektos/act)
- [actionlint Documentation](https://github.com/rhysd/actionlint)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Testing GitHub Actions Locally](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
