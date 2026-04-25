# 020 Use Layered Validation And Testing Strategy

- Status: accepted
- Date: 2026-04-25

## Context

The project needs confidence across product rules, UI behavior, app integration, Cloudflare runtime behavior, database persistence, and full user flows. The chosen app direction is React Router v7 framework mode, React 19, TypeScript, Tailwind v4, Prisma ORM, Neon Postgres, WorkOS AuthKit, Cloudflare, Storybook, Vitest, and Playwright.

The current discovery build already uses Storybook as a UI review surface and Vitest for focused logic coverage. The next database-backed app should make the validation lanes explicit before backend setup begins.

## Decision

Use a layered validation and testing strategy:

- Storybook validates component and screen states as the main UI workbench.
- Storybook with Vitest Browser Mode and the Playwright browser provider validates component interactions and accessibility checks.
- Vitest validates domain logic, scoring, lock rules, validation schemas, environment config, and other pure or mostly pure functionality.
- Vitest validates server-side helpers, route/action logic, data-access adapters, and integration seams that can be tested without a full browser.
- Cloudflare's Vitest integration should be used when tests need Workers runtime APIs, bindings, or Miniflare-backed behavior.
- Prisma/database integration tests should use isolated development or CI database environments once Neon and Prisma setup exists.
- Playwright Test validates full end-to-end user flows against a running app.
- Visual regression testing is deferred until UI drift becomes expensive enough to justify it.

## Reasoning

This split keeps each tool in its strongest lane. Storybook gives a fast visual and interaction workbench for UI states. Vitest keeps domain and server logic fast enough to run often. Cloudflare's Vitest integration covers runtime-specific behavior that ordinary Node tests cannot represent. Playwright Test covers the few flows where only a real browser and running app give enough confidence.

The accepted tradeoff is that the project will have more than one test command and more than one type of test fixture. That is worth it because a single test tool would either make UI review awkward, miss Cloudflare runtime behavior, or make full browser tests too expensive to run as the main feedback loop.

## Consequences

- Keep domain rules testable outside UI components and routes.
- Prefer Storybook stories for important UI states, especially responsive and interaction-heavy states.
- Use Playwright-backed browser testing for component interactions instead of relying only on DOM simulation.
- Keep E2E tests focused on critical user journeys such as sign in, join pool, submit picks, lock behavior, and leaderboard review.
- Add Cloudflare runtime tests only where Workers-specific APIs, bindings, or deployment assumptions matter.
- Add database integration tests when Prisma and Neon are in place, using isolated dev/CI database environments rather than shared production data.
- Defer screenshot or visual-regression infrastructure until the app has enough stable UI surface to benefit from it.

## Accounts And Configuration

- Storybook, Vitest, Playwright, and Cloudflare Vitest do not require separate SaaS accounts by default.
- Database integration tests need the Neon/Prisma environment variables from decisions `014` and `015` once persistence exists.
- Auth-related integration or E2E tests may need WorkOS test/development credentials from decision `017`.
- Cloudflare runtime tests may need local test bindings or mock bindings; deployed Cloudflare secrets should not be required for fast unit tests.
