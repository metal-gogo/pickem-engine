import type { ReactNode } from "react";

import { PoolDetails } from "../../domain/models";
import { cn } from "../cn";
import { surfaceClass } from "../ui";
import { SiteHeader } from "../../components/SiteHeader";

interface PoolShellProps {
  children: ReactNode;
  pool: PoolDetails;
  previewLocked: boolean;
  onPreviewLockedChange: (nextValue: boolean) => void;
  savedPickCount: number;
  totalMatches: number;
}

export function PoolShell({ children, pool }: PoolShellProps) {
  return (
    <div className="min-h-screen px-3 pb-10 pt-4 sm:px-5 sm:pb-12 sm:pt-5">
      <div className="mx-auto grid max-w-[1240px] gap-6">
        <SiteHeader current="pools" />

        <section className={cn(surfaceClass, "grid gap-5 p-5 lg:grid-cols-[1.18fr_0.82fr] lg:p-6")}>
          <h1 className="m-0 font-display text-[clamp(2.2rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-app-ink">
            {pool.name}
          </h1>
        </section>

        <main className="grid gap-6">{children}</main>
      </div>
    </div>
  );
}
