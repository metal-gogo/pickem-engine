import { afterEach, describe, expect, it, vi } from "vitest";

import type { Match } from "../models";

import {
  arePickSetsEqual,
  countChangedMatches,
  countCompletedPicks,
  createEmptyPickSet,
  markPickSetSaved,
  sanitizeScoreInput,
  updatePickScore,
} from ".";

const matches: Match[] = [
  {
    id: "match-1",
    sequence: 1,
    stage: "group",
    kickoffAt: "2026-06-10T12:00:00-06:00",
    venue: "Mexico City",
    homeTeam: {
      id: "mex",
      name: "Mexico",
      shortName: "Mexico",
      code: "MEX",
      fifaRanking: 15,
      flag: "🇲🇽",
      accentColors: ["#0b8f47", "#d0453b"],
    },
    awayTeam: {
      id: "jpn",
      name: "Japan",
      shortName: "Japan",
      code: "JPN",
      fifaRanking: 18,
      flag: "🇯🇵",
      accentColors: ["#1f4fff", "#ffffff"],
    },
  },
  {
    id: "match-2",
    sequence: 2,
    stage: "group",
    kickoffAt: "2026-06-11T12:00:00-06:00",
    venue: "Los Angeles",
    homeTeam: {
      id: "usa",
      name: "United States",
      shortName: "USA",
      code: "USA",
      fifaRanking: 16,
      flag: "🇺🇸",
      accentColors: ["#1d4ed8", "#d62839"],
    },
    awayTeam: {
      id: "gha",
      name: "Ghana",
      shortName: "Ghana",
      code: "GHA",
      fifaRanking: 74,
      flag: "🇬🇭",
      accentColors: ["#ffffff", "#f2c94c", "#111111"],
    },
  },
];

describe("picks", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("sanitizes score input into bounded integers", () => {
    expect(sanitizeScoreInput("")).toBeNull();
    expect(sanitizeScoreInput("abc")).toBeNull();
    expect(sanitizeScoreInput(" 4 ")).toBe(4);
    expect(sanitizeScoreInput("-2")).toBe(0);
    expect(sanitizeScoreInput("99")).toBe(20);
  });

  it("updates a pick immutably and records the edit timestamp", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-01T10:00:00Z"));

    const emptyPickSet = createEmptyPickSet(matches);
    const updatedPickSet = updatePickScore(emptyPickSet, "match-1", "homeScore", "3");

    expect(emptyPickSet.picks["match-1"].homeScore).toBeNull();
    expect(updatedPickSet.picks["match-1"].homeScore).toBe(3);
    expect(updatedPickSet.picks["match-1"].updatedAt).toBe("2026-06-01T10:00:00.000Z");
  });

  it("tracks saved state and changed-match counts across pick sets", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-01T10:00:00Z"));

    const basePickSet = createEmptyPickSet(matches);
    const draftPickSet = updatePickScore(
      updatePickScore(basePickSet, "match-1", "homeScore", "2"),
      "match-1",
      "awayScore",
      "1",
    );
    const savedPickSet = markPickSetSaved(draftPickSet);
    const changedDraft = updatePickScore(savedPickSet, "match-2", "homeScore", "1");

    expect(countCompletedPicks(savedPickSet, matches)).toBe(1);
    expect(arePickSetsEqual(savedPickSet, draftPickSet, matches)).toBe(true);
    expect(countChangedMatches(changedDraft, savedPickSet, matches)).toBe(1);
    expect(savedPickSet.updatedAt).toBe("2026-06-01T10:00:00.000Z");
  });
});
