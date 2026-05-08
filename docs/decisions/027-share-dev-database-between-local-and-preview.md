# 027 Share Dev Database Between Local And Preview

- Status: accepted
- Date: 2026-05-08

## Context

The project needs environment separation that is practical for solo development. The earlier architecture direction left room for staging and short-lived pull-request database branches, but the current workflow benefits more from keeping local development and Cloudflare previews in sync against the same non-production data.

The important safety boundary is production. Preview deployments are review surfaces for active development, not durable user environments.

## Decision

Use one shared Neon `dev` branch/database for local development and Cloudflare preview deployments.

Production uses the protected Neon `prod` branch/database.

There will not be a staging environment in the current environment strategy.

Migration rules:

- `prisma migrate dev` is local-only and runs against Neon `dev`.
- Cloudflare preview deployments do not run `prisma migrate dev`; they consume whatever schema currently exists on Neon `dev`.
- Production uses `prisma migrate deploy`.

## Reasoning

Sharing `dev` keeps the local app and preview deployments aligned while the project is still solo-developed and pre-production. It avoids preview-specific seed drift, duplicated setup, and extra database lifecycle work that does not yet buy enough confidence.

The tradeoff is that multiple preview deployments can read and write the same mutable development data. That is acceptable because preview data is disposable and should not contain real user data.

## Consequences

- Local `.env` should point only at Neon `dev`.
- Cloudflare preview secrets should point only at Neon `dev`.
- Cloudflare production secrets should point only at Neon `prod`.
- Production must never receive the dev database URL.
- Local development and preview must never receive the production database URL.
- No real user data belongs in Neon `dev`.
- If shared `dev` starts blocking migration rehearsal or concurrent branch review, a future decision can introduce temporary database branches for specific risky work.
