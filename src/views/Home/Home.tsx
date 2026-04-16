import { Link } from "react-router-dom";

import { formatSavedAt } from "../../app/format";
import { getButtonClassName } from "../../components/Button";
import { PoolDetails } from "../../domain/models";

interface HomeProps {
  pools: PoolDetails[];
}

export function Home({ pools }: HomeProps) {
  return (
    <div className="relative min-h-screen overflow-hidden px-3 pb-9 pt-5 sm:px-4 sm:pb-12 sm:pt-7">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-[-15%] bg-[radial-gradient(circle_at_18%_18%,rgba(75,131,255,0.2),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(255,180,90,0.14),transparent_18%),radial-gradient(circle_at_60%_88%,rgba(37,99,255,0.09),transparent_16%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1040px] gap-5">
        <section className="grid gap-6 rounded-[28px] border border-app-line bg-app-surface p-6 shadow-surface backdrop-blur-[16px] lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div className="grid gap-4">
            <div className="inline-flex w-fit items-center gap-2 text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-app-muted before:h-2 before:w-2 before:rounded-full before:bg-app-cobalt before:shadow-[0_0_0_4px_rgba(37,99,255,0.08)] before:content-['']">
              pickem-engine
            </div>
            <div className="grid gap-3">
              <h1 className="m-0 font-display text-[clamp(2.3rem,5vw,4rem)] leading-[0.98] tracking-[-0.04em] text-app-ink">
                Welcome back to your pools.
              </h1>
              <p className="m-0 max-w-[62ch] text-base leading-7 text-app-muted">
                Start from the pool you want to inspect, then move into the tournament overview and focused group picks.
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-[24px] border border-app-line bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,248,253,0.93))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <span className="font-bold text-app-ink">Pool creation</span>
            <p className="m-0 leading-7 text-app-muted">
              Self-serve pool creation remains out of scope for this prototype while the core tournament interaction model is still being tested.
            </p>
            <button className={getButtonClassName({ tone: "ghost" })} disabled type="button">
              Create new pool
            </button>
          </div>
        </section>

        <section className="grid gap-4">
          {pools.map((pool) => (
            <article
              key={pool.id}
              className="grid gap-4 rounded-[26px] border border-app-line bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(244,248,253,0.94))] p-5 shadow-[0_16px_34px_rgba(15,32,63,0.06)] lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
            >
              <div className="grid gap-2">
                <h2 className="m-0 font-display text-[1.8rem] tracking-[-0.03em] text-app-ink">{pool.name}</h2>
                <p className="m-0 max-w-[60ch] leading-7 text-app-muted">{pool.shortRulesSummary}</p>
              </div>

              <div className="grid gap-3 lg:justify-items-end">
                <div className="grid gap-1 rounded-[18px] border border-app-line bg-app-surface-soft px-4 py-3 text-sm text-app-muted">
                  <span>{pool.participantCount} players</span>
                  <span>Deadline preview: {formatSavedAt(pool.deadlineAt)}</span>
                </div>
                <Link className={getButtonClassName()} to={`/pools/${pool.id}`}>
                  Open pool
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
