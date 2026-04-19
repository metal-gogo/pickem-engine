import { Link } from "react-router-dom";

import { cn } from "../../app/cn";
import { eyebrowClass, noticeClass, pageStackClass, sectionCopyClass, sectionTitleClass, surfaceClass, tileCardClass } from "../../app/ui";
import { Badge } from "../../components/Badge";
import { getButtonClassName } from "../../components/Button";
import { GroupOverviewCard } from "../../components/GroupOverviewCard";
import { InfoTooltip } from "../../components/InfoTooltip";
import { RulesSummary } from "../../components/RulesSummary";
import { LockState, PoolDetails } from "../../domain/models";
import { TournamentGroup } from "../../domain/tournament";

interface PoolDashboardProps {
  pool: PoolDetails;
  groups: TournamentGroup[];
  lockState: LockState;
  deadlineLabel: string;
  resumeGroupId: string | null;
  draftDirty: boolean;
}

export function PoolDashboard({
  pool,
  groups,
  lockState,
  deadlineLabel,
  resumeGroupId,
  draftDirty,
}: PoolDashboardProps) {
  return (
    <div className={pageStackClass}>
      <section className={cn(surfaceClass, "grid gap-6 p-5 lg:p-7")}>
        <div className="grid gap-4">
          <div className={eyebrowClass}>Tournament board</div>
          <div className="grid gap-3">
            <h2 className="m-0 font-display text-[clamp(2.1rem,5vw,3.8rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-app-ink">
              Move through the tournament one group at a time, but keep the whole table in view.
            </h2>
            <p className={sectionCopyClass}>
              Group cards reflect your saved picks only. Use them to spot where you still need to work and to preview how each group might shake out.
            </p>
          </div>
          {resumeGroupId ? (
            <div>
              <Link className={getButtonClassName()} to={`/pools/${pool.id}/groups/${resumeGroupId}`}>
                Continue with Group {resumeGroupId}
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {draftDirty ? (
        <section className={noticeClass}>
          <div>
            <h2 className="mb-1.5 font-display text-[1.35rem] tracking-[-0.02em] text-app-ink">Unsaved draft changes are still open.</h2>
            <p className="m-0 leading-7 text-app-muted">
              Tournament cards still reflect the last saved picks, not any unsaved group edits.
            </p>
          </div>
        </section>
      ) : null}

      <section className={cn(surfaceClass, "grid gap-4 bg-app-lime p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-6")}>
        <div className="grid gap-1.5">
          <div className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-lime-ink">Shared deadline</div>
          <h2 className="m-0 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-black uppercase tracking-[-0.05em] text-app-ink">
            {deadlineLabel}
          </h2>
          <p className="m-0 max-w-[58ch] text-sm font-medium leading-6 text-app-muted">
            Every group in this prototype stays on the same tournament-wide deadline, so the tournament view and group views stay aligned.
          </p>
        </div>

        <div className="justify-self-start lg:justify-self-end">
          <Badge
            label={lockState === "locked" ? "Locked" : lockState === "locking-soon" ? "Locking soon" : "Editable"}
            tone={lockState === "locked" ? "locked" : lockState === "locking-soon" ? "warning" : "info"}
          />
        </div>
      </section>

      <RulesSummary pool={pool} />

      <section className="grid gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className={sectionTitleClass}>Group stage projection</h2>
              <InfoTooltip
                label="About the group stage projection"
                content="Table order is derived from saved picks with a temporary discovery sort. Treat it as a prototype preview, not as a finalized rule interpretation."
              />
            </div>
            <div className={tileCardClass}>
              <p className="m-0 text-sm font-medium leading-6 text-app-muted">
                These standings are provisional and based on saved picks only. The layout is optimized for momentum and quick comparison, not as a final rules interpretation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {groups.map((group) => (
            <GroupOverviewCard key={group.id} poolId={pool.id} group={group} />
          ))}
        </div>
      </section>
    </div>
  );
}
