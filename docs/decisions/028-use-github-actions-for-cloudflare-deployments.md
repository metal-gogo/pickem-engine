# 028 Use GitHub Actions For Cloudflare Deployments

- Status: accepted
- Date: 2026-05-08

## Context

The project now has working Cloudflare Workers deployments backed by separate preview and production Workers:

- `pickem-engine-preview` for preview URLs under `*.pickem-engine-preview.mgogo.workers.dev`
- `pickem-engine` for production at `futbol.quest`

The repository already uses GitHub Actions for validation, and the deployment path should keep the same trunk-based model: pull requests prove and expose preview changes, while `main` remains the deployable production source of truth.

## Decision

Use GitHub Actions as the CI/CD orchestrator for Cloudflare deployments, with validation, preview deployment, and production deployment split into separate workflows.

Pull requests to `main` run the validation workflow first. When validation succeeds, the preview deployment workflow uploads a Cloudflare Worker version to the preview Worker with `wrangler versions upload --config wrangler.preview.jsonc` and assigns a stable preview alias of `pr-<number>`.

Pushes to `main` run the validation workflow first. When validation succeeds, the production deployment workflow runs production Prisma migrations with `prisma migrate deploy`, then deploys the production Worker with React Router's generated Worker config and `wrangler deploy`.

Preview deployments do not run Prisma migrations. Local development and Cloudflare previews continue to share the long-lived Neon `dev` branch.

## Reasoning

Keeping validation and deployment in GitHub Actions gives one visible CI/CD system for pull requests and merges. Splitting preview and production deployments keeps each workflow small, makes manual deploy buttons target-specific, and keeps branch protection focused on confidence checks. Wrangler remains the deployment mechanism, so the project still uses Cloudflare-native Worker versioning, preview aliases, secrets, and production deployments without requiring Cloudflare Workers Builds to own the repository integration.

Using `wrangler versions upload` for pull requests avoids shifting production traffic and creates inspectable preview URLs. Using `wrangler deploy` on `main` keeps production simple and immediate after the protected validation and environment gate.

## Consequences

- GitHub repository or environment secrets must include `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`.
- The `production` GitHub Environment must include `NEON_PROD_DATABASE_URL` and `NEON_PROD_DIRECT_URL` for production migrations.
- Cloudflare Worker secrets remain the source for runtime `DATABASE_URL` values in preview and production.
- The `production` GitHub Environment can require approval before migrations and production deployment if a manual release gate is desired.
- Pull-request previews from forked repositories are skipped because deployment secrets are intentionally not exposed to untrusted forks.
