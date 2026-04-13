import type { ReactNode } from "react";
import { useState } from "react";

import { cn } from "../../app/cn";
import { formatKickoffDay, formatKickoffTime, formatStageLabel } from "../../app/format";
import { LockState, Match, MatchPick } from "../../domain/models";
import { arePicksEqual, hasStartedPick, isPickComplete } from "../../domain/picks";
import { Badge } from "../Badge";
import { ScoreInput } from "../ScoreInput";

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
        "grid gap-4 rounded-[24px] border border-app-line bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,248,253,0.94)),linear-gradient(120deg,rgba(37,99,255,0.04),rgba(37,99,255,0))] p-5 shadow-[0_8px_24px_rgba(18,40,90,0.04)] transition-[transform,box-shadow,border-color,background] duration-150",
        mode === "interactive" && "hover:-translate-y-0.5 hover:shadow-surface-raised",
        isComplete && "border-app-cobalt-soft",
        isStarted &&
          "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,246,255,0.94)),linear-gradient(120deg,rgba(37,99,255,0.06),rgba(255,190,90,0.04))]",
        isDirty && "border-[#f0c37d] shadow-[0_18px_32px_rgba(239,155,32,0.08)]",
        isFocused && "border-[#7aa0ff] shadow-[0_22px_40px_rgba(37,99,255,0.14)]",
        lockState === "locked" &&
          "bg-[linear-gradient(180deg,rgba(248,250,253,0.96),rgba(240,244,249,0.92)),linear-gradient(120deg,rgba(16,32,63,0.02),rgba(16,32,63,0))]",
      )}
    >
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3 text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-app-muted">
          <span>{formatStageLabel(match.stage, match.group)}</span>
          <span>Match {String(match.sequence).padStart(2, "0")}</span>
        </div>
        <Badge label={status.label} tone={status.tone} />
      </header>

      {mode === "interactive" ? (
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
          <ScoreInput
            label={match.homeTeam.shortName}
            teamCode={match.homeTeam.code}
            accent={homeAccent}
            value={pick.homeScore}
            variant="compact"
            disabled={lockState === "locked"}
            onChange={(nextValue) => onScoreChange?.("homeScore", nextValue)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div className="grid min-w-[72px] justify-items-start gap-1 md:justify-items-center">
            <span className="font-display text-[0.82rem] uppercase tracking-[0.14em] text-app-muted">vs</span>
            <span className="text-[0.84rem] font-bold text-app-muted-strong">{formatKickoffTime(match.kickoffAt)}</span>
          </div>
          <ScoreInput
            label={match.awayTeam.shortName}
            teamCode={match.awayTeam.code}
            accent={awayAccent}
            value={pick.awayScore}
            variant="compact"
            disabled={lockState === "locked"}
            onChange={(nextValue) => onScoreChange?.("awayScore", nextValue)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
            <div className="relative grid gap-1.5 overflow-hidden rounded-[20px] border border-app-line bg-app-surface-strong px-[18px] py-4 pl-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-2" style={{ background: homeAccent }} />
              <span className="font-display text-[1.04rem] tracking-[-0.02em] text-app-ink">{match.homeTeam.name}</span>
              <span className="text-[0.75rem] font-extrabold uppercase tracking-[0.16em] text-app-muted">
                {match.homeTeam.code}
              </span>
            </div>

            <div className="grid min-w-[72px] justify-items-start gap-1 md:justify-items-center">
              <span className="font-display text-[0.82rem] uppercase tracking-[0.14em] text-app-muted">vs</span>
              <span className="text-[0.84rem] font-bold text-app-muted-strong">{formatKickoffTime(match.kickoffAt)}</span>
            </div>

            <div className="relative grid gap-1.5 overflow-hidden rounded-[20px] border border-app-line bg-app-surface-strong px-[18px] py-4 pl-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-2" style={{ background: awayAccent }} />
              <span className="font-display text-[1.04rem] tracking-[-0.02em] text-app-ink">{match.awayTeam.name}</span>
              <span className="text-[0.75rem] font-extrabold uppercase tracking-[0.16em] text-app-muted">
                {match.awayTeam.code}
              </span>
            </div>
          </div>

          {isComplete ? (
            <div className="inline-flex w-fit items-center gap-2.5 rounded-[18px] bg-app-cobalt-soft px-4 py-3 font-display">
              <span className="text-[0.86rem] uppercase tracking-[0.14em] text-app-muted">{match.homeTeam.code}</span>
              <span className="min-w-[1.5ch] text-[1.5rem] text-app-ink">{pick.homeScore}</span>
              <span className="text-[0.86rem] uppercase tracking-[0.14em] text-app-muted">:</span>
              <span className="min-w-[1.5ch] text-[1.5rem] text-app-ink">{pick.awayScore}</span>
              <span className="text-[0.86rem] uppercase tracking-[0.14em] text-app-muted">{match.awayTeam.code}</span>
            </div>
          ) : (
            <p className="m-0 leading-7 text-app-muted">No exact score saved for this fixture yet.</p>
          )}
        </div>
      )}

      <footer className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3 text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-app-muted">
          <span>{formatKickoffDay(match.kickoffAt)}</span>
          <span>{match.venue}</span>
        </div>
        {actions ? <div className="inline-flex flex-wrap gap-2.5">{actions}</div> : null}
      </footer>
    </article>
  );
}
