---
name: verify-workspace
description: Run or coordinate the repository's full verification suite: formatting, linting, TypeScript, Prisma checks, security audits, unit tests, Storybook checks, production build, and safe runtime/database smoke checks.
---

# Verify Workspace

## When To Use

Use when work is ready for a confidence pass before committing, opening a PR, merging, or handing off.

This skill is especially useful when:

- several files or subsystems changed
- setup work touched package scripts, routing, auth, database, Storybook, or build configuration
- the user asks to "verify everything", "run validation", "check the branch", or "run the full suite"
- a previous session left uncertainty about whether the app still builds and tests cleanly

## How To Use

Example prompts:

- `Run verify-workspace.`
- `Use verify-workspace before we commit.`
- `Verify everything we have wired so far.`
- `Run the checks in parallel agents.`

## Default Pattern

1. Inspect `package.json` and changed files so the verification plan matches the current repo.
2. Report the lanes that will run and call out unavailable lanes before starting.
3. Prefer parallel read-only lanes when the user asks for full verification or parallel agents:
   - formatting and lint lane
   - TypeScript and build lane
   - unit and Storybook lane
   - Prisma and security lane
   - optional runtime smoke lane
4. Keep each lane read-only unless the user explicitly asks for auto-fixes.
5. Run the strongest available current checks:
   - `pnpm run verify:format`
   - `pnpm run verify:lint`
   - `pnpm run verify:types`
   - `pnpm run verify:db`
   - `pnpm run verify:security`
   - `pnpm run verify:tests`
   - `pnpm run verify:storybook`
   - `pnpm run verify:build`
6. Use `pnpm run verify` for a sequential local full run when parallelism is unnecessary.
7. Run `pnpm run coverage-storybook` only when coverage was requested or UI test coverage is specifically relevant.
8. For database setup changes, optionally run a read-only connectivity smoke with `printf 'SELECT 1;\n' | pnpm exec prisma db execute --stdin` when `DATABASE_URL` or `DIRECT_URL` is configured.
9. For auth or server route changes, optionally smoke-test a running local server with safe requests:
   - `/` should return `200`
   - `/login` should return a redirect to WorkOS when WorkOS env vars are configured
   - `/logout` should redirect without throwing when anonymous
   - `/callback` without a code should not return a server error
10. Summarize results by lane with pass/fail/skipped status, exact failing commands, and the smallest useful next action.

## Parallel Agent Guidance

When using agents for verification, assign each agent one lane and tell it not to edit files.

Good lane prompts:

- `Run formatting and lint checks only. Do not edit files. Report commands and failures.`
- `Run TypeScript and production build checks only. Do not edit files.`
- `Run unit tests plus Storybook build/test checks only. Do not edit files.`
- `Run Prisma validation/generation and security audit checks only. Do not edit files.`
- `Smoke-test the already-running local server only. Do not start a second server unless the port is free.`

The main agent should aggregate results and avoid rerunning a lane unless the output is missing or suspicious.

## Validation Checklist

- Formatting was checked.
- Linting was checked.
- TypeScript was checked through the dedicated typecheck lane.
- Prisma schema validation and client generation were checked when Prisma is present.
- Security audit checks used the CI-focused scripts.
- Unit tests were run.
- Storybook build and story-driven tests were run when Storybook is present.
- Production build was run.
- Runtime and database smokes were run only when safe and relevant.
- The final report separates passed, failed, skipped, and not-yet-wired lanes.

## Guardrails

- Do not run migrations, destructive SQL, `prisma db push`, or `prisma db pull` unless explicitly requested.
- Do not auto-fix formatting or lint failures unless the user asks for fixes.
- Do not treat missing scripts as success; report them as not wired yet.
- Do not hide security audit failures behind a broad "tests failed" summary.
- Do not leave dev servers or long-running sessions open after verification.
- Do not require deployed secrets for fast local verification.
