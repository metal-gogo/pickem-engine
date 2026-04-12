# 005 Shape Work Around One Core Vertical Slice

- Status: accepted
- Date: 2026-04-11

## Context

The project is still early, and there is a real risk of mistaking layered setup work for meaningful progress. It would be easy to spend time on identity, pool creation, invite flow, storage, and infrastructure decisions before proving that the core prediction workflow is understandable, practical, and worth building around.

At the same time, the project still needs discipline. A prototype-first approach should not become an excuse to avoid core MVP constraints forever or to let temporary shortcuts quietly redefine the product.

## Decision

Use a lightweight Shape Up-inspired sequencing rule for meaningful implementation bets:

- prioritize one integrated piece working end to end before broadening the system
- prefer a slice that is core to the product, small enough to complete quickly, and novel enough to teach us something important
- allow temporary scaffolding around the slice when it helps learn from the center of the product first
- keep prototype assumptions explicit so they do not silently become confirmed product rules or architecture commitments

The current first slice should be a discovery prototype of the core pick workflow centered on:

- viewing fixtures
- entering exact-score predictions
- saving progress locally
- reviewing picks
- editing picks

This prototype is explicitly not a redefinition of the MVP. Identity, pool membership, invites, database-backed persistence, and result-ingestion infrastructure remain important MVP concerns, but they should not lead the work before the central prediction flow is concrete enough to evaluate.

## Consequences

- Near-term implementation work should favor a bounded local-first prototype of the core pick loop before expanding surrounding infrastructure.
- Canonical docs should distinguish clearly between confirmed decisions, prototype assumptions, open questions, and deferred MVP concerns.
- The prototype needs explicit exit criteria so it does not expand indefinitely.
- Future sessions should use the prototype findings to refine business rules, domain language, and the eventual MVP shape instead of treating the prototype as the product.
