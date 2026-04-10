---
name: session-handoff
description: Leave the repository in a resumable state after meaningful work. Use at the end of a session or before a likely gap in work.
---

# Session Handoff

## When To Use

Use at the end of a meaningful session or before a likely gap in work.

## How To Use

Ask for this skill when you want the agent to leave the repository in a state that is easy to resume later.

Example prompts:

- `Prepare a session handoff.`
- `Use the session-handoff skill before we stop.`
- `Capture what changed, what is open, and what should happen next.`

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

## Default Pattern

1. Read the current implementation plan and any canonical docs affected by the session's work.
2. Capture the session in four parts:
   - what changed
   - why it changed
   - what remains open
   - what should happen next
3. Prefer updating the existing canonical doc that future sessions will already read, usually `docs/implementation-plan/current.md`.
4. If the session resolved or created decision needs, update `docs/open-questions/index.md` as part of the same handoff.
5. If the work changed durable product or architecture understanding, update the relevant canonical doc before writing the handoff summary.
6. Keep the handoff concise enough to scan quickly after a long gap.
7. End with one concrete recommended next step or resume prompt.

## Validation Checklist

- Confirm the handoff answers what changed, why, what is open, and what is next.
- Confirm the next step is actionable and not just "continue work."
- Confirm resolved questions were not left in the open-questions list by accident.
- Confirm the handoff lives in a canonical location future sessions are expected to read.
- Confirm the note is concise and not a session diary.

## Guardrails

- Do not add a handoff note without first updating the canonical docs that actually changed.
- Do not bury important open questions inside a narrative paragraph.
- Do not create a separate temporary handoff file when an existing canonical doc should carry it.
- Do not let the handoff become a changelog of every minor edit.
