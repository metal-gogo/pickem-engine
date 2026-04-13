import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { cn } from "../cn";
import { surfaceClass } from "../ui";

interface AppShellProps {
  children: ReactNode;
  previewLocked: boolean;
  onPreviewLockedChange: (nextValue: boolean) => void;
  savedPickCount: number;
  totalMatches: number;
}

const navigation = [
  { to: "/", label: "Overview" },
  { to: "/picks", label: "Make picks" },
  { to: "/review", label: "Review" },
  { to: "/leaderboard", label: "Leaderboard" },
];

export function AppShell({
  children,
  previewLocked,
  onPreviewLockedChange,
  savedPickCount,
  totalMatches,
}: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden px-3 pb-9 pt-5 sm:px-4 sm:pb-12 sm:pt-7">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-[-15%] bg-[radial-gradient(circle_at_18%_18%,rgba(75,131,255,0.2),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(255,180,90,0.14),transparent_18%),radial-gradient(circle_at_60%_88%,rgba(37,99,255,0.09),transparent_16%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-4">
        <header className={cn(surfaceClass, "flex flex-col gap-6 p-5 lg:flex-row lg:items-start lg:justify-between lg:p-7")}>
          <div className="grid max-w-[720px] gap-2.5">
            <span className="inline-flex w-fit items-center gap-2 text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-app-muted before:h-2 before:w-2 before:rounded-full before:bg-app-cobalt before:shadow-[0_0_0_4px_rgba(37,99,255,0.08)] before:content-['']">
              pickem-engine
            </span>
            <div className="grid gap-2">
              <h1 className="m-0 font-display text-[clamp(1.4rem,3vw,2.1rem)] tracking-[-0.03em] text-app-ink">
                World Cup pick&apos;em discovery build
              </h1>
              <p className="m-0 max-w-[62ch] leading-7 text-app-muted">
                Frontend-first, local-first, and structured to grow without pretending the backend exists yet.
              </p>
            </div>
          </div>

          <div className="grid gap-3 lg:min-w-[260px] lg:justify-items-stretch">
            <div className="grid gap-1 rounded-[18px] border border-app-cobalt-soft bg-[#eef4ff] px-4 py-3">
              <span className="font-bold text-app-ink">Saved picks</span>
              <span className="font-display text-2xl tracking-[-0.03em] text-app-ink">
                {savedPickCount}/{totalMatches}
              </span>
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

        <nav className={cn(surfaceClass, "flex flex-wrap gap-2 p-2")}>
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "min-w-[calc(50%-0.25rem)] flex-1 rounded-[18px] px-4 py-3.5 text-center font-extrabold text-app-muted-strong transition-[background,color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-app-cobalt-soft hover:text-app-ink md:min-w-0",
                  isActive &&
                    "bg-[linear-gradient(180deg,rgba(37,99,255,0.12),rgba(37,99,255,0.08))] text-app-cobalt-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] hover:translate-y-0",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main>{children}</main>
      </div>
    </div>
  );
}
