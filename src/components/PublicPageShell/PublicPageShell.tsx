import type { ReactNode } from "react";

import { SiteHeader } from "../SiteHeader";

interface PublicPageShellProps {
  children: ReactNode;
}

export function PublicPageShell({ children }: PublicPageShellProps) {
  return (
    <div className="min-h-screen px-3 pb-10 pt-4 sm:px-5 sm:pb-12 sm:pt-5">
      <div className="mx-auto grid max-w-[1240px] gap-6">
        <SiteHeader current="tournament" />
        <main className="grid gap-6">{children}</main>
      </div>
    </div>
  );
}
