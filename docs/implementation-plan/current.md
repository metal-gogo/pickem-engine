# Current Implementation Plan

- Last updated: 2026-05-01

## Planning Objective

Build the platform in small, coherent slices while keeping product rules, design surfaces, and implementation decisions easy to recover between sessions.

## Current Phase

Platform build planning and implementation. The existing local frontend shell remains a reference for interaction, information architecture, and Storybook-driven UI review.

## Working Rule

For meaningful implementation bets, prioritize one integrated platform slice working end to end before broadening infrastructure or edge workflows.

That piece should be:

- core to the product's value
- small enough to complete and inspect quickly
- novel enough to teach something important

This is a sequencing rule, not permission to let temporary scaffolding become product truth.

## Near-Term Work

1. Generate Stitch MCP design proposals for the next platform surfaces:
   - landing page
   - create/configure pool flow with constrained rules setup
   - reusable scoring-system summary component
   - tournament-rules page
   - user/account settings
   - authentication or auth-transition screen if needed
   - team single page
   - group single page
   - tournament, team, and group calendar export flows
   - pool list, pool dashboard, invite acceptance, picks, leaderboard, schedule/results, and key system states
2. Keep design proposals mobile-first, with tablet/desktop adaptations and light/dark mode support from the start.
3. Use the selected platform stack as the implementation baseline: React Router v7 framework mode, React 19, TypeScript, Tailwind v4, Cloudflare, Prisma, Neon, WorkOS AuthKit, Zod, Sentry, mise, pnpm, and GitHub Actions.
4. Resolve the highest-leverage remaining product questions before hardening database models or scoring code:
   - scoring defaults, bounds, and validation constraints
   - knockout match handling
   - identity and join flow
   - result ingestion strategy
   - bonus result definitions

## Current Platform Baseline

### Confirmed Direction

- the product direction is a private World Cup 2026 pool platform that can grow later
- the first platform slices should build from the selected architecture rather than continuing open-ended exploration
- the next database-backed architecture should use React Router v7 framework mode on Cloudflare, React 19, strict TypeScript with a dedicated typecheck lane, Tailwind v4 plus the existing design-token/CSS direction, Prisma ORM, Neon Postgres, Zod, WorkOS AuthKit, typed environment configuration, a mise-managed Node 24 LTS plus pnpm tooling baseline, oxlint/oxfmt, Sentry plus Cloudflare native observability, trunk-based GitHub Actions CI/CD with layered validation lanes, and layered Storybook/Vitest/Cloudflare Vitest/Playwright validation when app setup begins
- pool owners can configure constrained pool scoring settings:
  - required winner-or-draw points
  - optional exact result bonus points
  - optional tournament top scorer bonus points
  - optional tournament best-player bonus points
  - optional World Cup champion bonus points
- the design direction should cover a pool-centered flow:
  - pool list home
  - pool dashboard
  - create/configure pool
  - scoring-system summary
  - tournament overview
  - focused group pick view

### Local Shell Assumptions

- one local user
- fixed fixture data instead of live ingestion
- exact score entry for included matches
- local persistence instead of database-backed persistence
- revisiting and editing saved picks within the grouped flow before any real multi-user or pool workflow
- in the local shell only, the local user can edit picks freely until the global deadline so the interaction model can be tested; this does not resolve BR-O3
- in the local shell, a pool dashboard can show provisional scoring copy while the scoring defaults and bounds remain open
- in the local shell, a tournament overview can show projected group outcomes derived from the user's entered picks, but this must be labeled clearly as predicted rather than official
- the first pass should prefer predicted group-state presentation over a full predicted-versus-official toggle so the local shell stays tightly bounded

### Current Frontend Slice

- React Router v7 framework-mode app using React, TypeScript, and Vite
- mise-pinned Node `24.15.0` and pnpm `10.33.2` tooling, with `pnpm-lock.yaml` as the dependency lockfile
- Tailwind v4 for spacing, layout, responsive behavior, and most structural styling
- a small Stitch-informed Apex Kinetic token layer plus reusable UI primitives rather than a heavyweight UI kit
- the active shell should favor sharper, squared structural surfaces for cards, badges, and buttons unless a rounded shape clearly serves a specific role such as flags or avatars
- a small amount of authored CSS reserved for global atmosphere, number-input normalization, and other high-touch details that read poorly as utility strings
- explicit separation between:
  - application shell and route wiring
  - routed screens
  - reusable components and modules
  - domain logic
  - fixture and leaderboard data
  - local persistence adapter
- initial WorkOS AuthKit plumbing includes server-handled `/login`, `/callback`, and `/logout` routes; app-owned user, participant, invite, and authorization behavior remains undecided
- routed screens under `src/views/` named without a `View` suffix because the folder already provides that context
- reusable components named by role rather than default styling, with nested folders used when subordinate relationships are real
- localStorage-backed pick persistence behind a replaceable storage interface
- Storybook workbench for isolated component and view evaluation during UI iteration
- Storybook MCP wiring so agents can use the running Storybook as structured UI context during iteration
- Storybook viewport presets and phone-sized story variants for reviewing responsive behavior without leaving the workbench
- Storybook Vitest integration for story-driven interaction and accessibility checks via `pnpm run test-storybook`
- Storybook coverage reporting via `pnpm run coverage-storybook` so the test lane exposes what parts of the app code are exercised
- dependency security audit scripts:
  - `pnpm run security:audit` for local full dependency investigation
  - `pnpm run security:audit:prod` for local production dependency investigation
  - `pnpm run security:audit:ci` for high-or-higher severity pull-request checks
  - `pnpm run security:audit:ci:prod` for high-or-higher severity deployment checks against production dependencies
- `.github/workflows/validate.yml` validates pull requests and pushes to `main`; Cloudflare Workers Builds should own PR preview uploads and production deploys
- `wrangler.jsonc` enables Worker preview URLs and configures `futbol.quest` as the production custom domain
- `.node-version` lets Cloudflare Workers Builds pick up the repo's Node version, while `corepack enable` in the build command should activate the pnpm version declared in `package.json`
- Storybook story titles and docs aligned with component names and hierarchy so variant-heavy stories explain intent, not just render states
- direct Vitest coverage for hook and domain behavior where Storybook adds little value, such as `usePickSet`
- for the next database-backed app, use Storybook for UI states, Storybook plus Vitest Browser Mode and Playwright for component interaction and accessibility checks, Vitest for domain/server logic, Cloudflare Vitest for Workers runtime behavior, database integration tests against isolated dev/CI environments, and Playwright Test for focused E2E journeys
- for the next database-backed app, use GitHub Actions validation lanes for dependency security audit, format check, lint, type generation, typecheck, unit and focused integration tests, production build, Storybook validation, Cloudflare runtime tests, database/migration checks, and focused Playwright smoke tests as each part of the stack becomes available
- repo-local MCP client configuration for Cursor, Claude Code, and Codex so the Storybook workflow stays scoped to this repository
- top-level screens for:
  - public tournament overview landing page
  - public team profile
  - public group profile
  - pool list home
  - pool dashboard
  - focused group picks
- reusable public information modules for:
  - generated ICS calendar downloads
  - public match schedule lists
  - public venue grids
  - shared group tables that can be highlighted for predicted pool standings or left neutral for pre-tournament public pages
- pool-scoped local persistence so placeholder pools behave like separate spaces in the local shell
- predicted group tables derived from saved picks so the tournament overview can preview outcomes without pretending they are official
- placeholder rules and points content are acceptable local scaffolding as long as they are presented as provisional and do not masquerade as settled business rules
- local-only locked-state preview control so post-deadline UI can be inspected without changing the real rule set
- Storybook stories aligned with the current active flow and modules:
  - home
  - pool dashboard
  - group picks
  - pool shell
  - rules summary
  - group overview cards
- raw, derived, and normalized World Cup 2026 seed files under `src/data/seeds/` so fixture-modeling work can evolve without mutating upstream source files
- initial Prisma database foundation with Neon-compatible Postgres schema, first migration, Worker-runtime DB client factory, Node seed client, and idempotent static tournament seed flow from the existing normalized seed files

### Platform Concerns Not Yet Implemented

- join and invite flow details, now with WorkOS AuthKit chosen as the auth provider
- pool creation mechanics and constrained rules setup
- database-backed route persistence for users, pools, picks, scoring settings, official results, and leaderboards; the schema and static seed foundation now exist, but the current routed app still reads local fixtures/localStorage
- official results ingestion infrastructure
- multi-user permissions and membership

### Exit Criteria

- the core flow can be clicked through from pool selection to tournament overview to group score entry to save, continue, and revisit groups from the dashboard
- the grouped tournament view makes progress and the next useful action clearer than the current flat match list
- predicted group-state presentation is understandable without being mistaken for official standings
- the local shell exposes concrete UX friction or domain-model gaps worth documenting
- the resulting learnings can be translated into clearer business rules, domain language, or platform decisions
- the local shell remains small enough that it does not turn into accidental long-term architecture

## Ready Soon

- deeper domain modeling for tournament, match, pool, and pick concepts
- a more concrete platform flow
- implementation task breakdowns once the design proposals and remaining rule decisions have clarified the next durable slices

## Current Blockers

- no default scoring point values, bounds, or validation constraints yet
- no finalized knockout scoring rule yet
- no finalized join/invite model yet
- no chosen ingestion approach yet
- no finalized bonus-result definition policy yet
- no finalized global prediction deadline timestamp or time zone policy yet

## Planning Guardrails

- do not choose additional stack details before product constraints require them
- keep the newly added database foundation small and reversible until the app starts reading and writing real persisted users, pools, picks, and results
- keep the platform build coherent and small
- preserve flexibility for later public growth without optimizing for it prematurely
- do not let local-shell shortcuts leak into canonical business rules
- do not let temporary scaffolding harden into accidental architecture
- do not expand the local shell without explicit exit criteria

## Session Handoff

### What Changed

- Implemented the first real frontend slice as a local-first web app shell using React, TypeScript, Vite, and localStorage.
- Added reusable UI primitives and earlier routed local surfaces that helped test overview, pick entry, review, and leaderboard presentation before the active flow shifted to the current pool-centered shell.
- Added Storybook stories for the main primitives, modules, and views so look-and-feel changes can be reviewed in isolation.
- Tightened the frontend naming and placement conventions so routed screens, reusable modules, and app-level shell code stay easier to distinguish.
- Added Storybook MCP wiring and repo guidance so UI-focused agent work can inspect stories and documentation before changing component behavior or styling.
- Added Storybook viewport presets, phone-sized story variants, and a first round of interaction plus accessibility coverage on key stories.
- Added a `test-storybook` CLI workflow using Storybook's Vitest addon so UI changes can be verified beyond manual review.
- Added a `coverage-storybook` CLI workflow using Vitest's V8 provider so the Storybook test lane can generate local coverage reports.
- Shifted hook-only behavior coverage such as `usePickSet` to direct Vitest tests instead of maintaining Storybook-only harness stories.
- Swapped the styling foundation from a monolithic global stylesheet to Tailwind v4 with a token-driven theme layer and smaller authored CSS seams.
- Re-based the active frontend shell and its main modules around a Stitch-derived Apex Kinetic design system adaptation while preserving the app's multicolor team accent strips for match and pick surfaces.
- Tightened the shared UI primitives toward sharper corners on buttons, badges, and card surfaces so the implemented shell tracks the current Apex Kinetic mockups more closely.
- Kept domain logic, fixed data, and persistence separated so the shell can evolve toward a real application without carrying local-only wiring through the UI layer.
- Treated free pre-deadline edits as a local-shell assumption only, not a resolved business rule.
- Added a local-only locked-state preview so the app can validate both editable and locked modes before the real lock behavior is finalized.
- Added raw OpenFootball seed files plus derived and normalized 2026 tournament seed artifacts so team, group, and fixture modeling can mature without losing source traceability.
- Added the initial relational database foundation with Prisma, Neon Postgres assumptions, Prisma Migrate, generated Cloudflare and Node Prisma clients, and an idempotent static World Cup 2026 seed path.
- Enriched normalized team seed data with FIFA ranking and World Cup history metadata to support future product-surface decisions.
- Added seed-backed public tournament information pages as the unauthenticated landing direction:
  - tournament overview with rules, groups, venues, sources, and full-tournament calendar export
  - team profile pages with manager, ranking, World Cup history, group fixtures, venues, and team calendar export
  - group profile pages with team summaries, pre-tournament table, fixtures, venues, historical World Cup finals head-to-head seed data, and group calendar export
- Extracted the group table into a reusable module shared by predicted pool standings and neutral public pre-tournament group tables.
- Added reusable public schedule, venue, calendar download, public shell, and site-header modules with Storybook coverage.
- Chose the current local-shell direction:
  - pool list home for returning users
  - pool dashboard with rules and points summary scaffolding
  - group-based tournament overview instead of a single flat match list
  - focused group pick screens with a save-and-continue rhythm
- Decided that placeholder points content and placeholder full-rules modals are acceptable local scaffolding while the real scoring defaults remain unresolved.
- Chose to treat group tables on the tournament overview as predicted outcomes derived from entered picks, with official-versus-predicted comparison deferred until the lighter predicted-only version has been tested.
- Implemented the new pool-centered flow in the frontend shell:
  - pool list home
  - pool dashboard
  - grouped tournament overview
  - focused group pick view
- Scoped local pick persistence by pool id so multiple placeholder pools can coexist without sharing the same saved pick set.
- Updated the Storybook surface to document the new active views and modules instead of the older overview, picks, review, and leaderboard route stories.

### What Is Still Open

- scoring defaults, bounds, and validation constraints
- knockout match handling
- join and invite flow details
- result ingestion strategy
- multilingual launch scope
- bonus result definitions
- global deadline timestamp and time zone policy

### Recommended Next Step

Generate the next Stitch MCP design proposals and use them to choose the first platform build slice.

The next useful moves are likely:

- use the new Storybook surface to preserve what already works in the pool dashboard hierarchy, group-card readability, and group-pick pacing
- document any friction around score entry, predicted-state comprehension, save behavior, and locked-state expectations
- decide which normalized seed shapes should become the app-facing tournament and group-table contract
- enrich the normalized team and fixture seeds with any missing fields the product will need later
- refine the open business rules that most affect the current UI:
  - scoring defaults, bounds, and validation constraints
  - knockout handling
  - pick editing semantics
  - identity and join flow
  - bonus result definitions
  - global deadline timestamp and time zone policy

### Resume Prompt

If helpful next session, start with:

`Use the resume-work skill, inspect docs/implementation-plan/current.md and docs/business-rules/index.md, then generate Stitch MCP design proposals for the platform surfaces without turning provisional point values into permanent product behavior.`

The `resume-work` skill should remain part of the normal workflow because this project may sit idle between sessions and should be easy to restart without relying on memory.
