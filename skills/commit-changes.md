# Skill Commit Changes

## When To Use

Use when work is ready to be committed and the agent should decide how to group the changes.

This skill is especially useful when:

- the current conversation already explains the intent of the work
- the working tree may contain more than one logical change
- the agent should decide whether the result should be one commit or several
- the repo convention should be applied without making the user handcraft commit messages

## Required Inputs

- the current conversation context
- the current working tree
- any explicit user constraints about what should or should not be committed

## Expected Outputs

- a decision about the correct commit split
- one or more Conventional Commit messages
- if committing is in scope, the actual commits
- a short explanation of what each commit contains

## Quality Bar

- uses conversation context, not just the diff
- prefers atomic commits with one coherent unit of work each
- keeps the history easy to scan and easy to recover later
- uses Conventional Commits format
- uses an imperative, concise subject line without a trailing period
- adds a body only when it improves understanding of the why

## Output Location

- git history when commits are created
- chat response summarizing the commit plan or completed commits

## Default Pattern

1. Review the current conversation to understand the intent of the work.
2. Review the working tree to understand the actual changed files.
3. Decide whether the changes represent one coherent commit or several.
4. Separate unrelated changes when practical.
5. Write one Conventional Commit message per commit:
   - `type(scope): subject`
6. If the task includes committing, create the commits in the chosen order.
7. Report back with a concise summary of what was committed.

## Suggested Types

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`
- `ci`
- `build`
- `perf`
- `style`
- `revert`

## Guardrails

- Do not force unrelated changes into one commit.
- Do not commit changes that are outside the requested scope without checking first.
- Do not rely only on filenames; use the conversation and diff together.
- Do not write vague subjects like `update stuff`.
- If the correct split is unclear, prefer the smallest safe split and explain the uncertainty.

