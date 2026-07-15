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

# Format source files
format:
    bun run format

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

# Validate the production nginx configuration in an image
docker-check tag="latest":
    docker run --rm --entrypoint nginx ghcr.io/stianfro/froystein.jp:{{tag}} -t

# Build and run locally
docker-dev: docker-build docker-run

# Render Kustomize manifests (for testing)
kustomize-build:
    kustomize build infra/prod

# Render an immutable release into an env/prod checkout
promote-prod output_directory version digest:
    scripts/promote-production.sh "{{output_directory}}" "{{version}}" "{{digest}}"

# Verify production promotion rendering and input validation
test-promotion:
    #!/usr/bin/env bash
    set -euo pipefail
    output_directory=$(mktemp -d "${TMPDIR:-/tmp}/froystein-promotion-test.XXXXXX")
    trap 'rm -rf "$output_directory"' EXIT
    digest=sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
    just promote-prod "$output_directory" v9.8.7 "$digest"
    test "$(yq eval-all 'select(.kind == "Deployment") | .spec.template.spec.containers[] | select(.name == "web") | .image' "$output_directory/manifests.yaml")" = "ghcr.io/stianfro/froystein.jp:9.8.7@$digest"
    test "$(yq '.resources[0]' "$output_directory/kustomization.yaml")" = "manifests.yaml"
    if just promote-prod "$output_directory" invalid "$digest"; then
      echo "invalid version was accepted" >&2
      exit 1
    fi

# Lint source and YAML without depending on the active Kubernetes context
lint:
    bun run lint
    @for file in $(git ls-files '*.yaml' '*.yml'); do yq eval '.' "$file" >/dev/null; done
    @for environment in dev prod; do kustomize build "infra/$environment" | yq eval '.' >/dev/null; done

# Run focused build-output tests
test: build
    bun run test

# Run all checks before commit
check: lint test test-promotion
    @echo "All checks passed!"
