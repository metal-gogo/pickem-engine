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
      <section className="flex flex-col gap-3 rounded-[24px] border border-app-line bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,248,253,0.94))] p-5 shadow-[0_16px_32px_rgba(15,32,63,0.06)] lg:flex-row lg:items-start lg:justify-between">
        <div className="grid gap-2">
          <div className="text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-app-muted">Points overview</div>
          <ul className="m-0 grid gap-2 pl-5 text-sm leading-6 text-app-muted">
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
          className="fixed inset-0 z-30 grid place-items-center bg-[rgba(10,17,32,0.56)] p-4 backdrop-blur-[6px]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="grid max-h-[min(90vh,760px)] w-full max-w-[760px] gap-5 overflow-y-auto rounded-[28px] border border-app-line bg-white p-6 shadow-[0_24px_64px_rgba(10,17,32,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="grid gap-2">
                <span className="text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-app-muted">Full pool rules</span>
                <h2 className="m-0 font-display text-[1.8rem] tracking-[-0.03em] text-app-ink">{pool.name}</h2>
                <p className="m-0 leading-7 text-app-muted">
                  Prototype-only placeholder copy to test how rules, scoring notes, and caveats read inside a modal.
                </p>
              </div>
              <Button size="compact" tone="ghost" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>

            <div className="grid gap-4">
              {pool.fullRules.map((section) => (
                <section key={section.id} className="grid gap-2 rounded-[20px] border border-app-line bg-app-surface-soft p-4">
                  <h3 className="m-0 font-display text-[1.15rem] tracking-[-0.02em] text-app-ink">{section.title}</h3>
                  <p className="m-0 leading-7 text-app-muted">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
