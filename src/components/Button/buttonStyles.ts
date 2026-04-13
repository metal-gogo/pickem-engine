import { cn } from "../../app/cn";

export type ButtonTone = "primary" | "secondary" | "ghost";
export type ButtonSize = "default" | "compact";

interface ButtonClassNameOptions {
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const baseClassName =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[18px] border border-transparent font-display font-bold tracking-[-0.02em] transition-[transform,box-shadow,background,border-color,color,opacity] duration-150 outline-none hover:-translate-y-0.5 active:translate-y-px disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55 disabled:shadow-none focus-visible:ring-4 focus-visible:ring-[rgba(37,99,255,0.16)] motion-reduce:transform-none motion-reduce:transition-none";

const toneClassNames: Record<ButtonTone, string> = {
  primary:
    "bg-[linear-gradient(180deg,#3270ff_0%,#1249ed_100%)] text-white shadow-button-primary hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_20px_34px_rgba(37,99,255,0.28)] active:shadow-press",
  secondary:
    "border-app-line-strong bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,248,253,0.96))] text-app-ink shadow-button-secondary hover:bg-white hover:shadow-[0_14px_24px_rgba(16,32,63,0.1)] active:shadow-press",
  ghost:
    "border-app-line bg-app-surface-soft text-app-muted-strong shadow-[0_10px_20px_rgba(16,32,63,0.04)] hover:bg-white hover:text-app-ink hover:shadow-[0_14px_22px_rgba(16,32,63,0.08)] active:shadow-press",
};

const sizeClassNames: Record<ButtonSize, string> = {
  default: "min-h-[52px] px-[18px] py-[14px] text-[0.98rem]",
  compact: "min-h-10 rounded-2xl px-4 py-2.5 text-sm",
};

export function getButtonClassName({
  tone = "primary",
  size = "default",
  fullWidth = false,
}: ButtonClassNameOptions = {}) {
  return cn(baseClassName, toneClassNames[tone], sizeClassNames[size], fullWidth && "w-full");
}
