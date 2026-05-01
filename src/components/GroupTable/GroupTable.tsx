import { cn } from "../../app/cn";
import type { GroupTableRow } from "../../domain/tournament";
import { TeamFlag } from "../TeamFlag";

interface GroupTableProps {
  label: string;
  rows: GroupTableRow[];
  caption?: string;
  className?: string;
  highlightQualifiedRows?: boolean;
  qualificationCutoff?: number;
}

const statHeaders = [
  {
    short: "MP",
    long: "Matches played",
    hideOnMobile: true,
    getValue: (row: GroupTableRow) => row.matchesPlayed,
  },
  { short: "W", long: "Wins", getValue: (row: GroupTableRow) => row.wins },
  { short: "D", long: "Draws", getValue: (row: GroupTableRow) => row.draws },
  { short: "L", long: "Losses", getValue: (row: GroupTableRow) => row.losses },
  {
    short: "GF",
    long: "Goals for",
    hideOnMobile: true,
    getValue: (row: GroupTableRow) => row.goalsFor,
  },
  {
    short: "GA",
    long: "Goals against",
    hideOnMobile: true,
    getValue: (row: GroupTableRow) => row.goalsAgainst,
  },
  { short: "GD", long: "Goal difference", getValue: (row: GroupTableRow) => row.goalDifference },
  {
    short: "Pts",
    long: "Points",
    emphasized: true,
    getValue: (row: GroupTableRow) => row.points,
  },
] satisfies ReadonlyArray<{
  short: string;
  long: string;
  getValue: (row: GroupTableRow) => number;
  hideOnMobile?: boolean;
  emphasized?: boolean;
}>;

export function GroupTable({
  label,
  rows,
  caption,
  className,
  highlightQualifiedRows = true,
  qualificationCutoff = 2,
}: GroupTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-separate border-spacing-0">
        <caption className="sr-only">{caption ?? `${label} standings`}</caption>
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
          {rows.map((row, index) => {
            const isQualified = highlightQualifiedRows && row.rank <= qualificationCutoff;
            const rowBorderClass =
              index === rows.length - 1 ? "border-b-0" : "border-b-[3px] border-app-ink";

            return (
              <tr
                key={row.team.id}
                className={cn(
                  "[&>td:last-child]:pe-2",
                  isQualified ? "bg-app-qualified-row" : "bg-app-surface-soft text-app-ink",
                )}
              >
                <th
                  className={cn(
                    "px-2 py-3 text-left text-sm font-semibold",
                    isQualified ? "text-app-qualified-ink" : "text-app-ink",
                    rowBorderClass,
                  )}
                  scope="row"
                >
                  <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-[0.72rem] font-display font-black",
                        isQualified
                          ? "border-app-ink bg-app-surface-strong text-app-ink"
                          : "border-transparent text-app-muted",
                      )}
                    >
                      {row.rank}
                    </span>
                    <div className="flex min-w-0 gap-2 sm:gap-3">
                      <TeamFlag
                        fallbackFlag={row.team.flag}
                        size="sm"
                        shape="pill"
                        teamId={row.team.id}
                        teamName={row.team.name}
                        className="hidden aspect-[10/7] sm:inline-flex"
                      />
                      <span className="grid min-w-0 content-center gap-0.5">
                        <span
                          className="block truncate font-display text-[0.9rem] font-black uppercase tracking-[-0.03em]"
                          title={row.team.name}
                        >
                          {row.team.name}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[0.62rem] font-black uppercase tracking-[0.18em]",
                            isQualified ? "text-app-qualified-muted" : "text-app-muted",
                          )}
                        >
                          {row.team.code}
                        </span>
                      </span>
                    </div>
                  </div>
                </th>
                {statHeaders.map((header) => (
                  <td
                    key={`${row.team.id}-${header.short}`}
                    className={cn(
                      "text-center text-sm font-semibold",
                      isQualified ? "text-app-qualified-ink" : "text-app-ink",
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
  );
}
