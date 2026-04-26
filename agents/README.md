# Agent Roles

This folder defines practical project roles for future coding and documentation agents.

These are lightweight working guides, not strict process machinery.

Use them when a task benefits from a focused role with a clear output shape.

`agents/team-baseline.md` maps these shared roles onto the current Claude Code, Codex, and Cursor agent features.

Repo-backed agent artifacts currently live in:

- `.claude/agents/`

Codex and Cursor specifics are documented in `agents/team-baseline.md`.

## How To Use These Roles

Start with the role that owns the canonical file or decision stream you expect to change.

- `product-strategist` for scope, release boundaries, and product tradeoffs
- `business-rules-steward` for confirmed rules, glossary alignment, and domain language
- `technical-architect` for architecture direction and technical implications
- `implementation-planner` for near-term slices, sequencing, and blockers
- `documentation-editor` for concise wording, cleanup, and cross-doc consistency

For most tasks, use one primary role and let it keep end-to-end ownership. Add one advisor when you want a second perspective. Use the full team only when the work splits cleanly across separate files, documents, or investigation threads.

## Will The Client Pick The Right Agent?

Sometimes, but do not treat automatic selection as the baseline contract.

- Claude Code can delegate based on subagent descriptions, so clear role names help.
- Codex custom-agent descriptions can also guide spawned agents, but this repo does not currently track `.codex/agents/`, so explicit prompts are the reliable default here.
- Cursor custom modes and background agents are selected and launched explicitly.

If the task matters, name the role you want. If the role is unclear, start with the owner of the canonical file you expect to change.

## Parallel Work

Parallel work is useful when each agent can own a separate file, document, or investigation path.

- good fit: independent research, multi-file doc updates, cross-layer review, or separate ownership areas
- poor fit: same-file edits, one decision stream, or tasks where later steps depend on earlier findings

If two roles need the same file, let one gather findings and let the owner apply the final edit.
