import { useState } from "react";

import { Match } from "../../domain/models";
import {
  arePickSetsEqual,
  clonePickSet,
  countChangedMatches,
  countCompletedPicks,
  countStartedPicks,
  markPickSetSaved,
  updatePickScore,
} from "../../domain/picks";
import { PickStorage } from "../../persistence/pickStorage";

export function usePickSet(matches: Match[], storage: PickStorage) {
  const [state, setState] = useState(() => {
    const savedPickSet = storage.load(matches);

    return {
      savedPickSet,
      draftPickSet: clonePickSet(savedPickSet),
    };
  });

  const draftDirty = !arePickSetsEqual(state.draftPickSet, state.savedPickSet, matches);

  const completedSavedCount = countCompletedPicks(state.savedPickSet, matches);
  const completedDraftCount = countCompletedPicks(state.draftPickSet, matches);
  const startedDraftCount = countStartedPicks(state.draftPickSet, matches);
  const changedMatchCount = countChangedMatches(state.draftPickSet, state.savedPickSet, matches);

  function updateScore(matchId: string, side: "homeScore" | "awayScore", rawValue: string) {
    setState((currentState) => ({
      ...currentState,
      draftPickSet: updatePickScore(currentState.draftPickSet, matchId, side, rawValue),
    }));
  }

  function saveDraft() {
    setState((currentState) => {
      const savedPickSet = markPickSetSaved(currentState.draftPickSet);
      storage.save(savedPickSet);

      return {
        savedPickSet,
        draftPickSet: clonePickSet(savedPickSet),
      };
    });
  }

  function resetDraft() {
    setState((currentState) => ({
      ...currentState,
      draftPickSet: clonePickSet(currentState.savedPickSet),
    }));
  }

  return {
    savedPickSet: state.savedPickSet,
    draftPickSet: state.draftPickSet,
    draftDirty,
    completedSavedCount,
    completedDraftCount,
    startedDraftCount,
    changedMatchCount,
    updateScore,
    saveDraft,
    resetDraft,
  };
}
