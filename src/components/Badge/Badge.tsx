import { cn } from "../../app/cn";

type StatusTone = "neutral" | "info" | "success" | "warning" | "locked";

interface BadgeProps {
  label: string;
  tone?: StatusTone;
  subtle?: boolean;
}

export function Badge({ label, tone = "neutral", subtle = false }: BadgeProps) {
  const toneClassName = {
    neutral: "bg-[#edf1f8] text-app-muted-strong",
    info: "bg-app-cobalt-soft text-app-cobalt-strong",
    success: "bg-app-success-soft text-[#0f7c4b]",
    warning: "bg-app-warning-soft text-[#a35c00]",
    locked: "bg-app-locked text-white",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex min-h-8 w-fit items-center justify-center rounded-full px-3 py-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.07em]",
        toneClassName,
        subtle && "min-w-12 px-2.5",
      )}
    >
      {label}
    </span>
  );
}
