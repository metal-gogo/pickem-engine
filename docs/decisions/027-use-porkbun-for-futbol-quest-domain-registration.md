# 027 Use Porkbun For futbol.quest Domain Registration

- Status: accepted
- Date: 2026-04-26

## Context

The project now has a working Cloudflare deployment and needs a memorable public domain. Candidate domains included more literal pick'em and World Cup-adjacent options, but the project should avoid leaning too hard on protected tournament naming and should keep room to grow beyond a single event.

`futbol.quest` was available through Porkbun for a low first-year price of `$1.54`, with renewal at `$12.98`. The name evokes soccer, gaming, and a journey, which fits the playful pool experience without tying the product name directly to FIFA or World Cup branding.

## Decision

Use Porkbun as the registrar for `futbol.quest`.

Use `futbol.quest` as the product's public domain while keeping DNS and deployment connected to Cloudflare.

## Reasoning

Porkbun gives the project a low-cost, domain-focused registrar path while Cloudflare remains the hosting and DNS/runtime platform. This keeps domain registration inexpensive without changing the accepted Cloudflare deployment direction.

The `futbol.quest` name is short, memorable, and more brandable than purely descriptive options. It supports the first World Cup pick'em use case while leaving room for the product to feel like a broader game or journey later.

## Consequences

- Domain renewal cost should be monitored as part of lightweight operations.
- DNS should remain configured so Cloudflare serves the app at `https://futbol.quest`.
- Public naming can use `futbol.quest` without changing the first-release scope: private World Cup 2026 pools remain the initial target.
- Future brand, copy, and visual work can lean into the quest/game/journey feeling when it fits the product.
