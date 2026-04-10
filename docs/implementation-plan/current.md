# Current Implementation Plan

- Last updated: 2026-04-10

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

- Confirmed that the repository does not need a broad new skill for "continue implementation plan" yet.
- Reaffirmed that existing skills already cover the useful recurring patterns:
  - `session-handoff`
  - `update-open-questions`
  - `update-scope`
- Clarified that a new skill should only be added if a narrower planning workflow starts repeating across sessions.

### What Is Still Open

- exact scoring model
- knockout match handling
- identity and join flow
- result ingestion strategy
- multilingual launch scope
- pool creation scope

### Recommended Next Step

Use the next session to resolve one planning blocker end-to-end instead of broadening process tooling.

The best candidate is `OQ-003 Identity And Join Flow` or `OQ-006 Pool Creation Scope` because either decision should make the MVP shape more concrete without forcing scoring details yet.

### Resume Prompt

If helpful next session, start with:

`Review the canonical docs, pick the highest-leverage open question, and update the relevant canonical docs plus the implementation plan with the smallest reversible MVP decision.`
