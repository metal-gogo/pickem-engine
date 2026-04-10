---
name: doc-staleness-review
description: Review documentation for duplication, inconsistency, or drift. Use when the docs feel hard to trust or when newer decisions may have left stale content behind.
---

# Doc Staleness Review

## When To Use

Use when the documentation feels inconsistent, outdated, or hard to trust.

## How To Use

Ask for this skill when you want the agent to inspect a doc area for duplication, stale wording, or conflicting guidance.

Example prompts:

- `Review these docs for staleness.`
- `Use the doc-staleness-review skill on the planning docs.`
- `Check whether our docs are drifting or duplicating each other.`

## Required Inputs

- the suspected stale area
- any newer decisions or changes that may have invalidated it

## Expected Outputs

- a short list of stale or duplicate docs
- updates to canonical files
- archive recommendations if a re-baseline is needed

## Quality Bar

- focuses on trust and clarity
- removes duplication rather than moving it around
- preserves important historical context when replacing a stale doc

## Output Location

- affected canonical docs
- optional archive snapshot if needed

## Default Pattern

1. Start with the canonical docs for the area under review before reading supporting notes.
2. Identify the doc set that currently defines the topic.
3. Compare for three failure modes:
   - duplication
   - conflicting guidance
   - drift from newer decisions or current direction
4. Mark each issue as one of:
   - remove duplicate wording
   - update stale wording in the canonical source
   - archive or replace an outdated snapshot
   - leave as-is because the difference is intentional
5. Prefer fixing the canonical doc instead of adding another summary.
6. If a resolved mismatch changes project understanding, update the linked implementation plan, open questions, or decision record as needed.
7. Summarize what was stale, what was changed, and what still needs a decision rather than an edit.

## Validation Checklist

- Confirm the canonical doc now reflects the current truth.
- Confirm duplicate wording was removed instead of copied elsewhere.
- Confirm archived material is historical, not competing with current docs.
- Confirm unresolved questions remain in `docs/open-questions/index.md` rather than being hidden by wording.
- Confirm no new parallel "current" source was introduced.

## Guardrails

- Do not flatten meaningful history just to make docs shorter.
- Do not treat an open question as stale content.
- Do not create a new ad hoc note when an existing canonical file should be updated.
- If two docs disagree and the newer intent is still uncertain, surface the ambiguity instead of guessing.
