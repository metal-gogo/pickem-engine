# Current Implementation Plan

- Last updated: 2026-04-11

## Planning Objective

Create a clean product and documentation foundation that makes later implementation work straightforward and resumable.

## Current Phase

Product definition and documentation setup.

## Near-Term Work

1. Finalize the documentation system and canonical files.
2. Resolve the highest-leverage product rules:
   - scoring model
   - knockout match handling
   - identity and join flow
   - result ingestion strategy
3. Translate those decisions into stable business rules and glossary terms.
4. Define the smallest implementation slice for a real private World Cup pool.

## Ready Soon

- deeper domain modeling for tournament, match, pool, and pick concepts
- a more concrete MVP flow
- implementation task breakdowns once the blocking rules are settled

## Current Blockers

- no exact scoring table yet
- no finalized knockout scoring rule yet
- no decided MVP identity model yet
- no chosen ingestion approach yet

## Planning Guardrails

- do not choose stack details before product constraints require it
- keep the MVP coherent and small
- preserve flexibility for later public growth without optimizing for it prematurely

## Session Handoff

### What Changed

- Added a focused `resume-work` skill for future sessions that need to rebuild context after a gap and identify the next concrete move.
- Kept the skill narrow so it complements existing patterns instead of replacing them:
  - `session-handoff`
  - `update-open-questions`
  - `update-scope`
- Clarified that the repeated need was not "continue planning" in general, but "resume quickly and safely after time away."

### What Is Still Open

- exact scoring model
- knockout match handling
- identity and join flow
- result ingestion strategy
- multilingual launch scope
- pool creation scope

### Recommended Next Step

Use the next session to resolve one planning blocker end-to-end instead of adding more process tooling.

The best candidate is `OQ-003 Identity And Join Flow` or `OQ-006 Pool Creation Scope` because either decision should make the MVP shape more concrete without forcing scoring details yet.

### Resume Prompt

If helpful next session, start with:

`Use the resume-work skill, rebuild context from the canonical docs and repo state, then resolve the highest-leverage open question with the smallest reversible MVP decision.`
