import { cn } from "../../../app/cn";
import { LeaderboardEntry } from "../../../domain/models";
import { Badge } from "../../Badge";

interface StandingsRowProps {
  entry: LeaderboardEntry;
}

export function StandingsRow({ entry }: StandingsRowProps) {
  const movementTone = entry.trend === "up" ? "success" : entry.trend === "down" ? "warning" : "neutral";

  return (
    <div
      className={cn(
        "grid items-start gap-3 rounded-[20px] border border-app-line bg-white/72 p-[18px] sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:items-center lg:grid-cols-[auto_auto_minmax(0,1fr)_auto_auto]",
        entry.rank <= 3 &&
          "bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,250,255,0.92)),linear-gradient(120deg,rgba(37,99,255,0.06),rgba(255,190,90,0.04))]",
      )}
    >
      <div className="font-display text-[1.3rem] tracking-[-0.03em] text-app-ink">{entry.rank}</div>
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-app-cobalt-soft font-extrabold text-app-cobalt-strong">
        {entry.initials}
      </div>
      <div className="grid gap-0.5">
        <span className="font-extrabold text-app-ink">{entry.name}</span>
        <span className="text-sm text-app-muted">World Cup pool points</span>
      </div>
      <div className="grid justify-items-start sm:col-start-3 lg:justify-items-end">
        <span className="font-display text-[1.3rem] tracking-[-0.03em] text-app-ink">{entry.points}</span>
        <span className="text-[0.78rem] uppercase tracking-[0.12em] text-app-muted">pts</span>
      </div>
      <div className="sm:col-start-3 sm:justify-self-start lg:col-start-auto">
        <Badge label={entry.movementLabel} tone={movementTone} subtle />
      </div>
    </div>
  );
}
