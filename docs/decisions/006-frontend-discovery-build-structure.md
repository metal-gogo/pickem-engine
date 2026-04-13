# 006 Frontend Discovery Build Structure

- Status: accepted
- Date: 2026-04-12

## Context

The first implemented UI slice introduced reusable primitives, higher-level modules, routed screens, Storybook coverage, and a small application shell. Without a shared structure and naming baseline, the repo would be easy to grow in inconsistent ways, especially after stop-and-start sessions.

Early examples already showed the risk:

- component names drifting toward styling labels such as `PrimaryButton`
- routed screens repeating their folder context through names such as `OverviewView`
- reusable modules colliding with screen names, making it harder to tell whether a reference pointed to a page or a composable component

## Decision

Use a simple folder-based frontend structure and naming rule set for the discovery build:

- `src/app/` owns application wiring and frames
- `src/views/` owns routed screens, and screen components should omit the `View` suffix
- `src/components/` owns reusable primitives and modules
- component names should describe role rather than default styling
- subordinate components can live in nested directories beneath their parent module when that relationship is real
- reusable modules should avoid name collisions with routed screens when a more specific name improves clarity
- Storybook titles should mirror component names and may nest to reflect component hierarchy
- Storybook should be the main documentation and review surface for UI pieces, while hooks and other non-visual logic should prefer direct Vitest coverage

## Consequences

- The codebase keeps a clearer separation between application wiring, screens, reusable UI, and non-visual logic.
- Names such as `Button`, `Badge`, `StandingsList`, `StandingsRow`, `Overview`, and `Leaderboard` stay easier to understand at a glance.
- Future sessions have a more stable default for where new UI pieces should live and how they should be named.
- Storybook documentation becomes more useful as a design and communication surface instead of a collection of loosely named snapshots.
