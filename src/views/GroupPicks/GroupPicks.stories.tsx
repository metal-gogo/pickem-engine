import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn, userEvent, within } from "storybook/test";

import { LockState } from "../../domain/models";
import { buildTournamentGroups } from "../../domain/tournament";
import { clonePickSet, markPickSetSaved, updatePickScore } from "../../domain/picks";
import { seededSavedPickSet, storyFamilyPool, storyMatches } from "../../storybook";

import { GroupPicks } from ".";

function GroupPicksStoryHarness({ lockState }: { lockState: LockState }) {
  const [savedPickSet, setSavedPickSet] = useState(seededSavedPickSet);
  const [draftPickSet, setDraftPickSet] = useState(() => clonePickSet(seededSavedPickSet));
  const currentGroup = buildTournamentGroups(storyMatches, savedPickSet).find(
    (group) => group.id === "A",
  );

  if (!currentGroup) {
    return null;
  }

  return (
    <GroupPicks
      pool={storyFamilyPool}
      group={currentGroup}
      allMatches={storyMatches}
      draftPickSet={draftPickSet}
      savedPickSet={savedPickSet}
      lockState={lockState}
      onScoreChange={(matchId, side, nextValue) => {
        setDraftPickSet((currentPickSet) =>
          updatePickScore(currentPickSet, matchId, side, nextValue),
        );
      }}
      onSaveDraft={() => {
        if (lockState === "locked") {
          return;
        }

        const nextSavedPickSet = markPickSetSaved(draftPickSet);
        setSavedPickSet(nextSavedPickSet);
        setDraftPickSet(clonePickSet(nextSavedPickSet));
      }}
    />
  );
}

const currentGroup = buildTournamentGroups(storyMatches, seededSavedPickSet).find(
  (group) => group.id === "A",
)!;

const meta = {
  title: "Views/GroupPicks",
  component: GroupPicks,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Focused group-pick view for the current prototype. It narrows the user down to one group at a time, keeps the rules scaffolding nearby, and uses explicit Save / Save and continue actions instead of a giant flat tournament list.",
      },
    },
  },
  args: {
    pool: storyFamilyPool,
    group: currentGroup,
    allMatches: storyMatches,
    draftPickSet: seededSavedPickSet,
    savedPickSet: seededSavedPickSet,
    lockState: "editable",
    onScoreChange: fn(),
    onSaveDraft: fn(),
  },
} satisfies Meta<typeof GroupPicks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditableFlow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the editable flow as the main reference for group-level score entry, save confirmation, and the pacing between one group and the next.",
      },
    },
  },
  render: () => <GroupPicksStoryHarness lockState="editable" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mexicoScore = canvas.getAllByRole("spinbutton", { name: /mexico/i })[0];

    await userEvent.clear(mexicoScore);
    await userEvent.type(mexicoScore, "4");

    const saveButton = canvas.getByRole("button", { name: /save and continue/i });
    await expect(saveButton).toBeEnabled();

    await userEvent.click(saveButton);

    await expect(canvas.getByText(/points overview/i)).toBeInTheDocument();
  },
};

export const LockedPreview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the locked preview when validating how the same group stays explorable after the deadline, while Save is disabled and the next action becomes pure navigation.",
      },
    },
  },
  render: () => <GroupPicksStoryHarness lockState="locked" />,
};

export const Phone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the phone variant to confirm that match entry, inline rules scaffolding, and the bottom action grouping stay workable on a compact screen.",
      },
    },
  },
  render: () => <GroupPicksStoryHarness lockState="editable" />,
  globals: {
    viewport: { value: "mobile2" },
  },
};
