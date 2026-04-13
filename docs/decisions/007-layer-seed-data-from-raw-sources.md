# 007 Layer Seed Data From Raw Sources

- Status: accepted
- Date: 2026-04-12

## Context

The project now has raw OpenFootball source files for the 2026 World Cup. Those files are valuable, but they mix upstream naming, repeated team strings, and knockout-stage participant placeholders with the concrete group-stage schedule.

If the app consumed those raw files directly, future enrichment and normalization work would become harder, and it would be easy to lose track of which data came from the source versus which data was transformed for internal use.

## Decision

Keep tournament seed data in explicit layers:

- store raw upstream source files unmodified
- create derived helper files when regrouping or summarizing the source is useful
- create normalized internal seed files when the app needs cleaner identifiers or shapes

For the current OpenFootball 2026 seed layer:

- teams get stable internal ids derived from FIFA codes
- `confed` is normalized to `confederation`
- group-stage fixtures are stored separately as concrete `groupMatches`
- knockout-stage schedule entries are stored separately as `knockoutFixtures`
- knockout participants are modeled as typed references instead of pretending they are already concrete teams

## Consequences

- The original source remains recoverable and re-importable.
- Internal app work can target stable normalized shapes without coupling directly to source quirks.
- The data model can represent unresolved knockout slots honestly while still preserving the published schedule.
- Future enrichment work can layer additional data onto the normalized artifacts without rewriting the raw source files.
