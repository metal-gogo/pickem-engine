# 010 Use TypeScript As Application Language

- Status: accepted
- Date: 2026-04-25

## Context

The prototype already uses TypeScript. The future app will need strongly modeled domain concepts such as pools, participants, matches, picks, official results, scores, deadlines, and leaderboards.

## Decision

Use TypeScript as the application language for the next app architecture.

## Reasoning

TypeScript fits the existing codebase, the preferred React Router v7 and React 19 direction, Prisma ORM's generated client, and the Zod validation direction. It gives the project stronger feedback while modeling domain rules that are easy to confuse or drift over time.

The accepted tradeoff is extra type maintenance as models evolve. That cost is worth paying because the product has many relational and rule-heavy concepts.

## Consequences

- Shared app, server, domain, and validation code should stay TypeScript-first.
- Generated Prisma types should become part of the app's normal development workflow once persistence is implemented.
- Domain model changes should be reflected in types rather than hidden in loosely shaped objects.

## Accounts And Configuration

- No external account or API key is required by TypeScript.
