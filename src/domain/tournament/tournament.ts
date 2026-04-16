import { Match, Team, UserPickSet } from "../models";
import { getPick, hasStartedPick, isPickComplete } from "../picks";

export type GroupProgressState = "not-started" | "in-progress" | "complete";

export interface GroupTableRow {
  rank: number;
  team: Team;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface TournamentGroup {
  id: string;
  label: string;
  matches: Match[];
  rows: GroupTableRow[];
  completedPickCount: number;
  startedPickCount: number;
  status: GroupProgressState;
  isProvisional: boolean;
}

interface MutableGroupTableRow {
  team: Team;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

function compareRows(left: MutableGroupTableRow, right: MutableGroupTableRow) {
  return (
    right.points - left.points ||
    right.goalDifference - left.goalDifference ||
    right.goalsFor - left.goalsFor ||
    left.team.name.localeCompare(right.team.name)
  );
}

function getStatus(completedPickCount: number, startedPickCount: number, totalMatches: number): GroupProgressState {
  if (completedPickCount === totalMatches && totalMatches > 0) {
    return "complete";
  }

  if (startedPickCount > 0) {
    return "in-progress";
  }

  return "not-started";
}

function collectGroupTeams(matches: Match[]) {
  const teamsById = new Map<string, Team>();

  for (const match of matches) {
    teamsById.set(match.homeTeam.id, match.homeTeam);
    teamsById.set(match.awayTeam.id, match.awayTeam);
  }

  return [...teamsById.values()].sort((left, right) => left.name.localeCompare(right.name));
}

function createEmptyRows(matches: Match[]) {
  return new Map(
    collectGroupTeams(matches).map((team) => [
      team.id,
      {
        team,
        matchesPlayed: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      } satisfies MutableGroupTableRow,
    ]),
  );
}

function applyCompletePick(rowsByTeamId: Map<string, MutableGroupTableRow>, match: Match, pickSet: UserPickSet) {
  const pick = getPick(pickSet, match.id);

  if (!isPickComplete(pick)) {
    return;
  }

  const homeRow = rowsByTeamId.get(match.homeTeam.id);
  const awayRow = rowsByTeamId.get(match.awayTeam.id);

  if (!homeRow || !awayRow) {
    return;
  }

  const homeScore = pick.homeScore!;
  const awayScore = pick.awayScore!;

  homeRow.matchesPlayed += 1;
  awayRow.matchesPlayed += 1;
  homeRow.goalsFor += homeScore;
  homeRow.goalsAgainst += awayScore;
  awayRow.goalsFor += awayScore;
  awayRow.goalsAgainst += homeScore;

  if (homeScore > awayScore) {
    homeRow.wins += 1;
    homeRow.points += 3;
    awayRow.losses += 1;
  } else if (homeScore < awayScore) {
    awayRow.wins += 1;
    awayRow.points += 3;
    homeRow.losses += 1;
  } else {
    homeRow.draws += 1;
    awayRow.draws += 1;
    homeRow.points += 1;
    awayRow.points += 1;
  }

  homeRow.goalDifference = homeRow.goalsFor - homeRow.goalsAgainst;
  awayRow.goalDifference = awayRow.goalsFor - awayRow.goalsAgainst;
}

export function listGroupIds(matches: Match[]) {
  return [...new Set(matches.map((match) => match.group).filter((group): group is string => Boolean(group)))].sort();
}

export function getMatchesForGroup(matches: Match[], groupId: string) {
  return matches
    .filter((match) => match.group === groupId)
    .sort((left, right) => new Date(left.kickoffAt).getTime() - new Date(right.kickoffAt).getTime() || left.sequence - right.sequence);
}

export function buildTournamentGroups(matches: Match[], pickSet: UserPickSet): TournamentGroup[] {
  return listGroupIds(matches).map((groupId) => {
    const groupMatches = getMatchesForGroup(matches, groupId);
    const rowsByTeamId = createEmptyRows(groupMatches);

    for (const match of groupMatches) {
      applyCompletePick(rowsByTeamId, match, pickSet);
    }

    const rows = [...rowsByTeamId.values()].sort(compareRows).map((row, index) => ({
      rank: index + 1,
      ...row,
    }));
    const completedPickCount = groupMatches.filter((match) => isPickComplete(getPick(pickSet, match.id))).length;
    const startedPickCount = groupMatches.filter((match) => hasStartedPick(getPick(pickSet, match.id))).length;

    return {
      id: groupId,
      label: `Group ${groupId}`,
      matches: groupMatches,
      rows,
      completedPickCount,
      startedPickCount,
      status: getStatus(completedPickCount, startedPickCount, groupMatches.length),
      isProvisional: completedPickCount < groupMatches.length,
    };
  });
}

export function getNextGroupId(matches: Match[], currentGroupId: string) {
  const groupIds = listGroupIds(matches);
  const currentIndex = groupIds.indexOf(currentGroupId);

  if (currentIndex === -1 || currentIndex === groupIds.length - 1) {
    return null;
  }

  return groupIds[currentIndex + 1];
}

export function getPreviousGroupId(matches: Match[], currentGroupId: string) {
  const groupIds = listGroupIds(matches);
  const currentIndex = groupIds.indexOf(currentGroupId);

  if (currentIndex <= 0) {
    return null;
  }

  return groupIds[currentIndex - 1];
}

export function getFirstIncompleteGroupId(groups: TournamentGroup[]) {
  return groups.find((group) => group.status !== "complete")?.id ?? groups[0]?.id ?? null;
}
