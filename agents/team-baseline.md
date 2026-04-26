# Agent Team Baseline

- Last reviewed: 2026-04-10

## Purpose

Define one shared team shape that works across Claude Code, Codex, and Cursor.

Use the role briefs in `agents/` as the source of truth for role intent. Keep client-specific setup as thin as possible.

## Team

| Role | Purpose | Primary ownership |
| --- | --- | --- |
| `product-strategist` | clarify product direction, release boundaries, and tradeoffs | `docs/product-scope/current.md` and product-facing open-question updates |
| `business-rules-steward` | keep business rules and domain language clear, consistent, and visible | `docs/business-rules/index.md` and linked glossary alignment |
| `technical-architect` | translate confirmed product rules into technical direction | `docs/architecture/current.md` and architecture-side decision framing |
| `implementation-planner` | turn product and architecture clarity into near-term slices | `docs/implementation-plan/current.md` |
| `documentation-editor` | keep canonical docs concise, current, and internally consistent | doc cleanup, cross-links, and wording cleanup across canonical docs |

If two roles need the same file, let one gather findings and let the owner apply the final edit.

## Defaults

| Role | Claude Code | Codex | Cursor |
| --- | --- | --- | --- |
| `product-strategist` | `opus`, `medium` | `gpt-5.4`, `medium` | `Auto` |
| `business-rules-steward` | `sonnet`, `medium` | `gpt-5.4`, `medium` | `Auto` |
| `technical-architect` | `opus`, `high` | `gpt-5.4`, `high` | `Auto` |
| `implementation-planner` | `sonnet`, `medium` | `gpt-5.4`, `medium` | `Auto` |
| `documentation-editor` | `sonnet`, `medium` | `gpt-5.4-mini`, `medium` | `Auto` |

Notes:

- Cursor model availability varies by account and provider, so `Auto` is the stable default.
- Claude uses stable aliases (`opus`, `sonnet`) here to reduce version-churn in the baseline.
- `opus` roles assume Claude Code access to Opus. If unavailable, fall back to `sonnet`.
- If a task is unusually thorny, prefer a stronger strategist or architect before expanding the team.

## Human Use

- Start with the role that owns the target canonical file or decision stream.
- For most tasks, choose one executor explicitly and add one advisor only when a second perspective will change the outcome.
- Use the full team only when work can split cleanly by file ownership, document ownership, or independent investigation thread.
- Do not rely on automatic agent selection as the repo contract. Treat it as a convenience when a client supports it.
- If multiple roles need the same file, let one gather findings and let the owner apply the final edit.

## Orchestration

### Parallel Specialist Team

Use the full team when:

- work can be split by file or document ownership
- teammates can work mostly independently
- multiple perspectives add value

This is the default for multi-file planning, cross-cutting review, or doc work spread across separate canonical files.

### Advisor Loop

Use one executor plus one advisor when:

- work is mostly sequential
- one agent should keep end-to-end ownership
- the task is concentrated in one file or one decision stream
- extra workers would mostly wait, collide, or add coordination overhead

Recommended advisor mapping:

- `business-rules-steward` for confirmed rules, glossary alignment, and avoiding unstated business-rule assumptions
- `technical-architect` for implementation structure, architectural tradeoffs, or risky technical choices
- `product-strategist` for release scope, business-rule framing, or unresolved product tradeoffs
- `documentation-editor` for final cleanup and consistency passes

## Client Notes

### Claude Code

- Repo-scoped definitions live in `.claude/agents/`.
- Use subagents for focused workers. Use agent teams only when teammates need direct coordination.
- Claude can delegate based on subagent descriptions, but explicit role naming is safer when you need a specific worker.
- Agent teams are experimental and require `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.
- The April 9, 2026 advisor-strategy post should inform the default heuristic: prefer an advisor loop over a full team when one executor can keep ownership.
- The advisor tool in that post is a Claude Platform API feature, not a Claude Code team feature. In Claude Code, apply the pattern manually.

### Codex

- Codex supports project-scoped agents in `.codex/agents/` with shared settings in `.codex/config.toml`.
- This repo does not currently track `.codex/`: `.gitignore` ignores it, and a local placeholder file already exists at `.codex`.
- Intended local settings remain:

```toml
[agents]
max_threads = 6
max_depth = 1
```

- Use `workspace-write` when the agent should update docs directly. Use `read-only` when it should gather findings and hand them off.
- Codex can spawn specialized agents in parallel, but this repo's Codex setup remains local-only, so human-directed role choice is the stable baseline.
- Codex does not have the Claude Platform advisor tool in the reviewed docs. The closest analogue is one executor consulting one advisor only when needed.

### Cursor

- Use custom modes for reusable role specialization and background agents for parallel remote execution.
- Cursor does not infer these repo roles by itself. The person running it chooses the mode and whether to launch background agents.
- Preferred custom modes remain:
  - `Product Strategist`: `Auto`; `All Search`, `Read file`, `Terminal`
  - `Business Rules Steward`: `Auto`; `All Search`, `Read file`, `Edit & Reapply`
  - `Technical Architect`: `Auto`; `All Search`, `Read file`, `Terminal`, `Edit & Reapply`
  - `Implementation Planner`: `Auto`; `Codebase`, `Read file`, `Terminal`
  - `Documentation Editor`: `Auto`; `All Search`, `Edit & Reapply`
- Prefer one active executor mode plus one advisor mode for sequential or same-file work.
- Reserve multiple background agents for work that can run independently on separate branches.
- We are not checking in `.cursor/environment.json` yet because the repo is still in planning mode and there is no stable runtime setup to encode.

## Sources

Reviewed on 2026-04-10:

- Claude Code agent teams: https://code.claude.com/docs/en/agent-teams
- Claude Code subagents: https://code.claude.com/docs/en/sub-agents
- Claude advisor-strategy post: https://claude.com/blog/the-advisor-strategy
- Codex subagents: https://developers.openai.com/codex/subagents
- Cursor modes: https://docs.cursor.com/agent/modes
- Cursor background agents: https://docs.cursor.com/background-agent
- Cursor background-agent model list: https://docs.cursor.com/background-agent/api/list-models
- Cursor models: https://docs.cursor.com/models
