# Default recipe
default:
    @just --list

# Install dependencies
install:
    npm install

# Run development server
dev:
    npm run dev

# Build for production
build:
    npm run build

# Preview production build
preview:
    npm run preview

# Build Docker image locally
docker-build tag="latest":
    docker build -t ghcr.io/stianfro/froystein-jp:{{tag}} .

# Run Docker container locally
docker-run tag="latest":
    docker run --rm -p 8080:80 ghcr.io/stianfro/froystein-jp:{{tag}}

# Build and run locally
docker-dev: docker-build docker-run

# Render Kustomize manifests (for testing)
kustomize-build:
    kustomize build infra/prod

# Lint Kubernetes manifests
lint:
    @echo "Linting Kubernetes manifests..."
    kustomize build infra/prod | kubectl apply --dry-run=client -f -
    @echo "Lint passed!"

# Run all checks before commit
check: lint build
    @echo "All checks passed!"
