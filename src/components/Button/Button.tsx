import { ButtonHTMLAttributes } from "react";

import { cn } from "../../app/cn";
import { ButtonSize, ButtonTone, getButtonClassName } from "./buttonStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function Button({
  className,
  children,
  tone = "primary",
  size = "default",
  fullWidth = false,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={cn(getButtonClassName({ tone, size, fullWidth }), className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
