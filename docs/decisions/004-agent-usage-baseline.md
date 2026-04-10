# 004 Agent Usage Baseline

- Status: accepted
- Date: 2026-04-10

## Context

This repo now has a shared set of agent roles that can be mapped onto Claude Code, Codex, and Cursor. The clients differ in how much they support automatic delegation, explicit role invocation, and parallel execution. Without one repo-level usage baseline, future sessions risk assuming the tool will pick the right role automatically or overusing parallel workers when one owner would be clearer and safer.

## Decision

Use `agents/` as the shared source of truth for role intent.

For day-to-day work:

- choose the primary role explicitly when the outcome matters
- treat automatic agent selection as a convenience, not the repo contract
- default to one executor plus one advisor for sequential work or same-file work
- use the full specialist team only when work splits cleanly by file ownership, document ownership, or independent investigation path
- if multiple roles need the same file, let one gather findings and let the owner apply the final edit

## Consequences

- Agent usage stays predictable across Claude Code, Codex, and Cursor even when their features differ.
- The repo can benefit from client-specific automation without depending on it for correctness.
- Humans still need to choose the orchestration pattern for important work, especially when file ownership or coordination is unclear.
