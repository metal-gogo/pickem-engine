# 015 Use Prisma Migrate With Neon Environments

- Status: accepted
- Date: 2026-04-25

## Context

The project needs separate development and production database environments, environment-specific configuration, a migration path, and GitHub Actions integration.

Neon supports branch-based database workflows, while Prisma provides the migration workflow for the application schema.

## Decision

Use Prisma Migrate for schema migrations and Neon projects/branches for database environments.

The intended shape is:

- production Neon project with a protected production branch
- non-production Neon project with a long-lived `dev` branch shared by local development and Cloudflare preview deployments

There is no staging environment in the current strategy.

Use:

- `prisma migrate dev` to create and apply migrations during local development against Neon `dev`
- committed `prisma/migrations/` history as the deployable schema source
- Cloudflare preview deployments as schema consumers only; previews do not run `prisma migrate dev`
- `prisma migrate deploy` in CI/CD for production

## Reasoning

This keeps migration authorship in Prisma, where the project already wants its model workflow, while using Neon for managed Postgres and clear production separation.

The accepted tradeoff is that local development and preview deployments share mutable non-production data. That is currently worth it because it keeps previews aligned with local development and avoids premature database-environment automation.

## Consequences

- Environment variables must clearly separate shared local/preview dev database URLs from production database URLs.
- GitHub Actions should be able to run production Prisma migrations through an explicit, controlled path.
- Production migrations should use `prisma migrate deploy`, not ad hoc schema pushes.
- Preview deployments should never run `prisma migrate dev`.
- Local prototype persistence should remain separate until backend setup work explicitly begins.

## Accounts And Configuration

- Use the Neon account and projects from decision `014`.
- If Neon branch automation is introduced later, create or install credentials that provide:
  - `NEON_API_KEY` as a GitHub Actions secret
  - `NEON_PROJECT_ID` as a GitHub Actions variable
- For migrations, provide `DATABASE_URL` and, when using pooled runtime connections, `DIRECT_URL` to Prisma.
- With Prisma ORM 7, connection URLs live in `prisma.config.ts`, not in `schema.prisma`; the local config should use `DIRECT_URL` for CLI and migration commands when it is set, otherwise fall back to `DATABASE_URL`.
- Keep production migration credentials in GitHub Environments rather than broad repository secrets when deployment workflows are introduced.
- Production migration runs should require deliberate approval before using production credentials.
