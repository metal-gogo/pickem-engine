# pickem-engine Agent Guide

## Purpose

This repository is for planning and building `pickem-engine`, a World Cup 2026 pick'em / tournament pool product.

The project will move across separate sessions and may sit idle for stretches. Optimize for fast context recovery, low-maintenance documentation, and clean handoff between sessions.

This file is repo-level guidance, not the product spec.

## Canonical Source Of Truth

Before making product or implementation changes, read:

- `docs/README.md`
- `docs/decisions/index.md`
- `docs/product-scope/current.md`
- `docs/business-rules/index.md`
- `docs/open-questions/index.md`
- `docs/implementation-plan/current.md`
- `docs/domain/glossary.md`
- `docs/architecture/current.md`

Canonical docs override summaries in this file.

Use `agents/` and `skills/` as supporting guides, not as competing sources of truth.

## Minimal Baseline

Unless newer canonical docs say otherwise:

- the first target is a private World Cup 2026 pool for friends and family
- the product should stay lean and practical
- the design should leave room to grow later without overengineering now
- the current phase is still product discovery and implementation planning

## Agent Rules

- Do not invent business rules silently.
- Separate `Confirmed decisions`, `Working assumptions`, and `Open questions`.
- Prefer the smallest coherent MVP that supports real use.
- Keep architecture and process lightweight and reversible until requirements justify more.
- Favor stable internal domain language and defer to `docs/domain/glossary.md`.
- Update existing canonical docs instead of creating ad hoc notes.
- Use archive snapshots only when the current state is being materially re-baselined.

## Unresolved Areas To Protect

Use `docs/open-questions/index.md` as the canonical list.

Do not silently decide high-impact open areas such as:

- scoring details
- knockout-stage handling
- identity and join flow
- result ingestion strategy
- localization scope
- pick editing and locking behavior
- tournament-level bonus prediction scope

## When Docs Are Missing, Incomplete, Or Ambiguous

- Start with the canonical docs and decision records.
- If the answer is still unclear, make the smallest reasonable and reversible assumption.
- Label temporary assumptions explicitly in the relevant canonical doc.
- If the ambiguity materially affects product behavior, data modeling, permissions, or user-facing rules, ask instead of guessing.
- Never present an assumption as an established decision.

## Documentation Update Workflow

When planning or implementation work changes project understanding:

1. Update the relevant canonical doc first.
2. Add or update a decision record if the reasoning should remain durable.
3. Remove or revise resolved items in `docs/open-questions/index.md`.
4. Keep `docs/implementation-plan/current.md` aligned with the latest confirmed direction.
5. If code changes business behavior, update the docs in the same change whenever practical.

## Handoff Standard

When leaving the repo in a meaningfully different state, preserve enough context for the next session to answer:

- what changed
- why it changed
- what is still open
- what should happen next

Keep that handoff concise. Do not add process heavier than the project needs.
