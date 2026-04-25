# 023 Use Sentry And Cloudflare Native Observability

- Status: accepted
- Date: 2026-04-25

## Context

The next database-backed app will run on Cloudflare and needs production visibility without adding more platform complexity than the MVP deserves.

The project evaluated Sentry and New Relic most closely. New Relic has a broader observability platform and a generous free ingest tier, but it is a larger operational surface. Sentry is more focused on developer error tracking, release context, source maps, and actionable issue grouping.

For the MVP, the most likely production debugging need is understanding application errors around sign-in, pool access, pick submission, scoring, and leaderboards. Basic runtime logs, platform metrics, and request-level debugging can start with Cloudflare's native observability features.

## Decision

Use Sentry as the primary application error tracking provider.

Use Cloudflare native observability as the initial runtime observability baseline, including Workers Logs, platform metrics, and Cloudflare tracing/export capabilities where useful.

Do not use New Relic for the initial MVP observability setup. Keep it as a future option if the product later needs a broader all-in-one platform for logs, APM, synthetics, browser monitoring, dashboards, and cross-system telemetry.

Application/server code should log through a small structured logging wrapper so the first implementation can write to `console.*` for Cloudflare capture while preserving a path to another log sink later.

## Reasoning

Sentry is the better initial fit because it solves the most urgent MVP problem directly: actionable app errors with stack traces, releases, environments, source maps, and issue grouping.

Cloudflare is already the chosen hosting target, so its native logs and metrics are the lowest-friction way to start observing runtime behavior. This keeps the first setup small, cheap, and aligned with the deployment platform.

New Relic is compelling as a full observability platform, especially because of its broad product surface and generous free ingest allowance. The tradeoff is additional setup and decision weight before the app has enough production behavior to justify it.

## Consequences

- Add Sentry setup only when backend/app setup begins.
- Configure Sentry with environment and release metadata.
- Upload source maps in CI once production builds exist.
- Use Sentry for actionable application errors, not as the default store for all routine logs.
- Enable Cloudflare runtime observability when Cloudflare deployment setup begins.
- Add a small app logging wrapper before scattering direct logging calls through server code.
- Prefer structured, safe log fields such as request id, environment, route/action name, internal ids, and operation names.
- Do not log secrets, auth tokens, session cookies, raw emails, invite codes, exact picks, or other sensitive user data.
- Reconsider New Relic later if the product needs a single larger observability platform instead of the Sentry plus Cloudflare split.

## Accounts And Configuration

- Create a Sentry account and project.
- Capture the Sentry client/runtime DSN as `SENTRY_DSN`; it is not a server secret, but should still be managed through environment configuration.
- Create a Sentry auth token for CI source-map/release operations and store it as `SENTRY_AUTH_TOKEN` in GitHub Actions secrets.
- Store `SENTRY_ORG` and `SENTRY_PROJECT` as GitHub Actions variables or non-secret environment values.
- Configure Sentry environment/release values from the deployment environment and commit SHA.
- Use the Cloudflare account from decision `012` for Workers Logs, platform metrics, and tracing/export configuration.
- Do not send sensitive user data, auth tokens, invite codes, exact picks, or raw emails to Sentry or logs.
