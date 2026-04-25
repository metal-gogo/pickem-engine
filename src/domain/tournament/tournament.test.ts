import { describe, expect, it } from "vitest";

import type { Match, Team } from "../models";
import { createEmptyPickSet, updatePickScore } from "../picks";
import {
  buildTournamentGroups,
  getFirstIncompleteGroupId,
  getNextGroupId,
  getPreviousGroupId,
  listGroupIds,
} from ".";

function createTeam(id: string, name: string, code: string): Team {
  return {
    id,
    name,
    shortName: name,
    code,
    fifaRanking: 1,
    flag: "🏳️",
    accentColors: ["#2563ff"],
  };
}

const groupAMatches: Match[] = [
  {
    id: "a-1",
    sequence: 1,
    stage: "group",
    group: "A",
    kickoffAt: "2026-06-10T12:00:00-06:00",
    venue: "Mexico City",
    homeTeam: createTeam("mex", "Mexico", "MEX"),
    awayTeam: createTeam("rsa", "South Africa", "RSA"),
  },
  {
    id: "a-2",
    sequence: 2,
    stage: "group",
    group: "A",
    kickoffAt: "2026-06-10T16:00:00-06:00",
    venue: "Los Angeles",
    homeTeam: createTeam("kor", "South Korea", "KOR"),
    awayTeam: createTeam("cze", "Czech Republic", "CZE"),
  },
  {
    id: "a-3",
    sequence: 3,
    stage: "group",
    group: "A",
    kickoffAt: "2026-06-14T12:00:00-06:00",
    venue: "Toronto",
    homeTeam: createTeam("mex", "Mexico", "MEX"),
    awayTeam: createTeam("kor", "South Korea", "KOR"),
  },
];

const matches: Match[] = [
  ...groupAMatches,
  {
    id: "b-1",
    sequence: 4,
    stage: "group",
    group: "B",
    kickoffAt: "2026-06-11T12:00:00-06:00",
    venue: "Monterrey",
    homeTeam: createTeam("can", "Canada", "CAN"),
    awayTeam: createTeam("qat", "Qatar", "QAT"),
  },
];

describe("tournament helpers", () => {
  it("lists group ids in alphabetical order and navigates between groups", () => {
    expect(listGroupIds(matches)).toEqual(["A", "B"]);
    expect(getPreviousGroupId(matches, "A")).toBeNull();
    expect(getNextGroupId(matches, "A")).toBe("B");
    expect(getNextGroupId(matches, "B")).toBeNull();
  });

  it("builds provisional group tables from complete picks only", () => {
    let pickSet = createEmptyPickSet(matches);
    pickSet = updatePickScore(pickSet, "a-1", "homeScore", "2");
    pickSet = updatePickScore(pickSet, "a-1", "awayScore", "0");
    pickSet = updatePickScore(pickSet, "a-2", "homeScore", "1");
    pickSet = updatePickScore(pickSet, "a-2", "awayScore", "1");
    pickSet = updatePickScore(pickSet, "a-3", "homeScore", "3");

    const [groupA] = buildTournamentGroups(matches, pickSet);

    expect(groupA.completedPickCount).toBe(2);
    expect(groupA.startedPickCount).toBe(3);
    expect(groupA.status).toBe("in-progress");
    expect(groupA.isProvisional).toBe(true);
    expect(groupA.rows[0].team.name).toBe("Mexico");
    expect(groupA.rows[0].points).toBe(3);
    expect(groupA.rows[0].goalsFor).toBe(2);
    expect(groupA.rows[1].team.name).toBe("Czech Republic");
    expect(groupA.rows[1].points).toBe(1);
    expect(groupA.rows[2].team.name).toBe("South Korea");
    expect(groupA.rows[2].points).toBe(1);
    expect(groupA.rows[3].team.name).toBe("South Africa");
    expect(groupA.rows[3].points).toBe(0);
  });

  it("finds the first incomplete group from built summaries", () => {
    const groups = buildTournamentGroups(matches, createEmptyPickSet(matches));

    expect(getFirstIncompleteGroupId(groups)).toBe("A");
  });
});
