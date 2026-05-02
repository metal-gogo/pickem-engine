# Current Product Scope

- Last updated: 2026-05-01

## Product Direction

Build a shareable World Cup 2026 pick'em platform that starts with private pools and useful public tournament information, while staying structured enough to grow later.

The first version is for friends and family, but the project should stay flexible enough to become a public product if it proves compelling.

## Current North Star

Build the platform path for private World Cup pools, supported by public World Cup information pages that explain the tournament before a user signs in.

## Target User

- Primary: friends and family joining a private pool for the 2026 FIFA World Cup
- Later: broader public users if the product is worth opening up

## In Scope Right Now

- private, invite-only pool experience
- unauthenticated public World Cup 2026 tournament, group, and team information pages
- 2026 FIFA World Cup as the initial tournament target
- self-serve pool creation and configuration
- exact score predictions for matches
- one platform-owned scoring model with constrained pool-level point settings
- required winner-or-draw points configured by the pool owner
- optional bonuses for exact result, tournament top scorer, tournament best player, and World Cup champion
- a reusable scoring-system summary component or surface
- tournament-rules explanation surfaces for real World Cup advancement and knockout rules
- downloadable calendar exports for the whole tournament, individual teams, and individual groups where the schedule is known
- one global prediction deadline before the tournament starts
- official-result-based scoring and leaderboard updates
- documentation and planning structure that supports stop-and-start development

## Out Of Scope For Now

- public/discoverable pools
- public pool discovery, public pool standings, or unauthenticated access to private pool data
- monetization design beyond keeping future flexibility in mind
- custom scoring formulas, custom scoring categories, or per-match scoring overrides
- pool-specific custom deadlines
- pool-specific tournament rules
- notifications as a required v1 feature
- technology exploration that delays the selected platform build path

## Near-Term Priorities

1. Keep the project definition clear and durable.
2. Build from the selected platform architecture and keep setup decisions reversible where possible.
3. Make the configurable scoring rules explicit enough to design, implement, and test.
4. Use the public tournament information pages as a seed-backed blueprint for future database-backed tournament, team, venue, match, and calendar data.
5. Keep future extensibility in mind without overengineering for it.

## Explicit Non-Goals For Now

- building a generic sports platform before proving the World Cup use case
- creating a heavy documentation process
- reopening settled implementation technology choices without a concrete blocker

## Open Edges

- default scoring point values, allowed ranges, and validation constraints are still open
- knockout-stage prediction rules are still open
- authenticated join and invite flow details are still open
- result ingestion strategy is still open
- multilingual launch scope is still open
- official bonus-result definitions are still open
- exact global prediction deadline timestamp and time zone policy are still open
