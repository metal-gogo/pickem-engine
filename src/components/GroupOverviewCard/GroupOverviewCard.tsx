import { Link } from "react-router";

import { cn } from "../../app/cn";
import { TournamentGroup } from "../../domain/tournament";
import { getButtonClassName } from "../Button";
import { GroupTable } from "../GroupTable";

interface GroupOverviewCardProps {
  poolId: string;
  group: TournamentGroup;
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
  return (
    <article className="overflow-hidden rounded-none border-[4px] border-app-ink bg-app-surface shadow-surface">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 bg-app-ink-fill px-2 py-4 text-app-on-ink-fill">
        <div className="grid min-w-0 gap-1.5">
          <div className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-lime">
            {group.label}
          </div>
          <div className="flex flex-wrap items-center gap-2.5 text-sm font-medium text-app-on-ink-fill">
            <span>
              {group.completedPickCount}/{group.matches.length} saved
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 self-start justify-self-end">
          <Link
            className={cn(
              getButtonClassName({ tone: "secondary", size: "compact" }),
              "border-app-lime",
            )}
            to={`/pools/${poolId}/groups/${group.id}`}
          >
            {getActionLabel(group.status)}
          </Link>
        </div>
      </header>

      <GroupTable label={group.label} rows={group.rows} />
    </article>
  );
}
