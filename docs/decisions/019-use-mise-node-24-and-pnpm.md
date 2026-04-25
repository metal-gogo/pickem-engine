# 019 Use mise, Node 24 LTS, And pnpm

- Status: accepted
- Date: 2026-04-25

## Context

The next app stack will use React Router v7 framework mode, React 19, Tailwind v4, Storybook, Vitest, Playwright, Prisma ORM, WorkOS AuthKit, and Cloudflare. That stack needs a predictable local and CI runtime baseline.

The current discovery repo is npm-shaped with `package-lock.json`, but it does not yet pin a Node version or package-manager version. The current local shell was also observed on Node 18, which is too old for the current Vite 7 toolchain.

npm, pnpm, Yarn, and Bun were considered. npm is the lowest-friction option because the repo already uses it. pnpm offers faster installs, stricter dependency boundaries, better disk usage, and a stronger path if the project later grows into workspaces. Yarn and Bun are not needed for the current goals.

## Decision

Use mise to manage the project runtime/tooling baseline.

Pin the next app to Node 24 LTS and pnpm. If setup happens immediately, use Node `24.15.0` and pnpm `10.33.2`, the current versions checked during this decision. Future setup work may intentionally move to a newer Node 24 patch or pnpm 10 patch before creating the actual config files.

## Reasoning

mise gives the repo one project-local place to declare runtime tools instead of relying on whatever Node and package-manager versions happen to be installed on a developer machine. pnpm is a good fit for a modern TypeScript app with Storybook, Vitest, Playwright, Prisma, and Cloudflare because it keeps installs fast and dependency boundaries clearer.

The accepted tradeoff is a small migration away from the existing npm lockfile. That is reasonable because the package-manager decision is being made before backend setup work, not after a large production dependency tree exists.

## Consequences

- Add a `mise.toml` when setup begins, pinning Node and pnpm.
- Add an exact `packageManager` field such as `pnpm@10.33.2` when package-manager setup begins.
- Replace `package-lock.json` with `pnpm-lock.yaml` during the migration.
- Use `pnpm install --frozen-lockfile` in CI.
- Keep npm as a fallback only for one-off ecosystem tooling that explicitly requires it.
- Do not introduce Yarn or Bun unless a future requirement justifies a broader tooling change.

## Accounts And Configuration

- No external account or API key is required by mise, Node, or pnpm.
- CI should use GitHub Actions' standard runtime setup plus the pinned tool versions from the repo.
