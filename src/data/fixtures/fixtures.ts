import { Match, PoolSummary, Team } from "../../domain/models";

function createTeam(id: string, name: string, code: string, accent: string): Team {
  return {
    id,
    name,
    shortName: name,
    code,
    accent,
  };
}

const mexico = createTeam("mex", "Mexico", "MEX", "#1f6dff");
const japan = createTeam("jpn", "Japan", "JPN", "#ff6b3d");
const spain = createTeam("esp", "Spain", "ESP", "#ffb703");
const unitedStates = createTeam("usa", "United States", "USA", "#2f5be7");
const brazil = createTeam("bra", "Brazil", "BRA", "#19a463");
const morocco = createTeam("mar", "Morocco", "MAR", "#c44d56");
const argentina = createTeam("arg", "Argentina", "ARG", "#59b6ff");
const senegal = createTeam("sen", "Senegal", "SEN", "#1e8f5a");
const france = createTeam("fra", "France", "FRA", "#1d3fd8");
const southKorea = createTeam("kor", "South Korea", "KOR", "#ff7340");
const portugal = createTeam("por", "Portugal", "POR", "#1f944c");
const ecuador = createTeam("ecu", "Ecuador", "ECU", "#f0a300");

export const prototypePool: PoolSummary = {
  id: "friends-and-family-2026",
  name: "Friends and Family Cup",
  participantCount: 8,
  deadlineAt: "2026-06-10T21:00:00-06:00",
  description: "Local-first discovery build for exact-score picks, review, and standings.",
};

export const sampleMatches: Match[] = [
  {
    id: "match-001",
    sequence: 1,
    stage: "group",
    group: "A",
    kickoffAt: "2026-06-12T18:00:00-06:00",
    venue: "Estadio Azteca",
    homeTeam: mexico,
    awayTeam: japan,
  },
  {
    id: "match-002",
    sequence: 2,
    stage: "group",
    group: "B",
    kickoffAt: "2026-06-13T14:00:00-06:00",
    venue: "MetLife Stadium",
    homeTeam: spain,
    awayTeam: unitedStates,
  },
  {
    id: "match-003",
    sequence: 3,
    stage: "group",
    group: "C",
    kickoffAt: "2026-06-13T19:00:00-06:00",
    venue: "SoFi Stadium",
    homeTeam: brazil,
    awayTeam: morocco,
  },
  {
    id: "match-004",
    sequence: 4,
    stage: "group",
    group: "D",
    kickoffAt: "2026-06-14T12:00:00-06:00",
    venue: "AT&T Stadium",
    homeTeam: argentina,
    awayTeam: senegal,
  },
  {
    id: "match-005",
    sequence: 5,
    stage: "group",
    group: "E",
    kickoffAt: "2026-06-14T16:00:00-06:00",
    venue: "Levi's Stadium",
    homeTeam: france,
    awayTeam: southKorea,
  },
  {
    id: "match-006",
    sequence: 6,
    stage: "group",
    group: "F",
    kickoffAt: "2026-06-14T20:00:00-06:00",
    venue: "BC Place",
    homeTeam: portugal,
    awayTeam: ecuador,
  },
];
