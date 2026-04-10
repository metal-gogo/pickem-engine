---
name: update-scope
description: Update the current product scope after a scope decision changes. Use when MVP boundaries, priorities, or explicit non-goals need to be revised.
---

# Update Scope

## When To Use

Use when product direction, MVP boundaries, or non-goals change.

## How To Use

Ask for this skill when scope needs to be revised and reflected in the canonical product-scope doc.

Example prompts:

- `Update the scope based on this new MVP decision.`
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
