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
      <label className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-[20px] border border-app-line bg-app-surface-strong px-[18px] py-4 pl-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-[transform,background,border-color,box-shadow] duration-150 focus-within:-translate-y-px focus-within:border-app-cobalt focus-within:bg-[#f5f9ff] focus-within:shadow-[0_18px_28px_rgba(37,99,255,0.12)]">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-2" style={accent ? { background: accent } : undefined} />
        <span className="flex items-center gap-3 pr-2">
          <TeamFlag fallbackFlag={fallbackFlag} size="md" teamId={teamId} teamName={label} />
          <span className="grid gap-1.5">
            <span className="font-display text-[1.04rem] tracking-[-0.02em] text-app-ink">{label}</span>
            <span className="text-[0.75rem] font-extrabold uppercase tracking-[0.16em] text-app-muted">{teamCode}</span>
          </span>
        </span>
        <input
          className="score-field h-[4.1rem] w-[4.6rem] rounded-[18px] border border-app-line bg-white px-0 text-center font-display text-[2rem] text-app-ink shadow-[0_12px_24px_rgba(18,40,90,0.07)] outline-none transition-[border-color,box-shadow,background,color] duration-150 focus:border-app-cobalt disabled:bg-app-locked-soft disabled:text-app-muted disabled:shadow-none"
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
    <label className="grid gap-3 rounded-[20px] border border-app-cobalt-soft bg-app-surface-tint p-4 transition-[transform,background,border-color,box-shadow] duration-150 focus-within:-translate-y-px focus-within:border-app-cobalt focus-within:bg-[#ecf4ff] focus-within:shadow-[0_18px_28px_rgba(37,99,255,0.12)]">
      <span className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          <TeamFlag fallbackFlag={fallbackFlag} size="md" teamId={teamId} teamName={label} />
          <span className="font-extrabold text-app-ink">{label}</span>
        </span>
        <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-app-muted">{teamCode}</span>
      </span>
      <input
        className="score-field w-full rounded-2xl border border-app-line bg-white px-3 py-3.5 text-center font-display text-[1.8rem] text-app-ink shadow-[0_12px_24px_rgba(18,40,90,0.07)] outline-none transition-[border-color,box-shadow,background,color] duration-150 focus:border-app-cobalt disabled:bg-app-locked-soft disabled:text-app-muted disabled:shadow-none"
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
