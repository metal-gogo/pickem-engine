import { Link, useNavigate } from "react-router-dom";

import { cn } from "../../app/cn";
import { formatSavedAt } from "../../app/format";
import {
  eyebrowClass,
  pageStackClass,
  panelHeaderClass,
  sectionCopyClass,
  sectionPanelClass,
  sectionTitleClass,
  surfaceClass,
  tileCardClass,
} from "../../app/ui";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { MatchCard } from "../../components/MatchCard";
import { RulesSummary } from "../../components/RulesSummary";
import { LockState, PoolDetails, UserPickSet } from "../../domain/models";
import { countChangedMatches, countCompletedPicks, getPick } from "../../domain/picks";
import { TournamentGroup, getNextGroupId, getPreviousGroupId } from "../../domain/tournament";

interface GroupPicksProps {
  pool: PoolDetails;
  group: TournamentGroup;
  allMatches: TournamentGroup["matches"];
  draftPickSet: UserPickSet;
  savedPickSet: UserPickSet;
  lockState: LockState;
  onScoreChange: (matchId: string, side: "homeScore" | "awayScore", nextValue: string) => void;
  onSaveDraft: () => void;
}

function getNextActionLabel(nextGroupId: string | null, lockState: LockState) {
  if (lockState === "locked") {
    return nextGroupId ? `Continue to Group ${nextGroupId}` : "Return to tournament";
  }

  return nextGroupId ? "Save and continue" : "Save and return";
}

export function GroupPicks({
  pool,
  group,
  allMatches,
  draftPickSet,
  savedPickSet,
  lockState,
  onScoreChange,
  onSaveDraft,
}: GroupPicksProps) {
  const navigate = useNavigate();
  const completedDraftCount = countCompletedPicks(draftPickSet, group.matches);
  const completedSavedCount = countCompletedPicks(savedPickSet, group.matches);
  const changedMatchCount = countChangedMatches(draftPickSet, savedPickSet, group.matches);
  const groupDirty = changedMatchCount > 0;
  const nextGroupId = getNextGroupId(allMatches, group.id);
  const previousGroupId = getPreviousGroupId(allMatches, group.id);

  function handleSaveAndContinue() {
    if (lockState !== "locked" && groupDirty) {
      onSaveDraft();
    }

    navigate(nextGroupId ? `/pools/${pool.id}/groups/${nextGroupId}` : `/pools/${pool.id}`);
  }

  return (
    <div className={pageStackClass}>
      <section className={sectionPanelClass}>
        <div className={panelHeaderClass}>
          <div className="grid gap-3">
            <Link
              className="inline-flex w-fit items-center gap-2 font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-muted transition-colors hover:text-app-ink"
              to={`/pools/${pool.id}`}
            >
              <span aria-hidden>←</span>
              Back to tournament
            </Link>
            <div className="grid gap-2">
              <div className={eyebrowClass}>{group.label}</div>
              <h2 className={sectionTitleClass}>Enter and save this group before moving on.</h2>
              <p className={sectionCopyClass}>
                Saved tables update from the last confirmed snapshot. Draft edits stay local to this session until you choose to save them.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-sm font-medium text-app-muted">
            <Badge
              label={lockState === "locked" ? "Locked" : lockState === "locking-soon" ? "Locking soon" : "Editable"}
              tone={lockState === "locked" ? "locked" : lockState === "locking-soon" ? "warning" : "info"}
            />
            <span className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em]">
              {completedDraftCount}/{group.matches.length} complete
            </span>
          </div>
        </div>

        <div className="grid gap-3.5 lg:grid-cols-2">
          <div className={tileCardClass}>
            <span className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-muted">Current save</span>
            <span className="font-display text-[1.35rem] font-black uppercase tracking-[-0.04em] text-app-ink">
              {formatSavedAt(savedPickSet.updatedAt)}
            </span>
            <span className="text-sm font-medium leading-7 text-app-muted">
              {completedSavedCount} saved picks currently shape this group table.
            </span>
          </div>
          <div className={tileCardClass}>
            <span className="font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-muted">Navigation</span>
            <span className="font-display text-[1.35rem] font-black uppercase tracking-[-0.04em] text-app-ink">
              {nextGroupId ? `Next up: Group ${nextGroupId}` : "Last group in the current flow"}
            </span>
            <span className="text-sm font-medium leading-7 text-app-muted">
              {previousGroupId ? `You can still return to Group ${previousGroupId}.` : "This is the first group in the prototype sequence."}
            </span>
          </div>
        </div>
      </section>

      <RulesSummary pool={pool} />

      <section className="grid gap-3.5">
        {group.matches.map((match) => (
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
          "sticky bottom-3 z-10 flex flex-col gap-4 bg-[rgba(255,255,255,0.94)] p-5 backdrop-blur-[18px] lg:flex-row lg:items-center lg:justify-between lg:p-6",
        )}
      >
        <div>
          <h3 className="mb-1.5 font-display text-[1.45rem] font-black uppercase tracking-[-0.05em] text-app-ink">
            {lockState === "locked" ? "This preview is locked." : "Save this group before moving on."}
          </h3>
          <p className="m-0 text-sm font-medium leading-7 text-app-muted">
            {groupDirty
              ? `${changedMatchCount} fixture${changedMatchCount === 1 ? "" : "s"} changed in ${group.label} since the last save.`
              : "Everything in this group already matches the saved snapshot."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={onSaveDraft} disabled={!groupDirty || lockState === "locked"}>
            Save
          </Button>
          <Button tone="secondary" onClick={handleSaveAndContinue}>
            {getNextActionLabel(nextGroupId, lockState)}
          </Button>
        </div>
      </section>
    </div>
  );
}
