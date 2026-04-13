## Seed Inputs

These files are kept as raw, derived, and normalized seed inputs for the 2026 World Cup.

- Raw inputs:
  - `openfootball/worldcup.json`: OpenFootball fixture and bracket source data
  - `openfootball/worldcup.teams_meta.json`: OpenFootball team metadata such as FIFA codes, confederations, and flags

- Derived helpers:
  - `worldcup.groups.json`: group summary extracted from `openfootball/worldcup.json`, including teams and grounds per group

- Normalized seeds:
  - `teams.normalized.json`: normalized team entities with stable internal ids, host markers for host nations, flags, and UI accent palettes
  - `groups.normalized.json`: group records keyed by group id and team ids
  - `groupMatches.normalized.json`: concrete group-stage fixtures keyed by team ids
  - `knockoutFixtures.normalized.json`: scheduled knockout fixtures with typed participant references
  - `venues.normalized.json`: normalized venue list with shorter city-country ids and aliases that match OpenFootball ground strings

The two files under `openfootball/` are intentionally stored unmodified.
Derived and normalized files in this folder are our internal seed helpers built from those raw inputs.
We can enrich, normalize, and merge additional data into a separate derived layer later.

Sources:

- `https://github.com/openfootball/worldcup.json/blob/master/2026/worldcup.json`
- `https://github.com/openfootball/worldcup.json/blob/master/2026/worldcup.teams_meta.json`
