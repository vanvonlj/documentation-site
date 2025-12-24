# Troubleshooting GitHub Actions Build Errors

## How to Find the Error

1. **Go to GitHub Actions Tab**
   - Navigate to your repository
   - Click **Actions** tab
   - Click on the failed workflow run
   - Click on the **build-and-push** job
   - Expand the **"Build and push Docker image"** step

2. **Look for Red X or Error Messages**
   - Scroll through the build output
   - Look for lines starting with `ERROR:`
   - Look for `failed to solve`
   - Look for exit codes like `exit code: 1`

## Common Errors and Fixes

### Error 1: npm ci Failed

**Error message:**
```
npm error code ENOLOCK
npm error npm ci can only install packages with an existing package-lock.json
```

**Fix:** Already fixed in commit fc2b3d4 - package-lock.json is now included

---

### Error 2: TypeScript Compilation Failed

**Error message:**
```
ERROR in src/...
TS2307: Cannot find module '...'
```

**Fix:**
Check if all TypeScript files are valid:
```bash
npx tsc --noEmit
```

---

### Error 3: Docusaurus Build Failed

**Error message:**
```
[ERROR] Unable to build website for locale en
```

**Common causes:**
- Broken MDX files
- Missing imports
- Invalid frontmatter

**Fix:**
```bash
# Test locally
npm run build
```

---

### Error 4: Out of Memory

**Error message:**
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Fix:** Add to Dockerfile before `npm run _build`:
```dockerfile
ENV NODE_OPTIONS="--max-old-space-size=4096"
```

---

### Error 5: File Not Found During COPY

**Error message:**
```
failed to compute cache key: "/path/to/file": not found
```

**Fix:** Check `.dockerignore` - make sure required files aren't excluded

---

## Debugging Steps

### Step 1: Check What GitHub Sees

The error logs will show exactly what failed. Copy the error message and I can help diagnose it.

### Step 2: Test Locally with Docker

If Docker is available locally:

```bash
# Build the same way GitHub does
docker build --target production -t test:latest .

# If it fails, you'll see the error locally
```

### Step 3: Check File Availability

Ensure critical files exist and aren't in `.dockerignore`:

```bash
# Check these files exist
ls -la package.json package-lock.json tsconfig.json docusaurus.config.ts

# Check what Docker will copy (simulate build context)
tar -czf /tmp/context.tar.gz --exclude-from=.dockerignore .
tar -tzf /tmp/context.tar.gz | grep -E "package|tsconfig|docusaurus"
```

### Step 4: Validate Configuration Files

```bash
# Check package.json is valid JSON
cat package.json | jq .

# Check TypeScript config
npx tsc --noEmit

# Test Docusaurus build
npm run build
```

## Getting the Error Details

### Option 1: From GitHub UI

1. Go to failed workflow
2. Click on failed job
3. Click on failed step
4. Copy the error section (usually near the bottom)
5. Look for:
   ```
   ERROR [stage-name X/Y] RUN npm ...
   ```

### Option 2: Download Logs

1. On the workflow run page
2. Click ⋮ (three dots) in top right
3. Select "Download log archive"
4. Extract and search for "ERROR"

## Share the Error

Once you find the error, share:
1. The full error message
2. Which step failed (npm ci, npm build, etc.)
3. Any error codes

Format:
```
Step: [Step name]
Error: [Error message]
Exit code: [Code if shown]
```

## Quick Checks

Before we dig deeper, verify:

- [ ] Commit fc2b3d4 (dockerignore fix) was pushed
- [ ] Commit 982d45d (AMD64-only) was pushed
- [ ] The workflow is running the latest code
- [ ] Repository has "Read and write permissions" enabled

## Most Likely Issues (Given Recent Changes)

### 1. Old Commit Being Built

**Check:** Does the workflow show commit `81f5b53` or later?

If it's building an older commit, the package-lock.json fix won't be applied.

**Fix:** Ensure you pushed all commits:
```bash
git log --oneline -5
git push origin main
```

### 2. npm Dependency Issue

**Symptoms:** Build fails during `npm ci` or `npm run build`

**Fix:** Test locally:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 3. Docusaurus Content Error

**Symptoms:** Build fails with MDX or content errors

**Fix:** Check for broken links or invalid MDX:
```bash
npm run build 2>&1 | grep ERROR
```

## Next Steps

1. **Find the exact error** from GitHub Actions logs
2. **Share the error message** (just the error section)
3. **Check which commit** is being built
4. **Verify the step** that failed

Then I can provide a specific fix!

## Workflow Structure

For reference, here's what should happen:

```
1. Checkout code          ✓ (This worked based on your logs)
2. Setup QEMU            ✓ (This worked)
3. Setup Buildx          ✓ (This worked)
4. Login to registry     ✓ (This worked - "Login Succeeded!")
5. Extract metadata      ✓ (This worked - tags generated)
6. Build and push        ❌ (This is where it likely failed)
   ├─ Base stage         (Installing system dependencies)
   ├─ Dependencies stage (npm ci - WATCH THIS)
   ├─ Builder stage      (npm run build - WATCH THIS)
   └─ Production stage   (nginx setup)
7. Attestation           (Skipped if build fails)
8. Security scan         (Skipped if build fails)
9. Test image            (Skipped if build fails)
```

## What to Look For in Logs

Search for these patterns in the GitHub Actions logs:

```
ERROR
failed to solve
exit code
npm ERR!
ERROR in
[ERROR]
✘ [ERROR]
```

Any of these indicate where the problem is.
