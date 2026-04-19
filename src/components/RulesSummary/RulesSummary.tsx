

import { PoolDetails } from "../../domain/models";

interface RulesSummaryProps {
  pool: PoolDetails;
}

export function RulesSummary({ pool }: RulesSummaryProps) {
  return (
    <>
      <section className="flex flex-col gap-4 rounded-none border-[3px] border-app-ink bg-app-surface-strong p-5 shadow-surface lg:flex-row lg:items-start lg:justify-between">
        <div className="grid gap-2">
          <div className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-muted">Points overview</div>
          <ul className="m-0 grid gap-2 pl-5 text-sm font-medium leading-6 text-app-muted">
            {pool.pointsOverview.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
