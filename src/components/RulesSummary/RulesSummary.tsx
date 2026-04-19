import { useState } from "react";

import { PoolDetails } from "../../domain/models";
import { Button } from "../Button";

interface RulesSummaryProps {
  pool: PoolDetails;
}

export function RulesSummary({ pool }: RulesSummaryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-4 rounded-[10px] border-[3px] border-app-ink bg-app-surface-strong p-5 shadow-surface lg:flex-row lg:items-start lg:justify-between">
        <div className="grid gap-2">
          <div className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-muted">Points overview</div>
          <ul className="m-0 grid gap-2 pl-5 text-sm font-medium leading-6 text-app-muted">
            {pool.pointsOverview.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <Button size="compact" tone="ghost" onClick={() => setIsOpen(true)}>
          See rules
        </Button>
      </section>

      {isOpen ? (
        <div
          className="fixed inset-0 z-30 grid place-items-center bg-[rgba(56,56,52,0.42)] p-4 backdrop-blur-[6px]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="grid max-h-[min(90vh,760px)] w-full max-w-[760px] gap-5 overflow-y-auto rounded-[10px] border-[4px] border-app-ink bg-app-surface-strong p-6 shadow-[0_24px_48px_-16px_rgba(56,56,52,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="grid gap-2">
                <span className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-muted">Full pool rules</span>
                <h2 className="m-0 font-display text-[1.95rem] font-black uppercase tracking-[-0.05em] text-app-ink">{pool.name}</h2>
                <p className="m-0 text-sm font-medium leading-7 text-app-muted">
                  Prototype-only placeholder copy to test how rules, scoring notes, and caveats read inside a modal.
                </p>
              </div>
              <Button size="compact" tone="ghost" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>

            <div className="grid gap-4">
              {pool.fullRules.map((section) => (
                <section key={section.id} className="grid gap-2 rounded-[10px] border-[3px] border-app-ink bg-app-panel p-4">
                  <h3 className="m-0 font-display text-[1.05rem] font-black uppercase tracking-[-0.03em] text-app-ink">
                    {section.title}
                  </h3>
                  <p className="m-0 text-sm font-medium leading-7 text-app-muted">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
