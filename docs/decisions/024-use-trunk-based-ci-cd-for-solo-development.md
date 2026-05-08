# 024 Use Trunk-Based CI/CD For Solo Development

- Status: accepted
- Date: 2026-04-25

## Context

The project is currently developed by one person, but it still needs a CI/CD process that keeps `main` trustworthy, supports future GitHub Actions checks, and separates production from non-production development data.

The main tradeoff is between a heavier branch model with long-lived branches such as `develop` and a simpler trunk-based workflow with short-lived feature branches.

## Decision

Use a trunk-based development workflow.

`main` is the source of truth and should stay deployable. Development work should happen on short-lived feature/fix branches that are merged back into `main` quickly.

Do not use a long-lived `develop` branch while the project is solo-developed.

Use pull requests even when working alone when they provide value as a checkpoint for CI, preview environments, migration rehearsal, and a compact review surface.

Keep environment separation in deployment and database configuration, not in permanent git branches:

- local development uses local environment configuration
- pull requests may use preview deployments
- local development and preview deployments share the long-lived Neon `dev` branch
- production should deploy from `main` through an explicit production deployment path

## Reasoning

For a solo project, a permanent `develop` branch adds ceremony and drift without much coordination benefit. Short-lived branches still provide isolation for individual changes, but `main` remains easy to reason about.

This model works well with the Neon environment decision because the shared `dev` database represents active development and preview state while production stays isolated, without requiring matching long-lived git branches.

Using pull requests to self-review changes keeps the door open for GitHub Actions checks, preview deploys, and migration rehearsal while staying lightweight.

## Consequences

- Protect `main` with required checks once GitHub Actions is configured.
- Prefer short-lived branches for meaningful changes.
- Avoid maintaining a permanent `develop` branch.
- Configure CI to run lint, format check, typecheck, tests, and build on pull requests to `main`.
- Configure deployment workflows around environments rather than branch sprawl.
- Use GitHub Environments for production secrets and approval gates where useful.
- Add Neon preview branches later only if shared `dev` blocks specific risky migration rehearsal or concurrent branch review.
- Keep production database migrations explicit and controlled, with a manual approval path if needed.

## Accounts And Configuration

- Use the GitHub account and repository that host the project.
- GitHub Actions provides `GITHUB_TOKEN` automatically for repository-scoped automation.
- Configure GitHub Environments for production when deployment workflows are introduced.
- Store provider credentials for Cloudflare, Neon, WorkOS, Sentry, and deployment/migration jobs in GitHub repository or environment secrets as documented by their decision records.
