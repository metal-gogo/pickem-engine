# Business Rules Index

- Last updated: 2026-05-01

This file is the current register of confirmed and unresolved business rules.

## Confirmed Rules

### BR-001 Match Pick Format

Participants predict the exact score for each included match.

### BR-002 Pool Visibility

Pools are private and invite-only in the initial direction.

### BR-003 Scoring Ownership

The platform owns the scoring categories, scoring formula, and tournament-result interpretation.

Pool owners may configure only the constrained point settings explicitly supported by the platform. They cannot create custom scoring formulas, custom match categories, per-match overrides, pool-specific deadlines, or custom tournament advancement rules.

### BR-004 Prediction Locking

The initial direction is one platform-defined deadline before the tournament starts.

### BR-005 Result Source Of Truth

Leaderboards and scoring must use official results recognized by the platform.

### BR-006 Leaderboard Timing

Leaderboards should update after official results are available.

### BR-007 Pool Scoring Settings

Each pool has a scoring configuration made from platform-defined categories:

| Category                     | Required? | Pool Owner Control                                                      |
| ---------------------------- | --------- | ----------------------------------------------------------------------- |
| Winner or draw               | Yes       | Set the point value. This category cannot be disabled.                  |
| Exact result bonus           | No        | Enable or disable the bonus and set the bonus point value when enabled. |
| Tournament top scorer bonus  | No        | Enable or disable the bonus and set the point value when enabled.       |
| Tournament best-player bonus | No        | Enable or disable the bonus and set the point value when enabled.       |
| World Cup champion bonus     | No        | Enable or disable the bonus and set the point value when enabled.       |

The exact result category is a bonus layered on top of the required winner-or-draw category, not a separate custom formula.

### BR-008 Scoring Explanation

The app must expose a clear scoring-system summary anywhere users need to understand how points work, including pool setup, pool dashboard, pick review, and rules surfaces.

### BR-009 Tournament Rules

The app should explain the actual World Cup rules that affect prediction comprehension, such as group advancement and knockout progression. Pool owners cannot customize tournament rules.

## Rule Areas Still Open

### BR-O1 Scoring Defaults And Bounds

The configurable scoring categories are known, but default point values, allowed ranges, and validation rules are not yet decided.

Why it matters:
This affects pool setup, scoring logic, UI explanations, and tests.

### BR-O2 Knockout Match Semantics

It is still unresolved how knockout matches should be predicted and scored when advancement depends on extra time or penalties.

Why it matters:
This affects data modeling, pick UX, and scoring behavior.

### BR-O3 Pick Editing Before Deadline

It is still unclear whether participants can edit picks freely until the deadline or only submit once.

Why it matters:
This affects the submission flow and audit expectations.

### BR-O4 Tie-Break Rules

Leaderboard tie-break rules are not yet defined.

Why it matters:
This affects ranking determinism and end-of-tournament outcomes.

### BR-O5 Bonus Result Definitions

The official source and tie-break handling for tournament top scorer and tournament best-player bonuses are not yet defined.

Why it matters:
This affects result ingestion, scoring tests, and user-facing rule copy.

### BR-O6 Global Deadline Timestamp

The app will use one platform-defined global prediction deadline before the tournament starts, but the exact timestamp and time zone policy are not yet defined.

Why it matters:
This affects pick locking, user-facing deadline copy, seed configuration, and tests.

## Usage Notes

- Add new confirmed rules here as the canonical source.
- If a rule becomes complex enough, add a dedicated file and link it from this index.
- Keep wording implementation-relevant and testable where possible.
