---
name: commit-changes
description: Split ready changes into one or more coherent commits and write Conventional Commit messages. Use when work is ready to be committed and the agent should decide commit boundaries from the conversation context and working tree.
---

# Commit Changes

## When To Use

Use when work is ready to be committed and the agent should decide how to group the changes.

This skill is especially useful when:

- the current conversation already explains the intent of the work
- the working tree may contain more than one logical change
- the agent should decide whether the result should be one commit or several
- the repo convention should be applied without making the user handcraft commit messages

## How To Use

Ask for this skill when you want the agent to decide the commit split from the current session context and working tree.

Example prompts:

- `Commit the current changes.`
- `Use the commit-changes skill for this work.`
- `Split these changes into the right commits and write the messages.`

## Required Inputs

- the current conversation context
- the current working tree
- any explicit user constraints about what should or should not be committed

## Expected Outputs

- a decision about the correct commit split
- one or more Conventional Commit messages
- a short pre-commit confirmation prompt summarizing what will be committed
- if committing is in scope, the actual signed commits
- a short explanation of what each commit contains

## Quality Bar

- uses conversation context, not just the diff
- prefers atomic commits with one coherent unit of work each
- keeps the history easy to scan and easy to recover later
- creates signed commits
- uses Conventional Commits format
- uses an imperative, concise subject line without a trailing period
- adds a body only when it improves understanding of the why

## Output Location

- git history when commits are created
- chat response summarizing the proposed commit plan or completed commits

## Default Pattern

1. Review the current conversation to understand the intent of the work.
2. Review the working tree to understand the actual changed files.
3. Decide whether the changes represent one coherent commit or several.
4. Separate unrelated changes when practical.
5. Write one Conventional Commit message per commit:
   - `type(scope): subject`
6. Before creating any commit, show the user a concise confirmation prompt that includes:
   - which files or logical change groups will be committed
   - the proposed Conventional Commit message or messages
   - any excluded or ambiguous changes that still need direction
7. Wait for explicit user confirmation before creating any commit.
8. If the task includes committing and the user confirms, create signed commits in the chosen order.
9. If signing is unavailable or fails, stop and tell the user instead of falling back to an unsigned commit.
10. Report back with a concise summary of what was committed.

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

## Validation Checklist

- Confirm each commit groups one coherent unit of work.
- Confirm unrelated changes were split out or explicitly excluded.
- Confirm the proposed messages follow Conventional Commits format.
- Confirm the user was shown a pre-commit summary before any commit was created.
- Confirm signing is available before attempting to create commits.
- Confirm the final summary explains what was committed and what, if anything, was left out.

## Guardrails

- Do not force unrelated changes into one commit.
- Do not create a commit until the user has confirmed the proposed commit plan.
- Do not create unsigned commits.
- Do not disable signing to get a commit through.
- Do not commit changes that are outside the requested scope without checking first.
- Do not rely only on filenames; use the conversation and diff together.
- Do not write vague subjects like `update stuff`.
- If the correct split is unclear, prefer the smallest safe split and explain the uncertainty.
