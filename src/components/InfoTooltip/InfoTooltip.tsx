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
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-app-line bg-app-surface-soft text-sm font-extrabold text-app-muted transition-colors hover:border-app-line-strong hover:text-app-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(37,99,255,0.16)]"
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
          "pointer-events-none absolute right-0 top-[calc(100%+0.65rem)] z-20 w-[min(22rem,calc(100vw-2rem))] rounded-[18px] border border-app-line bg-white p-3 text-sm leading-6 text-app-muted shadow-[0_18px_42px_rgba(15,32,63,0.16)]",
          !isOpen && "hidden",
        )}
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
}
