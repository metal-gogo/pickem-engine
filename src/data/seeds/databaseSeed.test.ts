import { describe, expect, it } from "vitest";
import {
  WORLD_CUP_2026_TOURNAMENT_ID,
  buildWorldCup2026DatabaseSeed,
  summarizeWorldCup2026DatabaseSeed,
} from "./databaseSeed";

function expectUnique(values: string[]) {
  expect(new Set(values).size).toBe(values.length);
}

describe("World Cup 2026 database seed", () => {
  it("builds the expected static tournament data shape", () => {
    const seed = buildWorldCup2026DatabaseSeed();

    expect(seed.tournament.id).toBe(WORLD_CUP_2026_TOURNAMENT_ID);
    expect(seed.tournament.pickLockAt).toBeNull();
    expect(summarizeWorldCup2026DatabaseSeed(seed)).toEqual({
      tournaments: 1,
      groups: 12,
      teams: 48,
      tournamentTeams: 48,
      venues: 16,
      matches: 104,
      groupMatches: 72,
      knockoutFixtures: 32,
    });
  });

  it("keeps seeded ids unique and match references resolvable", () => {
    const seed = buildWorldCup2026DatabaseSeed();
    const groupIds = new Set(seed.groups.map((group) => group.id));
    const teamIds = new Set(seed.teams.map((team) => team.id));
    const venueIds = new Set(seed.venues.map((venue) => venue.id));

    expectUnique(seed.groups.map((group) => group.id));
    expectUnique(seed.teams.map((team) => team.id));
    expectUnique(seed.teams.map((team) => team.slug));
    expectUnique(seed.venues.map((venue) => venue.id));
    expectUnique(seed.matches.map((match) => match.id));

    expect(seed.matches.every((match) => venueIds.has(match.venueId))).toBe(true);
    expect(
      seed.matches
        .filter((match) => match.groupId !== null)
        .every((match) => groupIds.has(match.groupId ?? "")),
    ).toBe(true);
    expect(
      seed.matches
        .filter((match) => match.homeTeamId !== null)
        .every((match) => teamIds.has(match.homeTeamId ?? "")),
    ).toBe(true);
    expect(
      seed.matches
        .filter((match) => match.awayTeamId !== null)
        .every((match) => teamIds.has(match.awayTeamId ?? "")),
    ).toBe(true);
  });
});
