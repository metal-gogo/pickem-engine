---
name: create-business-rule
description: Turn a product decision into a clear, implementation-relevant business rule. Use when a decision or proposal should be written into the repository's canonical business rules.
---

# Create Business Rule

## When To Use

Use when a product decision needs to be turned into a clear, implementation-relevant rule.

## How To Use

Ask for this skill when a decision from the conversation should be converted into a rule that can guide implementation or testing.

Example prompts:

- `Turn this decision into a business rule.`
- `Use the create-business-rule skill for this scoring decision.`
- `Add this rule to the canonical business rules doc.`

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
