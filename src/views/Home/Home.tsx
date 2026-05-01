import { Link } from "react-router";

import { formatSavedAt } from "../../app/format";

import { heroTitleClass, tileCardClass } from "../../app/ui";
import { getButtonClassName } from "../../components/Button";
import { SiteHeader } from "../../components/SiteHeader";
import { PoolDetails } from "../../domain/models";

interface HomeProps {
  pools: PoolDetails[];
}

export function Home({ pools }: HomeProps) {
  return (
    <div className="min-h-screen px-3 pb-10 pt-4 sm:px-5 sm:pb-12 sm:pt-5">
      <div className="mx-auto grid max-w-[1160px] gap-6">
        <SiteHeader current="pools" />
        <h1 className={heroTitleClass}>Your pools</h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-end">
          <div className={`${tileCardClass} min-h-[54px] min-w-[min(100%,16rem)] justify-center`}>
            <span className="font-display text-[0.64rem] font-black uppercase tracking-[0.18em] text-app-muted">
              Tournament starts
            </span>
            <span className="font-display text-[1rem] font-black uppercase leading-tight tracking-[-0.02em] text-app-ink">
              {formatSavedAt("2026-06-10T21:00:00-06:00")}
            </span>
          </div>
          <button className={getButtonClassName({ tone: "primary" })} disabled type="button">
            Join with code
          </button>
          <button className={getButtonClassName({ tone: "ghost" })} disabled type="button">
            Create new pool
          </button>
        </div>

        <section className="grid gap-5 md:grid-cols-2">
          {pools.map((pool) => (
            <article
              key={pool.id}
              className="grid gap-5 rounded-none border-[3px] border-app-ink bg-app-surface-strong p-5 shadow-surface"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h2 className="m-0 font-display text-[2rem] font-black uppercase leading-[0.92] tracking-[-0.06em] text-app-ink">
                  {pool.name}
                </h2>
                <span>
                  {pool.participantCount}{" "}
                  {pool.participantCount === 1 ? "participant" : "participants"}
                </span>
              </div>

              <div className="grid gap-4">
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
