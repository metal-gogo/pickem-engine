import { useState } from "react";

import { cn } from "../../app/cn";

interface TeamFlagProps {
  teamId: string;
  teamName: string;
  fallbackFlag?: string;
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "pill";
  className?: string;
}

function getTeamFlagSrc(teamId: string) {
  return `/flags/countryflags/original/${teamId}.svg`;
}

const sizeClassNames = {
  sm: {
    frame: "h-7 w-10",
    fallback: "text-base",
  },
  md: {
    frame: "h-8 w-11",
    fallback: "text-lg",
  },
  lg: {
    frame: "h-10 w-14",
    fallback: "text-xl",
  },
} as const;

export function TeamFlag({
  teamId,
  teamName,
  fallbackFlag,
  size = "md",
  shape = "rounded",
  className,
}: TeamFlagProps) {
  const [broken, setBroken] = useState(false);
  const styles = sizeClassNames[size];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-app-line bg-white shadow-[0_8px_18px_rgba(18,40,90,0.08)]",
        shape === "pill" ? "rounded-full" : "rounded-[12px]",
        styles.frame,
        className,
      )}
    >
      {!broken ? (
        <img
          alt=""
          className="h-full w-full object-cover"
          src={getTeamFlagSrc(teamId)}
          onError={() => setBroken(true)}
        />
      ) : (
        <span
          aria-label={`${teamName} flag`}
          className={cn("leading-none", styles.fallback)}
          role="img"
        >
          {fallbackFlag ?? "🏳️"}
        </span>
      )}
    </span>
  );
}
