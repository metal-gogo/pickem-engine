# pickem-engine

`pickem-engine` is a World Cup 2026 pick'em / tournament pool project.

The current product direction is a private pool experience for friends and family that stays lean enough for a passion project while preserving a path to become a broader public product later.

## Start Here

- Project guidance for agents: [AGENTS.md](AGENTS.md)
- Documentation system: [docs/README.md](docs/README.md)

## Canonical Current Docs

- Product scope: [docs/product-scope/current.md](docs/product-scope/current.md)
- Business rules: [docs/business-rules/index.md](docs/business-rules/index.md)
- Open questions: [docs/open-questions/index.md](docs/open-questions/index.md)
- Implementation plan: [docs/implementation-plan/current.md](docs/implementation-plan/current.md)
- Domain glossary: [docs/domain/glossary.md](docs/domain/glossary.md)
- Architecture direction: [docs/architecture/current.md](docs/architecture/current.md)
- Decisions: [docs/decisions/index.md](docs/decisions/index.md)

## Supporting Guides

- Agent roles: [agents/README.md](agents/README.md)
- Reusable skills: [.agents/skills/README.md](.agents/skills/README.md)

## Project MCPs

- Repo-local MCP config lives in `.codex/config.toml`, `.cursor/mcp.json`, and `.mcp.json`.
- The shared `stitch` MCP entry expects a local `STITCH_GOOGLE_API_KEY` environment variable rather than a checked-in secret.
- `.env.example` documents the required variables and local secrets live in `.env`, which is ignored by git.
- If you do not already have a `.env`, create one from the example and then load it before launching Codex, Cursor, or Claude Code:

```sh
cp .env.example .env
source .env
```

## Local Database Run

Point `DATABASE_URL` and `DIRECT_URL` in `.env` at the shared Neon `dev` branch used by local development and Cloudflare previews, then apply the committed migrations and seed the static World Cup 2026 catalog:

```sh
pnpm run db:setup
```

Start the Worker with those local env values:

```sh
pnpm run dev:db
```

The public tournament, group, and team pages read their tournament catalog from the database-backed route loaders.
