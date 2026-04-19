import { cn } from "../../app/cn";

type StatusTone = "neutral" | "info" | "success" | "warning" | "locked";

interface BadgeProps {
  label: string;
  tone?: StatusTone;
  subtle?: boolean;
}

export function Badge({ label, tone = "neutral", subtle = false }: BadgeProps) {
  const toneClassName = {
    neutral: "border-app-outline bg-app-panel text-app-muted-strong",
    info: "border-app-ink bg-app-lime text-app-ink",
    success: "border-[#285a10] bg-app-success-soft text-[#285a10]",
    warning: "border-app-ink bg-app-warning-soft text-app-rust",
    locked: "border-app-ink bg-app-locked text-app-canvas",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex min-h-8 w-fit items-center justify-center rounded-[8px] border-2 px-3 py-1.5 font-display text-[0.68rem] font-black uppercase tracking-[0.16em]",
        toneClassName,
        subtle && "min-w-12 px-2.5 text-[0.62rem]",
      )}
    >
      {label}
    </span>
  );
}
