# Current Implementation Plan

- Last updated: 2026-04-11

## Planning Objective

Create a clean product and documentation foundation that makes later implementation work straightforward and resumable.

## Current Phase

Product definition and discovery prototype shaping.

## Working Rule

For meaningful implementation bets, prioritize one integrated piece working end to end before broadening infrastructure or edge workflows.

That piece should be:

- core to the product's value
- small enough to complete and inspect quickly
- novel enough to teach something important

This is a sequencing rule, not a redefinition of the MVP.

## Near-Term Work

1. Finalize the documentation system and canonical files.
2. Shape the first discovery prototype around the core pick workflow:
   - fixed fixture data
   - exact-score entry
   - local persistence
   - review and edit flow
3. Use prototype findings to refine business rules, glossary terms, and the eventual MVP flow.
4. Resolve the highest-leverage deferred MVP questions once the core interaction model is more concrete:
   - scoring model
   - knockout match handling
   - identity and join flow
   - result ingestion strategy
   - pool creation scope

## Current Prototype Bet

### Confirmed Direction

- the eventual product direction remains a private World Cup 2026 pool for friends and family
- the prototype is for discovery, not a redefinition of the MVP
- the first slice should validate the central prediction workflow before broadening surrounding systems

### Prototype Assumptions

- one local user
- fixed fixture data instead of live ingestion
- exact score entry for included matches
- local persistence instead of database-backed persistence
- review and edit flow before any real multi-user or pool workflow

### Deferred MVP Concerns

- identity and join flow
- pool creation mechanics
- invite flow
- database-backed persistence
- official results ingestion infrastructure
- multi-user permissions and membership

### Exit Criteria

- the core flow can be clicked through from fixture viewing to score entry to save to review and edit
- the prototype exposes concrete UX friction or domain-model gaps worth documenting
- the resulting learnings can be translated into clearer business rules, domain language, or MVP decisions
- the prototype remains small enough that it does not turn into accidental long-term architecture

## Ready Soon

- deeper domain modeling for tournament, match, pool, and pick concepts
- a more concrete MVP flow
- implementation task breakdowns once the prototype findings have clarified the next durable decisions

## Current Blockers

- no exact scoring table yet
- no finalized knockout scoring rule yet
- no decided MVP identity model yet
- no chosen ingestion approach yet
- the first prototype slice still needs to stay tightly bounded so it does not absorb surrounding concerns

## Planning Guardrails

- do not choose stack details before product constraints require it
- keep the MVP coherent and small
- preserve flexibility for later public growth without optimizing for it prematurely
- do not let prototype shortcuts leak into canonical business rules
- do not let temporary scaffolding harden into accidental architecture
- do not expand the prototype without explicit exit criteria

## Session Handoff

### What Changed

- Kept the `resume-work` skill as the standard re-entry path for irregular sessions so future work can restart from current docs and repo state instead of memory alone.
- Accepted a lightweight Shape Up-inspired sequencing rule: get one small, core, novel vertical slice working before broadening infrastructure or edge workflows.
- Chose the first slice as a local-first discovery prototype of the pick workflow:
  - fixture viewing
  - exact-score entry
  - local save
  - review and edit
- Clarified that this prototype does not replace the MVP direction; identity, pool mechanics, and ingestion remain deferred MVP concerns.

### What Is Still Open

- exact scoring model
- knockout match handling
- identity and join flow
- result ingestion strategy
- multilingual launch scope
- pool creation scope

### Recommended Next Step

Shape the smallest useful prototype slice in enough detail to implement without dragging in surrounding systems.

The first version should stay bounded to one local user, fixed fixture data, exact-score entry, local persistence, and review/edit flow.

### Resume Prompt

If helpful next session, start with:

`Use the resume-work skill, confirm the prototype boundaries and exit criteria, then implement the smallest local-first pick workflow slice without pulling in auth, invites, or database-first architecture.`

The `resume-work` skill should remain part of the normal workflow because this project may sit idle between sessions and should be easy to restart without relying on memory.
