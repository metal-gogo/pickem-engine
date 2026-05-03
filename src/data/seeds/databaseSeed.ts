import groupMatchesSeed from "./groupMatches.normalized.json";
import groupsSeed from "./groups.normalized.json";
import knockoutFixturesSeed from "./knockoutFixtures.normalized.json";
import teamsSeed from "./teams.normalized.json";
import venuesSeed from "./venues.normalized.json";

export const WORLD_CUP_2026_TOURNAMENT_ID = "fifa-world-cup-2026";

type NormalizedTeamSeed = {
  id: string;
  fifaCode: string;
  fifaRanking: number;
  name: string;
  normalizedName: string | null;
  group: string;
  confederation: string;
  continent: string;
  flag: string;
  accentColors: string[];
  isHost?: boolean;
  qualificationDate: string;
  totalQualifications: number;
  lastQualifiedYear: number | null;
  currentConsecutiveAppearances: number;
  bestFinish: string | null;
  bestFinishYears: number[] | null;
};

type NormalizedGroupSeed = {
  id: string;
  teamIds: string[];
  grounds: string[];
};

type NormalizedGroupMatchSeed = {
  id: string;
  matchNumber: number;
  stage: "group";
  round: string;
  group: string;
  date: string;
  time: string;
  ground: string;
  homeTeamId: string;
  awayTeamId: string;
};

type KnockoutParticipantSeed =
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

type NormalizedKnockoutFixtureSeed = {
  id: string;
  matchNumber: number | null;
  stage: string;
  date: string;
  time: string;
  ground: string;
  homeParticipant: KnockoutParticipantSeed;
  awayParticipant: KnockoutParticipantSeed;
};

type NormalizedVenueCatalog = {
  tournament: string;
  hostCountries: string[];
  venues: Array<{
    id: string;
    city: string;
    stadium: string;
    country: string;
    groundAliases: string[];
  }>;
};

export type DatabaseMatchStage =
  | "GROUP"
  | "ROUND_OF_32"
  | "ROUND_OF_16"
  | "QUARTERFINAL"
  | "SEMIFINAL"
  | "THIRD_PLACE"
  | "FINAL";

export interface TournamentSeedRecord {
  id: string;
  slug: string;
  name: string;
  officialName: string;
  startsOn: Date;
  endsOn: Date;
  pickLockAt: Date | null;
  hostCountries: string[];
}

export interface GroupSeedRecord {
  id: string;
  tournamentId: string;
  code: string;
  name: string;
}

export interface TeamSeedRecord {
  id: string;
  fifaCode: string;
  slug: string;
  name: string;
  normalizedName: string | null;
  confederation: string;
  continent: string;
  flagEmoji: string;
  accentColors: string[];
}

export interface TournamentTeamSeedRecord {
  tournamentId: string;
  teamId: string;
  groupId: string;
  groupSeedOrder: number;
  isHost: boolean;
  fifaRanking: number;
  qualificationDate: Date;
  totalQualifications: number;
  lastQualifiedYear: number | null;
  currentConsecutiveAppearances: number;
  bestFinish: string | null;
  bestFinishYears: number[];
}

export interface VenueSeedRecord {
  id: string;
  city: string;
  stadium: string;
  country: string;
  groundAliases: string[];
}

export interface MatchSeedRecord {
  id: string;
  tournamentId: string;
  matchNumber: number | null;
  stage: DatabaseMatchStage;
  roundLabel: string;
  kickoffAt: Date;
  venueId: string;
  groupId: string | null;
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeParticipantSlot: KnockoutParticipantSeed | null;
  awayParticipantSlot: KnockoutParticipantSeed | null;
}

export interface WorldCup2026DatabaseSeed {
  tournament: TournamentSeedRecord;
  groups: GroupSeedRecord[];
  teams: TeamSeedRecord[];
  tournamentTeams: TournamentTeamSeedRecord[];
  venues: VenueSeedRecord[];
  matches: MatchSeedRecord[];
}

const normalizedTeams = teamsSeed as NormalizedTeamSeed[];
const normalizedGroups = groupsSeed as NormalizedGroupSeed[];
const normalizedGroupMatches = groupMatchesSeed as NormalizedGroupMatchSeed[];
const normalizedKnockoutFixtures = knockoutFixturesSeed as NormalizedKnockoutFixtureSeed[];
const normalizedVenueCatalog = venuesSeed as NormalizedVenueCatalog;

const knockoutStageBySeedLabel: Record<string, Exclude<DatabaseMatchStage, "GROUP">> = {
  "Round of 32": "ROUND_OF_32",
  "Round of 16": "ROUND_OF_16",
  "Quarter-final": "QUARTERFINAL",
  "Semi-final": "SEMIFINAL",
  "Match for third place": "THIRD_PLACE",
  Final: "FINAL",
};

export function getTournamentGroupSeedId(groupCode: string) {
  return `${WORLD_CUP_2026_TOURNAMENT_ID}-group-${groupCode.toLowerCase()}`;
}

function toDateOnly(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toKickoffAt(date: string, time: string) {
  const match = time.match(/^(\d{2}:\d{2}) UTC([+-]\d{1,2})$/);

  if (!match) {
    throw new Error(`Unsupported kickoff time format in seed data: ${time}`);
  }

  const [, clock, offset] = match;
  const offsetHours = Number.parseInt(offset, 10);
  const sign = offsetHours >= 0 ? "+" : "-";
  const paddedHours = String(Math.abs(offsetHours)).padStart(2, "0");

  return new Date(`${date}T${clock}:00${sign}${paddedHours}:00`);
}

function createVenueIdByGroundAlias(venues: VenueSeedRecord[]) {
  return new Map(
    venues.flatMap((venue) => venue.groundAliases.map((alias) => [alias, venue.id] as const)),
  );
}

function requireSeedReference<T>(value: T | undefined, message: string): T {
  if (value === undefined) {
    throw new Error(message);
  }

  return value;
}

function toGroupMatchRecord(
  match: NormalizedGroupMatchSeed,
  venueIdByGroundAlias: Map<string, string>,
  teamIds: Set<string>,
): MatchSeedRecord {
  if (!teamIds.has(match.homeTeamId) || !teamIds.has(match.awayTeamId)) {
    throw new Error(`Unknown team id in group match seed: ${match.id}`);
  }

  return {
    id: match.id,
    tournamentId: WORLD_CUP_2026_TOURNAMENT_ID,
    matchNumber: match.matchNumber,
    stage: "GROUP",
    roundLabel: match.round,
    kickoffAt: toKickoffAt(match.date, match.time),
    venueId: requireSeedReference(
      venueIdByGroundAlias.get(match.ground),
      `Unknown venue ground in group match seed ${match.id}: ${match.ground}`,
    ),
    groupId: getTournamentGroupSeedId(match.group),
    homeTeamId: match.homeTeamId,
    awayTeamId: match.awayTeamId,
    homeParticipantSlot: null,
    awayParticipantSlot: null,
  };
}

function toKnockoutMatchRecord(
  fixture: NormalizedKnockoutFixtureSeed,
  venueIdByGroundAlias: Map<string, string>,
): MatchSeedRecord {
  return {
    id: fixture.id,
    tournamentId: WORLD_CUP_2026_TOURNAMENT_ID,
    matchNumber: fixture.matchNumber,
    stage: requireSeedReference(
      knockoutStageBySeedLabel[fixture.stage],
      `Unknown knockout stage in seed ${fixture.id}: ${fixture.stage}`,
    ),
    roundLabel: fixture.stage,
    kickoffAt: toKickoffAt(fixture.date, fixture.time),
    venueId: requireSeedReference(
      venueIdByGroundAlias.get(fixture.ground),
      `Unknown venue ground in knockout fixture seed ${fixture.id}: ${fixture.ground}`,
    ),
    groupId: null,
    homeTeamId: null,
    awayTeamId: null,
    homeParticipantSlot: fixture.homeParticipant,
    awayParticipantSlot: fixture.awayParticipant,
  };
}

export function buildWorldCup2026DatabaseSeed(): WorldCup2026DatabaseSeed {
  const teamsById = new Map(normalizedTeams.map((team) => [team.id, team]));
  const teamIds = new Set(teamsById.keys());
  const groupsByCode = new Map(normalizedGroups.map((group) => [group.id, group]));

  const venues = normalizedVenueCatalog.venues.map((venue) => ({
    id: venue.id,
    city: venue.city,
    stadium: venue.stadium,
    country: venue.country,
    groundAliases: venue.groundAliases,
  }));
  const venueIdByGroundAlias = createVenueIdByGroundAlias(venues);

  const groups = normalizedGroups.map((group) => ({
    id: getTournamentGroupSeedId(group.id),
    tournamentId: WORLD_CUP_2026_TOURNAMENT_ID,
    code: group.id,
    name: `Group ${group.id}`,
  }));

  const teams = normalizedTeams.map((team) => ({
    id: team.id,
    fifaCode: team.fifaCode,
    slug: toSlug(team.normalizedName ?? team.name),
    name: team.name,
    normalizedName: team.normalizedName,
    confederation: team.confederation,
    continent: team.continent,
    flagEmoji: team.flag,
    accentColors: team.accentColors,
  }));

  const tournamentTeams = normalizedTeams.map((team) => {
    const group = requireSeedReference(
      groupsByCode.get(team.group),
      `Unknown group id in team seed ${team.id}: ${team.group}`,
    );
    const groupSeedOrder = group.teamIds.indexOf(team.id);

    if (groupSeedOrder < 0) {
      throw new Error(`Team seed ${team.id} points at group ${team.group} but is not listed there`);
    }

    return {
      tournamentId: WORLD_CUP_2026_TOURNAMENT_ID,
      teamId: team.id,
      groupId: getTournamentGroupSeedId(group.id),
      groupSeedOrder,
      isHost: team.isHost ?? false,
      fifaRanking: team.fifaRanking,
      qualificationDate: toDateOnly(team.qualificationDate),
      totalQualifications: team.totalQualifications,
      lastQualifiedYear: team.lastQualifiedYear,
      currentConsecutiveAppearances: team.currentConsecutiveAppearances,
      bestFinish: team.bestFinish,
      bestFinishYears: team.bestFinishYears ?? [],
    };
  });

  for (const group of normalizedGroups) {
    for (const teamId of group.teamIds) {
      requireSeedReference(
        teamsById.get(teamId),
        `Unknown team id in group seed ${group.id}: ${teamId}`,
      );
    }
  }

  return {
    tournament: {
      id: WORLD_CUP_2026_TOURNAMENT_ID,
      slug: WORLD_CUP_2026_TOURNAMENT_ID,
      name: "World Cup 2026",
      officialName: "FIFA World Cup 26",
      startsOn: toDateOnly("2026-06-11"),
      endsOn: toDateOnly("2026-07-19"),
      pickLockAt: null,
      hostCountries: normalizedVenueCatalog.hostCountries,
    },
    groups,
    teams,
    tournamentTeams,
    venues,
    matches: [
      ...normalizedGroupMatches.map((match) =>
        toGroupMatchRecord(match, venueIdByGroundAlias, teamIds),
      ),
      ...normalizedKnockoutFixtures.map((fixture) =>
        toKnockoutMatchRecord(fixture, venueIdByGroundAlias),
      ),
    ],
  };
}

export function summarizeWorldCup2026DatabaseSeed(seed: WorldCup2026DatabaseSeed) {
  return {
    tournaments: 1,
    groups: seed.groups.length,
    teams: seed.teams.length,
    tournamentTeams: seed.tournamentTeams.length,
    venues: seed.venues.length,
    matches: seed.matches.length,
    groupMatches: seed.matches.filter((match) => match.stage === "GROUP").length,
    knockoutFixtures: seed.matches.filter((match) => match.stage !== "GROUP").length,
  };
}
