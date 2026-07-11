# Default recipe
default:
    @just --list

# Install dependencies
install:
    mkdir -p .cache/bun/install .cache/bun/tmp
    BUN_INSTALL_CACHE_DIR=.cache/bun/install TMPDIR=.cache/bun/tmp bun install --frozen-lockfile

# Run development server
dev *args:
    bun run dev {{args}}

# Build for production
build:
    bun run build

# Preview production build
preview *args:
    bun run preview {{args}}

# Build Docker image locally
docker-build tag="latest":
    docker build -t ghcr.io/stianfro/froystein.jp:{{tag}} .

# Run Docker container locally
docker-run tag="latest":
    docker run --rm -p 8080:80 ghcr.io/stianfro/froystein.jp:{{tag}}

# Build and run locally
docker-dev: docker-build docker-run

# Render Kustomize manifests (for testing)
kustomize-build:
    kustomize build infra/prod

# Lint source and YAML without depending on the active Kubernetes context
lint:
    bun run lint
    @for file in $(git ls-files '*.yaml' '*.yml'); do yq eval '.' "$file" >/dev/null; done
    @for environment in dev prod; do kustomize build "infra/$environment" | yq eval '.' >/dev/null; done

# Run focused build-output tests
test: build
    bun run test

# Run all checks before commit
check: lint test
    @echo "All checks passed!"
