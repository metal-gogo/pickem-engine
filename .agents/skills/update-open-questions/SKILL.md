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
- `Use the update-open-questions skill for the MVP decisions we just made.`
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
