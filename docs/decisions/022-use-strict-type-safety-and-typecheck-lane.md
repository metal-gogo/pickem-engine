# 022 Use Strict Type Safety And Typecheck Lane

- Status: accepted
- Date: 2026-04-25

## Context

TypeScript is already accepted as the application language, but the project also needs a clear stance on strictness, generated types, runtime boundaries, and CI type checking.

The product has many rule-heavy and relational concepts: pools, participants, matches, picks, official results, scoring, deadlines, leaderboards, auth users, and environment-specific configuration. Loose typing would make it easy for undefined route params, missing map entries, duplicated DTOs, or unchecked database shapes to become product bugs.

## Decision

Use strict TypeScript as aggressively as practical.

The next database-backed app should enable `strict: true` plus additional strictness where supported, including `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, and `noPropertyAccessFromIndexSignature`.

Use generated and inferred types from the tools that own each boundary:

- React Router typegen owns route params, loader data, action data, and route module types.
- Prisma Client generated types own database models, query inputs, and query results.
- Zod schemas own runtime validation at untrusted boundaries, with inferred TypeScript types used where useful.
- The typed environment config module owns app configuration types.
- Durable domain concepts should be modeled explicitly in domain modules.

Add a dedicated typecheck lane. Type checking should run route type generation before TypeScript checking, and it should be a required CI check separate from linting, tests, and build.

## Reasoning

Strict typing is especially valuable for this app because many defects would otherwise look like normal missing data: a participant without a pool membership, a pick for the wrong match, an absent official result, an unresolved knockout participant, or a missing environment variable.

Generated types reduce duplication and keep app code aligned with framework routes and database schema. Zod covers the part TypeScript cannot cover: runtime data arriving from requests, forms, env vars, auth callbacks, admin tools, and external result sources.

The accepted tradeoff is more explicit handling of `undefined`, optional values, and narrowing. That verbosity is worth it because it forces uncertain states to be acknowledged at the boundaries where product behavior depends on them.

## Consequences

- Add or update `tsconfig` files to enable strict options when app setup begins.
- Add a `typegen` script for React Router type generation.
- Add a `typecheck` script that runs type generation and TypeScript checking without emitting build output.
- Run typecheck as a required GitHub Actions check.
- Avoid hand-written duplicates of Prisma-generated types.
- Avoid broad `any`, unsafe `as` assertions, and non-null `!` assertions except as explicit, localized escape hatches.
- Prefer `unknown` plus Zod parsing for untrusted input.
- Keep domain types close to domain logic instead of burying important product concepts in generic objects.

## Accounts And Configuration

- No external account or API key is required by TypeScript type checking.
- Type generation may require generated Prisma Client files once persistence exists, which in turn depends on the Prisma/Neon configuration from decisions `013`, `014`, and `015`.
