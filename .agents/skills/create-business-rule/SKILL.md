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

## Default Pattern

1. Read the canonical docs that define the current state:
   - `docs/business-rules/index.md`
   - `docs/product-scope/current.md`
   - `docs/open-questions/index.md`
   - `docs/domain/glossary.md`
2. Identify the exact decision that should become a rule.
3. Separate the decision into:
   - confirmed rule text
   - working assumptions that should not be promoted to a rule
   - open questions that still need a decision
4. Write or revise the rule in implementation-relevant language:
   - what behavior the product expects
   - what is in or out of scope
   - what condition or event drives the behavior
5. Update linked canonical docs if the new rule changes current scope, glossary terms, or the active open-question list.
6. If the reasoning should remain recoverable later, add or update a decision record.
7. Report the new rule and any remaining unresolved edges clearly.

## Validation Checklist

- Confirm the rule is stated as a product truth, not as a tentative idea.
- Confirm any still-open edge cases remain labeled as open.
- Confirm wording is specific enough to guide implementation or tests.
- Confirm terminology matches `docs/domain/glossary.md`.
- Confirm related open questions were removed, revised, or left intact intentionally.

## Guardrails

- Do not silently turn an assumption into a confirmed rule.
- Do not resolve unrelated open questions while updating one rule.
- Do not duplicate rule text across multiple canonical docs unless one is a short summary.
- If the decision materially changes project reasoning, prefer adding a decision record instead of leaving the why only in chat.
