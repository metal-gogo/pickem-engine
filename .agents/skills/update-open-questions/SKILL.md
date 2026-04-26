---
name: update-open-questions
description: Maintain the active unresolved-question list for the project. Use when a question is added, reworded, reprioritized, or resolved.
---

# Update Open Questions

## When To Use

Use when a question is added, reworded, reprioritized, or resolved.

## How To Use

Ask for this skill when the active unresolved-question list should be updated after new discussion or a new decision.

Example prompts:

- `Update the open questions based on this discussion.`
- `Use the update-open-questions skill for the release decisions we just made.`
- `Remove the resolved questions and add the new ones.`

## Required Inputs

- the question
- why it matters
- what kind of decision is needed

## Expected Outputs

- an updated `docs/open-questions/index.md`
- removal or revision of resolved questions
- links to any canonical docs that changed because of the resolution

## Quality Bar

- focuses on active decision needs
- avoids vague brainstorming lists
- keeps the question set small and useful

## Output Location

- `docs/open-questions/index.md`
- optional `docs/open-questions/archive/`

## Default Pattern

1. Read the current open-questions index and the canonical docs affected by the discussion.
2. Decide whether each discussed item is:
   - a still-open decision
   - a resolved question that should be removed
   - a reframed question that needs sharper wording
   - a non-question that belongs in scope, rules, or a decision record instead
3. Write each open question so it includes:
   - the decision to be made
   - why it matters
   - the form of answer needed
4. Keep the set focused on active blockers or meaningful planning uncertainties.
5. Remove or revise resolved questions when the answer now exists in a canonical doc.
6. If a substantial re-baseline happened, archive the old set and keep the current index lean.
7. Summarize which questions were added, removed, reframed, or intentionally left open.

## Validation Checklist

- Confirm every listed item is actually unresolved.
- Confirm each question asks for a decision, not a broad exploration topic.
- Confirm resolved items now point to the canonical doc that answered them.
- Confirm wording is concise and specific enough to guide future planning.
- Confirm the list remains small enough to be useful.

## Guardrails

- Do not keep resolved questions around as historical clutter in the active list.
- Do not add vague brainstorm items with no clear decision need.
- Do not use the open-questions doc as a backlog for implementation tasks.
- If the answer is already decided elsewhere, update the canonical doc link and remove the question instead of restating it.
