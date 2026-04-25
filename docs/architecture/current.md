# Current Architecture Direction

- Last updated: 2026-04-25

## Technical Direction

Keep the initial system lean and practical.

The architecture should support:

- a web-based product
- private pool workflows
- exact score picks
- official-result-based scoring
- enough flexibility to support future tournaments later

## Current Discovery Build Shape

The current implementation is a frontend-first web shell intended to validate the core prediction flow before backend commitments.

It currently uses:

- a client-rendered React + TypeScript + Vite web app
- Tailwind v4 utilities, a Stitch-informed Apex Kinetic token layer, and reusable UI primitives for the prototype interaction model
- shared UI primitives now biased toward sharper, squared structural surfaces for buttons, badges, and cards so the implemented shell stays closer to the current Stitch direction
- a small amount of authored CSS reserved for global atmosphere, number-input normalization, and other UI details that are less readable as utility strings
- fixed tournament, pool, and placeholder rules data stored separately from presentation
- localStorage behind a small persistence adapter rather than direct component access, now scoped by pool id for the prototype's multi-pool flow
- domain modules for pick state and lock state logic rather than embedding those rules inside React components
- domain helpers for grouped tournament projections so the dashboard can derive provisional group tables from saved exact-score picks
- colocated module folders so React components can keep their stories and related support files nearby, with domain modules able to colocate focused unit tests as they grow
- lightweight routing around the active discovery flow:
  - pool list home
  - pool dashboard
  - focused group picks
- Storybook as a UI evaluation harness for isolated component and view review
- Storybook MCP addon so agent workflows can inspect component docs, story previews, and story tests through the running Storybook instance
- Storybook viewport presets and phone-sized story variants for responsive review during UI iteration
- Storybook's Vitest addon for story-driven interaction and accessibility testing in local CLI runs
- V8 coverage reporting for the Storybook Vitest lane so component-driven test coverage can be reviewed locally
- repo-local MCP client configuration for Cursor, Claude Code, and Codex so the Storybook server can remain a project-scoped tool instead of a global machine dependency

This is an implementation shape for the discovery build, not a final commitment to the long-term product stack.

## Confirmed Next App Architecture Decisions

The discovery build is still local-first, but the next database-backed app direction now has a confirmed stack baseline:

- React Router v7 framework mode will be the app framework.
- React 19 will be the UI runtime.
- TypeScript will remain the application language.
- TypeScript configuration and CI should be strict by default.
- Tailwind v4 will remain the primary styling utility layer, alongside the existing custom design-token/CSS direction.
- Cloudflare will be the initial hosting target.
- Prisma ORM will be the application/server ORM.
- Neon Postgres will be the initial managed relational database provider.
- Prisma Migrate will be the migration path.
- Zod will be the runtime validation library for app/server boundaries.
- WorkOS AuthKit will be the initial authentication provider.
- Environment configuration will be centralized, typed, and validated with Zod.
- mise will manage the pinned local and CI tooling baseline.
- Node 24 LTS will be the Node runtime line.
- pnpm will be the package manager.
- Development validation will use a layered Storybook, Vitest, Cloudflare Vitest, and Playwright strategy.
- oxlint and oxfmt will be the linting and formatting baseline.
- Sentry will be the primary application error tracking provider.
- Cloudflare native observability will be the initial runtime logs, metrics, and tracing baseline.
- CI/CD will use a trunk-based workflow with `main` as the deployable source of truth.
- GitHub Actions validation will use layered lanes for formatting, linting, typechecking, tests, builds, runtime checks, database checks, Storybook checks, and E2E smoke tests.
- GitHub Actions should be able to run migrations and, where useful, create short-lived Neon branches for pull request checks or migration rehearsal.

The intended database environment shape is:

- a production Neon project with a protected production branch
- a non-production Neon project with long-lived `staging` and `dev` branches
- short-lived pull request branches such as `pr-123-add-picks-table`

This direction preserves Prisma's model-based developer experience while using Neon for the managed Postgres platform layer. It is still reversible because Prisma ORM can connect to another Postgres provider later.

React Router v7 replaces the earlier Remix v3 direction because MVP implementation should preserve a clear Storybook, Vitest, and Playwright testing path. Remix v3 remains a possible future candidate once its component model and tooling ecosystem are clearer.

Authentication should use WorkOS as the identity provider and hosted auth/session layer. Product authorization remains in the app database: pools, pool participants, pool roles, picks, scoring, and leaderboards are internal `pickem-engine` concepts linked to an app user record, not WorkOS domain concepts.

Environment configuration should split local, deployed runtime, and CI concerns:

- local development should use an uncommitted `.env` file, with a committed `.env.example` added when backend setup begins
- Cloudflare should store deployed non-secret values as environment-specific `vars`
- Cloudflare should store deployed runtime secrets as Worker secrets
- GitHub Actions should use GitHub Environment secrets for migrations, preview database setup, and deployment
- application/server code should read typed config through a small validated config boundary rather than scattering raw environment access

Tooling should be pinned through mise and package-manager metadata when setup begins:

- `mise.toml` should pin Node 24 LTS and pnpm
- `package.json` should include an exact `packageManager` value for pnpm
- CI should install dependencies with `pnpm install --frozen-lockfile`
- the existing npm lockfile should be replaced by `pnpm-lock.yaml` during the package-manager migration

Validation should use distinct lanes:

- Storybook for UI state review and documentation
- Storybook plus Vitest Browser Mode and the Playwright provider for component interaction and accessibility checks
- Vitest for domain logic, validation schemas, environment config, server helpers, and integration seams
- Cloudflare's Vitest integration for Workers runtime APIs, bindings, and Miniflare-backed behavior
- Prisma/database integration tests against isolated development or CI database environments once persistence exists
- Playwright Test for full end-to-end user journeys against a running app

Linting and formatting should use Oxc tooling:

- oxfmt should remain the formatter
- oxlint should become the linter when tooling setup is updated
- TypeScript compiler checks should remain a separate validation step
- ESLint should only be added for concrete rule/plugin gaps that oxlint cannot cover

Type safety should use strict settings and generated boundary types:

- TypeScript should use `strict: true` plus stricter options such as `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, and `noPropertyAccessFromIndexSignature`
- React Router typegen should own route module types
- Prisma Client should own database model and query types
- Zod should validate untrusted runtime boundaries and provide inferred types where useful
- a dedicated typecheck command should run route type generation before TypeScript checking
- typecheck should be a required CI lane, separate from linting, tests, and build

Observability should start lean:

- Sentry should capture actionable client and server/runtime errors
- Sentry events should include environment and release metadata
- source maps should be uploaded in CI once production builds exist
- Cloudflare Workers Logs should capture initial runtime logs
- Cloudflare platform metrics and tracing should be used before introducing a broader observability vendor
- app logging should go through a small structured wrapper rather than scattered direct logging calls
- logs should use safe fields such as request id, environment, route/action name, internal ids, and operation names
- logs must not include secrets, auth tokens, session cookies, raw emails, invite codes, exact picks, or other sensitive user data
- New Relic should be reconsidered later if the product needs a broader all-in-one observability platform

CI/CD should stay simple for solo development:

- `main` should remain the source of truth and stay deployable
- meaningful changes should use short-lived feature or fix branches
- a long-lived `develop` branch should not be used while the project is solo-developed
- pull requests can be used as CI checkpoints and compact review surfaces even when working alone
- deployment environments should represent local, preview, staging, and production concerns instead of permanent git branches
- pull requests can later create preview deployments and short-lived Neon branches
- production deploys and production database migrations should remain explicit and controlled

CI/CD validation should use layered GitHub Actions lanes:

- pull requests should run dependency install with a frozen lockfile, format check, lint, type generation, typecheck, unit/focused integration tests, and production build
- typecheck should remain separate from linting and tests
- Storybook build, story-driven interaction/accessibility checks, and browser/component tests should run in CI once the UI validation setup is wired for the next app
- Cloudflare runtime tests should run through the Cloudflare Vitest/Miniflare path once server/runtime code exists
- Prisma schema/client validation, migration checks, and database integration tests should run against isolated development or pull-request database environments once persistence exists
- Playwright E2E should start as a focused smoke lane rather than a broad slow suite
- staging and production deployments should be separate workflows from basic pull-request validation
- CI should default to standard Linux runners and avoid expensive runners unless a concrete need appears

These decisions are captured individually in decision records `008` through `025`.

## Working Assumptions

- The exact MVP join and invite flow is not decided yet.

## Current Visual Language

The active frontend should keep translating the existing Stitch-informed direction into a small set of repo-specific rules that are easy to recover later.

- treat the interface as a warm editorial sports surface rather than cool generic SaaS chrome:
  - prefer cream and paper-like canvases with dark `ink` structure
  - use the lime and rust accents as high-energy emphasis, not as constant fill colors
- use Lexend for display moments and Inter for body and data-heavy copy so loud headlines and readable detail stay in tension
- default shared surfaces should feel structural and bolted down:
  - squared corners by default for cards, badges, inputs, and buttons
  - heavy 3px to 4px dark borders for primary containers
  - rounded treatments reserved for roles that are naturally circular or softer, such as flags or avatars
- avoid thin internal divider lines inside modules:
  - use spacing, tonal surface shifts, and grouped sub-blocks before adding more rules
  - if a boundary still needs extra definition, prefer a heavier structural edge or a low-contrast outline over a default 1px separator
- on compact screens, keep dense data modules legible by collapsing lower-priority details before letting key labels or table-like structures break awkwardly
- favor tactile interaction over soft polish:
  - buttons and focused inputs should feel pressable through displacement, stronger borders, and surface shifts
  - floating or sticky elements can use blur and layered surfaces to keep the heavy structure from feeling oppressive
- preserve the product-specific multicolor team accents where they help match and pick surfaces feel tied to real teams; they are a complement to the core shell palette, not a replacement for it
- Storybook docs and stories should describe components using this same vocabulary so the review surface reinforces the design rules instead of drifting into generic component prose

## Frontend Organization Conventions

The discovery build now follows a small set of naming and placement rules so the UI stays readable as the prototype grows.

- `src/app/` owns application-level wiring such as route composition and the shared shell frame
- the active shared shell frame for the prototype lives in `src/app/PoolShell/`, while older shells should not stay the main Storybook reference once the routed flow has moved on
- `src/views/` owns routed screens, with screen components named without a `View` suffix because the folder already provides that context
- `src/components/` owns reusable UI building blocks and higher-level modules, with nested directories used when one component is clearly subordinate to another
- component names should describe role, not styling defaults; visual treatments belong in props rather than in names such as `PrimaryButton`
- reusable modules should avoid colliding with routed screen names when that would blur responsibilities; for example, the pool ranking module is named `StandingsList` while the routed screen remains `Leaderboard`
- Storybook titles should mirror component names and can nest to reflect real hierarchy, such as `Modules/StandingsList/StandingsRow`
- stories that show multiple variants should explain what each variant is meant to communicate or when it should be used, rather than acting as unlabeled visual snapshots
- when the active routed flow changes materially, Storybook should retire stale routed-screen stories instead of documenting both old and new navigation models as if they were equally current
- Storybook remains the main review surface for UI components and screens, while hooks and domain behavior should prefer focused Vitest coverage over Storybook-only harness stories

These conventions are meant to reduce naming drift and keep the difference between app wiring, routed screens, reusable modules, and pure logic easy to recover after a gap.

## Seed Data Layering

Tournament source data now uses a layered seed approach under `src/data/seeds/`.

- raw upstream inputs are stored unmodified under `src/data/seeds/openfootball/` so the original source remains recoverable
- derived helpers can summarize or regroup the raw source without pretending to be the final app model
- normalized seeds translate source-specific field names and identifiers into internal shapes that are easier to consume elsewhere in the app

The current normalized layer uses:

- stable team ids derived from FIFA codes
- `confederation` instead of the upstream `confed` field name
- separate `groupMatches` for fixtures with concrete teams already known
- separate `knockoutFixtures` for scheduled bracket fixtures whose participant slots are still unresolved
- typed participant references for knockout slots such as group positions, best third-place qualifiers, and winners or losers of prior matches

This keeps the raw ingest repeatable while still letting the app grow around clearer internal shapes.

## High-Level Responsibilities

- user-facing web experience
- application logic for pools, picks, deadlines, and scoring
- persistence for tournament, membership, picks, and results data
- background processing for result ingestion and leaderboard refresh
- manual fallback operations if external data is not ready or reliable

## Constraints

- the project is early and should avoid premature infrastructure complexity
- product rules are still being defined, so technical choices should remain reversible where possible
- documentation should stay strong enough to support irregular development sessions
- unresolved scoring and knockout rules should not be hardened into frontend assumptions more than necessary

## Known Unknowns

- how authenticated users should join a private pool and become pool participants in MVP
- how result ingestion should work in MVP
- whether multilingual support is MVP or later
- how much tournament progression needs to be modeled explicitly
