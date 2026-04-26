import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { cn } from "../../app/cn";
import {
  eyebrowClass,
  inlineSummaryClass,
  metricValueClass,
  metricValueSmallClass,
  pageStackClass,
  panelHeaderClass,
  sectionCopyClass,
  sectionPanelClass,
  sectionTitleClass,
  surfaceClass,
  tileCardClass,
} from "../../app/ui";
import { formatSavedAt } from "../../app/format";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { MatchCard } from "../../components/MatchCard";
import { LockState, Match, PoolSummary, UserPickSet } from "../../domain/models";
import { getPick } from "../../domain/picks";

interface PicksProps {
  pool: PoolSummary;
  matches: Match[];
  draftPickSet: UserPickSet;
  savedPickSet: UserPickSet;
  lockState: LockState;
  draftDirty: boolean;
  completedDraftCount: number;
  changedMatchCount: number;
  onScoreChange: (matchId: string, side: "homeScore" | "awayScore", nextValue: string) => void;
  onSaveDraft: () => void;
  onResetDraft: () => void;
}

export function Picks({
  pool,
  matches,
  draftPickSet,
  savedPickSet,
  lockState,
  draftDirty,
  completedDraftCount,
  changedMatchCount,
  onScoreChange,
  onSaveDraft,
  onResetDraft,
}: PicksProps) {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const matchId = searchParams.get("match");

    if (!matchId) {
      return;
    }

    const target = document.getElementById(`match-${matchId}`);
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [searchParams]);

  return (
    <div className={pageStackClass}>
      <section className={sectionPanelClass}>
        <div className={panelHeaderClass}>
          <div>
            <div className={eyebrowClass}>Pick entry</div>
            <h1 className={sectionTitleClass}>Build your exact-score slate</h1>
            <p className={sectionCopyClass}>
              Working assumption for discovery only: the local user can edit freely until the single
              global deadline.
            </p>
          </div>

          <div className={inlineSummaryClass}>
            <Badge
              label={
                lockState === "locked"
                  ? "Locked"
                  : lockState === "locking-soon"
                    ? "Locking soon"
                    : "Editable"
              }
              tone={
                lockState === "locked"
                  ? "locked"
                  : lockState === "locking-soon"
                    ? "warning"
                    : "info"
              }
            />
            <span>{completedDraftCount} complete picks</span>
            <span>{pool.name}</span>
          </div>
        </div>

        <div className="grid gap-3.5 lg:grid-cols-2">
          <div className={tileCardClass}>
            <span className="font-bold text-app-ink">Draft progress</span>
            <span className={metricValueClass}>
              {completedDraftCount}/{matches.length}
            </span>
            <span className="leading-7 text-app-muted">Saved locally when you confirm changes</span>
          </div>
          <div className={tileCardClass}>
            <span className="font-bold text-app-ink">Current save</span>
            <span className={metricValueSmallClass}>{formatSavedAt(savedPickSet.updatedAt)}</span>
            <span className="leading-7 text-app-muted">Review reads from this saved snapshot</span>
          </div>
        </div>
      </section>

      <section className="grid gap-3.5">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            pick={getPick(draftPickSet, match.id)}
            comparisonPick={getPick(savedPickSet, match.id)}
            lockState={lockState}
            mode="interactive"
            onScoreChange={(side, nextValue) => onScoreChange(match.id, side, nextValue)}
          />
        ))}
      </section>

      <section
        className={cn(
          surfaceClass,
          "flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between lg:p-6",
        )}
      >
        <div>
          <h2 className="mb-1.5 font-display text-[1.35rem] tracking-[-0.02em] text-app-ink">
            {lockState === "locked"
              ? "Picks are locked in this preview mode."
              : "Save the current pick set"}
          </h2>
          <p className="m-0 leading-7 text-app-muted">
            {draftDirty
              ? `${changedMatchCount} fixture${changedMatchCount === 1 ? "" : "s"} changed since the last save.`
              : "All changes are already saved locally."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button tone="ghost" onClick={onResetDraft} disabled={!draftDirty}>
            Reset draft
          </Button>
          <Button onClick={onSaveDraft} disabled={!draftDirty || lockState === "locked"}>
            {lockState === "locked"
              ? "Locked"
              : draftDirty
                ? "Save picks locally"
                : "Saved locally"}
          </Button>
        </div>
      </section>
    </div>
  );
}
