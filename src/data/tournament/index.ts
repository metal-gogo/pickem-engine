import groupMatchesSeed from "../seeds/groupMatches.normalized.json";
import groupsSeed from "../seeds/groups.normalized.json";
import knockoutFixturesSeed from "../seeds/knockoutFixtures.normalized.json";
import teamsSeed from "../seeds/teams.normalized.json";
import venuesSeed from "../seeds/venues.normalized.json";
import type { CalendarEventInput } from "../../domain/calendar";
import type { Team } from "../../domain/models";
import type { GroupTableRow } from "../../domain/tournament";

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
  bestFinishYears: number[];
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
  venues: TournamentVenue[];
};

interface ManagerSeed {
  name: string;
  sourceLabel: string;
}

interface HeadToHeadMeetingSeed {
  year: number;
  stage: string;
  result: string;
}

interface HeadToHeadSeed {
  groupId: string;
  teamIds: [string, string];
  meetings: HeadToHeadMeetingSeed[];
}

export interface PublicTeam extends Team {
  groupId: string;
  confederation: string;
  continent: string;
  isHost: boolean;
  qualificationDate: string;
  totalQualifications: number;
  lastQualifiedYear: number | null;
  currentConsecutiveAppearances: number;
  bestFinish: string | null;
  bestFinishYears: number[];
  managerName: string | null;
  managerSourceLabel: string | null;
}

export interface TournamentVenue {
  id: string;
  city: string;
  stadium: string;
  country: string;
  groundAliases: string[];
}

export interface PublicMatch {
  id: string;
  matchNumber: number | null;
  stage: "group" | "knockout";
  stageLabel: string;
  roundLabel: string;
  groupId?: string;
  kickoffAt: string;
  venue: TournamentVenue;
  homeLabel: string;
  awayLabel: string;
  homeTeam?: PublicTeam;
  awayTeam?: PublicTeam;
}

export interface PublicGroup {
  id: string;
  label: string;
  teams: PublicTeam[];
  matches: PublicMatch[];
  venues: TournamentVenue[];
  rows: GroupTableRow[];
  headToHeads: PublicHeadToHead[];
}

export interface PublicHeadToHead {
  id: string;
  teams: [PublicTeam, PublicTeam];
  meetings: HeadToHeadMeetingSeed[];
}

export interface TournamentRuleSection {
  id: string;
  title: string;
  summary: string;
  facts: string[];
  sourceLabel: string;
  sourceHref: string;
}

export const tournamentInfo = {
  name: "World Cup 2026",
  officialName: "FIFA World Cup 26",
  startsAt: "2026-06-11",
  endsAt: "2026-07-19",
  hostCountries: ["Canada", "Mexico", "USA"],
  teamCount: 48,
  groupCount: 12,
  groupMatchCount: 72,
  matchCount: 104,
  venueCount: 16,
};

export const tournamentSources = [
  {
    label: "FIFA regulations, March 2026",
    href: "https://digitalhub.fifa.com/m/636f5c9c6f29771f/original/FWC2026_regulations_EN.pdf",
  },
  {
    label: "FIFA match schedule, 10 April 2026",
    href: "https://digitalhub.fifa.com/asset/4b5d4417-3343-4732-9cdf-14b6662af407/FWC26-Match-Schedule_English.pdf",
  },
  {
    label: "FIFA/Coca-Cola Men's World Ranking, April 2026",
    href: "https://inside.fifa.com/fifa-world-ranking/men/news/france-1st-fifa-coca-cola-world-ranking-april-2026",
  },
];

const managerSeedByTeamId: Record<string, ManagerSeed> = {
  alg: { name: "Vladimir Petkovic", sourceLabel: "manager seed, April 2026" },
  arg: { name: "Lionel Scaloni", sourceLabel: "manager seed, April 2026" },
  aus: { name: "Tony Popovic", sourceLabel: "manager seed, April 2026" },
  aut: { name: "Ralf Rangnick", sourceLabel: "manager seed, April 2026" },
  bel: { name: "Rudi Garcia", sourceLabel: "manager seed, April 2026" },
  bih: { name: "Sergej Barbarez", sourceLabel: "manager seed, April 2026" },
  bra: { name: "Carlo Ancelotti", sourceLabel: "manager seed, April 2026" },
  can: { name: "Jesse Marsch", sourceLabel: "manager seed, April 2026" },
  civ: { name: "Emerse Fae", sourceLabel: "manager seed, April 2026" },
  cod: { name: "Sebastien Desabre", sourceLabel: "manager seed, April 2026" },
  col: { name: "Nestor Lorenzo", sourceLabel: "manager seed, April 2026" },
  cpv: { name: "Bubista", sourceLabel: "manager seed, April 2026" },
  cro: { name: "Zlatko Dalic", sourceLabel: "manager seed, April 2026" },
  cuw: { name: "Fred Rutten", sourceLabel: "FIFA article, April 2026" },
  cze: { name: "Miroslav Koubek", sourceLabel: "manager seed, April 2026" },
  ecu: { name: "Sebastian Beccacece", sourceLabel: "manager seed, April 2026" },
  egy: { name: "Hossam Hassan", sourceLabel: "manager seed, April 2026" },
  eng: { name: "Thomas Tuchel", sourceLabel: "manager seed, April 2026" },
  esp: { name: "Luis de la Fuente", sourceLabel: "manager seed, April 2026" },
  fra: { name: "Didier Deschamps", sourceLabel: "manager seed, April 2026" },
  ger: { name: "Julian Nagelsmann", sourceLabel: "manager seed, April 2026" },
  gha: { name: "Carlos Queiroz", sourceLabel: "FIFA article, April 2026" },
  hai: { name: "Sebastien Migne", sourceLabel: "manager seed, April 2026" },
  irn: { name: "Amir Ghalenoei", sourceLabel: "manager seed, April 2026" },
  irq: { name: "Graham Arnold", sourceLabel: "manager seed, April 2026" },
  jor: { name: "Jamal Sellami", sourceLabel: "manager seed, April 2026" },
  jpn: { name: "Hajime Moriyasu", sourceLabel: "manager seed, April 2026" },
  kor: { name: "Hong Myung-bo", sourceLabel: "manager seed, April 2026" },
  ksa: { name: "Herve Renard", sourceLabel: "manager seed, April 2026" },
  mar: { name: "Walid Regragui", sourceLabel: "manager seed, April 2026" },
  mex: { name: "Javier Aguirre", sourceLabel: "FIFA schedule release, December 2025" },
  ned: { name: "Ronald Koeman", sourceLabel: "manager seed, April 2026" },
  nor: { name: "Stale Solbakken", sourceLabel: "manager seed, April 2026" },
  nzl: { name: "Darren Bazeley", sourceLabel: "manager seed, April 2026" },
  pan: { name: "Thomas Christiansen", sourceLabel: "manager seed, April 2026" },
  par: { name: "Gustavo Alfaro", sourceLabel: "manager seed, April 2026" },
  por: { name: "Roberto Martinez", sourceLabel: "manager seed, April 2026" },
  qat: { name: "Julen Lopetegui", sourceLabel: "manager seed, April 2026" },
  rsa: { name: "Hugo Broos", sourceLabel: "FIFA schedule release, December 2025" },
  sco: { name: "Steve Clarke", sourceLabel: "manager seed, April 2026" },
  sen: { name: "Pape Thiaw", sourceLabel: "manager seed, April 2026" },
  sui: { name: "Murat Yakin", sourceLabel: "manager seed, April 2026" },
  swe: { name: "Graham Potter", sourceLabel: "manager seed, April 2026" },
  tun: { name: "Sami Trabelsi", sourceLabel: "manager seed, April 2026" },
  tur: { name: "Vincenzo Montella", sourceLabel: "manager seed, April 2026" },
  uru: { name: "Marcelo Bielsa", sourceLabel: "manager seed, April 2026" },
  usa: { name: "Mauricio Pochettino", sourceLabel: "manager seed, April 2026" },
  uzb: { name: "Fabio Cannavaro", sourceLabel: "manager seed, April 2026" },
};

const headToHeadSeeds: HeadToHeadSeed[] = [
  {
    groupId: "A",
    teamIds: ["mex", "rsa"],
    meetings: [{ year: 2010, stage: "Group stage", result: "Mexico 1-1 South Africa" }],
  },
  {
    groupId: "A",
    teamIds: ["mex", "kor"],
    meetings: [
      { year: 1998, stage: "Group stage", result: "Mexico 3-1 Korea Republic" },
      { year: 2018, stage: "Group stage", result: "Mexico 2-1 Korea Republic" },
    ],
  },
  {
    groupId: "C",
    teamIds: ["bra", "hai"],
    meetings: [{ year: 1974, stage: "Group stage", result: "Brazil 4-0 Haiti" }],
  },
  {
    groupId: "C",
    teamIds: ["bra", "mar"],
    meetings: [{ year: 1998, stage: "Group stage", result: "Brazil 3-0 Morocco" }],
  },
  {
    groupId: "C",
    teamIds: ["bra", "sco"],
    meetings: [
      { year: 1974, stage: "Group stage", result: "Brazil 0-0 Scotland" },
      { year: 1982, stage: "Group stage", result: "Brazil 4-1 Scotland" },
      { year: 1990, stage: "Group stage", result: "Brazil 1-0 Scotland" },
      { year: 1998, stage: "Group stage", result: "Brazil 2-1 Scotland" },
    ],
  },
  {
    groupId: "C",
    teamIds: ["mar", "sco"],
    meetings: [{ year: 1998, stage: "Group stage", result: "Morocco 3-0 Scotland" }],
  },
  {
    groupId: "E",
    teamIds: ["ger", "ecu"],
    meetings: [{ year: 2006, stage: "Group stage", result: "Germany 3-0 Ecuador" }],
  },
  {
    groupId: "F",
    teamIds: ["ned", "swe"],
    meetings: [{ year: 1974, stage: "Second group stage", result: "Netherlands 0-0 Sweden" }],
  },
  {
    groupId: "F",
    teamIds: ["jpn", "tun"],
    meetings: [{ year: 2002, stage: "Group stage", result: "Japan 2-0 Tunisia" }],
  },
  {
    groupId: "H",
    teamIds: ["esp", "uru"],
    meetings: [{ year: 1950, stage: "Final round", result: "Spain 2-2 Uruguay" }],
  },
  {
    groupId: "H",
    teamIds: ["esp", "ksa"],
    meetings: [{ year: 2006, stage: "Group stage", result: "Spain 1-0 Saudi Arabia" }],
  },
  {
    groupId: "H",
    teamIds: ["uru", "ksa"],
    meetings: [{ year: 2018, stage: "Group stage", result: "Uruguay 1-0 Saudi Arabia" }],
  },
  {
    groupId: "I",
    teamIds: ["fra", "sen"],
    meetings: [{ year: 2002, stage: "Group stage", result: "Senegal 1-0 France" }],
  },
  {
    groupId: "J",
    teamIds: ["alg", "aut"],
    meetings: [{ year: 1982, stage: "Group stage", result: "Austria 2-0 Algeria" }],
  },
  {
    groupId: "L",
    teamIds: ["eng", "cro"],
    meetings: [{ year: 2018, stage: "Semi-final", result: "Croatia 2-1 England after extra time" }],
  },
  {
    groupId: "L",
    teamIds: ["eng", "pan"],
    meetings: [{ year: 2018, stage: "Group stage", result: "England 6-1 Panama" }],
  },
];

export const tournamentRuleSections: TournamentRuleSection[] = [
  {
    id: "format",
    title: "Tournament format",
    summary:
      "The 2026 tournament has 48 teams in 12 groups of four, followed by a 32-team knockout bracket.",
    facts: [
      "Every team plays the other three teams in its group once.",
      "The top two teams in every group advance automatically.",
      "The eight best third-placed teams also advance, creating a 32-team knockout stage.",
    ],
    sourceLabel: "FIFA regulations, Articles 11-13",
    sourceHref: tournamentSources[0]!.href,
  },
  {
    id: "group-ranking",
    title: "Group ranking",
    summary:
      "Group tables start with points, then use head-to-head records before broader goal metrics and discipline.",
    facts: [
      "Teams tied on points are first separated by points, goal difference, and goals scored in matches among the tied teams.",
      "If teams remain tied, the process moves to overall goal difference, overall goals scored, and team conduct score.",
      "If still tied, the FIFA/Coca-Cola Men's World Ranking is used, moving through older rankings if needed.",
    ],
    sourceLabel: "FIFA regulations, Article 13",
    sourceHref: tournamentSources[0]!.href,
  },
  {
    id: "knockout",
    title: "Knockout matches",
    summary:
      "Knockout games cannot finish level: tied matches go to extra time and then penalties if needed.",
    facts: [
      "Extra time is two 15-minute periods.",
      "If the score is still level after extra time, a penalty shoot-out determines the winner.",
      "The bracket starts with the round of 32 and continues through the final.",
    ],
    sourceLabel: "FIFA regulations, Article 14",
    sourceHref: tournamentSources[0]!.href,
  },
  {
    id: "discipline",
    title: "Bookings and suspensions",
    summary:
      "A player or team official can be suspended through red cards or yellow-card accumulation.",
    facts: [
      "A red card brings an automatic suspension for the next match, with possible further sanctions.",
      "Two yellow cards received in two different matches also trigger a one-match suspension.",
      "Single yellow cards from the final competition are cancelled after the quarter-finals.",
      "Pending red-card suspensions from qualifying carry into the final tournament; yellow-card accumulation from qualifying does not.",
    ],
    sourceLabel: "FIFA regulations, Article 10",
    sourceHref: tournamentSources[0]!.href,
  },
];

const normalizedTeams = teamsSeed as NormalizedTeamSeed[];
const normalizedGroups = groupsSeed as NormalizedGroupSeed[];
const normalizedGroupMatches = groupMatchesSeed as NormalizedGroupMatchSeed[];
const normalizedKnockoutFixtures = knockoutFixturesSeed as NormalizedKnockoutFixtureSeed[];
const normalizedVenueCatalog = venuesSeed as NormalizedVenueCatalog;

function toIsoKickoff(date: string, time: string) {
  const [clock, utcOffset] = time.split(" ");
  const offsetHours = Number.parseInt(utcOffset.replace("UTC", ""), 10);
  const sign = offsetHours >= 0 ? "+" : "-";
  const paddedHours = String(Math.abs(offsetHours)).padStart(2, "0");

  return `${date}T${clock}:00${sign}${paddedHours}:00`;
}

function toPublicTeam(team: NormalizedTeamSeed): PublicTeam {
  const manager = managerSeedByTeamId[team.id] ?? null;

  return {
    id: team.id,
    name: team.name,
    shortName: team.name,
    code: team.fifaCode,
    fifaRanking: team.fifaRanking,
    flag: team.flag,
    accentColors: team.accentColors,
    groupId: team.group,
    confederation: team.confederation,
    continent: team.continent,
    isHost: Boolean(team.isHost),
    qualificationDate: team.qualificationDate,
    totalQualifications: team.totalQualifications,
    lastQualifiedYear: team.lastQualifiedYear,
    currentConsecutiveAppearances: team.currentConsecutiveAppearances,
    bestFinish: team.bestFinish,
    bestFinishYears: team.bestFinishYears,
    managerName: manager?.name ?? null,
    managerSourceLabel: manager?.sourceLabel ?? null,
  };
}

function compareMatches(left: PublicMatch, right: PublicMatch) {
  return (
    new Date(left.kickoffAt).getTime() - new Date(right.kickoffAt).getTime() ||
    (left.matchNumber ?? Number.MAX_SAFE_INTEGER) - (right.matchNumber ?? Number.MAX_SAFE_INTEGER)
  );
}

function getParticipantLabel(participant: KnockoutParticipantSeed) {
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

function getStageLabel(match: PublicMatch) {
  if (match.stage === "group") {
    return `Group ${match.groupId}`;
  }

  return match.stageLabel;
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

function getTeamsInScheduleOrder(matches: PublicMatch[], fallbackTeamIds: string[]) {
  const teamIds: string[] = [];

  for (const match of matches) {
    if (match.homeTeam && !teamIds.includes(match.homeTeam.id)) {
      teamIds.push(match.homeTeam.id);
    }

    if (match.awayTeam && !teamIds.includes(match.awayTeam.id)) {
      teamIds.push(match.awayTeam.id);
    }
  }

  for (const teamId of fallbackTeamIds) {
    if (!teamIds.includes(teamId)) {
      teamIds.push(teamId);
    }
  }

  return teamIds.map(requireTeam);
}

export const publicTeams = normalizedTeams.map(toPublicTeam);

export const publicVenues = normalizedVenueCatalog.venues;

const teamsById = new Map(publicTeams.map((team) => [team.id, team]));
const venuesByAlias = new Map(
  publicVenues.flatMap((venue) => venue.groundAliases.map((alias) => [alias, venue] as const)),
);

export function getTeamById(teamId: string) {
  return teamsById.get(teamId) ?? null;
}

export function getVenueByGround(ground: string) {
  return venuesByAlias.get(ground) ?? null;
}

function requireTeam(teamId: string) {
  const team = getTeamById(teamId);

  if (!team) {
    throw new Error(`Unknown team id in public tournament data: ${teamId}`);
  }

  return team;
}

function requireVenue(ground: string) {
  const venue = getVenueByGround(ground);

  if (!venue) {
    throw new Error(`Unknown venue ground in public tournament data: ${ground}`);
  }

  return venue;
}

export const groupStageMatches: PublicMatch[] = normalizedGroupMatches.map((match) => {
  const homeTeam = requireTeam(match.homeTeamId);
  const awayTeam = requireTeam(match.awayTeamId);

  return {
    id: match.id,
    matchNumber: match.matchNumber,
    stage: "group",
    stageLabel: "Group stage",
    roundLabel: match.round,
    groupId: match.group,
    kickoffAt: toIsoKickoff(match.date, match.time),
    venue: requireVenue(match.ground),
    homeLabel: homeTeam.name,
    awayLabel: awayTeam.name,
    homeTeam,
    awayTeam,
  };
});

export const knockoutMatches: PublicMatch[] = normalizedKnockoutFixtures.map((match) => ({
  id: match.id,
  matchNumber: match.matchNumber,
  stage: "knockout",
  stageLabel: match.stage,
  roundLabel: match.stage,
  kickoffAt: toIsoKickoff(match.date, match.time),
  venue: requireVenue(match.ground),
  homeLabel: getParticipantLabel(match.homeParticipant),
  awayLabel: getParticipantLabel(match.awayParticipant),
}));

export const publicMatches = [...groupStageMatches, ...knockoutMatches].sort(compareMatches);

function getHeadToHeadsForGroup(groupId: string): PublicHeadToHead[] {
  return headToHeadSeeds
    .filter((entry) => entry.groupId === groupId)
    .map((entry) => {
      const teams: [PublicTeam, PublicTeam] = [
        requireTeam(entry.teamIds[0]),
        requireTeam(entry.teamIds[1]),
      ];

      return {
        id: `${entry.teamIds[0]}-${entry.teamIds[1]}`,
        teams,
        meetings: entry.meetings,
      };
    });
}

export const publicGroups: PublicGroup[] = normalizedGroups.map((group) => {
  const matches = groupStageMatches
    .filter((match) => match.groupId === group.id)
    .sort(compareMatches);
  const teams = getTeamsInScheduleOrder(matches, group.teamIds);
  const venues = publicVenues.filter((venue) =>
    matches.some((match) => match.venue.id === venue.id),
  );

  return {
    id: group.id,
    label: `Group ${group.id}`,
    teams,
    matches,
    venues,
    rows: createEmptyGroupRows(teams),
    headToHeads: getHeadToHeadsForGroup(group.id),
  };
});

const groupsById = new Map(publicGroups.map((group) => [group.id, group]));

export function getGroupById(groupId: string) {
  return groupsById.get(groupId.toUpperCase()) ?? null;
}

export function getMatchesForTeam(teamId: string) {
  return groupStageMatches
    .filter((match) => match.homeTeam?.id === teamId || match.awayTeam?.id === teamId)
    .sort(compareMatches);
}

export function getMatchesForGroup(groupId: string) {
  return groupStageMatches
    .filter((match) => match.groupId === groupId.toUpperCase())
    .sort(compareMatches);
}

export function getVenuesForMatches(matches: PublicMatch[]) {
  return publicVenues.filter((venue) => matches.some((match) => match.venue.id === venue.id));
}

export function getCalendarEventsForMatches(matches: PublicMatch[]): CalendarEventInput[] {
  return matches.map((match) => ({
    id: match.id,
    title: `${tournamentInfo.name}: ${match.homeLabel} vs ${match.awayLabel}`,
    startsAt: match.kickoffAt,
    location: `${match.venue.stadium}, ${match.venue.city}`,
    description: [
      match.matchNumber ? `Match ${match.matchNumber}` : match.stageLabel,
      getStageLabel(match),
      `${match.homeLabel} vs ${match.awayLabel}`,
    ].join(" - "),
  }));
}

export function getTeamGroup(teamId: string) {
  const team = getTeamById(teamId);

  if (!team) {
    return null;
  }

  return getGroupById(team.groupId);
}

export function formatYears(years: number[]) {
  if (years.length === 0) {
    return "To be determined";
  }

  return years.join(", ");
}

export function formatAppearanceCount(team: PublicTeam) {
  return `${team.totalQualifications}${team.totalQualifications === 1 ? " appearance" : " appearances"}`;
}
