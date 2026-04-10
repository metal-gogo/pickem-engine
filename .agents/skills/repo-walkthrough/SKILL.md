---
name: repo-walkthrough
description: Walk through the repository in small, readable chunks with pauses between sections. Use when someone wants a guided tour of the repo instead of a one-shot summary.
---

# Repo Walkthrough

## When To Use

Use when someone wants a guided tour of the repository instead of a one-shot summary.

This skill is especially useful for:

- onboarding to the project
- recovering context after a gap in work
- understanding how the repo is organized before making changes

## Required Inputs

- the repository or sub-area to walk through
- the user's apparent familiarity level, if known
- whether the walkthrough should stay high-level or go deeper into selected areas

## Expected Outputs

- a guided explanation of the repository in small, readable chunks
- clear stopping points between chunks
- an invitation for the user to ask for the next section before continuing

## Quality Bar

- generous with context, but not overwhelming
- starts from structure and orientation before deep details
- explains why files and folders exist, not just what they are called
- adapts depth when the user seems new or already familiar
- avoids dumping the whole repo at once

## Output Location

- chat response only

## Walkthrough Pattern

1. Start with a short orientation:
   - what kind of repository this is
   - what the main top-level areas are
   - what the user should expect from the walkthrough
2. Cover one small chunk at a time:
   - top-level structure first
   - then one folder or concern at a time
   - then deeper file-level explanation only where useful
3. After each chunk:
   - summarize the key takeaway
   - stop
   - wait for the user to ask for more

## Default Chunk Order

- repository purpose and top-level layout
- canonical docs and how project truth is organized
- agent and skill guides
- implementation-relevant areas, if they exist
- any selected deep dive the user asks for

## Guardrails

- Do not flood the user with a full repo dump in one response.
- Do not assume the user needs the deepest technical detail immediately.
- Do not skip the "why" behind the structure.
- If the repo is sparse or early-stage, say so clearly and explain the intended shape.

