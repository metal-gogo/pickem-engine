# 017 Use WorkOS AuthKit For Authentication

- Status: accepted
- Date: 2026-04-25

## Context

The next database-backed app needs authentication with as little custom auth logic as possible. The auth layer should support passwordless and/or social sign-in for the private friends-and-family first release, while leaving room for future organization or single sign-on use cases if the product later grows beyond a private pool.

WorkOS AuthKit and Auth0 were the final options under consideration. Both are substantial managed identity platforms. Auth0 is broader and more general-purpose, with deep CIAM, enterprise identity, AI-agent, and compliance surfaces. WorkOS AuthKit is still a serious platform, but its app-facing path is narrower for hosted auth, users, organizations, SSO, social login, passkeys, and Magic Auth.

## Decision

Use WorkOS AuthKit as the initial authentication provider for the next database-backed app.

## Reasoning

WorkOS AuthKit best matches the current direction: hosted auth, little custom auth code, passwordless/social support, and a credible future path to organization SSO without choosing a heavier identity platform upfront.

Its agentic-development support is also a useful fit for this project. The WorkOS CLI can assist with AuthKit integration and resource management, and WorkOS provides coding-agent skills for tools including Codex. That is not the primary reason to choose it, but it supports the project's stop-and-start development style.

Auth0 remains a strong fallback if `pickem-engine` later needs a broader customer-identity platform, advanced AI-agent product features, token vault workflows, or deeper compliance tooling. For the current product shape, WorkOS is the better balance.

## Consequences

- Treat WorkOS as the identity provider and hosted auth/session layer.
- Keep product authorization and domain membership in the app database: pools, pool participants, pool roles, picks, scoring, and leaderboards remain `pickem-engine` concepts.
- Store an app user record linked to the WorkOS user subject rather than making WorkOS the source of truth for pool membership.
- Configure separate WorkOS environments for local development, staging, and production when backend setup begins.
- Decide the exact initial login methods during setup, such as Magic Auth, social providers, or both.
- Keep the private pool join/invite flow open until the app's user-to-participant mapping is designed.
- If React Router v7, Cloudflare, or edge-runtime compatibility creates a serious blocker, reassess Auth0, Better Auth, or another provider before implementing custom auth.

## Accounts And Configuration

- Create a WorkOS account.
- Configure separate local, staging, and production WorkOS environments or applications when backend setup begins.
- Capture `WORKOS_CLIENT_ID` from the WorkOS dashboard.
- Capture `WORKOS_API_KEY` from the WorkOS dashboard and treat it as a secret.
- Generate `WORKOS_COOKIE_PASSWORD` as a strong 32-character-or-longer session cookie password and treat it as a secret.
- Configure AuthKit redirect, callback, and logout URLs for local, staging, and production.
- Store local values in an uncommitted env file.
- Store deployed runtime secrets in Cloudflare Worker secrets.
- Store CI/deployment-only WorkOS values in GitHub Environment secrets if workflows need them.
- If social login providers are enabled, create and store the provider OAuth credentials inside WorkOS or the provider dashboard as required; do not commit them to this repo.
