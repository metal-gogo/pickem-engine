import { useState } from "react";

import { cn } from "../../app/cn";

interface InfoTooltipProps {
  label: string;
  content: string;
}

export function InfoTooltip({ label, content }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        aria-label={label}
        aria-expanded={isOpen}
        className="inline-flex h-8 w-8 items-center justify-center rounded-none border-[3px] border-app-ink bg-app-lime font-display text-[0.76rem] font-black text-app-lime-ink transition-colors hover:bg-[#e8ff4e] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(218,249,0,0.24)]"
        type="button"
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((current) => !current)}
        onFocus={() => setIsOpen(true)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        i
      </button>

      <span
        className={cn(
          "pointer-events-none absolute right-0 top-[calc(100%+0.65rem)] z-20 w-[min(22rem,calc(100vw-2rem))] rounded-none border-[3px] border-app-ink bg-app-surface-strong p-3 text-sm font-medium leading-6 text-app-muted shadow-surface",
          !isOpen && "hidden",
        )}
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
}
