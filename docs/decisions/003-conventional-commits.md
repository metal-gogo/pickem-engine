# 003 Conventional Commits

- Status: accepted
- Date: 2026-04-09

## Context

This project will evolve over many sessions with a mix of planning, documentation, and implementation work. The commit history needs to stay easy to scan, easy to review, and easy to recover after gaps in work.

## Decision

Use Conventional Commits for repository commits.

Preferred format:

`type(scope): subject`

Examples:

- `docs(scope): tighten first release boundaries`
- `feat(pool): add invite token model`
- `fix(scoring): handle draw prediction correctly`

The `scope` is optional when it does not add clarity.

## Commit Expectations

- Prefer atomic commits with one coherent unit of work.
- Prefer commits that leave the repository in a functional, understandable state.
- Use an imperative, concise subject line without a trailing period.
- Add a body when the change needs context, especially to explain why.
- If a working tree contains unrelated changes, split them into separate commits when practical.

## Consequences

- Commit history should become easier to scan and reason about.
- Planning, documentation, and implementation work can share one consistent commit style.
- Agents and humans have a clear default instead of inventing ad hoc message formats.
