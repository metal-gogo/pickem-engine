---
name: create-skill
description: Design and add a new reusable project skill when a recurring task deserves its own playbook. Use when a workflow is showing up often enough that it should become a skill under .agents/skills/.
---

# Create Skill

## When To Use

Use when a recurring task, workflow, or collaboration pattern should become a reusable project skill.

This skill is especially useful when:

- the same kind of request keeps appearing across sessions
- a repeated task needs more consistency
- a useful pattern is currently living only in chat history
- a workflow should be easier for future Gemini, Claude, or human operators to invoke

## How To Use

Ask for this skill when you want the agent to design and add a new skill to the repository.

Example prompts:

- `Create a new skill for reviewing API contracts.`
- `Use the create-skill skill for this recurring documentation workflow.`
- `This keeps coming up. Turn it into a reusable skill.`

## Required Inputs

- the recurring task or pattern
- when the skill should be used
- what good output looks like
- where the resulting work should go
- any constraints or guardrails the skill should encode

## Expected Outputs

- a new skill directory under `.agents/skills/`
- a `SKILL.md` file with frontmatter and practical instructions
- updates to related repo guidance if discoverability should improve

## Quality Bar

- solves a real repeated need, not a one-off task
- is specific enough to guide behavior without becoming rigid
- uses short, practical wording
- includes natural examples of how to invoke the skill
- fits the existing skill layout and naming style

## Output Location

- `.agents/skills/<skill-name>/SKILL.md`
- optional related updates to `AGENTS.md`, `.agents/skills/README.md`, or repo entrypoints

## Default Pattern

1. Confirm the repeated pattern is real enough to deserve a skill.
2. Pick a short, durable skill name.
3. Define when to use it and what it should produce.
4. Add a `How To Use` section with natural example prompts.
5. Add a `Default Pattern` that makes the workflow repeatable instead of leaving it implied.
6. Add a `Validation Checklist` so the skill can be checked quickly after use or revision.
7. Add only the guardrails needed to keep the skill useful and low-maintenance.
8. Keep the skill lean; move detailed variants, templates, or examples into `references/` only when the main file starts getting heavy.
9. Update supporting repo guidance only if it improves discovery or consistency.

## Validation Checklist

- Confirm the skill addresses a repeated workflow, not a one-off request.
- Confirm the frontmatter description is clear enough to trigger on the right requests.
- Confirm the body explains when to use the skill, how it works, and what good output looks like.
- Confirm the skill includes a `Default Pattern`, `Validation Checklist`, and `Guardrails`.
- Confirm the file stays concise enough to read quickly.
- Confirm any extra detail moved out of `SKILL.md` is referenced clearly rather than duplicated.

## Guardrails

- Do not create a skill for a one-off request.
- Do not duplicate an existing skill with slightly different wording.
- Do not let the skill become a long generic template.
- Prefer one clear responsibility per skill.
