import { createPrismaClient, type DbClient } from "../db.server";
import {
  getHeadToHeadSeedsForGroup,
  getManagerForTeamId,
  type PublicGroup,
  type PublicHeadToHead,
  type PublicMatch,
  type PublicTeam,
  type TournamentInfo,
  type TournamentVenue,
} from "../../src/data/tournament";
import type { CalendarEventInput } from "../../src/domain/calendar";
import type { GroupTableRow } from "../../src/domain/tournament";

const WORLD_CUP_2026_TOURNAMENT_ID = "fifa-world-cup-2026";

type DatabaseEnv = Record<string, string | undefined>;

type KnockoutParticipantSlot =
  | {
      kind: "group-position";
      position: number;
      group: string;
      raw: string;
    }
  | {
      kind: "best-third-place";
      position: number;
      groups: string[];
      raw: string;
    }
  | {
      kind: "winner-of-match";
      matchNumber: number;
      raw: string;
    }
  | {
      kind: "loser-of-match";
      matchNumber: number;
      raw: string;
    };

async function loadWorldCupRows(db: DbClient) {
  const [tournament, groups, tournamentTeams, venues, matches] = await Promise.all([
    db.tournament.findUnique({
      where: {
        id: WORLD_CUP_2026_TOURNAMENT_ID,
      },
    }),
    db.tournamentGroup.findMany({
      where: {
        tournamentId: WORLD_CUP_2026_TOURNAMENT_ID,
      },
      orderBy: {
        code: "asc",
      },
    }),
    db.tournamentTeam.findMany({
      where: {
        tournamentId: WORLD_CUP_2026_TOURNAMENT_ID,
      },
      include: {
        group: true,
        team: true,
      },
      orderBy: {
        groupSeedOrder: "asc",
      },
    }),
    db.venue.findMany({
      where: {
        matches: {
          some: {
            tournamentId: WORLD_CUP_2026_TOURNAMENT_ID,
          },
        },
      },
      orderBy: {
        city: "asc",
      },
    }),
    db.match.findMany({
      where: {
        tournamentId: WORLD_CUP_2026_TOURNAMENT_ID,
      },
      include: {
        awayTeam: true,
        group: true,
        homeTeam: true,
        venue: true,
      },
      orderBy: [{ kickoffAt: "asc" }, { matchNumber: "asc" }],
    }),
  ]);

  if (!tournament) {
    throw new Response("Seeded World Cup 2026 tournament was not found.", { status: 500 });
  }

  return { groups, matches, tournament, tournamentTeams, venues };
}

type WorldCupRows = Awaited<ReturnType<typeof loadWorldCupRows>>;
type TournamentTeamRow = WorldCupRows["tournamentTeams"][number];
type MatchRow = WorldCupRows["matches"][number];
type VenueRow = WorldCupRows["venues"][number];

function toDateOnly(value: Date) {
  return value.toISOString().slice(0, 10);
}

function compareMatches(left: PublicMatch, right: PublicMatch) {
  return (
    new Date(left.kickoffAt).getTime() - new Date(right.kickoffAt).getTime() ||
    (left.matchNumber ?? Number.MAX_SAFE_INTEGER) - (right.matchNumber ?? Number.MAX_SAFE_INTEGER)
  );
}

function toPublicVenue(venue: VenueRow): TournamentVenue {
  return {
    id: venue.id,
    city: venue.city,
    stadium: venue.stadium,
    country: venue.country,
    groundAliases: venue.groundAliases,
  };
}

function toPublicTeam(tournamentTeam: TournamentTeamRow): PublicTeam {
  const manager = getManagerForTeamId(tournamentTeam.team.id);

  return {
    id: tournamentTeam.team.id,
    slug: tournamentTeam.team.slug,
    name: tournamentTeam.team.name,
    shortName: tournamentTeam.team.name,
    code: tournamentTeam.team.fifaCode,
    fifaRanking: tournamentTeam.fifaRanking ?? 0,
    flag: tournamentTeam.team.flagEmoji ?? "",
    accentColors: tournamentTeam.team.accentColors,
    groupId: tournamentTeam.group?.code ?? "",
    confederation: tournamentTeam.team.confederation,
    continent: tournamentTeam.team.continent,
    isHost: tournamentTeam.isHost,
    qualificationDate: tournamentTeam.qualificationDate
      ? toDateOnly(tournamentTeam.qualificationDate)
      : "TBD",
    totalQualifications: tournamentTeam.totalQualifications ?? 0,
    lastQualifiedYear: tournamentTeam.lastQualifiedYear,
    currentConsecutiveAppearances: tournamentTeam.currentConsecutiveAppearances ?? 0,
    bestFinish: tournamentTeam.bestFinish,
    bestFinishYears: tournamentTeam.bestFinishYears,
    managerName: manager?.name ?? null,
    managerSourceLabel: manager?.sourceLabel ?? null,
  };
}

function isParticipantSlot(value: unknown): value is KnockoutParticipantSlot {
  if (!value || typeof value !== "object" || !("kind" in value)) {
    return false;
  }

  const kind = (value as { kind?: unknown }).kind;
  return (
    kind === "group-position" ||
    kind === "best-third-place" ||
    kind === "winner-of-match" ||
    kind === "loser-of-match"
  );
}

function getParticipantLabel(participant: unknown) {
  if (!isParticipantSlot(participant)) {
    return "To be determined";
  }

  switch (participant.kind) {
    case "group-position":
      if (participant.position === 1) {
        return `Group ${participant.group} winner`;
      }

      if (participant.position === 2) {
        return `Group ${participant.group} runner-up`;
      }

      return `Group ${participant.group} position ${participant.position}`;
    case "best-third-place":
      return `Best third-place team from ${participant.groups.join("/")}`;
    case "winner-of-match":
      return `Winner of match ${participant.matchNumber}`;
    case "loser-of-match":
      return `Loser of match ${participant.matchNumber}`;
  }
}

function toPublicMatch(
  match: MatchRow,
  teamsById: Map<string, PublicTeam>,
  venuesById: Map<string, TournamentVenue>,
): PublicMatch {
  const venue = venuesById.get(match.venueId);

  if (!venue) {
    throw new Response(`Seeded venue was not found for match ${match.id}.`, { status: 500 });
  }

  const homeTeam = match.homeTeamId ? teamsById.get(match.homeTeamId) : undefined;
  const awayTeam = match.awayTeamId ? teamsById.get(match.awayTeamId) : undefined;
  const isGroupMatch = match.stage === "GROUP";

  return {
    id: match.id,
    matchNumber: match.matchNumber,
    stage: isGroupMatch ? "group" : "knockout",
    stageLabel: isGroupMatch ? "Group stage" : match.roundLabel,
    roundLabel: match.roundLabel,
    groupId: match.group?.code,
    kickoffAt: match.kickoffAt.toISOString(),
    venue,
    homeLabel: homeTeam?.name ?? getParticipantLabel(match.homeParticipantSlot),
    awayLabel: awayTeam?.name ?? getParticipantLabel(match.awayParticipantSlot),
    homeTeam,
    awayTeam,
  };
}

function createEmptyGroupRows(teams: PublicTeam[]): GroupTableRow[] {
  return teams.map((team, index) => ({
    rank: index + 1,
    team,
    matchesPlayed: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  }));
}

function getTeamsInScheduleOrder(
  matches: PublicMatch[],
  fallbackTeams: PublicTeam[],
): PublicTeam[] {
  const orderedTeams: PublicTeam[] = [];

  for (const match of matches) {
    for (const team of [match.homeTeam, match.awayTeam]) {
      if (team && !orderedTeams.some((entry) => entry.id === team.id)) {
        orderedTeams.push(team);
      }
    }
  }

  for (const team of fallbackTeams) {
    if (!orderedTeams.some((entry) => entry.id === team.id)) {
      orderedTeams.push(team);
    }
  }

  return orderedTeams;
}

function getHeadToHeadsForGroup(
  groupId: string,
  teamsById: Map<string, PublicTeam>,
): PublicHeadToHead[] {
  return getHeadToHeadSeedsForGroup(groupId).map((entry) => {
    const teams = entry.teamIds.map((teamId) => teamsById.get(teamId));

    if (!teams[0] || !teams[1]) {
      throw new Response(`Seeded head-to-head team was not found for group ${groupId}.`, {
        status: 500,
      });
    }

    return {
      id: `${entry.teamIds[0]}-${entry.teamIds[1]}`,
      teams: [teams[0], teams[1]],
      meetings: entry.meetings,
    };
  });
}

function buildPublicGroups(
  rows: WorldCupRows,
  groupStageMatches: PublicMatch[],
  venues: TournamentVenue[],
  teamsById: Map<string, PublicTeam>,
) {
  return rows.groups.map((group): PublicGroup => {
    const matches = groupStageMatches
      .filter((match) => match.groupId === group.code)
      .sort(compareMatches);
    const fallbackTeams = rows.tournamentTeams
      .filter((entry) => entry.groupId === group.id)
      .sort((left, right) => (left.groupSeedOrder ?? 0) - (right.groupSeedOrder ?? 0))
      .map((entry) => teamsById.get(entry.teamId))
      .filter((team): team is PublicTeam => Boolean(team));
    const groupTeams = getTeamsInScheduleOrder(matches, fallbackTeams);
    const groupVenues = venues.filter((venue) =>
      matches.some((match) => match.venue.id === venue.id),
    );

    return {
      id: group.code,
      label: `Group ${group.code}`,
      teams: groupTeams,
      matches,
      venues: groupVenues,
      rows: createEmptyGroupRows(groupTeams),
      headToHeads: getHeadToHeadsForGroup(group.code, teamsById),
    };
  });
}

function buildCatalog(rows: WorldCupRows) {
  const teams = rows.tournamentTeams.map(toPublicTeam);
  const venues = rows.venues.map(toPublicVenue);
  const teamsById = new Map(teams.map((team) => [team.id, team]));
  const venuesById = new Map(venues.map((venue) => [venue.id, venue]));
  const matches = rows.matches.map((match) => toPublicMatch(match, teamsById, venuesById));
  const publicMatches = matches.sort(compareMatches);
  const groupStageMatches = publicMatches.filter((match) => match.stage === "group");
  const groups = buildPublicGroups(rows, groupStageMatches, venues, teamsById);
  const tournamentInfo: TournamentInfo = {
    name: rows.tournament.name,
    officialName: rows.tournament.officialName ?? rows.tournament.name,
    startsAt: toDateOnly(rows.tournament.startsOn),
    endsAt: toDateOnly(rows.tournament.endsOn),
    hostCountries: rows.tournament.hostCountries,
    teamCount: teams.length,
    groupCount: groups.length,
    groupMatchCount: groupStageMatches.length,
    matchCount: publicMatches.length,
    venueCount: venues.length,
  };

  return {
    tournamentInfo,
    teams,
    groups,
    matches: publicMatches,
    venues,
  };
}

function getStageLabel(match: PublicMatch) {
  if (match.stage === "group") {
    return `Group ${match.groupId}`;
  }

  return match.stageLabel;
}

export function getCalendarEventsForMatches(matches: PublicMatch[]): CalendarEventInput[] {
  return matches.map((match) => ({
    id: match.id,
    title: `World Cup 2026: ${match.homeLabel} vs ${match.awayLabel}`,
    startsAt: match.kickoffAt,
    location: `${match.venue.stadium}, ${match.venue.city}`,
    description: [
      match.matchNumber ? `Match ${match.matchNumber}` : match.stageLabel,
      getStageLabel(match),
      `${match.homeLabel} vs ${match.awayLabel}`,
    ].join(" - "),
  }));
}

export async function getTournamentOverviewData(env: DatabaseEnv) {
  const catalog = buildCatalog(await loadWorldCupRows(createPrismaClient(env)));

  return {
    tournamentInfo: catalog.tournamentInfo,
    groups: catalog.groups,
    matches: catalog.matches,
    venues: catalog.venues,
  };
}

export async function getGroupProfileData(env: DatabaseEnv, groupId: string) {
  const catalog = buildCatalog(await loadWorldCupRows(createPrismaClient(env)));
  const group = catalog.groups.find((entry) => entry.id === groupId.toUpperCase());

  if (!group) {
    throw new Response("Group was not found.", { status: 404 });
  }

  return { group };
}

export async function getTeamProfileData(env: DatabaseEnv, teamIdOrSlug: string) {
  const catalog = buildCatalog(await loadWorldCupRows(createPrismaClient(env)));
  const lookup = teamIdOrSlug.toLowerCase();
  const team = catalog.teams.find((entry) => entry.id === lookup || entry.slug === lookup);

  if (!team) {
    throw new Response("Team was not found.", { status: 404 });
  }

  const group = catalog.groups.find((entry) => entry.id === team.groupId) ?? null;
  const matches = catalog.matches
    .filter((match) => match.homeTeam?.id === team.id || match.awayTeam?.id === team.id)
    .sort(compareMatches);
  const venues = catalog.venues.filter((venue) =>
    matches.some((match) => match.venue.id === venue.id),
  );

  return {
    team,
    group,
    matches,
    venues,
  };
}
