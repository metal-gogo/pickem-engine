import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn, userEvent, within } from "storybook/test";

import { LockState } from "../../domain/models";
import {
  arePickSetsEqual,
  clonePickSet,
  countChangedMatches,
  countCompletedPicks,
  markPickSetSaved,
  updatePickScore,
} from "../../domain/picks";
import { seededSavedPickSet, storyMatches, storyPool, wideCanvas } from "../../storybook";

import { Picks } from ".";

function PicksStoryHarness({ lockState }: { lockState: LockState }) {
  const [savedPickSet, setSavedPickSet] = useState(seededSavedPickSet);
  const [draftPickSet, setDraftPickSet] = useState(() => clonePickSet(seededSavedPickSet));

  const draftDirty = !arePickSetsEqual(draftPickSet, savedPickSet, storyMatches);
  const completedDraftCount = countCompletedPicks(draftPickSet, storyMatches);
  const changedMatchCount = countChangedMatches(draftPickSet, savedPickSet, storyMatches);

  return (
    <div style={wideCanvas}>
      <Picks
        pool={storyPool}
        matches={storyMatches}
        draftPickSet={draftPickSet}
        savedPickSet={savedPickSet}
        lockState={lockState}
        draftDirty={draftDirty}
        completedDraftCount={completedDraftCount}
        changedMatchCount={changedMatchCount}
        onScoreChange={(matchId, side, nextValue) => {
          setDraftPickSet((currentPickSet) => updatePickScore(currentPickSet, matchId, side, nextValue));
        }}
        onSaveDraft={() => {
          if (lockState === "locked") {
            return;
          }

          const nextSavedPickSet = markPickSetSaved(draftPickSet);
          setSavedPickSet(nextSavedPickSet);
          setDraftPickSet(clonePickSet(nextSavedPickSet));
        }}
        onResetDraft={() => {
          setDraftPickSet(clonePickSet(savedPickSet));
        }}
      />
    </div>
  );
}

const meta = {
  title: "Views/Picks",
  component: Picks,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Primary pick-entry screen for the prototype. The story set compares the main editable workflow, the locked preview used for discovery, and the narrow-screen version that checks mobile usability.",
      },
    },
  },
  args: {
    pool: storyPool,
    matches: storyMatches,
    draftPickSet: seededSavedPickSet,
    savedPickSet: seededSavedPickSet,
    lockState: "editable",
    draftDirty: false,
    completedDraftCount: 3,
    changedMatchCount: 0,
    onScoreChange: fn(),
    onSaveDraft: fn(),
    onResetDraft: fn(),
  },
} satisfies Meta<typeof Picks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditableFlow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the editable flow as the default reference for score entry, save feedback, and draft-state messaging before the deadline.",
      },
    },
  },
  render: () => <PicksStoryHarness lockState="editable" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mexicoScore = canvas.getAllByRole("spinbutton", { name: /mexico/i })[0];

    await userEvent.clear(mexicoScore);
    await userEvent.type(mexicoScore, "4");

    const saveButton = canvas.getByRole("button", { name: /save picks locally/i });
    await expect(saveButton).toBeEnabled();
    await expect(canvas.getByText(/1 fixture changed since the last save/i)).toBeInTheDocument();

    await userEvent.click(saveButton);

    await expect(canvas.getByRole("button", { name: /saved locally/i })).toBeDisabled();
    await expect(canvas.getByText(/all changes are already saved locally/i)).toBeInTheDocument();
  },
};

export const LockedPreview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the locked preview to inspect post-deadline behavior, where picks remain visible but save actions and editing affordances should no longer be available.",
      },
    },
  },
  render: () => <PicksStoryHarness lockState="locked" />,
};

export const EditableFlowPhone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the phone variant to evaluate whether score entry, status messaging, and bottom action grouping still feel clear on a compact viewport.",
      },
    },
  },
  render: () => <PicksStoryHarness lockState="editable" />,
  globals: {
    viewport: { value: "mobile2" },
  },
};
