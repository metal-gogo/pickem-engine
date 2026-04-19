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
        "grid items-start gap-3 rounded-none border-[3px] border-app-ink bg-app-surface-strong p-[18px] sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:items-center lg:grid-cols-[auto_auto_minmax(0,1fr)_auto_auto]",
        entry.rank === 1 && "bg-app-lime shadow-[0_10px_0_rgba(56,56,52,0.14)]",
        entry.rank > 1 && entry.rank <= 3 && "bg-app-panel",
      )}
    >
      <div className="font-display text-[1.4rem] font-black uppercase tracking-[-0.05em] text-app-ink">{entry.rank}</div>
      <div className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-app-ink bg-app-surface-soft font-display text-[0.88rem] font-black uppercase text-app-ink">
        {entry.initials}
      </div>
      <div className="grid gap-0.5">
        <span className="font-display text-[1rem] font-black uppercase tracking-[-0.03em] text-app-ink">{entry.name}</span>
        <span className="text-sm font-medium text-app-muted">World Cup pool points</span>
      </div>
      <div className="grid justify-items-start sm:col-start-3 lg:justify-items-end">
        <span className="font-display text-[1.4rem] font-black uppercase tracking-[-0.05em] text-app-ink">{entry.points}</span>
        <span className="font-display text-[0.64rem] font-black uppercase tracking-[0.18em] text-app-muted">pts</span>
      </div>
      <div className="sm:col-start-3 sm:justify-self-start lg:col-start-auto">
        <Badge label={entry.movementLabel} tone={movementTone} subtle />
      </div>
    </div>
  );
}
