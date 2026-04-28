---
name: ui-iteration
description: Use Storybook and Storybook MCP tools to review, test, and iterate on UI components. Use when changing visual direction, props, or component states.
---

# UI Iteration

## When To Use

Use when working on UI components, stories, styling, or page composition. This skill ensures visual and interaction changes are verified in isolation before being integrated into larger app flows.

This skill is especially useful when:

- a component needs a new visual state or variant
- a complex interaction needs verification via the Storybook Vitest runner
- a story needs to be updated to match the latest design tokens or `DESIGN.md` rules
- reviewing responsive behavior across the established viewport presets

## How To Use

Ask for this skill when you want the agent to iterate on UI elements using the Storybook-driven workflow.

Example prompts:

- `Use the ui-iteration skill to refine the MatchCard component.`
- `Iterate on the pool dashboard UI using Storybook.`
- `Update the stories for the Leaderboard view to include a "no-data" state.`

## Required Inputs

- the component, module, or view to iterate on
- the intended visual or functional change
- awareness of existing design tokens and `DESIGN.md` rules

## Expected Outputs

- updated component code in `src/`
- new or updated Storybook stories covering relevant states
- verified interaction and accessibility tests via Storybook Vitest
- concise summary of visual changes and test results

## Quality Bar

- follows the mobile-first, tactile, and structural design language (squared corners, heavy borders)
- uses Tailwind v4 and existing design tokens
- ensures high story coverage for edge cases (e.g., long names, empty states, loading)
- passes Storybook-driven interaction and accessibility tests

## Output Location

- `src/components/`, `src/views/`, or `src/app/`
- colocated `.stories.tsx` files

## Default Pattern

1. Read `DESIGN.md` and existing stories for the target area to understand the visual baseline.
2. Use the `pickem-engine-storybook` MCP tools to inspect current component documentation and story previews.
3. Define success criteria for the UI change (e.g., "new responsive layout for cards with tactile press state").
4. Update or create stories to represent the goal state.
5. Modify the component code to match the new stories.
6. Verify the changes using the Storybook preview through the MCP tool.
7. Run `pnpm run test-storybook` to check for regressions in interaction or accessibility.
8. Check responsive behavior specifically using the `Phone` viewport presets and story variants.

## Validation Checklist

- Confirm the component follows the "structural and tactile" visual language described in `architecture/current.md`.
- Confirm the changes are reflected in Storybook stories.
- Confirm responsive behavior is handled (mobile-first approach).
- Confirm Storybook interaction and accessibility tests pass.

## Guardrails

- Do not skip Storybook verification for visual changes.
- Do not guess component props; use MCP tools to query documentation.
- Do not ignore the existing color palette (Cream/Ink/Lime/Rust).
- Do not add ad-hoc CSS if the design can be achieved with Tailwind v4 utilities and tokens.
- Prefer Storybook stories as the main review surface before editing broader app flows.
