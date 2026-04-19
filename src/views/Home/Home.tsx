import { Link } from "react-router-dom";

import { formatSavedAt } from "../../app/format";
import { cn } from "../../app/cn";
import { eyebrowClass, heroTitleClass, sectionCopyClass, surfaceClass, tileCardClass } from "../../app/ui";
import { getButtonClassName } from "../../components/Button";
import { PoolDetails } from "../../domain/models";

interface HomeProps {
  pools: PoolDetails[];
}

export function Home({ pools }: HomeProps) {
  return (
    <div className="min-h-screen px-3 pb-10 pt-4 sm:px-5 sm:pb-12 sm:pt-5">
      <div className="mx-auto grid max-w-[1160px] gap-6">
        <header className="sticky top-3 z-20 rounded-none border-[3px] border-app-ink bg-[rgba(252,255,220,0.92)] shadow-surface backdrop-blur-[18px]">
          <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between lg:px-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-[1.45rem] font-black uppercase tracking-[-0.08em] text-app-ink">Pick'em WC</span>
              <span className="rounded-none border-[3px] border-app-ink bg-app-lime px-3 py-1 font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-ink">
                Pools
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className={getButtonClassName({ tone: "primary" })} disabled type="button">
                Join with code
              </button>
            </div>
          </div>
        </header>

        <section className={cn(surfaceClass, "grid gap-6 p-5 lg:grid-cols-[1.2fr_0.8fr] lg:p-7")}>
          <div className="grid gap-4">
            <div className={eyebrowClass}>Private pools only</div>
            <div className="grid gap-3">
              <h1 className={heroTitleClass}>Your pools.</h1>
              <p className={sectionCopyClass}>
                Start from the pool you want to inspect, then move into the tournament board and focused group picks.
              </p>
            </div>
          </div>

          <div className={tileCardClass}>
            <span className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-muted">Pool creation</span>
            <p className="m-0 text-sm font-medium leading-7 text-app-muted">
              Self-serve pool creation remains out of scope for this prototype while the core tournament interaction model is still being tested.
            </p>
            <button className={getButtonClassName({ tone: "ghost" })} disabled type="button">
              Create new pool
            </button>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {pools.map((pool) => (
            <article
              key={pool.id}
              className="grid gap-5 rounded-none border-[3px] border-app-ink bg-app-surface-strong p-5 shadow-surface"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="grid gap-2">
                  <span className="w-fit rounded-none border-[3px] border-app-ink bg-app-panel px-3 py-1 font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
                    Invite only
                  </span>
                  <h2 className="m-0 font-display text-[2rem] font-black uppercase leading-[0.92] tracking-[-0.06em] text-app-ink">
                    {pool.name}
                  </h2>
                </div>

                <div className="rounded-none border-[3px] border-app-ink bg-app-lime px-3 py-2 text-right">
                  <span className="block font-display text-[0.66rem] font-black uppercase tracking-[0.18em] text-app-lime-ink">
                    Participants
                  </span>
                  <span className="font-display text-[1.55rem] font-black uppercase tracking-[-0.05em] text-app-ink">
                    {pool.participantCount}
                  </span>
                </div>
              </div>

              <div className="grid gap-4">
                <div className={tileCardClass}>
                  <span className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-muted">
                    Tournament-wide deadline
                  </span>
                  <span className="font-display text-[1.3rem] font-black uppercase leading-tight tracking-[-0.04em] text-app-ink">
                    {formatSavedAt(pool.deadlineAt)}
                  </span>
                  <p className="m-0 text-sm font-medium leading-6 text-app-muted">{pool.shortRulesSummary}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-app-ink pt-4">
                  <p className="m-0 max-w-[40ch] text-sm font-medium leading-6 text-app-muted">
                    World Cup 2026 prototype pool with a shared deadline and exact-score picks.
                  </p>
                  <Link className={getButtonClassName()} to={`/pools/${pool.id}`}>
                    Open pool
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
