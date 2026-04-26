import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { PoolDetails } from "../../domain/models";
import { cn } from "../cn";
import { surfaceClass } from "../ui";

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
}: PoolShellProps) {
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
                </div>
              </div>
            </div>

          </div>
        </header>

        <section className={cn(surfaceClass, "grid gap-5 p-5 lg:grid-cols-[1.18fr_0.82fr] lg:p-6")}>
          <h1 className="m-0 font-display text-[clamp(2.2rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-app-ink">
                {pool.name}
              </h1>
        </section>

        <main className="grid gap-6">{children}</main>
      </div>
    </div>
  );
}
