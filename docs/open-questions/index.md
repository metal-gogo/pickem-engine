# Open Questions Index

- Last updated: 2026-04-25

This is the active list of unresolved questions that still affect planning or implementation.

## Active Questions

### OQ-001 Exact Scoring Model

Question:
What exact point table should the product use for exact-score picks?

Why it matters:
This is the main unresolved rule driving scoring logic, UI copy, and test cases.

Decision needed:
A concrete scoring formula.

### OQ-002 Knockout Match Handling

Question:
How should knockout matches be predicted and scored when teams draw in regular time?

Why it matters:
This changes both the pick format and how official results should be interpreted.

Decision needed:
A clear rule for score interpretation, advancement, and points.

### OQ-003 Identity And Join Flow

Question:
With WorkOS AuthKit chosen as the auth provider, how should authenticated users join a private pool and become pool participants in MVP?

Why it matters:
This affects onboarding, permissions, invites, user-to-participant mapping, pool ownership, and product complexity.

Decision needed:
A lightweight MVP join model, including invite mechanics, pool roles, and how WorkOS users map to app users and pool participants.

### OQ-004 Results Ingestion Strategy

Question:
Will the product rely on an external sports data provider, manual administration, or a hybrid approach?

Why it matters:
This affects architecture, admin tooling, and operational risk.

Decision needed:
A preferred initial strategy with fallback expectations.

### OQ-005 Multilingual Scope

Question:
Is multilingual support part of MVP or should the first release be single-language while remaining localization-ready?

Why it matters:
This affects content structure, UX planning, and implementation effort.

Decision needed:
A launch-language plan.

### OQ-006 Pool Creation Scope

Question:
Must users be able to self-create pools in MVP, or can initial pools be provisioned manually?

Why it matters:
This determines how much pool-management functionality is required for the first usable release.

Decision needed:
Whether self-serve pool creation is v1 or later.

## Review Notes

- Resolved questions should be moved into the canonical docs they affect.
- Archive the previous active set when the question list is substantially re-baselined.
