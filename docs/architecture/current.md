# Current Architecture Direction

- Last updated: 2026-04-09

## Technical Direction

Keep the initial system lean and practical.

The architecture should support:

- a web-based product
- private pool workflows
- exact score picks
- official-result-based scoring
- enough flexibility to support future tournaments later

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

## Known Unknowns

- how identity should work in MVP
- how result ingestion should work in MVP
- whether multilingual support is MVP or later
- how much tournament progression needs to be modeled explicitly

