import groupMatches from "../seeds/groupMatches.normalized.json";
import teams from "../seeds/teams.normalized.json";
import venues from "../seeds/venues.normalized.json";
import { Match, PoolSummary, Team } from "../../domain/models";

type NormalizedTeam = {
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
};

type NormalizedGroupMatch = {
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

type NormalizedVenueCatalog = {
  venues: Array<{
    id: string;
    city: string;
    stadium: string;
    country: string;
    groundAliases: string[];
  }>;
};

function toTeam(team: NormalizedTeam): Team {
  return {
    id: team.id,
    name: team.name,
    shortName: team.name,
    code: team.fifaCode,
    fifaRanking: team.fifaRanking,
    flag: team.flag,
    accentColors: team.accentColors,
  };
}

function toIsoKickoff(date: string, time: string): string {
  const [clock, utcOffset] = time.split(" ");
  const offsetHours = Number.parseInt(utcOffset.replace("UTC", ""), 10);
  const sign = offsetHours >= 0 ? "+" : "-";
  const paddedHours = String(Math.abs(offsetHours)).padStart(2, "0");
  return `${date}T${clock}:00${sign}${paddedHours}:00`;
}

const normalizedTeams = teams as NormalizedTeam[];
const normalizedGroupMatches = groupMatches as NormalizedGroupMatch[];
const normalizedVenueCatalog = venues as NormalizedVenueCatalog;

const teamsById = new Map(normalizedTeams.map((team) => [team.id, toTeam(team)]));
const venueByGroundAlias = new Map(
  normalizedVenueCatalog.venues.flatMap((venue) =>
    venue.groundAliases.map((alias) => [alias, venue.stadium] as const),
  ),
);

function resolveTeam(teamId: string): Team {
  const team = teamsById.get(teamId);

  if (!team) {
    throw new Error(`Unknown team id in normalized fixtures: ${teamId}`);
  }

  return team;
}

function resolveVenue(ground: string): string {
  return venueByGroundAlias.get(ground) ?? ground;
}

export const prototypePool: PoolSummary = {
  id: "friends-and-family-2026",
  name: "Friends and Family Cup",
  participantCount: 8,
  deadlineAt: "2026-06-10T21:00:00-06:00",
};

export const sampleMatches: Match[] = normalizedGroupMatches.map((match) => ({
  id: match.id,
  sequence: match.matchNumber,
  stage: "group",
  group: match.group,
  kickoffAt: toIsoKickoff(match.date, match.time),
  venue: resolveVenue(match.ground),
  homeTeam: resolveTeam(match.homeTeamId),
  awayTeam: resolveTeam(match.awayTeamId),
}));
