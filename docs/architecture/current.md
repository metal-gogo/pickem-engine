# Current Architecture Direction

- Last updated: 2026-04-18

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

- how identity should work in MVP
- how result ingestion should work in MVP
- whether multilingual support is MVP or later
- how much tournament progression needs to be modeled explicitly
