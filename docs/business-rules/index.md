# Business Rules Index

- Last updated: 2026-04-09

This file is the current register of confirmed and unresolved business rules.

## Confirmed Rules

### BR-001 Match Pick Format

Participants predict the exact score for each included match.

### BR-002 Pool Visibility

Pools are private and invite-only in the initial direction.

### BR-003 Scoring Ownership

The platform uses one shared scoring model in MVP rather than per-pool scoring customization.

### BR-004 Prediction Locking

The initial direction is one platform-defined deadline before the tournament starts.

### BR-005 Result Source Of Truth

Leaderboards and scoring must use official results recognized by the platform.

### BR-006 Leaderboard Timing

Leaderboards should update after official results are available.

## Rule Areas Still Open

### BR-O1 Exact Scoring Table

The scoring categories are known, but the exact point values are not yet decided.

Why it matters:
This affects scoring logic, UI explanations, and tests.

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

## Usage Notes

- Add new confirmed rules here as the canonical source.
- If a rule becomes complex enough, add a dedicated file and link it from this index.
- Keep wording implementation-relevant and testable where possible.

