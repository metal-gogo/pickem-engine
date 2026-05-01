import { cn } from "../../app/cn";
import { getButtonClassName } from "../Button";

interface CalendarDownloadLinkProps {
  href: string;
  fileName: string;
  label: string;
  className?: string;
}

export function CalendarDownloadLink({
  href,
  fileName,
  label,
  className,
}: CalendarDownloadLinkProps) {
  return (
    <a
      className={cn(getButtonClassName({ tone: "primary" }), className)}
      download={fileName}
      href={href}
    >
      {label}
    </a>
  );
}
