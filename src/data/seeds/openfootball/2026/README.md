## OpenFootball Seed Inputs

These files are kept as raw upstream seed inputs for the 2026 World Cup.

- Raw inputs:
  - `worldcup.json`: fixture and bracket source data
  - `worldcup.teams_meta.json`: team metadata such as FIFA codes, confederations, and flags

- Derived helpers:
  - `worldcup.groups.json`: group summary extracted from `worldcup.json`, including teams and grounds per group

- Normalized seeds:
  - `teams.normalized.json`: normalized team entities with stable internal ids
  - `groups.normalized.json`: group records keyed by group id and team ids
  - `groupMatches.normalized.json`: concrete group-stage fixtures keyed by team ids
  - `knockoutFixtures.normalized.json`: scheduled knockout fixtures with typed participant references

The first two files are intentionally stored unmodified.
Derived files in this folder are seed helpers built from those raw inputs.
We can enrich, normalize, and merge additional data into a separate derived layer later.

Sources:

- `https://github.com/openfootball/worldcup.json/blob/master/2026/worldcup.json`
- `https://github.com/openfootball/worldcup.json/blob/master/2026/worldcup.teams_meta.json`
