import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export const THEME_MODE_STORAGE_KEY = "pickem-engine:theme-mode";
export const THEME_MODES = ["light", "dark", "system"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];
export type ResolvedTheme = Exclude<ThemeMode, "system">;

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  mode?: ThemeMode;
  onModeChange?: (mode: ThemeMode) => void;
  persist?: boolean;
  storageKey?: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && THEME_MODES.includes(value as ThemeMode);
}

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveThemeMode(mode: ThemeMode, systemTheme = getSystemTheme()): ResolvedTheme {
  return mode === "system" ? systemTheme : mode;
}

function getStoredThemeMode(storageKey: string): ThemeMode | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedMode = window.localStorage.getItem(storageKey);
    return isThemeMode(storedMode) ? storedMode : null;
  } catch {
    return null;
  }
}

function persistThemeMode(storageKey: string, mode: ThemeMode) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, mode);
  } catch {
    // Theme preference is nice to keep, but the UI should still work without storage.
  }
}

function applyTheme(mode: ThemeMode, resolvedTheme: ResolvedTheme) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.dataset.themeMode = mode;
  root.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;
}

export function ThemeProvider({
  children,
  defaultMode = "system",
  mode: controlledMode,
  onModeChange,
  persist = true,
  storageKey = THEME_MODE_STORAGE_KEY,
}: ThemeProviderProps) {
  const [uncontrolledMode, setUncontrolledMode] = useState<ThemeMode>(
    () => (persist ? getStoredThemeMode(storageKey) : null) ?? defaultMode,
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme());
  const mode = controlledMode ?? uncontrolledMode;
  const resolvedTheme = resolveThemeMode(mode, systemTheme);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setSystemTheme(query.matches ? "dark" : "light");

    handleChange();
    query.addEventListener("change", handleChange);

    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    applyTheme(mode, resolvedTheme);
  }, [mode, resolvedTheme]);

  const setMode = useCallback(
    (nextMode: ThemeMode) => {
      if (controlledMode === undefined) {
        setUncontrolledMode(nextMode);
      }

      if (persist) {
        persistThemeMode(storageKey, nextMode);
      }

      onModeChange?.(nextMode);
    },
    [controlledMode, onModeChange, persist, storageKey],
  );

  const value = useMemo(
    () => ({
      mode,
      resolvedTheme,
      setMode,
    }),
    [mode, resolvedTheme, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useThemeMode must be used inside ThemeProvider");
  }

  return value;
}
