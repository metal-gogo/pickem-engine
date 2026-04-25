# 021 Use oxlint And oxfmt For Linting And Formatting

- Status: accepted
- Date: 2026-04-25

## Context

The project needs a lightweight linting and formatting baseline for a React Router v7, React 19, TypeScript, Tailwind v4, Storybook, Vitest, Playwright, Prisma, and Cloudflare app.

The discovery build already uses `oxfmt` for formatting. The next tooling decision should cover linting as well, especially as the project moves from prototype code into a database-backed app.

ESLint, Biome, oxlint/oxfmt, and Prettier were considered:

- ESLint has the broadest JavaScript, TypeScript, React, accessibility, and framework plugin ecosystem, but it adds more dependency and configuration weight.
- Biome offers a fast all-in-one formatter and linter with a single config, but adopting it would replace the existing `oxfmt` direction and still may not cover every ecosystem-specific rule.
- Prettier remains the most established formatter, but the repo already uses `oxfmt` and does not need a formatter-only switch.
- oxlint and oxfmt align with the existing Oxc-based formatter direction and provide fast linting/formatting with useful TypeScript, React, import, accessibility, and Vitest rule coverage.

## Decision

Use `oxfmt` for formatting and `oxlint` for linting.

Keep TypeScript's compiler checks as a separate validation lane. Linting should complement `tsc`, not replace it.

Do not add ESLint by default. If a specific future need requires an ESLint-only rule or an official plugin behavior that oxlint cannot cover, add ESLint narrowly as a supplemental check rather than replacing the Oxc baseline.

## Reasoning

This keeps the project fast, simple, and consistent with the tooling already present in the repo. oxlint is designed for high-throughput JavaScript and TypeScript linting, has correctness-focused defaults, and includes built-in coverage for common plugin areas such as TypeScript, React, import, jsx-a11y, and Vitest. oxfmt keeps formatting fast while staying close enough to Prettier-style output for the team's needs.

The accepted tradeoff is that ESLint still has the deepest plugin ecosystem. That is acceptable because the project does not currently require custom ESLint-only rules. The fallback remains clear: add ESLint only for a concrete missing rule or ecosystem requirement.

## Consequences

- Keep `oxfmt` as the formatter.
- Add `oxlint` when the tooling setup is updated.
- Add package scripts such as `lint`, `lint:fix`, `fmt`, and `fmt:check` when setup work begins.
- Keep `tsc` or framework type checks in CI alongside linting.
- Prefer oxlint built-in React, TypeScript, import, jsx-a11y, and Vitest coverage before adding ESLint plugins.
- Add ESLint only if a specific rule gap appears, such as an official React/compiler lint that oxlint does not yet support.

## Accounts And Configuration

- No external account or API key is required by oxlint or oxfmt.
