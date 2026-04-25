# 012 Use Cloudflare As Initial Hosting Target

- Status: accepted
- Date: 2026-04-25

## Context

The project needs a hosting target for the future app architecture. Vercel was considered, but surprise-billing stories made it less attractive for a small product that should stay low-risk while it proves real use. Other alternatives discussed included Railway, DigitalOcean, Render, Netlify, and Fly.io.

## Decision

Use Cloudflare as the initial hosting target for the next app architecture.

## Reasoning

Cloudflare fits the desired React Router v7 direction well because of its Web API-centered platform and official framework deployment path. It also feels friendlier for cost-conscious development than Vercel, while still leaving room to run a real public app later.

The accepted tradeoff is that some libraries and deployment patterns need to work in an edge/serverless Cloudflare environment. The project should choose compatible packages and keep platform-specific configuration isolated.

## Consequences

- Initial deployment work should target Cloudflare.
- Edge compatibility should be considered when choosing auth, database drivers, and server-side dependencies.
- Cloudflare-specific code and configuration should stay near infrastructure boundaries.
- The hosting choice remains reversible if React Router v7, Prisma, auth, or runtime constraints make Cloudflare impractical.

## Accounts And Configuration

- Create a Cloudflare account.
- Create the Worker/Pages application when backend setup begins.
- Capture the Cloudflare account id as `CLOUDFLARE_ACCOUNT_ID`.
- Create a scoped Cloudflare API token for CI deployment and store it as `CLOUDFLARE_API_TOKEN` in GitHub Actions secrets.
- Store deployed non-secret runtime values as Cloudflare environment-specific variables.
- Store deployed sensitive runtime values as Cloudflare Worker secrets, not plaintext Wrangler `vars`.
- If using a custom domain, configure DNS/custom-domain routing in Cloudflare.
