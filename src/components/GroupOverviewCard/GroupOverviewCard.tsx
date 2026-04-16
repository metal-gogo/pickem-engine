import { Link } from "react-router-dom";

import { TournamentGroup } from "../../domain/tournament";
import { Badge } from "../Badge";
import { getButtonClassName } from "../Button";

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
    <article className="grid gap-4 rounded-[24px] border border-app-line bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(244,248,253,0.94))] p-5 shadow-[0_14px_30px_rgba(15,32,63,0.06)]">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="grid gap-1.5">
          <div className="text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-app-muted">{group.label}</div>
          <div className="flex flex-wrap items-center gap-2.5 text-sm font-bold text-app-muted">
            <span>
              {group.completedPickCount}/{group.matches.length} saved
            </span>
            <span>•</span>
            <span>{group.isProvisional ? "Predicted from saved picks" : "Saved table preview"}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge label={status.label} tone={status.tone} />
          <Link className={getButtonClassName({ tone: "secondary", size: "compact" })} to={`/pools/${poolId}/groups/${group.id}`}>
            {getActionLabel(group.status)}
          </Link>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-app-muted">
              <th className="pr-4">#</th>
              <th className="min-w-[180px] pr-6">Team</th>
              <th className="pr-4 text-center">MP</th>
              <th className="pr-4 text-center">W</th>
              <th className="pr-4 text-center">D</th>
              <th className="pr-4 text-center">L</th>
              <th className="pr-4 text-center">GF</th>
              <th className="pr-4 text-center">GA</th>
              <th className="pr-4 text-center">GD</th>
              <th className="text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {group.rows.map((row) => (
              <tr key={row.team.id} className="rounded-[18px] bg-app-surface-soft text-app-ink">
                <td className="rounded-l-[18px] px-3 py-3 font-display text-[1.05rem]">{row.rank}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg" aria-hidden>
                      {row.team.flag}
                    </span>
                    <div className="grid gap-0.5">
                      <span className="font-bold">{row.team.name}</span>
                      <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-app-muted">
                        {row.team.code}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 text-center">{row.matchesPlayed}</td>
                <td className="px-2 py-3 text-center">{row.wins}</td>
                <td className="px-2 py-3 text-center">{row.draws}</td>
                <td className="px-2 py-3 text-center">{row.losses}</td>
                <td className="px-2 py-3 text-center">{row.goalsFor}</td>
                <td className="px-2 py-3 text-center">{row.goalsAgainst}</td>
                <td className="px-2 py-3 text-center">{row.goalDifference}</td>
                <td className="rounded-r-[18px] px-3 py-3 text-center font-bold">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="text-sm leading-6 text-app-muted">
        {group.isProvisional
          ? "Table order is provisional and based only on the matches you have saved so far."
          : "All six saved picks are reflected in this provisional group preview."}
      </footer>
    </article>
  );
}
