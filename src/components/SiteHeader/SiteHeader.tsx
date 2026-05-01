import { Link } from "react-router";

import { cn } from "../../app/cn";
import { ThemeModeSelector } from "../../app/theme";

type SiteSection = "tournament" | "pools";

interface SiteHeaderProps {
  current?: SiteSection;
  className?: string;
}

function getNavLinkClassName(active: boolean) {
  return cn(
    "rounded-none border-[3px] px-3 py-1 font-display text-[0.68rem] font-black uppercase tracking-[0.18em] transition-colors",
    active
      ? "border-app-ink bg-app-lime text-app-lime-ink"
      : "border-app-ink bg-app-surface-strong text-app-ink hover:bg-app-panel",
  );
}

export function SiteHeader({ current = "tournament", className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-3 z-20 rounded-none border-[3px] border-app-ink bg-app-header shadow-surface backdrop-blur-[18px]",
        className,
      )}
    >
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between lg:px-5">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            className="font-display text-[1.45rem] font-black uppercase tracking-[-0.08em] text-app-ink"
            to="/"
          >
            Pick'em WC
          </Link>
          <nav aria-label="Primary" className="flex flex-wrap gap-2">
            <Link
              aria-current={current === "tournament" ? "page" : undefined}
              className={getNavLinkClassName(current === "tournament")}
              to="/"
            >
              Tournament
            </Link>
            <Link
              aria-current={current === "pools" ? "page" : undefined}
              className={getNavLinkClassName(current === "pools")}
              to="/pools"
            >
              Pools
            </Link>
          </nav>
        </div>
        <ThemeModeSelector />
      </div>
    </header>
  );
}
