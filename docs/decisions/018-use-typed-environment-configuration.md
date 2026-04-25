# 018 Use Typed Environment Configuration

- Status: accepted
- Date: 2026-04-25

## Context

The next database-backed app will need environment-specific configuration for Cloudflare, Neon Postgres, Prisma, WorkOS AuthKit, and GitHub Actions. The project needs separate local, staging, and production values without committing secrets or scattering raw environment access across the codebase.

Cloudflare supports committed non-secret variables through Wrangler configuration and sensitive values through Worker secrets. Prisma CLI workflows naturally read `DATABASE_URL` from the process environment or local `.env` files. GitHub Actions can use environment-scoped secrets for migrations, preview database setup, and deployment.

## Decision

Use a typed, centralized environment configuration approach.

Local development should use an uncommitted `.env` file. A committed `.env.example` should document required variable names when backend setup begins. Cloudflare should own deployed runtime configuration through environment-specific non-secret `vars` and secrets. GitHub Actions should use GitHub Environment secrets for CI-only operations such as migrations and deployment.

Application/server code should read configuration through a small server-side config module that validates required values with Zod and returns typed config. Raw `process.env` or Cloudflare `env` access should stay near that boundary instead of spreading through application code.

## Reasoning

This keeps the setup simple while matching the chosen stack:

- Zod gives clear fail-fast validation for missing or malformed config.
- A single local `.env` file avoids early confusion between Prisma CLI and Cloudflare local development.
- Cloudflare secrets keep deployed sensitive values out of git and out of plaintext Wrangler configuration.
- GitHub Environment secrets map cleanly to separate staging and production workflows.
- A centralized config boundary makes later provider changes easier because most code depends on typed app config, not provider-specific environment access.

## Consequences

- Do not commit real secret values.
- Do not expose server-only secrets through public/client-prefixed variables.
- Use Cloudflare `vars` only for non-sensitive runtime configuration.
- Use Cloudflare secrets for deployed `DATABASE_URL`, WorkOS secrets, cookie secrets, and other sensitive runtime values.
- Use GitHub Environment secrets for CI migration and deployment credentials.
- Validate environment configuration at server/runtime boundaries with Zod.
- Keep `.env.example`, Wrangler config, GitHub Actions, and the server config schema aligned once backend setup begins.

## Accounts And Configuration

- No separate provider account is required for typed environment configuration.
- Maintain a committed `.env.example` with variable names only, never real values.
- Keep local secrets in an uncommitted `.env` or `.dev.vars` file.
- Keep deployed non-secrets in Cloudflare environment-specific `vars`.
- Keep deployed secrets in Cloudflare Worker secrets.
- Keep CI/CD secrets in GitHub repository or environment secrets, preferring GitHub Environments for staging and production.
- The initial config schema should cover at least Cloudflare, Neon/Prisma, WorkOS, Sentry, and app session/security values.
