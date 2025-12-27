#!/bin/bash
#
# Local deployment script for testing
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Building and deploying documentation-site locally${NC}"

# Check if docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Build image
echo -e "${YELLOW}📦 Building Docker image...${NC}"
docker build -t documentation-site:local .

# Run container
echo -e "${YELLOW}🏃 Starting container...${NC}"
docker rm -f documentation-site 2>/dev/null || true
docker run -d \
    --name documentation-site \
    -p 8080:8080 \
    --health-cmd="curl -f http://localhost:8080/health || exit 1" \
    --health-interval=10s \
    --health-timeout=3s \
    --health-retries=3 \
    documentation-site:local

# Wait for health check
echo -e "${YELLOW}⏳ Waiting for health check...${NC}"
sleep 5

if docker ps | grep -q documentation-site; then
    echo -e "${GREEN}✅ Documentation site is running!${NC}"
    echo -e "${GREEN}🌐 Access at: http://localhost:8080${NC}"
    echo ""
    echo "View logs: docker logs -f documentation-site"
    echo "Stop: docker stop documentation-site"
else
    echo -e "${RED}❌ Failed to start container${NC}"
    docker logs documentation-site
    exit 1
fi
