# Current Implementation Plan

- Last updated: 2026-04-25

## Planning Objective

Create a clean product and documentation foundation that makes later implementation work straightforward and resumable.

## Current Phase

Frontend-first discovery build implementation and product validation.

## Working Rule

For meaningful implementation bets, prioritize one integrated piece working end to end before broadening infrastructure or edge workflows.

That piece should be:

- core to the product's value
- small enough to complete and inspect quickly
- novel enough to teach something important

This is a sequencing rule, not a redefinition of the MVP.

## Near-Term Work

1. Finalize the documentation system and canonical files.
2. Shape the first discovery prototype around the core pick workflow:
   - pool list home for returning users
   - pool dashboard with a lightweight rules and points summary
   - tournament overview organized by groups rather than one flat match list
   - focused group pick flow with exact-score entry and a save-and-continue rhythm
   - local persistence
   - save, return, and revisit-group flow from the dashboard
3. Use the implemented frontend shell to validate information architecture, interaction states, and prototype assumptions.
4. Use prototype findings to refine business rules, glossary terms, and the eventual MVP flow.
5. Resolve the highest-leverage deferred MVP questions once the core interaction model is more concrete:
   - scoring model
   - knockout match handling
   - identity and join flow
   - result ingestion strategy
   - pool creation scope

## Current Prototype Bet

### Confirmed Direction

- the eventual product direction remains a private World Cup 2026 pool for friends and family
- the prototype is for discovery, not a redefinition of the MVP
- the first slice should validate the central prediction workflow before broadening surrounding systems
- the next database-backed architecture should use React Router v7 framework mode on Cloudflare, React 19, strict TypeScript with a dedicated typecheck lane, Tailwind v4 plus the existing design-token/CSS direction, Prisma ORM, Neon Postgres, Zod, WorkOS AuthKit, typed environment configuration, a mise-managed Node 24 LTS plus pnpm tooling baseline, oxlint/oxfmt, Sentry plus Cloudflare native observability, trunk-based GitHub Actions CI/CD with layered validation lanes, and layered Storybook/Vitest/Cloudflare Vitest/Playwright validation when app setup begins
- the next discovery iteration should test a pool-centered flow:
  - pool list home
  - pool dashboard
  - tournament overview
  - focused group pick view

### Prototype Assumptions

- one local user
- fixed fixture data instead of live ingestion
- exact score entry for included matches
- local persistence instead of database-backed persistence
- revisiting and editing saved picks within the grouped flow before any real multi-user or pool workflow
- for discovery only, the local user can edit picks freely until the global deadline so the interaction model can be tested; this does not resolve BR-O3
- for discovery, a pool dashboard can show placeholder scoring copy and a placeholder full-rules modal even though the real scoring table is still unresolved
- for discovery, a tournament overview can show projected group outcomes derived from the user's entered picks, but this must be labeled clearly as predicted rather than official
- the first pass should prefer predicted group-state presentation over a full predicted-versus-official toggle so the prototype stays tightly bounded

### Current Frontend Slice

- React + TypeScript + Vite frontend shell
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
- routed screens under `src/views/` named without a `View` suffix because the folder already provides that context
- reusable components named by role rather than default styling, with nested folders used when subordinate relationships are real
- localStorage-backed pick persistence behind a replaceable storage interface
- Storybook workbench for isolated component and view evaluation during UI iteration
- Storybook MCP wiring so agents can use the running Storybook as structured UI context during iteration
- Storybook viewport presets and phone-sized story variants for reviewing responsive behavior without leaving the workbench
- Storybook Vitest integration for story-driven interaction and accessibility checks via `npm run test-storybook`
- Storybook coverage reporting via `npm run coverage-storybook` so the test lane exposes what parts of the app code are exercised
- Storybook story titles and docs aligned with component names and hierarchy so variant-heavy stories explain intent, not just render states
- direct Vitest coverage for hook and domain behavior where Storybook adds little value, such as `usePickSet`
- for the next database-backed app, use Storybook for UI states, Storybook plus Vitest Browser Mode and Playwright for component interaction and accessibility checks, Vitest for domain/server logic, Cloudflare Vitest for Workers runtime behavior, database integration tests against isolated dev/CI environments, and Playwright Test for focused E2E journeys
- for the next database-backed app, use GitHub Actions validation lanes for format check, lint, type generation, typecheck, unit and focused integration tests, production build, Storybook validation, Cloudflare runtime tests, database/migration checks, and focused Playwright smoke tests as each part of the stack becomes available
- repo-local MCP client configuration for Cursor, Claude Code, and Codex so the Storybook workflow stays scoped to this repository
- top-level screens for:
  - pool list home
  - pool dashboard
  - focused group picks
- pool-scoped local persistence so placeholder pools behave like separate spaces during discovery
- predicted group tables derived from saved picks so the tournament overview can preview outcomes without pretending they are official
- placeholder rules and points content are acceptable discovery scaffolding as long as they are presented as provisional and do not masquerade as settled business rules
- prototype-only locked-state preview control so post-deadline UI can be inspected without changing the real rule set
- Storybook stories aligned with the current active flow and modules:
  - home
  - pool dashboard
  - group picks
  - pool shell
  - rules summary
  - group overview cards
- raw, derived, and normalized World Cup 2026 seed files under `src/data/seeds/` so fixture-modeling work can evolve without mutating upstream source files

### Deferred MVP Concerns

- join and invite flow details, now with WorkOS AuthKit chosen as the auth provider
- pool creation mechanics
- database-backed persistence implementation, now with Prisma ORM and Neon Postgres as the chosen direction
- official results ingestion infrastructure
- multi-user permissions and membership

### Exit Criteria

- the core flow can be clicked through from pool selection to tournament overview to group score entry to save, continue, and revisit groups from the dashboard
- the grouped tournament view makes progress and the next useful action clearer than the current flat match list
- predicted group-state presentation is understandable without being mistaken for official standings
- the prototype exposes concrete UX friction or domain-model gaps worth documenting
- the resulting learnings can be translated into clearer business rules, domain language, or MVP decisions
- the prototype remains small enough that it does not turn into accidental long-term architecture

## Ready Soon

- deeper domain modeling for tournament, match, pool, and pick concepts
- a more concrete MVP flow
- implementation task breakdowns once the prototype findings have clarified the next durable decisions

## Current Blockers

- no exact scoring table yet
- no finalized knockout scoring rule yet
- no finalized MVP join/invite model yet
- no chosen ingestion approach yet
- the first prototype slice still needs to stay tightly bounded so it does not absorb surrounding concerns

## Planning Guardrails

- do not choose additional stack details before product constraints require them
- do not implement the React Router v7, Cloudflare, Neon, Prisma, WorkOS, environment-file, mise, Node, package-manager, linting, typecheck, observability, or CI/CD setup until the project explicitly moves from architecture choice into backend setup work
- keep the MVP coherent and small
- preserve flexibility for later public growth without optimizing for it prematurely
- do not let prototype shortcuts leak into canonical business rules
- do not let temporary scaffolding harden into accidental architecture
- do not expand the prototype without explicit exit criteria

## Session Handoff

### What Changed

- Implemented the first real frontend slice as a local-first web app shell using React, TypeScript, Vite, and localStorage.
- Added reusable UI primitives and earlier routed prototype surfaces that helped test overview, pick entry, review, and leaderboard presentation before the active flow shifted to the current pool-centered prototype.
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
- Kept domain logic, fixed data, and persistence separated so the shell can evolve toward a real application without carrying prototype-only wiring through the UI layer.
- Treated free pre-deadline edits as a prototype assumption only, not a resolved business rule.
- Added a prototype-only locked-state preview so the app can validate both editable and locked modes before the real lock behavior is finalized.
- Added raw OpenFootball seed files plus derived and normalized 2026 tournament seed artifacts so team, group, and fixture modeling can mature without losing source traceability.
- Enriched normalized team seed data with FIFA ranking and World Cup history metadata to support future product-surface decisions.
- Chose the next prototype direction for discovery:
  - pool list home for returning users
  - pool dashboard with rules and points summary scaffolding
  - group-based tournament overview instead of a single flat match list
  - focused group pick screens with a save-and-continue rhythm
- Decided that placeholder points content and placeholder full-rules modals are acceptable prototype scaffolding while the real scoring model remains unresolved.
- Chose to treat group tables on the tournament overview as predicted outcomes derived from entered picks, with official-versus-predicted comparison deferred until the lighter predicted-only version has been tested.
- Implemented the new pool-centered flow in the frontend shell:
  - pool list home
  - pool dashboard
  - grouped tournament overview
  - focused group pick view
- Scoped local pick persistence by pool id so multiple placeholder pools can coexist without sharing the same saved pick set.
- Updated the Storybook surface to document the new active views and modules instead of the older overview, picks, review, and leaderboard route stories.

### What Is Still Open

- exact scoring model
- knockout match handling
- join and invite flow details
- result ingestion strategy
- multilingual launch scope
- pool creation scope

### Recommended Next Step

Implement the next discovery flow in the frontend shell and use it to capture product and UX learnings before broadening platform scope.

The next useful moves are likely:

- use the new Storybook surface to refine the pool dashboard hierarchy, group-card readability, and group-pick pacing
- document any friction around score entry, predicted-state comprehension, save behavior, and locked-state expectations
- decide which normalized seed shapes should become the app-facing tournament and group-table contract
- enrich the normalized team and fixture seeds with any missing fields the product will need later
- refine the open business rules that most affect the current UI:
  - scoring model
  - knockout handling
  - pick editing semantics
  - identity and join flow

### Resume Prompt

If helpful next session, start with:

`Use the resume-work skill, inspect the grouped tournament-flow direction in docs/implementation-plan/current.md, then implement the smallest useful pool dashboard -> tournament overview -> group picks prototype without hardening placeholder rules or points copy into permanent product behavior.`

The `resume-work` skill should remain part of the normal workflow because this project may sit idle between sessions and should be easy to restart without relying on memory.
