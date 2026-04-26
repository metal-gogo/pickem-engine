---
name: Pickem Engine Apex Kinetic
colors:
  primary: "#C8FF3D"
  secondary: "#B64A2F"
  tertiary: "#3A7CA5"
  surface: "#F5EFE2"
  surface-strong: "#FFF8EA"
  ink: "#171511"
  muted: "#6E665C"
  border: "#171511"
  dark-surface: "#171511"
  dark-surface-strong: "#242018"
  dark-ink: "#F6EFE2"
  success: "#3F8E5E"
  warning: "#D6A21E"
  error: "#C84B3A"
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: 0
  display-md:
    fontFamily: Lexend
    fontSize: 34px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0
  heading-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  page-gutter: 16px
  desktop-max: 1180px
rounded:
  xs: 2px
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  button-secondary:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  card:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  panel-dark:
    backgroundColor: "{colors.dark-surface-strong}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  input:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  badge:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface-strong}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
---

# Design System

## Overview

`pickem-engine` should feel like a warm editorial sports product for the 2026 World Cup: energetic, structured, tactile, and useful for real pool play. It should not feel like generic SaaS chrome or a fantasy sportsbook.

The first product shape is a private pool experience for friends and family, but the interface should leave room to grow into a public platform later. The stable internal domain term is `pool`.

Design mobile-first. Expand carefully to tablet and desktop only when more space improves comparison, review, or setup clarity. Light and dark mode should be supported from the start through tokens rather than one-off color choices.

## Colors

- **Primary lime (#C8FF3D):** high-energy action, active progress, and selected states. Use as emphasis, not as a constant fill.
- **Secondary rust (#B64A2F):** warm editorial accent for key metadata, bonus categories, and strong visual rhythm.
- **Tertiary blue (#3A7CA5):** calm supporting accent for informational states and navigation context.
- **Surface cream (#F5EFE2):** main light-mode canvas.
- **Surface strong (#FFF8EA):** elevated light-mode content surfaces.
- **Ink (#171511):** core text, heavy borders, and structural UI.
- **Muted (#6E665C):** secondary copy, captions, timestamps, and low-priority metadata.
- **Dark surfaces (#171511, #242018):** dark-mode foundation that keeps warmth instead of becoming flat black.
- **Status colors:** success, warning, and error are reserved for real state communication.

Team and national colors may appear as narrow accent strips, small marks, flag-adjacent treatments, or match-context highlights. They should complement the core palette, not replace it.

## Typography

- **Display:** Lexend, bold, editorial, and compact. Use for page titles, pool names, strong tournament moments, and landing-page messaging.
- **Body and data:** Inter, regular or medium, optimized for dense match rows, rules explanations, and settings forms.
- **Labels:** Inter bold with normal letter spacing. Avoid uppercase microcopy unless it helps a compact data label.

Do not scale type directly with viewport width. Text should wrap cleanly and never collide with controls, flags, scores, or adjacent cards.

## Layout

Use a mobile-first single-column structure by default. On tablet and desktop, expand into two-column layouts when it helps a user compare setup choices with a live preview, review picks beside a scoring summary, or scan dashboard modules.

Use a compact 4px/8px/16px/24px/32px spacing rhythm. Keep fixed-format UI, such as score inputs, point steppers, toggles, match rows, and leaderboard positions, on stable dimensions so hover, error, loading, and locked states do not shift the layout.

Primary page content should use full-width bands or unframed layouts with constrained inner content. Avoid cards inside cards. Use cards only for repeated items, focused tools, modals, and genuinely framed content.

## Elevation & Depth

Depth should come from heavy structural edges, tonal surfaces, offset press states, and clear layering rather than soft shadows. Primary containers can use 3px to 4px ink borders. Internal dividers should be rare; prefer spacing, tonal shifts, and grouped sub-blocks first.

Floating or sticky elements may use subtle blur and layered surfaces when they help mobile workflows, especially pick entry, review, and setup actions.

## Shapes

Default UI should feel squared, bolted down, and sports-editorial:

- cards: 8px radius or less
- buttons: 4px to 8px radius
- inputs and point controls: 4px to 8px radius
- badges and chips: mostly squared, with stronger borders
- avatars, flags, and identity marks: circular or pill shapes are allowed when the role is naturally soft

Avoid overly rounded SaaS surfaces, decorative blobs, gradient orbs, or generic glass panels.

## Components

- **Buttons:** tactile, high-contrast, and clearly pressable. Use displacement, stronger borders, or surface shifts for active states.
- **Icon buttons:** use familiar icons for tool actions where possible. Text buttons are for clear commands, not decoration.
- **Inputs:** score inputs should be large enough for mobile thumbs, stable in width, and grouped with clear team context.
- **Toggles:** use for optional pool bonuses.
- **Point controls:** use steppers, sliders, or numeric inputs for point values. Avoid free-form rule editing.
- **Scoring summary:** reusable component that explains required winner-or-draw points plus optional bonuses. Use it in pool setup, dashboard, pick review, and rules pages.
- **Pool setup:** show constrained controls and a live scoring preview. The setup should feel safe and understandable, not like admin software.
- **Match rows:** keep team names, flags, kickoff/result state, score inputs, and lock state readable on phone width.
- **Leaderboard:** dense but calm. Emphasize rank, participant, points, movement/status, and tie state.
- **Rules pages:** explain what the platform does and what the real tournament rules are. Do not imply admins can customize tournament advancement.
- **Dark mode:** preserve the same structure and warmth; do not simply invert the light palette.

## Do's and Don'ts

Do:

- make pools, picks, scores, teams, and scoring visible as first-class product objects
- design for phone width first
- use tablet and desktop layouts for comparison and review
- keep rule setup constrained and explicit
- make winner-or-draw points visibly required
- present exact result as an optional bonus layered on top of winner-or-draw points
- use provisional point values only as examples until defaults and bounds are decided
- include empty, locked, invalid-invite, loading, and error states where relevant
- make dark mode feel intentional and warm

Do not:

- imply custom scoring formulas, custom scoring categories, per-match point overrides, custom deadlines, or custom tournament advancement rules
- use FIFA branding, protected marks, or official-looking event branding
- make a generic SaaS dashboard when the user needs a sports pool product
- hide the actual product behind a vague marketing hero
- use decorative gradient blobs, orbs, or bokeh backgrounds
- put cards inside cards
- let text collide with score controls, flags, badges, or table columns

## Product Surfaces

Generate and maintain design references for:

- landing page
- my pools / pool list
- create and configure pool
- rules setup inside pool creation
- pool setup success and share invite
- join pool / invite acceptance
- pool dashboard
- picks entry
- picks review / confirmation
- leaderboard
- match schedule / results
- pool rules / scoring explainer
- reusable scoring-system summary component
- tournament-rules page explaining actual World Cup rules
- user / account settings
- authentication or auth-transition screen if needed
- team single page with team info, players, manager, best result, history, and useful stats
- group / group stage page
- match detail page
- empty pool state
- locked picks state
- invalid invite / not found state
- error / maintenance state

## Product Rule Constraints

The platform owns the scoring model. Pool owners can configure only constrained point settings:

| Category                     | Required? | Pool Owner Control                                   |
| ---------------------------- | --------- | ---------------------------------------------------- |
| Winner or draw               | Yes       | Set the point value. Cannot be disabled.             |
| Exact result bonus           | No        | Enable or disable and set bonus points when enabled. |
| Tournament top scorer bonus  | No        | Enable or disable and set points when enabled.       |
| Tournament best-player bonus | No        | Enable or disable and set points when enabled.       |
| World Cup champion bonus     | No        | Enable or disable and set points when enabled.       |

Exact result is a bonus layered on top of winner-or-draw points.

Default point values, allowed ranges, knockout scoring, bonus result definitions, and tie-break behavior are still open product decisions. Designs may use example values, but they must not present those values as final.
