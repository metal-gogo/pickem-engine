import { ButtonHTMLAttributes } from "react";

import { cn } from "../../app/cn";
import { ButtonTone, getButtonClassName } from "./buttonStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone;
  fullWidth?: boolean;
}

export function Button({
  className,
  children,
  tone = "primary",
  fullWidth = false,
  ...buttonProps
}: ButtonProps) {
  return (
    <button className={cn(getButtonClassName({ tone, fullWidth }), className)} {...buttonProps}>
      {children}
    </button>
  );
}
