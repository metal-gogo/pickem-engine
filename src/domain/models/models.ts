export type TournamentStage = "group" | "round-of-32" | "round-of-16" | "quarterfinal" | "semifinal" | "final";

export type LockState = "editable" | "locking-soon" | "locked";

export type LeaderboardTrend = "up" | "down" | "flat";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string;
  accent: string;
}

export interface Match {
  id: string;
  sequence: number;
  stage: TournamentStage;
  group?: string;
  kickoffAt: string;
  venue: string;
  homeTeam: Team;
  awayTeam: Team;
}

export interface MatchPick {
  matchId: string;
  homeScore: number | null;
  awayScore: number | null;
  updatedAt: string | null;
}

export interface UserPickSet {
  userId: string;
  displayName: string;
  picks: Record<string, MatchPick>;
  updatedAt: string | null;
}

export interface PoolSummary {
  id: string;
  name: string;
  participantCount: number;
  deadlineAt: string;
  description: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  initials: string;
  points: number;
  rank: number;
  trend: LeaderboardTrend;
  movementLabel: string;
}
