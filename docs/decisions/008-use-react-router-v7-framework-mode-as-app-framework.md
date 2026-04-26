# 008 Use React Router v7 Framework Mode As App Framework

- Status: accepted
- Date: 2026-04-25

## Context

The current implementation is a React, TypeScript, Vite, and localStorage discovery build. That prototype is useful for product discovery, but the real app will need server-side application code, authentication, database-backed persistence, environment-specific configuration, and deployment workflows.

Remix v3 was initially attractive because of its Web API-centered direction and its promised skills-oriented model. After reviewing the surrounding tooling risk, the project should not make Remix v3 the production baseline yet. Its alpha status and unclear Storybook/component-testing compatibility create avoidable uncertainty for the first platform release.

## Decision

Use React Router v7 framework mode as the app framework for the next database-backed application architecture.

## Reasoning

React Router v7 is the stable continuation of the Remix v2 lineage and keeps the core full-stack routing model close to the Remix ecosystem without betting on Remix v3 alpha maturity. It is also a better fit for the desired testing and UI workflow because it remains React-based, which keeps Storybook, Vitest, and Playwright integration straightforward.

This choice supports Cloudflare deployment while preserving an easier path from the current React/Vite prototype into the future app. Remix v3 should remain an interesting future candidate once its component model, deployment story, and testing ecosystem are clearer.

## Consequences

- The existing React and Vite prototype remains a discovery build, not the final app framework.
- Backend setup work should target React Router v7 framework mode first.
- React-based Storybook, Vitest Browser Mode, and Playwright testing remain part of the practical tooling path.
- Framework-specific wiring should stay contained so the app can move later if Remix v3 becomes mature enough to justify a switch.
- Product rules and domain logic should not become tied to the current Vite prototype shape.

## Accounts And Configuration

- No external account or API key is required by React Router itself.
- React Router deployment will consume hosting/runtime configuration from the Cloudflare decision.
