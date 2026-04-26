# 026 Use Constrained Pool Scoring Settings

- Status: accepted
- Date: 2026-04-25

## Context

The product is moving from exploration into a platform build. Pool owners need enough control to make a private pool feel personal, but fully custom scoring would make setup, explanations, scoring tests, and leaderboard trust much harder.

The scoring setup also needs to support tournament-level bonus predictions without making every pool a custom rules engine.

## Decision

Use platform-defined scoring categories with constrained pool-level point settings.

Pool owners can configure:

- required winner-or-draw points, which cannot be disabled
- optional exact result bonus points, enabled or disabled per pool
- optional tournament top scorer bonus points, enabled or disabled per pool
- optional tournament best-player bonus points, enabled or disabled per pool
- optional World Cup champion bonus points, enabled or disabled per pool

Pool owners cannot configure custom scoring formulas, custom scoring categories, per-match point overrides, custom deadlines, or custom tournament advancement rules.

## Reasoning

This gives pool owners meaningful control over the personality of a pool while keeping the product understandable and testable.

Winner-or-draw points are the required base category because every exact score prediction also implies a match outcome. Exact result points are treated as a bonus so the app can explain scoring as a base outcome reward plus an optional precision reward.

Tournament-level bonuses are fun and familiar for World Cup pools, but keeping them as platform-defined categories avoids a broad custom-rule builder.

## Consequences

- Pool setup needs constrained controls for point values and optional bonus toggles.
- Scoring code should model a pool scoring configuration, not an arbitrary formula.
- UI should include a reusable scoring-system summary that can appear during setup, dashboard review, pick review, and rules pages.
- The app should include a tournament-rules surface for real World Cup rules such as group advancement and knockout progression.
- Default point values, allowed ranges, and validation constraints still need a separate decision.
- Official definitions for tournament top scorer and tournament best-player bonuses still need a separate decision.
