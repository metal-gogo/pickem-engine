# Documentation System

This repository uses a lightweight documentation structure designed for long-running, stop-and-start work.

## Goals

- Recover context quickly after gaps between sessions.
- Keep current truth separate from historical snapshots.
- Make business rules explicit enough to guide implementation and testing.
- Avoid duplicate or stale docs that say different things.

## Folder Map

- `decisions/`: durable project decisions that cut across product, process, or architecture.
- `product-scope/`: the current product definition and archived scope snapshots.
- `business-rules/`: logic-driving rules that should eventually map to implementation behavior and tests.
- `open-questions/`: active unresolved questions and the decisions still needed.
- `implementation-plan/`: the near-term execution plan and archived planning snapshots.
- `domain/`: core product language and definitions.
- `architecture/`: high-level technical direction, constraints, and architecture-specific decisions.

## Canonical Files

- `docs/product-scope/current.md`
- `docs/business-rules/index.md`
- `docs/open-questions/index.md`
- `docs/implementation-plan/current.md`
- `docs/domain/glossary.md`
- `docs/architecture/current.md`
- `docs/decisions/index.md`

If two files appear to disagree, the canonical file wins unless a newer decision record explicitly changes it.

## How To Update Docs

1. Update the canonical file for the topic.
2. If the change reflects a durable project decision, add or update a decision record.
3. If the change resolves an open question, remove or revise it in `docs/open-questions/index.md`.
4. Keep changes concise and explain why the update matters.

## When To Create An Archive Snapshot

Create a new archive snapshot when:

- the current scope changes meaningfully
- the implementation plan is being re-baselined
- a set of open questions is being retired and replaced

Do not create an archive snapshot for minor wording edits.

## How To Avoid Stale Docs

- Do not create a second "current" document for the same topic.
- Prefer updating an existing canonical file over starting a parallel note.
- Link decisions and open questions back to the canonical state they affect.
- Keep archive files as historical snapshots, not living documents.
