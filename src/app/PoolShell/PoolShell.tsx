import { ReactNode } from "react";
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
  previewLocked,
  onPreviewLockedChange,
  savedPickCount,
  totalMatches,
}: PoolShellProps) {
  const progressPercent = Math.round((savedPickCount / totalMatches) * 100);

  return (
    <div className="relative min-h-screen overflow-hidden px-3 pb-9 pt-5 sm:px-4 sm:pb-12 sm:pt-7">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-[-15%] bg-[radial-gradient(circle_at_18%_18%,rgba(75,131,255,0.2),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(255,180,90,0.14),transparent_18%),radial-gradient(circle_at_60%_88%,rgba(37,99,255,0.09),transparent_16%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-4">
        <nav aria-label="Breadcrumb" className="px-1">
          <Link
            className="inline-flex items-center gap-2 text-sm font-bold text-app-muted transition-colors hover:text-app-ink"
            to="/"
          >
            <span>Pools</span>
            <span aria-hidden>&gt;</span>
          </Link>
        </nav>

        <header className={cn(surfaceClass, "grid gap-5 p-5 lg:grid-cols-[1.25fr_0.75fr] lg:p-7")}>
          <div className="grid gap-3">
            <div className="grid gap-2.5">
              <span className="inline-flex w-fit items-center gap-2 text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-app-muted before:h-2 before:w-2 before:rounded-full before:bg-app-cobalt before:shadow-[0_0_0_4px_rgba(37,99,255,0.08)] before:content-['']">
                pickem-engine
              </span>
              <div className="grid gap-2">
                <h1 className="m-0 font-display text-[clamp(1.7rem,4vw,2.7rem)] tracking-[-0.04em] text-app-ink">
                  {pool.name}
                </h1>
                <p className="m-0 max-w-[62ch] leading-7 text-app-muted">{pool.description}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 lg:justify-items-stretch">
            <div className="grid gap-2 rounded-[18px] border border-app-cobalt-soft bg-[#eef4ff] px-4 py-3">
              <span className="font-bold text-app-ink">Saved picks</span>
              <span className="font-display text-2xl tracking-[-0.03em] text-app-ink">
                {savedPickCount}/{totalMatches}
              </span>
              <div className="relative h-3 overflow-hidden rounded-full bg-white/75">
                <span
                  className="block h-full rounded-full bg-[linear-gradient(90deg,#7eb3ff_0%,#2563ff_55%,#0d42d6_100%)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-sm leading-6 text-app-muted">{progressPercent}% of fixtures saved</span>
            </div>

            <div className="inline-flex flex-wrap gap-2 rounded-[18px] border border-app-line bg-app-surface-soft p-1.5">
              <button
                className={cn(
                  "rounded-[14px] px-3.5 py-2.5 font-bold text-app-muted-strong transition-[background,color,transform,box-shadow] duration-150 hover:-translate-y-0.5",
                  !previewLocked &&
                    "bg-[linear-gradient(180deg,#2563ff_0%,#1249ed_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_12px_24px_rgba(37,99,255,0.22)] hover:translate-y-0",
                )}
                type="button"
                onClick={() => onPreviewLockedChange(false)}
              >
                Live edit mode
              </button>
              <button
                className={cn(
                  "rounded-[14px] px-3.5 py-2.5 font-bold text-app-muted-strong transition-[background,color,transform,box-shadow] duration-150 hover:-translate-y-0.5",
                  previewLocked &&
                    "bg-[linear-gradient(180deg,#2563ff_0%,#1249ed_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_12px_24px_rgba(37,99,255,0.22)] hover:translate-y-0",
                )}
                type="button"
                onClick={() => onPreviewLockedChange(true)}
              >
                Locked preview
              </button>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
