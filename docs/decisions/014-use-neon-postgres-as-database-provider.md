# 014 Use Neon Postgres As Database Provider

- Status: accepted
- Date: 2026-04-25

## Context

The project needs a relational database provider that supports free-tier-friendly development, separate environments, migrations, GitHub Actions integration, and a path toward a real public app. Neon Postgres and Prisma Postgres were compared as the main candidates.

Neon's 0.5 GB free storage limit was considered. For the expected private-pool first release, storage is not a near-term blocker because even hundreds of complete pick submissions create only tens of thousands of pick rows.

## Decision

Use Neon Postgres as the initial managed relational database provider.

## Reasoning

Neon provides a strong standalone Postgres platform: managed Postgres, branch-based workflows, preview or migration-rehearsal databases, GitHub Actions integration, and good AI-agent/database-management capabilities. It pairs with Prisma ORM while keeping the database provider separate from the ORM choice.

Prisma Postgres remains attractive for an all-in Prisma workflow, but Neon offers stronger provider independence and a more mature database-branching story.

## Consequences

- The database layer should target Postgres features that work on Neon.
- The Prisma ORM choice remains portable to another Postgres provider later if needed.
- Neon-specific operations should stay in infrastructure scripts, CI, and configuration rather than application domain code.
- Storage limits should be monitored later if the app grows beyond private pools into a larger public product.

## Accounts And Configuration

- Create a Neon account.
- Create the production Neon project and the non-production Neon project when backend setup begins.
- Capture environment-specific Postgres connection strings for local development, dev, staging, pull-request previews, and production.
- Store database connection strings as `DATABASE_URL` and, if needed, `DIRECT_URL`.
- Store local database URLs in uncommitted local env files.
- Store deployed database URLs as Cloudflare Worker secrets.
- Store CI database URLs or Neon branch outputs in GitHub Actions environment secrets/outputs.
