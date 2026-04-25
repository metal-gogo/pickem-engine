# 016 Use Zod For Runtime Validation

- Status: accepted
- Date: 2026-04-25

## Context

The next app architecture needs runtime validation for untrusted data at server and application boundaries: route params, form submissions, action payloads, environment variables, invite codes, admin result entry, and any external result-ingestion payloads.

Zod, Valibot, ArkType, Effect Schema, and JSON Schema-first options were considered. Zod is already familiar to the project owner and has a broad TypeScript ecosystem. Valibot is smaller and more tree-shakeable, ArkType is fast and expressive, and Effect Schema is powerful for encode/decode workflows, but each adds either a less familiar API or more conceptual weight.

## Decision

Use Zod as the runtime validation library for the next app architecture.

## Reasoning

Zod is the best fit for the project's current values: clear TypeScript-first schemas, strong inference, familiar ergonomics, broad ecosystem support, and good enough performance for the expected validation workload.

The accepted tradeoff is that Zod is not the smallest or fastest validator. That is acceptable because `pickem-engine` is unlikely to validate huge payloads or run validation in tight loops. Validation should prioritize clarity and maintainability at app boundaries.

## Consequences

- Use Zod for request, form, route-param, environment, admin-tool, and external-payload validation.
- Do not make Zod the database-model source of truth; Prisma's `schema.prisma` owns database shape.
- Keep domain rules explicit instead of hiding business behavior inside validation schemas.
- If a future client bundle has unusually strict size constraints, consider `zod/mini` or reassess Valibot for client-only validation surfaces.

## Accounts And Configuration

- No external account or API key is required by Zod.
- Zod will validate the environment variable names and values documented by the provider decisions.
