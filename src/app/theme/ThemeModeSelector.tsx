import { cn } from "../cn";
import { THEME_MODES, useThemeMode } from "./ThemeProvider";
import type { ThemeMode } from "./ThemeProvider";

const modeLabels: Record<ThemeMode, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

interface ThemeModeSelectorProps {
  className?: string;
}

export function ThemeModeSelector({ className }: ThemeModeSelectorProps) {
  const { mode, setMode } = useThemeMode();

  return (
    <div
      aria-label="Color mode"
      className={cn(
        "inline-flex w-fit overflow-hidden rounded-none border-[3px] border-app-ink bg-app-surface-soft p-1 shadow-[0_7px_0_rgba(56,56,52,0.14)]",
        className,
      )}
      role="radiogroup"
    >
      {THEME_MODES.map((themeMode) => {
        const isActive = mode === themeMode;

        return (
          <button
            key={themeMode}
            aria-checked={isActive}
            className={cn(
              "min-h-9 min-w-[4.25rem] px-3 py-2 font-display text-[0.66rem] font-black uppercase tracking-[0.12em] text-app-muted-strong transition-[background,color,transform] duration-150 hover:bg-app-panel hover:text-app-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(218,249,0,0.28)]",
              isActive && "bg-app-ink text-app-canvas hover:bg-app-ink hover:text-app-canvas",
            )}
            role="radio"
            type="button"
            onClick={() => setMode(themeMode)}
          >
            {modeLabels[themeMode]}
          </button>
        );
      })}
    </div>
  );
}
