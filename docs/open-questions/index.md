# Open Questions Index

- Last updated: 2026-05-01

This is the active list of unresolved questions that still affect planning or implementation.

## Active Questions

### OQ-001 Scoring Defaults And Bounds

Question:
What default point values, allowed ranges, and validation constraints should apply to the configurable pool scoring settings?

Why it matters:
This affects pool setup UX, scoring logic, UI copy, and test cases.

Decision needed:
A concrete default configuration and validation policy for required winner-or-draw points and optional bonus point values.

### OQ-002 Knockout Match Handling

Question:
How should knockout matches be predicted and scored when teams draw in regular time?

Why it matters:
This changes both the pick format and how official results should be interpreted.

Decision needed:
A clear rule for score interpretation, advancement, and points.

### OQ-003 Identity And Join Flow

Question:
With WorkOS AuthKit chosen as the auth provider, how should authenticated users join a private pool and become pool participants?

Why it matters:
This affects onboarding, permissions, invites, user-to-participant mapping, pool ownership, and product complexity.

Decision needed:
A lightweight join model, including invite mechanics, pool roles, and how WorkOS users map to app users and pool participants.

### OQ-004 Results Ingestion Strategy

Question:
Will the product rely on an external sports data provider, manual administration, or a hybrid approach?

Why it matters:
This affects architecture, admin tooling, and operational risk.

Decision needed:
A preferred initial strategy with fallback expectations.

### OQ-005 Multilingual Scope

Question:
Should the first platform release be single-language while remaining localization-ready, or should multilingual support ship from the start?

Why it matters:
This affects content structure, UX planning, and implementation effort.

Decision needed:
A launch-language plan.

### OQ-006 Bonus Result Definitions

Question:
Which official result source and tie-break handling should resolve tournament top scorer and tournament best-player bonus predictions?

Why it matters:
This affects scoring determinism, result ingestion, and how rules are explained to users.

Decision needed:
A specific official-source policy for bonus prediction outcomes.

### OQ-007 Global Deadline Timestamp

Question:
What exact timestamp and time zone policy should define the one global prediction deadline for the 2026 FIFA World Cup tournament?

Why it matters:
The database now supports a tournament-level lock timestamp, but the seed leaves it unset so the prototype deadline is not silently promoted into production behavior.

Decision needed:
A concrete lock timestamp, time zone, display policy, and confirmation that the deadline applies to all pools for the tournament.

## Review Notes

- Resolved questions should be moved into the canonical docs they affect.
- Archive the previous active set when the question list is substantially re-baselined.
