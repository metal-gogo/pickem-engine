---
name: resume-work
description: Rebuild context after a gap and propose the next concrete move. Use when someone wants to retake the work without manually re-reading the whole repository.
---

# Resume Work

## When To Use

Use when someone is returning to the repository after a gap and needs to recover context quickly.

This skill is especially useful when:

- a previous session ended without obvious next steps in mind
- the user wants to retake the work without re-reading everything manually
- a future agent needs to separate confirmed project truth from stale notes or assumptions
- the next move matters more than a full repo tour

## How To Use

Ask for this skill when you want the agent to rebuild context and tee up the next concrete task.

Example prompts:

- `Use the resume-work skill.`
- `Help me retake the work.`
- `Catch me up on where this repo stands and what we should do next.`

## Required Inputs

- the repository or area to resume, if narrower than the whole repo
- whether the user wants a broad catch-up or a focused restart
- whether the skill should stop at orientation or continue into the next task

## Expected Outputs

- a concise current-state summary grounded in canonical docs and repo state
- explicit separation between confirmed decisions, working assumptions, and open questions
- the most likely next concrete move
- optional cleanup to a stale handoff note when the repo's canonical resume path has drifted

## Quality Bar

- optimized for fast context recovery after a gap
- grounded in current canonical docs, not chat history alone
- points to one concrete next move instead of ending with a vague summary
- keeps the user oriented without dumping every file

## Output Location

- usually chat response only
- sometimes a small update to `docs/implementation-plan/current.md` or another canonical doc if the resume path is stale

## Default Pattern

1. Read the canonical docs named in `AGENTS.md`, starting with the highest-signal files for current state.
2. Inspect live repo state that affects resuming work:
   - `git status`
   - any relevant recent changes
   - the current handoff note if one exists
3. Summarize the repo in four parts:
   - confirmed decisions
   - working assumptions
   - open questions
   - the next recommended move
4. Keep the next move small, concrete, and dependency-aware.
5. If the user wants to continue immediately, begin the recommended task instead of stopping at summary.
6. If the canonical resume path is stale or misleading, update the relevant canonical doc before handing off the recommendation.

## Validation Checklist

- Confirm the summary is grounded in canonical docs and current repo state.
- Confirm confirmed decisions, working assumptions, and open questions are separated clearly.
- Confirm the response names one concrete next move.
- Confirm the skill avoids a full repo dump when a concise restart is enough.
- Confirm any doc update only fixes the canonical resume path rather than adding a parallel note.

## Guardrails

- Do not invent missing decisions just to make the repo feel more settled.
- Do not confuse a prior session note with a confirmed business rule or product decision.
- Do not default to a full repo walkthrough when a focused restart is enough.
- Do not leave the user with "continue work" as the only next step.
