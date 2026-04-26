import { Match, MatchPick, UserPickSet } from "../models";

type PickSide = "homeScore" | "awayScore";

export function createEmptyPick(matchId: string): MatchPick {
  return {
    matchId,
    homeScore: null,
    awayScore: null,
    updatedAt: null,
  };
}

export function createEmptyPickSet(matches: Match[], displayName = "You"): UserPickSet {
  const picks = Object.fromEntries(matches.map((match) => [match.id, createEmptyPick(match.id)]));

  return {
    userId: "local-player",
    displayName,
    picks,
    updatedAt: null,
  };
}

export function clonePickSet(pickSet: UserPickSet): UserPickSet {
  return {
    ...pickSet,
    picks: Object.fromEntries(
      Object.entries(pickSet.picks).map(([matchId, pick]) => [matchId, { ...pick }]),
    ),
  };
}

export function getPick(pickSet: UserPickSet, matchId: string): MatchPick {
  return pickSet.picks[matchId] ?? createEmptyPick(matchId);
}

export function sanitizeScoreInput(rawValue: string): number | null {
  const trimmed = rawValue.trim();

  if (trimmed === "") {
    return null;
  }

  const nextValue = Number.parseInt(trimmed, 10);

  if (Number.isNaN(nextValue)) {
    return null;
  }

  return Math.max(0, Math.min(20, nextValue));
}

export function updatePickScore(
  pickSet: UserPickSet,
  matchId: string,
  side: PickSide,
  rawValue: string,
): UserPickSet {
  const nextPickSet = clonePickSet(pickSet);
  const previousPick = getPick(nextPickSet, matchId);

  nextPickSet.picks[matchId] = {
    ...previousPick,
    [side]: sanitizeScoreInput(rawValue),
    updatedAt: new Date().toISOString(),
  };

  return nextPickSet;
}

export function isPickComplete(pick: MatchPick): boolean {
  return pick.homeScore !== null && pick.awayScore !== null;
}

export function hasStartedPick(pick: MatchPick): boolean {
  return pick.homeScore !== null || pick.awayScore !== null;
}

export function arePicksEqual(left: MatchPick, right: MatchPick): boolean {
  return left.homeScore === right.homeScore && left.awayScore === right.awayScore;
}

export function arePickSetsEqual(left: UserPickSet, right: UserPickSet, matches: Match[]): boolean {
  return matches.every((match) => arePicksEqual(getPick(left, match.id), getPick(right, match.id)));
}

export function countCompletedPicks(pickSet: UserPickSet, matches: Match[]): number {
  return matches.reduce(
    (count, match) => count + (isPickComplete(getPick(pickSet, match.id)) ? 1 : 0),
    0,
  );
}

export function countStartedPicks(pickSet: UserPickSet, matches: Match[]): number {
  return matches.reduce(
    (count, match) => count + (hasStartedPick(getPick(pickSet, match.id)) ? 1 : 0),
    0,
  );
}

export function countChangedMatches(
  draftPickSet: UserPickSet,
  savedPickSet: UserPickSet,
  matches: Match[],
): number {
  return matches.reduce(
    (count, match) =>
      count +
      (arePicksEqual(getPick(draftPickSet, match.id), getPick(savedPickSet, match.id)) ? 0 : 1),
    0,
  );
}

export function markPickSetSaved(pickSet: UserPickSet): UserPickSet {
  return {
    ...clonePickSet(pickSet),
    updatedAt: new Date().toISOString(),
  };
}
