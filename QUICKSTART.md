# Quick Start Guide

Get your documentation site running in 2 easy steps:

## 1. Start Development Server

**Easiest way:**

```bash
./dev
```

That's it! The `dev` script automatically loads Node.js 20 and starts the server.

**With custom port:**

```bash
./dev -- --port 3002
```

**Using npm (also works):**

```bash
npm start              # Auto-loads Node.js 20 via run.sh wrapper
npm start -- --port 3002  # Custom port
```

Visit `http://localhost:3000` (or your specified port)

## 2. Start Editing

- **Add docs**: Create `.md` or `.mdx` files in `docs/`
- **Edit config**: Modify `docusaurus.config.ts`
- **Customize theme**: Edit `src/css/custom.css`
- **Add components**: Create new components in `src/components/`

## Example: Create a New Doc Page

```bash
# Create new file
touch docs/my-page.mdx
```

Edit `docs/my-page.mdx`:

```mdx
---
title: My Page
sidebar_position: 4
---

# My Page

Your content here!

import ApiEndpoint from '@site/src/components/ApiEndpoint';

<ApiEndpoint
  method="GET"
  path="/api/example"
  description="Example endpoint"
/>
```

Save and see it live at `http://localhost:3000/docs/my-page`

## Building for Production

```bash
npm run build    # Creates static files in build/
npm run serve    # Test production build locally
```

## Next Steps

- Read the full [README.md](./README.md)
- Customize [docusaurus.config.ts](./docusaurus.config.ts)
- Check [Docusaurus docs](https://docusaurus.io/docs)

Happy documenting! 🚀
