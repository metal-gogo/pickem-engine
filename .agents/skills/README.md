# Project Skills

This repository keeps its reusable project skills under `.agents/skills/` so they follow the cross-client Agent Skills convention.

Each skill lives in its own directory and includes a `SKILL.md` file with YAML frontmatter plus the skill instructions.

This layout is intended to be easier for tools such as Codex, Claude Code, Cursor, and other Agent Skills-compatible clients to discover.

## Skill Opportunity Rule

When a task pattern appears repeatedly across sessions, agents should consider suggesting a new skill instead of solving the same workflow from scratch every time.

A new skill is usually worth suggesting when:

- the same kind of request has shown up more than once
- the workflow has a clear shape and repeatable output
- future sessions would benefit from a reusable playbook

Prefer suggesting a new skill over silently inventing one-off process.
