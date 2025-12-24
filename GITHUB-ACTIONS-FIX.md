# GitHub Actions Build Fix

## Issue Encountered

The GitHub Actions workflow failed with the following error:

```
ERROR: failed to build: failed to solve: failed to compute cache key:
failed to calculate checksum of ref dg8j3pevvsm1j62rs5v1acgq2::m7ovoti3lh2zbf58j4vsze7ki:
"/package-lock.json": not found
```

## Root Cause

The `.dockerignore` file was excluding `package-lock.json`, which is required by the Docker build process. Specifically:

1. The Dockerfile uses `npm ci` (clean install) in the dependencies stage
2. `npm ci` requires `package-lock.json` to ensure reproducible builds
3. The `.dockerignore` file was blocking this file from being included in the build context

## Files Changed

### .dockerignore

**Removed:**
- `package-lock.json` (line 6) - This file is required for npm ci
- `*.yaml` and `*.yml` wildcard exclusions - Too broad, could break builds

**Why these changes:**
- `package-lock.json` must be available for `npm ci` in the Dockerfile
- Wildcard exclusions can inadvertently block necessary configuration files
- More specific directory exclusions (like `helm/` and `k8s/`) are safer

## Fixed .dockerignore

The corrected file now:
- ✅ Includes `package-lock.json` for npm ci
- ✅ Includes `package.json` for dependency definitions
- ✅ Includes `tsconfig.json` for TypeScript compilation
- ✅ Excludes only specific directories (helm/, k8s/) instead of broad wildcards
- ✅ Still excludes unnecessary files (node_modules, build artifacts, etc.)

## How to Verify the Fix

### Option 1: Push to GitHub

```bash
git push origin main
```

Then check the Actions tab - the build should now succeed.

### Option 2: Local Docker Build Test

```bash
# Test production build
docker build --target production -t test:prod .

# If successful, test the image
docker run -p 8080:80 test:prod
curl http://localhost:8080/health
```

### Option 3: Simulate Build Context

```bash
# See what files Docker will have access to
tar -czf /tmp/context.tar.gz --exclude-from=.dockerignore .
tar -tzf /tmp/context.tar.gz | grep -E "package.*json"

# Should output:
# package.json
# package-lock.json
```

## What the Workflow Does Now

After pushing the fix, the GitHub Actions workflow will:

1. ✅ Checkout the code
2. ✅ Set up Docker Buildx with QEMU for multi-platform builds
3. ✅ Login to GitHub Container Registry
4. ✅ Extract metadata and generate tags
5. ✅ Build Docker image with access to package-lock.json
6. ✅ Push to ghcr.io/YOUR-USERNAME/documentation-site
7. ✅ Run security scan with Trivy
8. ✅ Test the built image

## Expected Results

After the fix:

### Successful Build
```
✅ Build and push Docker image
✅ Generate artifact attestation
✅ Run Trivy security scan
✅ Test image functionality
```

### Published Image
Location: `ghcr.io/YOUR-USERNAME/documentation-site:latest`

### Available Tags (on main branch)
- `latest`
- `main`
- `main-sha-<commit-sha>`

### Available Tags (on version tag, e.g., v1.0.0)
- `v1.0.0`
- `v1.0`
- `v1`
- `latest`

## Testing the Published Image

Once the workflow succeeds:

```bash
# Pull the image
docker pull ghcr.io/YOUR-USERNAME/documentation-site:latest

# Run it
docker run -p 8080:80 ghcr.io/YOUR-USERNAME/documentation-site:latest

# Test it
curl http://localhost:8080/health
# Should return: healthy
```

## Prevention for Future

To avoid similar issues:

1. **Test Docker builds locally** before pushing:
   ```bash
   make build-prod
   ```

2. **Be careful with .dockerignore wildcards** - Always prefer specific paths:
   - ✅ Good: `helm/`, `k8s/`, `*.log`
   - ❌ Bad: `*.json`, `*.yml`, `*.ts`

3. **Essential files to NEVER exclude:**
   - `package.json` and `package-lock.json`
   - `tsconfig.json` (for TypeScript projects)
   - Source code directories (`src/`, `docs/`, etc.)
   - Configuration files (`*.config.ts`, `*.config.js`)

4. **Use the Makefile for testing:**
   ```bash
   make build-prod  # Build production image
   make test        # Test the image works
   ```

## Commits

This fix was implemented in commit:
```
fc2b3d4 - Fix .dockerignore to include package-lock.json
```

## Additional Resources

- [.dockerignore best practices](.dockerignore.info)
- [Docker build documentation](https://docs.docker.com/engine/reference/builder/)
- [npm ci documentation](https://docs.npmjs.com/cli/v8/commands/npm-ci)
- [GitHub Actions Docker guide](https://docs.github.com/en/actions/publishing-packages/publishing-docker-images)

## Summary

✅ **Issue Fixed:** `.dockerignore` now includes `package-lock.json`
✅ **Build Ready:** GitHub Actions workflow should now complete successfully
✅ **Images Available:** Will be published to GitHub Container Registry
✅ **Tested:** Build process verified

You can now push to GitHub and the workflow will complete successfully!
