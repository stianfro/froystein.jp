#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 3 ]]; then
  echo "usage: $0 OUTPUT_DIRECTORY VERSION DIGEST" >&2
  exit 2
fi

output_directory=$1
version=${2#v}
digest=$3

if [[ ! $version =~ ^[0-9]+\.[0-9]+\.[0-9]+([+-][0-9A-Za-z.-]+)?$ ]]; then
  echo "invalid semantic version: $version" >&2
  exit 2
fi

if [[ ! $digest =~ ^sha256:[0-9a-f]{64}$ ]]; then
  echo "invalid image digest: $digest" >&2
  exit 2
fi

for command in kustomize yq; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "required command not found: $command" >&2
    exit 2
  fi
done

repository_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
temporary_directory=$(mktemp -d "${TMPDIR:-/tmp}/froystein-production.XXXXXX")
trap 'rm -rf "$temporary_directory"' EXIT

cp -R "$repository_root/infra/prod" "$temporary_directory/prod"

VERSION=$version DIGEST=$digest yq --inplace '
  (.images[] | select(.name == "ghcr.io/stianfro/froystein.jp").newTag) = strenv(VERSION) |
  (.images[] | select(.name == "ghcr.io/stianfro/froystein.jp").digest) = strenv(DIGEST)
' "$temporary_directory/prod/kustomization.yaml"

yq eval-all 'true' "$temporary_directory/prod"/*.yaml >/dev/null
kustomize build "$temporary_directory/prod" > "$temporary_directory/manifests.yaml"
yq eval-all 'true' "$temporary_directory/manifests.yaml" >/dev/null

expected_image="ghcr.io/stianfro/froystein.jp:${version}@${digest}"
deployed_image=$(yq eval-all '
  select(.kind == "Deployment" and .metadata.name == "froystein-jp") |
  .spec.template.spec.containers[] |
  select(.name == "web") |
  .image
' "$temporary_directory/manifests.yaml")

if [[ $deployed_image != "$expected_image" ]]; then
  echo "rendered image does not match the release" >&2
  echo "expected: $expected_image" >&2
  echo "actual:   $deployed_image" >&2
  exit 1
fi

if grep -Fq 'app.kubernetes.io/managed-by: kargo' "$temporary_directory/manifests.yaml"; then
  echo "rendered manifests still contain obsolete Kargo ownership" >&2
  exit 1
fi

mkdir -p "$output_directory"
cp "$temporary_directory/manifests.yaml" "$output_directory/manifests.yaml"
cp "$repository_root/infra/environment-kustomization.yaml" "$output_directory/kustomization.yaml"

yq eval-all 'true' \
  "$output_directory/manifests.yaml" \
  "$output_directory/kustomization.yaml" >/dev/null
kustomize build "$output_directory" >/dev/null

echo "Prepared production ${version} at ${digest}"
