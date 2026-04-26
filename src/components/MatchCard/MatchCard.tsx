import type { ReactNode } from "react";
import { useState } from "react";

import { cn } from "../../app/cn";
import {
  formatFifaRanking,
  formatKickoffDay,
  formatKickoffTime,
  formatStageLabel,
} from "../../app/format";
import { LockState, Match, MatchPick } from "../../domain/models";
import { arePicksEqual, hasStartedPick, isPickComplete } from "../../domain/picks";
import { Badge } from "../Badge";
import { ScoreInput } from "../ScoreInput";
import { TeamFlag } from "../TeamFlag";

type MatchCardMode = "interactive" | "summary";

interface MatchCardProps {
  match: Match;
  pick: MatchPick;
  lockState: LockState;
  mode: MatchCardMode;
  comparisonPick?: MatchPick;
  actions?: ReactNode;
  onScoreChange?: (side: "homeScore" | "awayScore", nextValue: string) => void;
}

function getTeamAccent(accentColors: string[]): string {
  if (accentColors.length <= 1) {
    return accentColors[0] ?? "#2563ff";
  }

  return `linear-gradient(180deg, ${accentColors.join(", ")})`;
}

function getStatusLabel(
  mode: MatchCardMode,
  pick: MatchPick,
  comparisonPick: MatchPick | undefined,
  lockState: LockState,
): { label: string; tone: "neutral" | "info" | "success" | "warning" | "locked" } {
  if (lockState === "locked") {
    return {
      label: isPickComplete(pick) ? "Locked in" : "Locked empty",
      tone: "locked",
    };
  }

  if (comparisonPick && !arePicksEqual(pick, comparisonPick)) {
    return {
      label: "Unsaved change",
      tone: "warning",
    };
  }

  if (isPickComplete(pick)) {
    return {
      label: mode === "interactive" ? "Ready to save" : "Saved",
      tone: "success",
    };
  }

  if (hasStartedPick(pick)) {
    return {
      label: "In progress",
      tone: "info",
    };
  }

  return {
    label: "No pick yet",
    tone: "neutral",
  };
}

export function MatchCard({
  match,
  pick,
  lockState,
  mode,
  comparisonPick,
  actions,
  onScoreChange,
}: MatchCardProps) {
  const [isFocused, setIsFocused] = useState(false);
  const status = getStatusLabel(mode, pick, comparisonPick, lockState);
  const isComplete = isPickComplete(pick);
  const isDirty = comparisonPick ? !arePicksEqual(pick, comparisonPick) : false;
  const isStarted = hasStartedPick(pick);
  const homeAccent = getTeamAccent(match.homeTeam.accentColors);
  const awayAccent = getTeamAccent(match.awayTeam.accentColors);

  return (
    <article
      id={`match-${match.id}`}
      className={cn(
        "overflow-hidden rounded-none border-[3px] border-app-ink bg-app-surface-strong shadow-surface transition-[transform,box-shadow,border-color,background] duration-150",
        mode === "interactive" &&
          "hover:-translate-x-px hover:-translate-y-px hover:shadow-surface-raised",
        isStarted && "bg-app-warm",
        isDirty && "border-app-rust shadow-[0_18px_30px_-12px_rgba(184,53,0,0.32)]",
        isFocused && "shadow-surface-raised",
        lockState === "locked" && "bg-app-surface-soft",
      )}
    >
      <header className="flex gap-3 border-b-[3px] border-app-ink bg-app-panel px-4 py-3 justify-between items-center sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3 font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
          <span>{formatStageLabel(match.stage, match.group)}</span>
          <span>Match {String(match.sequence).padStart(2, "0")}</span>
        </div>
        <Badge label={status.label} tone={status.tone} subtle />
      </header>

      {mode === "interactive" ? (
        <div className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
          <ScoreInput
            teamId={match.homeTeam.id}
            label={match.homeTeam.shortName}
            teamCode={formatFifaRanking(match.homeTeam.fifaRanking)}
            fallbackFlag={match.homeTeam.flag}
            accent={homeAccent}
            value={pick.homeScore}
            disabled={lockState === "locked"}
            onChange={(nextValue) => onScoreChange?.("homeScore", nextValue)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div className="grid min-w-[92px] gap-1 rounded-none justify-items-center">
            <span className="font-display text-[0.74rem] font-black uppercase tracking-[0.18em] text-app-muted">
              vs
            </span>
            <span className="font-display text-[0.82rem] font-black uppercase tracking-[0.04em] text-app-ink">
              {formatKickoffTime(match.kickoffAt)}
            </span>
          </div>
          <ScoreInput
            teamId={match.awayTeam.id}
            label={match.awayTeam.shortName}
            teamCode={formatFifaRanking(match.awayTeam.fifaRanking)}
            fallbackFlag={match.awayTeam.flag}
            accent={awayAccent}
            value={pick.awayScore}
            disabled={lockState === "locked"}
            onChange={(nextValue) => onScoreChange?.("awayScore", nextValue)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      ) : (
        <div className="grid gap-4 p-5">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
            <div className="relative grid gap-1.5 overflow-hidden rounded-none border-[3px] border-app-ink bg-app-surface-strong px-4 py-4 pl-6">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-3 border-r-[3px] border-app-ink"
                style={{ background: homeAccent }}
              />
              <div className="flex items-center gap-3">
                <TeamFlag
                  fallbackFlag={match.homeTeam.flag}
                  size="md"
                  teamId={match.homeTeam.id}
                  teamName={match.homeTeam.name}
                />
                <div className="grid gap-1">
                  <span className="font-display text-[1rem] font-black uppercase tracking-[-0.04em] text-app-ink">
                    {match.homeTeam.name}
                  </span>
                  <span className="font-display text-[0.66rem] font-black uppercase tracking-[0.18em] text-app-muted">
                    {formatFifaRanking(match.homeTeam.fifaRanking)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid min-w-[92px] justify-items-start gap-1 rounded-none  md:justify-items-center">
              <span className="font-display text-[0.74rem] font-black uppercase tracking-[0.18em] text-app-muted">
                vs
              </span>
              <span className="font-display text-[0.82rem] font-black uppercase tracking-[0.04em] text-app-ink">
                {formatKickoffTime(match.kickoffAt)}
              </span>
            </div>

            <div className="relative grid gap-1.5 overflow-hidden rounded-none border-[3px] border-app-ink bg-app-surface-strong px-4 py-4 pl-6">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-3 border-r-[3px] border-app-ink"
                style={{ background: awayAccent }}
              />
              <div className="flex items-center gap-3">
                <TeamFlag
                  fallbackFlag={match.awayTeam.flag}
                  size="md"
                  teamId={match.awayTeam.id}
                  teamName={match.awayTeam.name}
                />
                <div className="grid gap-1">
                  <span className="font-display text-[1rem] font-black uppercase tracking-[-0.04em] text-app-ink">
                    {match.awayTeam.name}
                  </span>
                  <span className="font-display text-[0.66rem] font-black uppercase tracking-[0.18em] text-app-muted">
                    {formatFifaRanking(match.awayTeam.fifaRanking)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {isComplete ? (
            <div className="inline-flex w-fit items-center gap-2.5 rounded-none border-[3px] border-app-ink bg-app-lime px-4 py-3 font-display">
              <span className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-lime-ink">
                {match.homeTeam.code}
              </span>
              <span className="min-w-[1.5ch] text-[1.65rem] font-black text-app-ink">
                {pick.homeScore}
              </span>
              <span className="text-[0.86rem] font-black uppercase tracking-[0.18em] text-app-lime-ink">
                :
              </span>
              <span className="min-w-[1.5ch] text-[1.65rem] font-black text-app-ink">
                {pick.awayScore}
              </span>
              <span className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-lime-ink">
                {match.awayTeam.code}
              </span>
            </div>
          ) : (
            <p className="m-0 text-sm font-medium leading-7 text-app-muted">
              No exact score saved for this fixture yet.
            </p>
          )}
        </div>
      )}

      <footer className="flex flex-col gap-3 border-t-[3px] border-app-ink bg-app-surface-soft px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3 font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
          <span>{formatKickoffDay(match.kickoffAt)}</span>
          <span>{match.venue}</span>
        </div>
        {actions ? <div className="inline-flex flex-wrap gap-2.5">{actions}</div> : null}
      </footer>
    </article>
  );
}
