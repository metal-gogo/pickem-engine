---
name: session-handoff
description: Leave the repository in a resumable state after meaningful work. Use at the end of a session or before a likely gap in work.
---

# Session Handoff

## When To Use

Use at the end of a meaningful session or before a likely gap in work.

## Required Inputs

- what changed
- what remains open
- what should happen next

## Expected Outputs

- updates to the relevant canonical docs
- a concise note in the implementation plan or open questions if the next step changed materially

## Quality Bar

- optimized for fast context recovery
- captures why the work mattered
- leaves a clear next move

## Output Location

- usually `docs/implementation-plan/current.md`
- sometimes `docs/open-questions/index.md` or another affected canonical doc

