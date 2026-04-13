interface ScoreInputProps {
  label: string;
  teamCode: string;
  value: number | null;
  disabled?: boolean;
  onChange: (nextValue: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function ScoreInput({
  label,
  teamCode,
  value,
  disabled = false,
  onChange,
  onFocus,
  onBlur,
}: ScoreInputProps) {
  return (
    <label className="grid gap-3 rounded-[20px] border border-app-cobalt-soft bg-app-surface-tint p-4 transition-[transform,background,border-color,box-shadow] duration-150 focus-within:-translate-y-px focus-within:border-app-cobalt focus-within:bg-[#ecf4ff] focus-within:shadow-[0_18px_28px_rgba(37,99,255,0.12)]">
      <span className="flex items-center justify-between gap-3">
        <span className="font-extrabold text-app-ink">{label}</span>
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
