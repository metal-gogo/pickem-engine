import { ButtonHTMLAttributes } from "react";

import { cn } from "../app/cn";
import { ButtonTone, getButtonClassName } from "./buttonStyles";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone;
  fullWidth?: boolean;
}

export function PrimaryButton({
  className,
  children,
  tone = "primary",
  fullWidth = false,
  ...buttonProps
}: PrimaryButtonProps) {
  return (
    <button className={cn(getButtonClassName({ tone, fullWidth }), className)} {...buttonProps}>
      {children}
    </button>
  );
}
