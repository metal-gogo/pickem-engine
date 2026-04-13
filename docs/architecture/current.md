# Current Architecture Direction

- Last updated: 2026-04-12

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
- Tailwind v4 utilities, a small token-driven theme layer, and reusable UI primitives for the prototype interaction model
- a small amount of authored CSS reserved for global atmosphere, number-input normalization, and other UI details that are less readable as utility strings
- fixed fixture data and mocked leaderboard data stored separately from presentation
- localStorage behind a small persistence adapter rather than direct component access
- domain modules for pick state and lock state logic rather than embedding those rules inside React components
- colocated module folders so React components can keep their stories and related support files nearby, with domain modules able to colocate focused unit tests as they grow
- lightweight routing only for top-level screen validation
- Storybook as a UI evaluation harness for isolated component and view review
- Storybook MCP addon so agent workflows can inspect component docs, story previews, and story tests through the running Storybook instance
- Storybook viewport presets and phone-sized story variants for responsive review during UI iteration
- Storybook's Vitest addon for story-driven interaction and accessibility testing in local CLI runs
- V8 coverage reporting for the Storybook Vitest lane so component-driven test coverage can be reviewed locally
- repo-local MCP client configuration for Cursor, Claude Code, and Codex so the Storybook server can remain a project-scoped tool instead of a global machine dependency

This is an implementation shape for the discovery build, not a final commitment to the long-term product stack.

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
