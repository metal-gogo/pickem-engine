/// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { usePickSet } from "./usePickSet";

(
  globalThis as typeof globalThis & {
    IS_REACT_ACT_ENVIRONMENT: boolean;
  }
).IS_REACT_ACT_ENVIRONMENT = true;
import { sampleMatches } from "../../data/fixtures";
import { createEmptyPickSet, markPickSetSaved, updatePickScore } from "../../domain/picks";
import type { PickStorage } from "../../persistence/pickStorage";

let root: Root | null = null;
let container: HTMLDivElement | null = null;
let hookResult: ReturnType<typeof usePickSet> | null = null;

function renderHookWithStorage(storage: PickStorage) {
  const TestApp = () => {
    hookResult = usePickSet(sampleMatches, storage);
    return <div />;
  };

  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);

  act(() => {
    root!.render(<TestApp />);
  });
}

afterEach(() => {
  if (root && container) {
    act(() => {
      root!.unmount();
    });
  }

  if (container?.parentNode) {
    container.parentNode.removeChild(container);
  }

  root = null;
  container = null;
  hookResult = null;
  vi.restoreAllMocks();
});

describe("usePickSet", () => {
  it("initializes from saved picks and tracks draft state", () => {
    const storage: PickStorage = {
      load: vi.fn<PickStorage["load"]>(() => createEmptyPickSet(sampleMatches)),
      save: vi.fn<PickStorage["save"]>(),
      clear: vi.fn<PickStorage["clear"]>(),
    };

    renderHookWithStorage(storage);

    expect(hookResult).not.toBeNull();
    expect(hookResult?.draftDirty).toBe(false);
    expect(hookResult?.changedMatchCount).toBe(0);
    expect(hookResult?.completedSavedCount).toBe(0);
    expect(hookResult?.startedDraftCount).toBe(0);

    act(() => {
      hookResult?.updateScore(sampleMatches[0].id, "homeScore", "2");
    });

    expect(hookResult?.draftDirty).toBe(true);
    expect(hookResult?.changedMatchCount).toBe(1);
    expect(hookResult?.startedDraftCount).toBe(1);

    act(() => {
      hookResult?.saveDraft();
    });

    expect(storage.save).toHaveBeenCalledOnce();
    expect(hookResult?.draftDirty).toBe(false);
    expect(hookResult?.completedSavedCount).toBe(0);
    expect(hookResult?.changedMatchCount).toBe(0);

    act(() => {
      hookResult?.updateScore(sampleMatches[0].id, "awayScore", "1");
    });

    expect(hookResult?.changedMatchCount).toBe(1);
    expect(hookResult?.draftDirty).toBe(true);

    act(() => {
      hookResult?.resetDraft();
    });

    expect(hookResult?.draftDirty).toBe(false);
    expect(hookResult?.changedMatchCount).toBe(0);
  });

  it("keeps draft and saved pick sets separate when editing", () => {
    const initialPickSet = markPickSetSaved(
      updatePickScore(createEmptyPickSet(sampleMatches), sampleMatches[1].id, "awayScore", "3"),
    );
    const storage: PickStorage = {
      load: vi.fn<PickStorage["load"]>(() => initialPickSet),
      save: vi.fn<PickStorage["save"]>(),
      clear: vi.fn<PickStorage["clear"]>(),
    };

    renderHookWithStorage(storage);

    expect(hookResult?.savedPickSet.picks[sampleMatches[1].id].awayScore).toBe(3);
    expect(hookResult?.draftPickSet.picks[sampleMatches[1].id].awayScore).toBe(3);

    act(() => {
      hookResult?.updateScore(sampleMatches[1].id, "awayScore", "2");
    });

    expect(hookResult?.savedPickSet.picks[sampleMatches[1].id].awayScore).toBe(3);
    expect(hookResult?.draftPickSet.picks[sampleMatches[1].id].awayScore).toBe(2);
    expect(hookResult?.draftDirty).toBe(true);
  });
});
