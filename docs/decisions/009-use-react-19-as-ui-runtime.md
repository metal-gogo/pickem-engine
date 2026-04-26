# 009 Use React 19 As UI Runtime

- Status: accepted
- Date: 2026-04-25

## Context

React 19 was initially considered as the UI runtime. That commitment was briefly paused while Remix v3 was being evaluated because Remix v3 has its own non-React component direction. After choosing React Router v7 framework mode instead, React is again the correct UI runtime decision for the next app.

## Decision

Use React 19 as the UI runtime for the next app architecture.

## Reasoning

React 19 aligns with React Router v7 framework mode, the current prototype's implementation model, and the desired Storybook testing workflow. It gives the project a mature component ecosystem while keeping the frontend path familiar and easy to validate.

The accepted tradeoff is that the project is no longer optimizing around Remix v3's experimental component model. That is acceptable because near-term platform reliability and testing clarity matter more than adopting the newest framework direction.

## Consequences

- The current React components remain useful for discovery and design reference.
- Future app implementation should use React 19 with React Router v7 framework mode.
- Storybook remains a realistic UI workbench and component-testing target.
- Remix v3 can be revisited later if its ecosystem matures and the product has a reason to adopt it.

## Accounts And Configuration

- No external account or API key is required by React.
