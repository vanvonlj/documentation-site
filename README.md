# API Documentation Site

A modern documentation site built with [Docusaurus](https://docusaurus.io/), featuring MDX support for interactive React components.

## Features

- 📝 **MDX Support** - Write React components directly in Markdown
- 🎨 **Custom Components** - Reusable components like ApiEndpoint for API docs
- 🌙 **Dark Mode** - Built-in dark mode support
- 📱 **Responsive** - Mobile-friendly design
- ⚡ **Fast** - Optimized build with code splitting
- 🔍 **Search Ready** - Compatible with Algolia DocSearch
- 🐳 **Docker & Kubernetes** - Production-ready container support with Helm charts
- 🚀 **CI/CD Ready** - GitHub Actions workflows for automated builds and deployments
- 🔒 **Security Scanned** - Automated vulnerability scanning with Trivy
- 📦 **Multi-Platform** - Docker images for AMD64 and ARM64

## Project Structure

```text
documentation-site/
├── docs/                       # Documentation content (MDX/Markdown)
│   ├── intro.md               # Landing page
│   ├── getting-started/       # Getting started guides
│   ├── api-reference/         # API documentation
│   └── guides/                # Tutorials and guides
├── src/
│   ├── components/            # Custom React components
│   │   └── ApiEndpoint/       # API endpoint display component
│   ├── css/                   # Global styles
│   └── pages/                 # Custom pages
├── static/                    # Static assets (images, files)
├── docusaurus.config.ts       # Main configuration
├── sidebars.ts               # Sidebar navigation
└── package.json              # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 20+ (installed via nvm)
- npm 10+

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

**Quick Start (Easiest):**

```bash
./dev
```

This automatically loads the correct Node.js version and starts the dev server at `http://localhost:3000`

**With Custom Port:**

```bash
./dev -- --port 3002
```

**Alternative (using npm):**

```bash
npm start              # Uses run.sh wrapper to load nvm automatically
npm start -- --port 3002  # Custom port
```

The npm scripts now automatically load Node.js 20 via the `run.sh` wrapper, so you don't need to manually source nvm!

### Building

Create a production build:

```bash
npm run build
```

The static files will be generated in the `build/` directory.

### Serve Production Build

Test the production build locally:

```bash
npm run serve
```

## Writing Documentation

### Creating a New Page

Create an MDX file in the `docs/` directory:

```mdx
---
sidebar_position: 1
title: My Page Title
---

# My Page Title

Your content here...
```

### Using Custom Components

Import and use the ApiEndpoint component in your MDX files:

```mdx
import ApiEndpoint from "@site/src/components/ApiEndpoint";

<ApiEndpoint
  method="GET"
  path="/api/v1/users"
  description="Retrieve a list of all users"
/>
```

### Code Blocks

Add syntax-highlighted code blocks:

````mdx
```javascript title="example.js"
const response = await fetch("/api/endpoint");
const data = await response.json();
```
````

### Admonitions

Use built-in admonitions:

```mdx
:::tip
This is a helpful tip!
:::

:::warning
Be careful with this!
:::

:::danger
This is dangerous!
:::
```

## Configuration

### Site Metadata

Edit `docusaurus.config.ts` to customize:

- Site title and tagline
- URL and base URL
- GitHub organization/project
- Navbar and footer
- Theme colors

### Sidebar

Edit `sidebars.ts` to customize navigation:

- Auto-generated (current setup)
- Manual sidebar structure
- Multiple sidebars

### Theme Colors

Customize in `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #2e8555;
  /* More color variables... */
}
```

## Deployment

### Docker (Recommended)

The project includes full Docker and Kubernetes support with automated CI/CD pipelines.

**Quick Start with Docker:**

```bash
# Development with hot-reload
docker-compose up dev
# Access at http://localhost:3000

# Production with nginx
docker-compose up prod
# Access at http://localhost:8080
```

**Using Makefile:**

```bash
make build-prod      # Build production image
make run-prod        # Run production container
make test            # Test the image
```

**See detailed documentation:**

- [DOCKER.md](DOCKER.md) - Docker and Kubernetes deployment guide
- [CI-CD.md](CI-CD.md) - GitHub Actions CI/CD setup

### Kubernetes with Helm

Deploy to Kubernetes cluster:

```bash
# Install with Helm
helm install documentation-site ./helm/documentation-site \
  -f helm/documentation-site/values-prod.yaml \
  --namespace docs \
  --create-namespace

# Using Makefile
make helm-install
```

### GitHub Pages

1. Update `docusaurus.config.ts` with your GitHub details
2. Set environment variable:

   ```bash
   export GIT_USER=your-username
   ```

3. Deploy:

   ```bash
   npm run deploy
   ```

### Vercel

1. Push to GitHub
2. Import repository at [vercel.com](https://vercel.com)
3. Vercel auto-detects Docusaurus
4. Click "Deploy"

### Netlify

1. Push to GitHub
2. Import at [netlify.com](https://netlify.com)
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`

## Available Scripts

```bash
npm start              # Start development server
npm run build          # Create production build
npm run serve          # Serve production build
npm run clear          # Clear cache
npm run deploy         # Deploy to GitHub Pages
```

## Adding Features

### OpenAPI/Swagger Integration

For auto-generated API docs from OpenAPI specs:

```bash
npm install docusaurus-plugin-openapi-docs docusaurus-theme-openapi-docs
```

### Search

Add Algolia DocSearch or local search plugin for search functionality.

### Versioning

Create versioned documentation:

```bash
npm run docusaurus docs:version 1.0.0
```

## Contributing

1. Create a new branch
2. Make your changes
3. Test locally with `npm start`
4. Build to verify: `npm run build`
5. Submit a pull request

## Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Docusaurus Community](https://discord.gg/docusaurus)

## License

ISC
