import { TeamFlag } from "../TeamFlag";

interface ScoreInputProps {
  teamId: string;
  label: string;
  teamCode: string;
  fallbackFlag?: string;
  value: number | null;
  accent?: string;
  disabled?: boolean;
  variant?: "default" | "compact";
  onChange: (nextValue: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function ScoreInput({
  teamId,
  label,
  teamCode,
  fallbackFlag,
  value,
  accent,
  disabled = false,
  variant = "default",
  onChange,
  onFocus,
  onBlur,
}: ScoreInputProps) {
  if (variant === "compact") {
    return (
      <label className="relative grid min-h-[84px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-[10px] border-[3px] border-app-ink bg-app-surface-strong px-4 py-4 pl-6 transition-[transform,background,border-color,box-shadow] duration-150 focus-within:-translate-x-px focus-within:-translate-y-px focus-within:bg-app-warm focus-within:shadow-surface-raised">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-3 border-r-[3px] border-app-ink"
          style={accent ? { background: accent } : undefined}
        />
        <span className="flex items-center gap-3 pr-2">
          <TeamFlag fallbackFlag={fallbackFlag} size="md" teamId={teamId} teamName={label} />
          <span className="grid gap-1">
            <span className="font-display text-[1rem] font-black uppercase tracking-[-0.04em] text-app-ink">{label}</span>
            <span className="font-display text-[0.66rem] font-black uppercase tracking-[0.18em] text-app-muted">{teamCode}</span>
          </span>
        </span>
        <input
          className="score-field h-[3.85rem] w-[4.1rem] rounded-[8px] border-[3px] border-app-ink bg-app-surface-strong px-0 text-center font-display text-[1.95rem] font-black text-app-ink shadow-[0_8px_18px_-10px_rgba(56,56,52,0.35)] outline-none transition-[border-color,box-shadow,background,color] duration-150 focus:bg-app-panel disabled:bg-app-locked-soft disabled:text-app-muted disabled:shadow-none"
          type="number"
          inputMode="numeric"
          min="0"
          max="20"
          disabled={disabled}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </label>
    );
  }

  return (
    <label className="grid gap-3 rounded-[10px] border-[3px] border-app-ink bg-app-surface-soft p-4 transition-[transform,background,border-color,box-shadow] duration-150 focus-within:-translate-x-px focus-within:-translate-y-px focus-within:bg-app-warm focus-within:shadow-surface-raised">
      <span className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          <TeamFlag fallbackFlag={fallbackFlag} size="md" teamId={teamId} teamName={label} />
          <span className="font-display font-black uppercase tracking-[-0.03em] text-app-ink">{label}</span>
        </span>
        <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">{teamCode}</span>
      </span>
      <input
        className="score-field w-full rounded-[8px] border-[3px] border-app-ink bg-app-surface-strong px-3 py-3.5 text-center font-display text-[1.8rem] font-black text-app-ink shadow-[0_8px_18px_-10px_rgba(56,56,52,0.35)] outline-none transition-[border-color,box-shadow,background,color] duration-150 focus:bg-app-panel disabled:bg-app-locked-soft disabled:text-app-muted disabled:shadow-none"
        type="number"
        inputMode="numeric"
        min="0"
        max="20"
        disabled={disabled}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </label>
  );
}
