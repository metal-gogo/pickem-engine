import { prototypePool, sampleMatches } from "../data/fixtures";
import { mockedLeaderboard } from "../data/leaderboard";
import { prototypePools } from "../data/pools";
import { getDeadlineLabel } from "../domain/lock";
import { buildTournamentGroups, getFirstIncompleteGroupId, getMatchesForGroup } from "../domain/tournament";
import type { MatchPick, UserPickSet } from "../domain/models";
import { createEmptyPickSet, getPick, markPickSetSaved, updatePickScore } from "../domain/picks";

function applyScore(
  pickSet: UserPickSet,
  matchId: string,
  homeScore: number | null,
  awayScore: number | null,
): UserPickSet {
  let nextPickSet = pickSet;

  if (homeScore !== null) {
    nextPickSet = updatePickScore(nextPickSet, matchId, "homeScore", String(homeScore));
  }

  if (awayScore !== null) {
    nextPickSet = updatePickScore(nextPickSet, matchId, "awayScore", String(awayScore));
  }

  return nextPickSet;
}

const baseEmptyPickSet = createEmptyPickSet(sampleMatches);

const seededDraftPickSet = applyScore(
  applyScore(
    applyScore(
      applyScore(baseEmptyPickSet, sampleMatches[0].id, 2, 1),
      sampleMatches[1].id,
      1,
      1,
    ),
    sampleMatches[2].id,
    3,
    0,
  ),
  sampleMatches[4].id,
  2,
  null,
);

const groupAMatches = getMatchesForGroup(sampleMatches, "A");

const groupACompleteDraftPickSet = groupAMatches.reduce((pickSet, match, index) => {
  const scorePairs: Array<[number, number]> = [
    [2, 0],
    [1, 1],
    [3, 1],
    [0, 2],
    [2, 2],
    [1, 0],
  ];
  const [homeScore, awayScore] = scorePairs[index] ?? [1, 1];

  return applyScore(pickSet, match.id, homeScore, awayScore);
}, baseEmptyPickSet);

export const emptyPickSet = baseEmptyPickSet;
export const seededSavedPickSet = markPickSetSaved(seededDraftPickSet);
export const partiallySavedPickSet = markPickSetSaved(
  applyScore(baseEmptyPickSet, sampleMatches[3].id, 0, null),
);
export const dirtyDraftPickSet = applyScore(seededSavedPickSet, sampleMatches[1].id, 1, 2);
export const groupACompleteSavedPickSet = markPickSetSaved(groupACompleteDraftPickSet);

export const referenceMatch = sampleMatches[0];
export const secondaryMatch = sampleMatches[1];
export const completeReferencePick = getPick(seededSavedPickSet, referenceMatch.id);
export const dirtyReferencePick = getPick(dirtyDraftPickSet, secondaryMatch.id);
export const cleanReferencePick = getPick(seededSavedPickSet, secondaryMatch.id);
export const emptyReferencePick = getPick(emptyPickSet, referenceMatch.id);
export const partialReferencePick = getPick(partiallySavedPickSet, sampleMatches[3].id);

export const storyPools = prototypePools;
export const storyFamilyPool = prototypePools[0]!;
export const storyWorkPool = prototypePools[1]!;
export const storyPool = storyFamilyPool;
export const storyMatches = sampleMatches;
export const storyLeaderboard = mockedLeaderboard;

export const editableDeadlineLabel = getDeadlineLabel(
  prototypePool.deadlineAt,
  new Date("2026-06-07T12:00:00-06:00"),
);
export const lockingSoonDeadlineLabel = getDeadlineLabel(
  prototypePool.deadlineAt,
  new Date("2026-06-09T18:00:00-06:00"),
);
export const lockedDeadlineLabel = getDeadlineLabel(
  prototypePool.deadlineAt,
  new Date("2026-06-11T12:00:00-06:00"),
);

export const emptyTournamentGroups = buildTournamentGroups(sampleMatches, emptyPickSet);
export const seededTournamentGroups = buildTournamentGroups(sampleMatches, seededSavedPickSet);
export const groupACompleteTournamentGroups = buildTournamentGroups(sampleMatches, groupACompleteSavedPickSet);

export const storyGroupA = seededTournamentGroups.find((group) => group.id === "A")!;
export const storyGroupAComplete = groupACompleteTournamentGroups.find((group) => group.id === "A")!;
export const storyGroupB = emptyTournamentGroups.find((group) => group.id === "B")!;
export const storyResumeGroupId = getFirstIncompleteGroupId(seededTournamentGroups);

export const narrowCanvas = {
  maxWidth: "720px",
  margin: "0 auto",
};

export const wideCanvas = {
  maxWidth: "1160px",
  margin: "0 auto",
};

export function createEditablePick(matchId: string, pick: MatchPick, side: "homeScore" | "awayScore", value: string) {
  return {
    ...pick,
    matchId,
    [side]: value.trim() === "" ? null : Number.parseInt(value, 10),
    updatedAt: new Date().toISOString(),
  };
}
