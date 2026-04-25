# 013 Use Prisma ORM For Data Access

- Status: accepted
- Date: 2026-04-25

## Context

The project needs an ORM used from application/server code. Drizzle ORM and Prisma ORM were compared. Drizzle offers SQL-shaped TypeScript and close SQL transparency. Prisma offers a model-based schema, generated TypeScript client, Prisma Migrate, Prisma Studio, and a fast CRUD-oriented developer experience.

## Decision

Use Prisma ORM for application/server database access.

## Reasoning

The project owner prefers Prisma's model-based API and understands the `schema.prisma` plus migration workflow. That preference matters because this codebase will likely be developed in stop-and-start sessions where fast context recovery and clear tooling are valuable.

The accepted tradeoff is less direct SQL-shaped control than Drizzle. That is acceptable because Prisma still allows raw SQL or TypedSQL where needed, and most MVP work should benefit more from Prisma's model-first workflow than from hand-shaped query APIs.

## Consequences

- `schema.prisma` should become the source of the app database model once persistence is implemented.
- Prisma Client should be the default data-access API.
- Performance-sensitive leaderboard or scoring queries may still use Prisma-supported raw SQL when the model API is not expressive enough.
- The app should avoid letting database-provider details leak into domain logic.

## Accounts And Configuration

- No Prisma account or Prisma API key is required for Prisma ORM itself.
- Prisma CLI and Prisma Client need database connection environment variables supplied by the Neon decisions.
- Expected variable names are `DATABASE_URL` for application/runtime access and, if a pooled URL is used, `DIRECT_URL` for migrations or direct database access.
