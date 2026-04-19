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
      {draftDirty ? (
        <section className={noticeClass}>
          <div>
            <h2 className="mb-1.5 font-display text-[1.35rem] tracking-[-0.02em] text-app-ink">Unsaved changes.</h2>
            <p className="m-0 leading-7 text-app-muted">
              Tournament cards still reflect the last saved picks, not unsaved edits.
            </p>
          </div>
        </section>
      ) : null}

      <section className={cn(surfaceClass, "grid gap-4 bg-app-lime p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-6")}>
          <h2 className="m-0 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-black uppercase tracking-[-0.05em] text-app-ink">
            {deadlineLabel}
          </h2>

        
      </section>
      <RulesSummary pool={pool} />

      

      <section className="grid gap-4">


        <div className="grid gap-4 xl:grid-cols-2">
          {groups.map((group) => (
            <GroupOverviewCard key={group.id} poolId={pool.id} group={group} />
          ))}
        </div>
      </section>
    </div>
  );
}
