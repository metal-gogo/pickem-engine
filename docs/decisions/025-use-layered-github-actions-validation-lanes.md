# 025 Use Layered GitHub Actions Validation Lanes

- Status: accepted
- Date: 2026-04-25

## Context

The project has chosen a trunk-based solo development workflow with GitHub Actions as the expected CI/CD runner. The next step is to define what CI/CD should actually validate before pull requests merge and before deployments happen.

The validation process should be strong enough to keep `main` deployable, but still free-tier-friendly and lightweight for a solo project.

## Decision

Use layered GitHub Actions validation lanes.

The default pull-request validation lane should run:

- dependency install with the pinned package manager and frozen lockfile
- dependency security audit for high-or-higher advisories
- format check
- lint
- type generation and typecheck
- unit and focused integration tests
- production build

As the backend setup is introduced, add required lanes for:

- Prisma schema validation and client generation
- Prisma migration validation suitable for the shared development database strategy
- Cloudflare runtime tests through the Cloudflare Vitest/Miniflare path
- focused Playwright end-to-end smoke tests

As the UI test setup matures, run Storybook-oriented validation in CI:

- Storybook build
- story-driven component interaction and accessibility checks
- browser/component tests through Vitest Browser Mode and the Playwright provider

Deployment workflows should be separate from basic validation:

- pull requests run validation and may later create preview deployments
- merges to `main` run validation before production deployment
- deployment workflows run a production dependency security audit for high-or-higher advisories before releasing
- production deploys should remain explicit and controlled
- production database migrations should have a deliberate approval path

Keep the CI setup cost-aware:

- use standard Linux GitHub-hosted runners by default
- avoid macOS, Windows, and larger runners unless a specific need appears
- avoid running expensive browser or database jobs more often than their risk justifies
- use GitHub concurrency controls so superseded branch pushes cancel older runs

## Reasoning

The project already chose strict TypeScript, Oxc linting/formatting, Vitest, Storybook, Playwright, Prisma, Neon, and Cloudflare. CI should reflect those choices as separate checks rather than hiding everything behind a single build command.

The staged approach lets the project start with fast checks and add heavier runtime, database, Storybook, and end-to-end lanes when the relevant infrastructure exists. That keeps the process practical while still preserving a clear path to production confidence.

Separating validation from deployment keeps production releases more deliberate, especially once database migrations and secrets are involved.

## Consequences

- Add GitHub Actions workflows only when the project moves into setup work.
- Make the fast PR lane required before merging to `main`.
- Gate CI/CD on high-or-higher dependency advisories while keeping full and production audit scripts available for local investigation.
- Keep typecheck separate from linting and tests.
- Keep deployment workflows separate from pull-request validation.
- Use GitHub Environments for production secrets.
- Add Neon pull-request branches later only if shared `dev` blocks specific risky migration rehearsal or concurrent branch review.
- Revisit which lanes are required if CI runtime becomes noisy or expensive.

## Accounts And Configuration

- Use the GitHub repository's Actions settings for CI/CD.
- Use `GITHUB_TOKEN` for repository-scoped automation where sufficient.
- Store `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` for deployment workflows.
- Store `NEON_API_KEY` and `NEON_PROJECT_ID` only if pull-request database branch automation is introduced later.
- Store environment-specific `DATABASE_URL` and `DIRECT_URL` values for migration and database integration lanes.
- Store `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` for release/source-map lanes.
- Store WorkOS secrets only in workflows or environments that truly need auth integration testing or deployment.
- Keep fast pull-request validation independent of production secrets whenever possible.
