# Releases and production deployments

Production deployment is part of the release workflow. No manual cluster command
is required.

## Automatic flow

1. Release Please creates and merges a release pull request, then explicitly
   dispatches the release run. This avoids GitHub's suppression of workflow runs
   for merges made with `GITHUB_TOKEN`.
2. `Build and Push` publishes the versioned container image to GHCR.
3. The build returns the image digest and exact source revision to
   `Release Please`.
4. `just promote-prod` renders `infra/prod` with the version and digest.
5. GitHub Actions commits the rendered files to `env/prod`.
6. Flux watches `env/prod`, applies the new revision, and waits for healthy
   workloads.
7. GitHub Actions waits until `/version.json` reports the released version, then
   checks `/healthz` and `/international/`.

The production manifest uses both a readable version tag and an immutable
digest. `latest` is never written to `env/prod`.

Only one production promotion runs at a time. A failed public verification
reverts the promotion commit, which makes Flux restore the previous manifests.

## Local rendering

Use a temporary output directory when checking a release locally:

```bash
just promote-prod /tmp/froystein-prod v1.5.0 \
  sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
kustomize build /tmp/froystein-prod
```

The recipe validates the version and digest, renders the manifests, validates
all YAML with `yq`, checks the final Deployment image, and writes the root
`kustomization.yaml` used by Flux.

## Manual rollback

Automatic rollback handles a failed release verification. For an operator-led
rollback, revert the latest promotion commit on `env/prod` and push the revert.
Flux will apply the prior image and manifest set.

Do not change the live Deployment with `kubectl set image`. That creates drift
and Flux will replace it with the state from `env/prod`.
