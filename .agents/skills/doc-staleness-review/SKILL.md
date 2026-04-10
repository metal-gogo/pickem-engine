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
