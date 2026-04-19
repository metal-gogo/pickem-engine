import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { PoolDetails } from "../../domain/models";
import { cn } from "../cn";
import {
  eyebrowClass,
  inlineSummaryClass,
  metricValueClass,
  sectionCopyClass,
  surfaceClass,
  tileCardClass,
} from "../ui";

interface PoolShellProps {
  children: ReactNode;
  pool: PoolDetails;
  previewLocked: boolean;
  onPreviewLockedChange: (nextValue: boolean) => void;
  savedPickCount: number;
  totalMatches: number;
}

export function PoolShell({
  children,
  pool,
  previewLocked,
  onPreviewLockedChange,
  savedPickCount,
  totalMatches,
}: PoolShellProps) {
  const progressPercent = Math.round((savedPickCount / totalMatches) * 100);

  return (
    <div className="min-h-screen px-3 pb-10 pt-4 sm:px-5 sm:pb-12 sm:pt-5">
      <div className="mx-auto grid max-w-[1240px] gap-6">
        <header className="sticky top-3 z-20 rounded-none border-[3px] border-app-ink bg-[rgba(252,255,220,0.92)] shadow-surface backdrop-blur-[18px]">
          <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between lg:px-5">
            <div className="grid gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <Link className="font-display text-[1.45rem] font-black uppercase tracking-[-0.08em] text-app-ink" to="/">
                  Pick'em WC
                </Link>
                <div className="flex flex-wrap gap-2">
                  <Link
                    className="rounded-none border-[3px] border-app-ink bg-app-surface-strong px-3 py-1 font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-ink transition-colors hover:bg-app-panel"
                    to="/"
                  >
                    Pools
                  </Link>
                  <span className="rounded-none border-[3px] border-app-ink bg-app-lime px-3 py-1 font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-ink">
                    Picks
                  </span>
                </div>
              </div>
              <div className={inlineSummaryClass}>
                <span>Private pool prototype</span>
                <span>2026 FIFA World Cup</span>
                <span>{pool.participantCount} players</span>
              </div>
            </div>

            <div className="inline-flex flex-wrap gap-2 rounded-none border-[3px] border-app-ink bg-app-panel p-1.5">
              <button
                className={cn(
                  "rounded-none border-[3px] px-3.5 py-2 font-display text-[0.68rem] font-black uppercase tracking-[0.18em] transition-[background,color,transform,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                  !previewLocked
                    ? "border-app-ink bg-app-lime text-app-ink shadow-[0_8px_0_rgba(56,56,52,0.14)]"
                    : "border-transparent bg-transparent text-app-muted",
                )}
                type="button"
                onClick={() => onPreviewLockedChange(false)}
              >
                Live edit mode
              </button>
              <button
                className={cn(
                  "rounded-none border-[3px] px-3.5 py-2 font-display text-[0.68rem] font-black uppercase tracking-[0.18em] transition-[background,color,transform,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                  previewLocked
                    ? "border-app-ink bg-app-ink text-app-canvas shadow-[0_8px_0_rgba(56,56,52,0.14)]"
                    : "border-transparent bg-transparent text-app-muted",
                )}
                type="button"
                onClick={() => onPreviewLockedChange(true)}
              >
                Locked preview
              </button>
            </div>
          </div>
        </header>

        <section className={cn(surfaceClass, "grid gap-5 p-5 lg:grid-cols-[1.18fr_0.82fr] lg:p-6")}>
          <div className="grid gap-4">
            <span className={eyebrowClass}>Active pool board</span>
            <div className="grid gap-3">
              <h1 className="m-0 font-display text-[clamp(2.2rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-app-ink">
                {pool.name}
              </h1>
              <p className={sectionCopyClass}>{pool.description}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className={cn(tileCardClass, "bg-app-lime")}>
              <span className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-lime-ink">
                Saved picks
              </span>
              <span className={metricValueClass}>
                {savedPickCount}/{totalMatches}
              </span>
              <div className="h-4 overflow-hidden rounded-none border-[3px] border-app-ink bg-app-surface-strong">
                <span
                  className="block h-full bg-[linear-gradient(90deg,#5d6b00_0%,#daf900_100%)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-sm font-medium leading-6 text-app-muted">
                {progressPercent}% of fixtures saved to the current local snapshot.
              </span>
            </div>

            <div className={tileCardClass}>
              <span className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-muted">
                Mode control
              </span>
              <p className="m-0 text-sm font-medium leading-6 text-app-muted">
                Flip between live editing and a locked-state preview without changing the prototype rules themselves.
              </p>
            </div>
          </div>
        </section>

        <main className="grid gap-6">{children}</main>
      </div>
    </div>
  );
}
