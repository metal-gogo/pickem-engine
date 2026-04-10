---
name: create-business-rule
description: Turn a product decision into a clear, implementation-relevant business rule. Use when a decision or proposal should be written into the repository's canonical business rules.
---

# Create Business Rule

## When To Use

Use when a product decision needs to be turned into a clear, implementation-relevant rule.

## Required Inputs

- the decision or proposal
- the affected product behavior
- any known edge cases

## Expected Outputs

- an updated `docs/business-rules/index.md`
- any linked updates to scope, glossary, or open questions

## Quality Bar

- specific enough to guide code and tests
- avoids hidden assumptions
- states what is confirmed versus still open

## Output Location

- `docs/business-rules/index.md`

