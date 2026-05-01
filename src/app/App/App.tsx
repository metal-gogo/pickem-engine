import { useState } from "react";
import { HashRouter, Navigate, Route, Routes, useParams } from "react-router";

import { prototypePool, sampleMatches } from "../../data/fixtures";
import { getPoolById, prototypePools } from "../../data/pools";
import { getDeadlineLabel, getLockState, getPrototypeLockedNow } from "../../domain/lock";
import { buildTournamentGroups, getFirstIncompleteGroupId } from "../../domain/tournament";
import { usePickSet } from "../../hooks/usePickSet";
import { createLocalPickStorage } from "../../persistence/pickStorage";
import { Home } from "../../views/Home";
import { GroupProfile } from "../../views/GroupProfile";
import { GroupPicks } from "../../views/GroupPicks";
import { PoolDashboard } from "../../views/PoolDashboard";
import { TeamProfile } from "../../views/TeamProfile";
import { TournamentOverview } from "../../views/TournamentOverview";
import { getGroupById, getTeamById } from "../../data/tournament";
import { PoolShell } from "../PoolShell";
import { ThemeProvider } from "../theme";

interface PoolExperienceProps {
  previewLocked: boolean;
  onPreviewLockedChange: (nextValue: boolean) => void;
}

export function PoolExperience({ previewLocked, onPreviewLockedChange }: PoolExperienceProps) {
  const { poolId = "" } = useParams();
  const pool = getPoolById(poolId);

  if (!pool) {
    return <Navigate replace to="/pools" />;
  }

  const storage = createLocalPickStorage(pool.id);
  const { savedPickSet, draftPickSet, draftDirty, completedSavedCount, updateScore, saveDraft } =
    usePickSet(sampleMatches, storage);
  const now = previewLocked ? getPrototypeLockedNow(prototypePool.deadlineAt) : new Date();
  const lockState = getLockState(prototypePool.deadlineAt, now);
  const deadlineLabel = getDeadlineLabel(prototypePool.deadlineAt, now);
  const groups = buildTournamentGroups(sampleMatches, savedPickSet);
  const resumeGroupId = getFirstIncompleteGroupId(groups);

  function handleSaveDraft() {
    if (lockState === "locked") {
      return;
    }

    saveDraft();
  }

  return (
    <PoolShell
      pool={pool}
      previewLocked={previewLocked}
      onPreviewLockedChange={onPreviewLockedChange}
      savedPickCount={completedSavedCount}
      totalMatches={sampleMatches.length}
    >
      <Routes>
        <Route
          index
          element={
            <PoolDashboard
              pool={pool}
              groups={groups}
              lockState={lockState}
              deadlineLabel={deadlineLabel}
              resumeGroupId={resumeGroupId}
              draftDirty={draftDirty}
            />
          }
        />
        <Route
          path="groups/:groupId"
          element={
            <GroupRoute
              poolId={pool.id}
              groups={groups}
              draftPickSet={draftPickSet}
              savedPickSet={savedPickSet}
              lockState={lockState}
              onScoreChange={updateScore}
              onSaveDraft={handleSaveDraft}
            />
          }
        />
        <Route path="*" element={<Navigate replace to={`/pools/${pool.id}`} />} />
      </Routes>
    </PoolShell>
  );
}

function PublicTeamRoute() {
  const { teamId = "" } = useParams();
  const team = getTeamById(teamId.toLowerCase());

  if (!team) {
    return <Navigate replace to="/" />;
  }

  return <TeamProfile team={team} />;
}

function PublicGroupRoute() {
  const { groupId = "" } = useParams();
  const group = getGroupById(groupId);

  if (!group) {
    return <Navigate replace to="/" />;
  }

  return <GroupProfile group={group} />;
}

interface GroupRouteProps {
  poolId: string;
  groups: ReturnType<typeof buildTournamentGroups>;
  draftPickSet: ReturnType<typeof usePickSet>["draftPickSet"];
  savedPickSet: ReturnType<typeof usePickSet>["savedPickSet"];
  lockState: ReturnType<typeof getLockState>;
  onScoreChange: ReturnType<typeof usePickSet>["updateScore"];
  onSaveDraft: () => void;
}

function GroupRoute({
  poolId,
  groups,
  draftPickSet,
  savedPickSet,
  lockState,
  onScoreChange,
  onSaveDraft,
}: GroupRouteProps) {
  const { groupId = "" } = useParams();
  const pool = getPoolById(poolId);
  const group = groups.find((entry) => entry.id === groupId);

  if (!pool || !group) {
    return <Navigate replace to={`/pools/${poolId}`} />;
  }

  return (
    <GroupPicks
      pool={pool}
      group={group}
      allMatches={sampleMatches}
      draftPickSet={draftPickSet}
      savedPickSet={savedPickSet}
      lockState={lockState}
      onScoreChange={onScoreChange}
      onSaveDraft={onSaveDraft}
    />
  );
}

export function App() {
  const [previewLocked, setPreviewLocked] = useState(false);

  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<TournamentOverview />} />
          <Route path="/pools" element={<Home pools={prototypePools} />} />
          <Route path="/teams/:teamId" element={<PublicTeamRoute />} />
          <Route path="/groups/:groupId" element={<PublicGroupRoute />} />
          <Route
            path="/pools/:poolId/*"
            element={
              <PoolExperience
                previewLocked={previewLocked}
                onPreviewLockedChange={setPreviewLocked}
              />
            }
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
