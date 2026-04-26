import { useNavigate } from "react-router-dom";

import { cn } from "../../app/cn";
import { pageStackClass, surfaceClass } from "../../app/ui";
import { Button } from "../../components/Button";
import { MatchCard } from "../../components/MatchCard";
import { RulesSummary } from "../../components/RulesSummary";
import { LockState, PoolDetails, UserPickSet } from "../../domain/models";
import { countChangedMatches, getPick } from "../../domain/picks";
import { TournamentGroup, getNextGroupId } from "../../domain/tournament";

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
  const changedMatchCount = countChangedMatches(draftPickSet, savedPickSet, group.matches);
  const groupDirty = changedMatchCount > 0;
  const nextGroupId = getNextGroupId(allMatches, group.id);

  function handleSaveAndContinue() {
    if (lockState !== "locked" && groupDirty) {
      onSaveDraft();
    }

    navigate(nextGroupId ? `/pools/${pool.id}/groups/${nextGroupId}` : `/pools/${pool.id}`);
  }

  return (
    <div className={pageStackClass}>
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
          "sticky bottom-3 z-10 flex bg-[rgba(255,255,255,0.94)] p-5 backdrop-blur-[18px] justify-end lg:p-6 ",
        )}
      >
        <Button onClick={handleSaveAndContinue}>
          {getNextActionLabel(nextGroupId, lockState)}
        </Button>
      </section>
    </div>
  );
}
