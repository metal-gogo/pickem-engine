import { Link } from "react-router-dom";

import { cn } from "../../app/cn";
import { TournamentGroup } from "../../domain/tournament";
import { Badge } from "../Badge";
import { getButtonClassName } from "../Button";
import { TeamFlag } from "../TeamFlag";

interface GroupOverviewCardProps {
  poolId: string;
  group: TournamentGroup;
}

function getStatusTone(status: TournamentGroup["status"]) {
  switch (status) {
    case "complete":
      return { label: "Complete", tone: "success" as const };
    case "in-progress":
      return { label: "In progress", tone: "warning" as const };
    default:
      return { label: "Not started", tone: "neutral" as const };
  }
}

function getActionLabel(status: TournamentGroup["status"]) {
  switch (status) {
    case "complete":
      return "Edit picks";
    case "in-progress":
      return "Continue picks";
    default:
      return "Make picks";
  }
}

export function GroupOverviewCard({ poolId, group }: GroupOverviewCardProps) {
  const status = getStatusTone(group.status);

  return (
    <article className="overflow-hidden rounded-[10px] border-[4px] border-app-ink bg-app-surface shadow-surface">
      <header className="grid gap-3 bg-app-ink px-5 py-4 text-app-canvas lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="grid gap-1.5">
          <div className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-lime">{group.label}</div>
          <div className="flex flex-wrap items-center gap-2.5 text-sm font-medium text-[#d9d5ca]">
            <span>
              {group.completedPickCount}/{group.matches.length} saved
            </span>
            <span>•</span>
            <span>{group.isProvisional ? "Predicted from saved picks" : "Saved table preview"}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-self-end">
          <Badge label={status.label} tone={status.tone} />
          <Link className={getButtonClassName({ tone: "secondary", size: "compact" })} to={`/pools/${poolId}/groups/${group.id}`}>
            {getActionLabel(group.status)}
          </Link>
        </div>
      </header>

      <div className="overflow-x-auto">
        <div className="min-w-[780px]">
          <div className="grid grid-cols-[minmax(180px,1.4fr)_repeat(8,minmax(44px,0.55fr))] gap-2 border-b-[4px] border-app-ink bg-app-panel px-4 py-3 font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
            <div>Team</div>
            <div className="text-center">MP</div>
            <div className="text-center">W</div>
            <div className="text-center">D</div>
            <div className="text-center">L</div>
            <div className="text-center">GF</div>
            <div className="text-center">GA</div>
            <div className="text-center">GD</div>
            <div className="text-center">Pts</div>
          </div>

          <div className="flex flex-col">
            {group.rows.map((row) => (
              <div
                key={row.team.id}
                className={cn(
                  "grid grid-cols-[minmax(180px,1.4fr)_repeat(8,minmax(44px,0.55fr))] gap-2 border-b-[3px] border-app-ink px-4 py-3 text-sm font-semibold text-app-ink last:border-b-0",
                  row.rank <= 2 ? "bg-app-lime" : "bg-app-surface-soft",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-full border-2 text-[0.72rem] font-display font-black",
                      row.rank <= 2 ? "border-app-ink bg-app-surface-strong text-app-ink" : "border-transparent text-app-muted",
                    )}
                  >
                    {row.rank}
                  </span>
                  <TeamFlag fallbackFlag={row.team.flag} size="sm" teamId={row.team.id} teamName={row.team.name} />
                  <div className="grid gap-0.5">
                    <span className="font-display text-[0.9rem] font-black uppercase tracking-[-0.03em]">{row.team.name}</span>
                    <span className="font-display text-[0.62rem] font-black uppercase tracking-[0.18em] text-app-muted">
                      {row.team.code}
                    </span>
                  </div>
                </div>
                <div className="text-center">{row.matchesPlayed}</div>
                <div className="text-center">{row.wins}</div>
                <div className="text-center">{row.draws}</div>
                <div className="text-center">{row.losses}</div>
                <div className="text-center">{row.goalsFor}</div>
                <div className="text-center">{row.goalsAgainst}</div>
                <div className="text-center">{row.goalDifference}</div>
                <div className="text-center font-display text-[1rem] font-black">{row.points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t-[4px] border-app-ink bg-app-surface-soft px-4 py-3 text-sm font-medium leading-6 text-app-muted">
        {group.isProvisional
          ? "Table order is provisional and based only on the matches you have saved so far."
          : "All six saved picks are reflected in this provisional group preview."}
      </footer>
    </article>
  );
}
