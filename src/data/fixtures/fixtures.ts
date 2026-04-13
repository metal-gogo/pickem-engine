import { Match, PoolSummary, Team } from "../../domain/models";

function createTeam(id: string, name: string, code: string, flag: string, accentColors: string[]): Team {
  return {
    id,
    name,
    shortName: name,
    code,
    flag,
    accentColors,
  };
}

const mexico = createTeam("mex", "Mexico", "MEX", "🇲🇽", ["#0b8f47", "#d0453b"]);
const japan = createTeam("jpn", "Japan", "JPN", "🇯🇵", ["#1f4fff", "#ffffff"]);
const spain = createTeam("esp", "Spain", "ESP", "🇪🇸", ["#c62828", "#f2b705"]);
const unitedStates = createTeam("usa", "United States", "USA", "🇺🇸", ["#1d4ed8", "#d62839"]);
const brazil = createTeam("bra", "Brazil", "BRA", "🇧🇷", ["#f4c20d", "#169c52"]);
const morocco = createTeam("mar", "Morocco", "MAR", "🇲🇦", ["#c0392b", "#1c8b4f"]);
const argentina = createTeam("arg", "Argentina", "ARG", "🇦🇷", ["#7ec8f6", "#ffffff"]);
const senegal = createTeam("sen", "Senegal", "SEN", "🇸🇳", ["#138a4a", "#f2c94c", "#d94b3d"]);
const france = createTeam("fra", "France", "FRA", "🇫🇷", ["#1d3fd8", "#d64545"]);
const southKorea = createTeam("kor", "South Korea", "KOR", "🇰🇷", ["#d32f2f"]);
const portugal = createTeam("por", "Portugal", "POR", "🇵🇹", ["#c62828", "#1e8f4d"]);
const ecuador = createTeam("ecu", "Ecuador", "ECU", "🇪🇨", ["#f0b90b", "#1d4ed8", "#d64545"]);

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
