# 011 Use Tailwind v4 With Custom Design Tokens

- Status: accepted
- Date: 2026-04-25

## Context

The current prototype already uses Tailwind v4 plus a custom design-token/CSS layer. The product's visual direction is specific: a warm editorial sports surface with sharper structural UI primitives, not a generic SaaS theme or a heavyweight component kit.

## Decision

Use Tailwind v4 as the primary styling utility layer for the next app architecture, alongside the existing custom design-token/CSS direction.

## Reasoning

Tailwind v4 keeps layout and responsive styling fast while the custom token layer preserves the repo's product-specific visual language. This gives the project practical speed without giving up identity.

The accepted tradeoff is that the project owns more of its visual system than it would with a large UI kit. That is acceptable because the current product benefits from a distinctive visual direction and a small surface area.

## Consequences

- Future UI work should continue the existing token vocabulary instead of starting a separate theme system.
- Tailwind should handle common layout, spacing, and responsive work.
- Auth, data, and app setup work should avoid introducing a competing component or styling framework unless there is a clear need.

## Accounts And Configuration

- No external account or API key is required by Tailwind or the custom design-token/CSS layer.
