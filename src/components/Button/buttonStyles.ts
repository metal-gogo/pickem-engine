import { cn } from "../../app/cn";

export type ButtonTone = "primary" | "secondary" | "ghost";
export type ButtonSize = "default" | "compact";

interface ButtonClassNameOptions {
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const baseClassName =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] border-[3px] border-app-ink font-display font-black uppercase tracking-[0.16em] transition-[transform,box-shadow,background,border-color,color,opacity] duration-150 outline-none hover:-translate-x-px hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55 disabled:shadow-none focus-visible:ring-4 focus-visible:ring-[rgba(218,249,0,0.24)] motion-reduce:transform-none motion-reduce:transition-none";

const toneClassNames: Record<ButtonTone, string> = {
  primary:
    "bg-app-lime text-app-ink shadow-button-primary hover:bg-[#e8ff4e] active:bg-app-lime-strong",
  secondary:
    "bg-app-surface-strong text-app-ink shadow-button-secondary hover:bg-app-panel active:bg-app-surface-soft",
  ghost:
    "border-2 border-app-line-strong bg-app-surface-soft text-app-muted-strong shadow-[0_6px_0_rgba(130,128,124,0.16)] hover:bg-app-surface-strong hover:text-app-ink active:bg-app-panel",
};

const sizeClassNames: Record<ButtonSize, string> = {
  default: "min-h-[54px] px-5 py-3.5 text-[0.8rem]",
  compact: "min-h-10 rounded-[8px] px-4 py-2.5 text-[0.72rem]",
};

export function getButtonClassName({
  tone = "primary",
  size = "default",
  fullWidth = false,
}: ButtonClassNameOptions = {}) {
  return cn(baseClassName, toneClassNames[tone], sizeClassNames[size], fullWidth && "w-full");
}
