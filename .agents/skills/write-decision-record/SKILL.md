---
name: write-decision-record
description: Record a durable project decision and its reasoning. Use when the reasoning should remain easy to recover in future sessions.
---

# Write Decision Record

## When To Use

Use when a durable project decision has been made and the reasoning should remain easy to recover later.

## How To Use

Ask for this skill when a decision should be preserved as a numbered decision record instead of living only in chat.

Example prompts:

- `Write a decision record for this choice.`
- `Use the write-decision-record skill for the new docs policy.`
- `Capture this as a durable project decision.`

## Required Inputs

- decision summary
- decision date
- context and tradeoff
- consequences

## Expected Outputs

- a new numbered decision record in `docs/decisions/`
- an updated `docs/decisions/index.md`

## Quality Bar

- short
- clear about what was decided
- captures why the choice was made without becoming an essay

## Output Location

- `docs/decisions/`

## Default Pattern

1. Read the relevant canonical docs to confirm the decision is real, current, and cross-cutting enough to deserve a record.
2. Identify the minimum durable reasoning to preserve:
   - context
   - decision
   - tradeoffs considered
   - consequences
3. Assign the next decision number and create a concise title.
4. Write the record so a future session can recover both the answer and why it was chosen.
5. Update `docs/decisions/index.md`.
6. Update any canonical doc that now reflects the accepted decision.
7. Remove or revise related open questions if the decision resolved them.

## Validation Checklist

- Confirm the record captures a durable decision, not a passing idea.
- Confirm the title says what was decided.
- Confirm the reasoning is short but sufficient to recover later.
- Confirm related canonical docs were updated to match the new decision.
- Confirm the decisions index includes the new record.

## Guardrails

- Do not write a decision record for a reversible one-off wording tweak.
- Do not let the record become an essay or meeting transcript.
- Do not leave the decision record as the only place where the current state is reflected.
- If the decision is not actually settled, keep it as an open question instead.
