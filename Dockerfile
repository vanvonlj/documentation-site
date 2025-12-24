# Multi-stage Dockerfile for Docusaurus documentation site

# Stage 1: Base dependencies
FROM node:20-alpine AS base
WORKDIR /app
# Install dependencies for production builds
RUN apk add --no-cache libc6-compat

# Stage 2: Install dependencies
FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production && \
    cp -R node_modules /tmp/node_modules_prod && \
    npm ci

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Set build-time environment variables
ARG SITE_URL=https://your-domain.com
ARG PROXY_BASE_URL=/
ENV SITE_URL=${SITE_URL}
ENV PROXY_BASE_URL=${PROXY_BASE_URL}
ENV NODE_ENV=production

# Build the Docusaurus site
RUN npm run _build

# Stage 4: Production server with nginx
FROM nginx:alpine AS production
LABEL maintainer="your-email@example.com"
LABEL description="Docusaurus Documentation Site"

# Copy custom nginx configuration
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Copy built static files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Run nginx
CMD ["nginx", "-g", "daemon off;"]

# Stage 5: Development server
FROM base AS development
WORKDIR /app

# Copy dependencies
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Expose development server port
EXPOSE 3000

# Set environment
ENV NODE_ENV=development

# Run development server
CMD ["npm", "run", "_start", "--", "--host", "0.0.0.0"]
