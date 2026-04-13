# Current Implementation Plan

- Last updated: 2026-04-12

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
   - fixed fixture data
   - exact-score entry
   - local persistence
   - review and edit flow
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

### Prototype Assumptions

- one local user
- fixed fixture data instead of live ingestion
- exact score entry for included matches
- local persistence instead of database-backed persistence
- review and edit flow before any real multi-user or pool workflow
- for discovery only, the local user can edit picks freely until the global deadline so the interaction model can be tested; this does not resolve BR-O3

### Current Frontend Slice

- React + TypeScript + Vite frontend shell
- Tailwind v4 for spacing, layout, responsive behavior, and most structural styling
- a small token-driven theme layer plus reusable UI primitives rather than a heavyweight UI kit
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
- repo-local MCP client configuration for Cursor, Claude Code, and Codex so the Storybook workflow stays scoped to this repository
- top-level screens for:
  - overview
  - pick entry
  - review and edit
  - leaderboard preview
- mocked leaderboard scores because the real scoring model is still unresolved
- prototype-only locked-state preview control so post-deadline UI can be inspected without changing the real rule set
- raw, derived, and normalized World Cup 2026 seed files under `src/data/seeds/` so fixture-modeling work can evolve without mutating upstream source files

### Deferred MVP Concerns

- identity and join flow
- pool creation mechanics
- invite flow
- database-backed persistence
- official results ingestion infrastructure
- multi-user permissions and membership

### Exit Criteria

- the core flow can be clicked through from fixture viewing to score entry to save to review and edit
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
- no decided MVP identity model yet
- no chosen ingestion approach yet
- the first prototype slice still needs to stay tightly bounded so it does not absorb surrounding concerns

## Planning Guardrails

- do not choose stack details before product constraints require it
- keep the MVP coherent and small
- preserve flexibility for later public growth without optimizing for it prematurely
- do not let prototype shortcuts leak into canonical business rules
- do not let temporary scaffolding harden into accidental architecture
- do not expand the prototype without explicit exit criteria

## Session Handoff

### What Changed

- Implemented the first real frontend slice as a local-first web app shell using React, TypeScript, Vite, and localStorage.
- Added reusable UI primitives and screens for:
  - overview
  - pick entry
  - review and edit
  - leaderboard preview
- Added Storybook stories for the main primitives, modules, and views so look-and-feel changes can be reviewed in isolation.
- Tightened the frontend naming and placement conventions so routed screens, reusable modules, and app-level shell code stay easier to distinguish.
- Added Storybook MCP wiring and repo guidance so UI-focused agent work can inspect stories and documentation before changing component behavior or styling.
- Added Storybook viewport presets, phone-sized story variants, and a first round of interaction plus accessibility coverage on key stories.
- Added a `test-storybook` CLI workflow using Storybook's Vitest addon so UI changes can be verified beyond manual review.
- Added a `coverage-storybook` CLI workflow using Vitest's V8 provider so the Storybook test lane can generate local coverage reports.
- Shifted hook-only behavior coverage such as `usePickSet` to direct Vitest tests instead of maintaining Storybook-only harness stories.
- Swapped the styling foundation from a monolithic global stylesheet to Tailwind v4 with a token-driven theme layer and smaller authored CSS seams.
- Kept domain logic, fixed data, and persistence separated so the shell can evolve toward a real application without carrying prototype-only wiring through the UI layer.
- Treated free pre-deadline edits as a prototype assumption only, not a resolved business rule.
- Added a prototype-only locked-state preview so the app can validate both editable and locked modes before the real lock behavior is finalized.
- Added raw OpenFootball seed files plus derived and normalized 2026 tournament seed artifacts so team, group, and fixture modeling can mature without losing source traceability.

### What Is Still Open

- exact scoring model
- knockout match handling
- identity and join flow
- result ingestion strategy
- multilingual launch scope
- pool creation scope

### Recommended Next Step

Use the implemented shell to capture product and UX learnings before broadening platform scope.

The next useful moves are likely:

- test the pick entry and review rhythm with real users
- document any friction around score entry, save behavior, and locked-state expectations
- decide which normalized seed shapes should become the app-facing tournament data contract
- enrich the normalized team and fixture seeds with any missing fields the product will need later
- refine the open business rules that most affect the current UI:
  - scoring model
  - knockout handling
  - pick editing semantics
  - identity and join flow

### Resume Prompt

If helpful next session, start with:

`Use the resume-work skill, inspect the implemented frontend discovery shell, then tighten the highest-leverage UX or rule gaps without pulling in auth, invites, or database-first architecture.`

The `resume-work` skill should remain part of the normal workflow because this project may sit idle between sessions and should be easy to restart without relying on memory.
