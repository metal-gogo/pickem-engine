---
name: define-agent-team
description: Define or update a reusable team of project agents across Claude Code, Codex, and Cursor using the shared role briefs under `agents/`.
---

# Define Agent Team

## When To Use

Use when the repo needs a reusable team of specialized agents, or when the current agent setup needs to be updated across supported clients.

This skill is especially useful when:

- the same repo roles should work in Claude Code, Codex, and Cursor
- model defaults or role boundaries need to be refreshed
- the user wants repeatable parallel-agent workflows instead of one-off prompts
- official client capabilities have changed and the repo baseline must catch up

## How To Use

Ask for this skill when you want the agent to define or refresh the repo's agent-team baseline.

Example prompts:

- `Define a team of agents for this repo.`
- `Use the define-agent-team skill to update our Claude/Codex/Cursor setup.`
- `Refresh the agent roles and model defaults across clients.`

## Required Inputs

- the shared roles or responsibilities the team should cover
- which clients matter for this baseline
- the desired quality-versus-speed posture for model selection
- whether the team should support parallel execution, handoff, or both

## Expected Outputs

- updates to `agents/` when the shared role layer changes
- updated repo-scoped Claude agent definitions when supported
- documented Codex local config guidance when `.codex` is intentionally local-only
- documented Cursor custom-mode and background-agent guidance when manual UI setup is still required
- explicit guidance on when to use a full parallel team versus an advisor loop
- a concise explanation of how to launch or use the resulting team

## Default Pattern

1. Read the existing role briefs in `agents/`.
2. Verify the current official docs for each target client.
3. Keep `agents/` as the conceptual source of truth for role purpose and output shape.
4. Add or update repo-scoped client definitions where the platform supports them.
5. Document manual steps explicitly where the platform still expects UI configuration.
6. Decide whether the repo should prefer a parallel specialist team, an advisor loop, or both.
7. Keep model defaults explicit when the platform supports stable names.
8. Keep file ownership separate so parallel workers do not collide.

## Validation Checklist

- Confirm the role system stays conceptually aligned across Claude Code, Codex, and Cursor.
- Confirm repo-tracked files only include configurations the target client actually supports.
- Confirm manual setup steps are documented where automation is not supported.
- Confirm the recommended team shape is the smallest coherent one for the repo.
- Confirm model defaults are explicit where possible and not brittle where the platform is dynamic.
- Confirm ownership and handoff guidance are clear enough to support parallel work safely.

## Guardrails

- Do not invent unsupported config formats.
- Do not let Claude, Codex, and Cursor baselines drift into three different role systems.
- Do not hardcode brittle Cursor model names when the official docs treat model availability as dynamic.
- Do not replace a local-only `.codex` convention with tracked repo files unless the repo explicitly chooses to do that.
- Do not use a full team when one executor plus one advisor would be simpler and safer.
- Do not optimize for maximum agent count; prefer the smallest coherent team.
- Do not hide manual setup steps when a client still requires them.
