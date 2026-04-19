import { Link } from "react-router-dom";

import { cn } from "../../app/cn";
import { TournamentGroup } from "../../domain/tournament";
import { getButtonClassName } from "../Button";
import { TeamFlag } from "../TeamFlag";

interface GroupOverviewCardProps {
  poolId: string;
  group: TournamentGroup;
}

type GroupOverviewRow = TournamentGroup["rows"][number];

const statHeaders = [
  { short: "MP", long: "Matches played", hideOnMobile: true, getValue: (row: GroupOverviewRow) => row.matchesPlayed },
  { short: "W", long: "Wins", getValue: (row: GroupOverviewRow) => row.wins },
  { short: "D", long: "Draws", getValue: (row: GroupOverviewRow) => row.draws },
  { short: "L", long: "Losses", getValue: (row: GroupOverviewRow) => row.losses },
  { short: "GF", long: "Goals for", hideOnMobile: true, getValue: (row: GroupOverviewRow) => row.goalsFor },
  { short: "GA", long: "Goals against", hideOnMobile: true, getValue: (row: GroupOverviewRow) => row.goalsAgainst },
  { short: "GD", long: "Goal difference", getValue: (row: GroupOverviewRow) => row.goalDifference },
  { short: "Pts", long: "Points", emphasized: true, getValue: (row: GroupOverviewRow) => row.points },
] satisfies ReadonlyArray<{
  short: string;
  long: string;
  getValue: (row: GroupOverviewRow) => number;
  hideOnMobile?: boolean;
  emphasized?: boolean;
}>;

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
  return (
    <article className="overflow-hidden rounded-none border-[4px] border-app-ink bg-app-surface shadow-surface">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 bg-app-ink px-2 py-4 text-app-canvas">
        <div className="grid min-w-0 gap-1.5">
          <div className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-lime">{group.label}</div>
          <div className="flex flex-wrap items-center gap-2.5 text-sm font-medium text-[#d9d5ca]">
            <span>
              {group.completedPickCount}/{group.matches.length} saved
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 self-start justify-self-end">
          <Link className={cn(getButtonClassName({ tone: "secondary", size: "compact" }), "border-app-lime")} to={`/pools/${poolId}/groups/${group.id}`}>
            {getActionLabel(group.status)}
          </Link>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <caption className="sr-only">{group.label} standings</caption>
          <thead>
            <tr className="bg-app-panel font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
              <th className="border-b-[4px] border-app-ink px-2 py-3 text-left" scope="col">
                Team
              </th>
              {statHeaders.map((header) => (
                <th
                  key={header.short}
                  className={cn(
                    "w-[32px] border-b-[4px] border-app-ink py-3 text-center",
                    header.short === "Pts" && "pe-2",
                    header.hideOnMobile && "hidden sm:table-cell",
                  )}
                  scope="col"
                >
                  <span aria-hidden="true">{header.short}</span>
                  <span className="sr-only">{header.long}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {group.rows.map((row, index) => {
              const isQualified = row.rank <= 2;
              const rowBorderClass = index === group.rows.length - 1 ? "border-b-0" : "border-b-[3px] border-app-ink";

              return (
                <tr
                  key={row.team.id}
                  className={cn("[&>td:last-child]:pe-2", isQualified ? "bg-app-lime" : "bg-app-surface-soft")}
                >
                  <th className={cn("px-2 py-3 text-left text-sm font-semibold text-app-ink", rowBorderClass)} scope="row">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <span
                        className={cn(
                          "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-[0.72rem] font-display font-black",
                          isQualified ? "border-app-ink bg-app-surface-strong text-app-ink" : "border-transparent text-app-muted",
                        )}
                      >
                        {row.rank}
                      </span>
                      <span className="hidden shrink-0 sm:block">
                        <TeamFlag fallbackFlag={row.team.flag} size="sm" teamId={row.team.id} teamName={row.team.name} />
                      </span>
                      <span className="grid min-w-0 gap-0.5">
                        <span
                          className="block truncate font-display text-[0.9rem] font-black uppercase tracking-[-0.03em]"
                          title={row.team.name}
                        >
                          {row.team.name}
                        </span>
                        <span className="font-display text-[0.62rem] font-black uppercase tracking-[0.18em] text-app-muted">
                          {row.team.code}
                        </span>
                      </span>
                    </div>
                  </th>
                  {statHeaders.map((header) => (
                    <td
                      key={`${row.team.id}-${header.short}`}
                      className={cn(
                        "text-center text-sm font-semibold text-app-ink",
                        header.emphasized && "font-display text-[1rem] font-black",
                        rowBorderClass,
                        header.hideOnMobile && "hidden sm:table-cell",
                      )}
                    >
                      {header.getValue(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </article>
  );
}
