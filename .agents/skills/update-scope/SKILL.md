---
name: update-scope
description: Update the current product scope after a scope decision changes. Use when release boundaries, priorities, or explicit non-goals need to be revised.
---

# Update Scope

## When To Use

Use when product direction, release boundaries, or non-goals change.

## How To Use

Ask for this skill when scope needs to be revised and reflected in the canonical product-scope doc.

Example prompts:

- `Update the scope based on this new release decision.`
- `Use the update-scope skill for this change in priorities.`
- `Revise the current product scope and note what moved in and out.`

## Required Inputs

- the new or changed scope decision
- why the change matters
- what moved in or out of scope

## Expected Outputs

- an updated `docs/product-scope/current.md`
- a new archive snapshot if the change is substantial
- any linked open-question cleanup

## Quality Bar

- concise
- explicit about boundaries
- consistent with decision records and implementation priorities

## Output Location

- `docs/product-scope/current.md`
- optional `docs/product-scope/archive/`

## Default Pattern

1. Read the current scope, implementation plan, open questions, and any decision record that prompted the scope change.
2. Identify the exact boundary shift:
   - newly in scope
   - newly out of scope
   - reprioritized but still in scope
3. Update `docs/product-scope/current.md` so the current direction is explicit and consistent:
   - product direction
   - in-scope and out-of-scope boundaries
   - near-term priorities
   - open edges, if still unresolved
4. If the shift materially re-baselines the project, create an archive snapshot of the previous scope state.
5. Update linked canonical docs when the scope change resolves or creates open questions.
6. Keep the scope practical for the smallest coherent platform slice unless a larger change was explicitly chosen.
7. Summarize the boundary change and its effect on the next implementation slice.

## Validation Checklist

- Confirm the new scope reflects a real decision, not a temporary guess.
- Confirm in-scope and out-of-scope sections do not contradict each other.
- Confirm the implementation plan still matches the updated direction.
- Confirm resolved open questions were cleaned up.
- Confirm any archive snapshot was created only for a meaningful re-baseline.

## Guardrails

- Do not broaden scope implicitly through wording drift.
- Do not move something into scope without making the tradeoff visible.
- Do not archive for minor wording edits.
- If the scope impact is still uncertain, record the uncertainty as an open question instead of forcing a scope decision.
