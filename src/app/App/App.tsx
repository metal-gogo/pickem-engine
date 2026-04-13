import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { AppShell } from "../AppShell";
import { prototypePool, sampleMatches } from "../../data/fixtures";
import { mockedLeaderboard } from "../../data/leaderboard";
import { getDeadlineLabel, getLockState, getPrototypeLockedNow } from "../../domain/lock";
import { usePickSet } from "../../hooks/usePickSet";
import { localPickStorage } from "../../persistence/pickStorage";
import { Leaderboard } from "../../views/Leaderboard";
import { Overview } from "../../views/Overview";
import { Picks } from "../../views/Picks";
import { Review } from "../../views/Review";

export function App() {
  const [previewLocked, setPreviewLocked] = useState(false);
  const {
    savedPickSet,
    draftPickSet,
    draftDirty,
    completedSavedCount,
    completedDraftCount,
    changedMatchCount,
    updateScore,
    saveDraft,
    resetDraft,
  } = usePickSet(sampleMatches, localPickStorage);

  const now = previewLocked ? getPrototypeLockedNow(prototypePool.deadlineAt) : new Date();
  const lockState = getLockState(prototypePool.deadlineAt, now);
  const deadlineLabel = getDeadlineLabel(prototypePool.deadlineAt, now);

  function handleSaveDraft() {
    if (lockState === "locked") {
      return;
    }

    saveDraft();
  }

  return (
    <HashRouter>
      <AppShell
        previewLocked={previewLocked}
        onPreviewLockedChange={setPreviewLocked}
        savedPickCount={completedSavedCount}
        totalMatches={sampleMatches.length}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Overview
                pool={prototypePool}
                matches={sampleMatches}
                savedPickSet={savedPickSet}
                lockState={lockState}
                deadlineLabel={deadlineLabel}
                savedPickCount={completedSavedCount}
                draftDirty={draftDirty}
                leaderboard={mockedLeaderboard}
              />
            }
          />
          <Route
            path="/picks"
            element={
              <Picks
                pool={prototypePool}
                matches={sampleMatches}
                draftPickSet={draftPickSet}
                savedPickSet={savedPickSet}
                lockState={lockState}
                draftDirty={draftDirty}
                completedDraftCount={completedDraftCount}
                changedMatchCount={changedMatchCount}
                onScoreChange={updateScore}
                onSaveDraft={handleSaveDraft}
                onResetDraft={resetDraft}
              />
            }
          />
          <Route
            path="/review"
            element={
              <Review
                matches={sampleMatches}
                savedPickSet={savedPickSet}
                lockState={lockState}
                draftDirty={draftDirty}
              />
            }
          />
          <Route path="/leaderboard" element={<Leaderboard leaderboard={mockedLeaderboard} />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
}
