# 001 Docs Structure

- Status: accepted
- Date: 2026-04-09

## Context

This project will be developed across many separate sessions and may sit idle for stretches of time. Without a deliberate documentation system, the main risk is losing context about what the project is, why a decision was made, and what should happen next.

## Decision

Use a layered documentation structure with:

- canonical `current.md` files for present-state truth
- `index.md` files for collections and registers
- `archive/` folders for historical snapshots
- durable numbered decision records for cross-cutting choices

Keep the system lightweight and practical rather than process-heavy.

## Consequences

- Future sessions should be able to recover product and technical context quickly.
- The repository has one clear home for current scope, rules, questions, planning, and glossary terms.
- New docs should fit into the existing structure instead of being scattered across ad hoc notes.

