# Makefile for Documentation Site
# Provides convenient shortcuts for common Docker and Kubernetes operations

.PHONY: help build build-dev build-prod run run-dev run-prod stop clean test lint docker-push helm-install helm-upgrade helm-uninstall

# Default target
help:
	@echo "Documentation Site - Available Commands"
	@echo ""
	@echo "Docker Commands:"
	@echo "  make build          - Build all Docker images"
	@echo "  make build-dev      - Build development image"
	@echo "  make build-prod     - Build production image"
	@echo "  make run-dev        - Run development server (port 3000)"
	@echo "  make run-prod       - Run production server (port 8080)"
	@echo "  make stop           - Stop all containers"
	@echo "  make clean          - Remove containers and images"
	@echo "  make test           - Test the Docker image"
	@echo ""
	@echo "Docker Compose Commands:"
	@echo "  make up-dev         - Start dev environment with docker-compose"
	@echo "  make up-prod        - Start prod environment with docker-compose"
	@echo "  make down           - Stop docker-compose services"
	@echo "  make logs           - View docker-compose logs"
	@echo ""
	@echo "Kubernetes/Helm Commands:"
	@echo "  make helm-lint      - Lint Helm chart"
	@echo "  make helm-install   - Install Helm chart (dev)"
	@echo "  make helm-upgrade   - Upgrade Helm chart"
	@echo "  make helm-uninstall - Uninstall Helm chart"
	@echo "  make helm-test      - Test Helm chart"
	@echo ""
	@echo "Registry Commands:"
	@echo "  make docker-login   - Login to GitHub Container Registry"
	@echo "  make docker-push    - Push image to registry"
	@echo ""
	@echo "Variables:"
	@echo "  IMAGE_NAME          - Docker image name (default: documentation-site)"
	@echo "  IMAGE_TAG           - Docker image tag (default: latest)"
	@echo "  REGISTRY            - Container registry (default: ghcr.io)"
	@echo "  SITE_URL            - Site URL for build (default: https://your-domain.com)"
	@echo "  PROXY_BASE_URL      - Base URL path (default: /)"

# Variables
IMAGE_NAME ?= documentation-site
IMAGE_TAG ?= latest
REGISTRY ?= ghcr.io
GITHUB_USER ?= $(shell git config user.name | tr '[:upper:]' '[:lower:]')
FULL_IMAGE_NAME = $(REGISTRY)/$(GITHUB_USER)/$(IMAGE_NAME):$(IMAGE_TAG)
SITE_URL ?= https://your-domain.com
PROXY_BASE_URL ?= /

# Docker build commands
build: build-dev build-prod

build-dev:
	@echo "Building development image..."
	docker build --target development -t $(IMAGE_NAME):dev .

build-prod:
	@echo "Building production image..."
	docker build \
		--target production \
		--build-arg SITE_URL=$(SITE_URL) \
		--build-arg PROXY_BASE_URL=$(PROXY_BASE_URL) \
		-t $(IMAGE_NAME):$(IMAGE_TAG) .

# Docker run commands
run-dev:
	@echo "Starting development server on http://localhost:3000"
	docker run -d \
		--name $(IMAGE_NAME)-dev \
		-p 3000:3000 \
		-v $(PWD)/docs:/app/docs \
		-v $(PWD)/docs-text-rpg:/app/docs-text-rpg \
		-v $(PWD)/docs-distiller:/app/docs-distiller \
		-v $(PWD)/docs-homelab:/app/docs-homelab \
		-v $(PWD)/src:/app/src \
		-v $(PWD)/static:/app/static \
		$(IMAGE_NAME):dev

run-prod:
	@echo "Starting production server on http://localhost:8080"
	docker run -d \
		--name $(IMAGE_NAME)-prod \
		-p 8080:80 \
		$(IMAGE_NAME):$(IMAGE_TAG)

# Docker Compose commands
up-dev:
	@echo "Starting development environment with Docker Compose..."
	docker-compose up -d dev

up-prod:
	@echo "Starting production environment with Docker Compose..."
	docker-compose up -d prod

down:
	@echo "Stopping Docker Compose services..."
	docker-compose down

logs:
	docker-compose logs -f

# Management commands
stop:
	@echo "Stopping containers..."
	-docker stop $(IMAGE_NAME)-dev $(IMAGE_NAME)-prod 2>/dev/null || true
	-docker rm $(IMAGE_NAME)-dev $(IMAGE_NAME)-prod 2>/dev/null || true

clean: stop
	@echo "Removing images..."
	-docker rmi $(IMAGE_NAME):dev $(IMAGE_NAME):$(IMAGE_TAG) 2>/dev/null || true
	@echo "Cleaning up Docker Compose..."
	docker-compose down -v --rmi all 2>/dev/null || true

# Testing
test: build-prod
	@echo "Testing Docker image..."
	@docker run -d --name test-container -p 9999:80 $(IMAGE_NAME):$(IMAGE_TAG)
	@sleep 5
	@echo "Testing health endpoint..."
	@curl -f http://localhost:9999/health || (docker stop test-container && docker rm test-container && exit 1)
	@echo "Testing main page..."
	@curl -f http://localhost:9999/ || (docker stop test-container && docker rm test-container && exit 1)
	@docker stop test-container
	@docker rm test-container
	@echo "✅ Tests passed!"

# Registry commands
docker-login:
	@echo "Logging in to $(REGISTRY)..."
	@echo "$$GITHUB_TOKEN" | docker login $(REGISTRY) -u $(GITHUB_USER) --password-stdin

docker-push: build-prod
	@echo "Tagging image as $(FULL_IMAGE_NAME)..."
	docker tag $(IMAGE_NAME):$(IMAGE_TAG) $(FULL_IMAGE_NAME)
	@echo "Pushing $(FULL_IMAGE_NAME)..."
	docker push $(FULL_IMAGE_NAME)

# Helm commands
helm-lint:
	@echo "Linting Helm chart..."
	helm lint helm/documentation-site

helm-template:
	@echo "Rendering Helm templates..."
	helm template documentation-site helm/documentation-site

helm-install: helm-lint
	@echo "Installing Helm chart..."
	helm install documentation-site helm/documentation-site \
		-f helm/documentation-site/values-dev.yaml \
		--namespace docs \
		--create-namespace

helm-upgrade:
	@echo "Upgrading Helm chart..."
	helm upgrade documentation-site helm/documentation-site \
		-f helm/documentation-site/values-dev.yaml \
		--namespace docs

helm-uninstall:
	@echo "Uninstalling Helm chart..."
	helm uninstall documentation-site --namespace docs

helm-test:
	@echo "Testing Helm installation..."
	kubectl rollout status deployment/documentation-site-documentation-site -n docs
	kubectl get pods -n docs

# Local development
dev:
	npm run start

build-local:
	npm run build

serve-local:
	npm run serve
