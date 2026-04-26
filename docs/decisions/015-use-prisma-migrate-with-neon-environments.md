# 015 Use Prisma Migrate With Neon Environments

- Status: accepted
- Date: 2026-04-25

## Context

The project needs separate dev and production database environments, environment-specific configuration, a migration path, GitHub Actions integration, and ideally the ability to create or manage database environments from CI.

Neon supports branch-based database workflows, while Prisma provides the migration workflow for the application schema.

## Decision

Use Prisma Migrate for schema migrations and Neon projects/branches for database environments.

The intended shape is:

- production Neon project with a protected production branch
- non-production Neon project with long-lived `staging` and `dev` branches
- short-lived pull request or migration-rehearsal branches created by automation when useful

Use:

- `prisma migrate dev` to create migrations during local development
- committed `prisma/migrations/` history as the deployable schema source
- `prisma migrate deploy` in CI/CD for staging and production

## Reasoning

This keeps migration authorship in Prisma, where the project already wants its model workflow, while using Neon for safer database-environment management. Branch-based rehearsal gives the project a way to test migrations before they touch long-lived staging or production data.

The accepted tradeoff is extra CI and provider setup compared with a single shared database. That is worth it because schema changes affect real picks, scores, and leaderboard data once users exist.

## Consequences

- Environment variables must clearly separate local, dev, staging, and production database URLs.
- GitHub Actions should eventually be able to run Prisma migrations and create/delete short-lived Neon branches.
- Production migrations should use `prisma migrate deploy`, not ad hoc schema pushes.
- Local prototype persistence should remain separate until backend setup work explicitly begins.

## Accounts And Configuration

- Use the Neon account and projects from decision `014`.
- For Neon branch automation, create or install credentials that provide:
  - `NEON_API_KEY` as a GitHub Actions secret
  - `NEON_PROJECT_ID` as a GitHub Actions variable
- For migrations, provide `DATABASE_URL` and, when using pooled runtime connections, `DIRECT_URL` to Prisma.
- With Prisma ORM 7, connection URLs live in `prisma.config.ts`, not in `schema.prisma`; the local config should use `DIRECT_URL` for CLI and migration commands when it is set, otherwise fall back to `DATABASE_URL`.
- Keep staging and production migration credentials in GitHub Environments rather than broad repository secrets when deployment workflows are introduced.
- Production migration runs should require deliberate approval before using production credentials.
