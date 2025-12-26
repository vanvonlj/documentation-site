# Deploy Docusaurus to GitHub Pages

Your site is now configured to deploy to GitHub Pages!

## 🎯 Your Site URL

Once deployed, your site will be available at:
**https://vanvonlj.github.io/documentation-site/**

## 🚀 Setup Steps

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository: https://github.com/vanvonlj/documentation-site
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
   - (NOT "Deploy from a branch")

### 2. Push Your Changes

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 3. Watch the Deployment

1. Go to **Actions** tab in your repository
2. You'll see "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Visit https://vanvonlj.github.io/documentation-site/

## 📋 What Was Configured

### Files Created/Modified:

1. **[.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)**
   - Automatic deployment on every push to `main`
   - Builds the site and uploads to GitHub Pages
   - Uses Node.js 20 with npm caching for speed

2. **[docusaurus.config.ts](docusaurus.config.ts)**
   - Updated `organizationName`: `vanvonlj`
   - Updated `projectName`: `documentation-site`
   - Updated `url`: `https://vanvonlj.github.io`
   - Updated `baseUrl`: `/documentation-site/`
   - Updated GitHub links

## 🔄 How It Works

Every time you push to `main`:

1. GitHub Actions triggers the workflow
2. Installs dependencies with `npm ci`
3. Builds your site with `npm run _build`
4. Uploads the `build/` folder to GitHub Pages
5. Deploys to https://vanvonlj.github.io/documentation-site/

## 🛠️ Manual Deployment (Alternative)

You can also deploy manually using Docusaurus CLI:

```bash
# Make sure you have GIT_USER env variable set
GIT_USER=vanvonlj npm run _deploy
```

This will:

- Build your site
- Push to the `gh-pages` branch
- GitHub Pages will serve from that branch

## 🧪 Testing Locally

Before deploying, test your build locally:

```bash
# Build the site
npm run _build

# Serve the built site
npm run _serve
```

Then visit: http://localhost:3000/documentation-site/

## ⚙️ Environment Variables

The workflow uses these environment variables:

- `SITE_URL`: https://vanvonlj.github.io
- `PROXY_BASE_URL`: /documentation-site/

These match your production GitHub Pages setup.

## 🐛 Troubleshooting

### Build fails in Actions

1. Check the Actions tab for error details
2. Common issues:
   - Broken links (check `onBrokenLinks: 'throw'` in config)
   - Invalid MDX syntax in docs
   - Missing dependencies

### 404 on deployed site

1. Verify `baseUrl` is `/documentation-site/` in config
2. Check that Pages is using "GitHub Actions" source
3. Wait a few minutes for DNS propagation

### Assets not loading

Check that all asset paths use relative URLs:

```jsx
// Good
<img src="/documentation-site/img/logo.svg" />;

// Better - use require or import
import logo from "@site/static/img/logo.svg";
```

## 📚 Next Steps

1. Push these changes to GitHub
2. Enable GitHub Pages in repository settings
3. Wait for first deployment
4. Visit your site!
5. Share the URL: https://vanvonlj.github.io/documentation-site/

## 🔗 Useful Links

- [Docusaurus Deployment Docs](https://docusaurus.io/docs/deployment#deploying-to-github-pages)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Your Repository](https://github.com/vanvonlj/documentation-site)
- [Your Actions](https://github.com/vanvonlj/documentation-site/actions)
