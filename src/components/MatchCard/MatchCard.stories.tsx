import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn, userEvent, within } from "storybook/test";

import { sanitizeScoreInput } from "../../domain/picks";
import {
  cleanReferencePick,
  completeReferencePick,
  dirtyReferencePick,
  emptyReferencePick,
  narrowCanvas,
  referenceMatch,
  secondaryMatch,
} from "../../storybook";

import { MatchCard } from ".";

const meta = {
  title: "Modules/MatchCard",
  component: MatchCard,
  tags: ["autodocs"],
  parameters: {
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Core match presentation unit used in both pick entry and read-only review flows. The variants show how the same card adapts to editing, saved summary, dirty comparison, and locked behavior.",
      },
    },
  },
  args: {
    match: referenceMatch,
    pick: emptyReferencePick,
    lockState: "editable",
    mode: "interactive",
    onScoreChange: fn(),
  },
} satisfies Meta<typeof MatchCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the interactive variant for normal pick entry, where the user is actively entering or revising a match score and needs immediate feedback on completeness.",
      },
    },
  },
  render: (args) => {
    const [pick, setPick] = useState(emptyReferencePick);

    return (
      <div style={narrowCanvas}>
        <MatchCard
          {...args}
          match={referenceMatch}
          pick={pick}
          mode="interactive"
          lockState="editable"
          onScoreChange={(side, nextValue) => {
            args.onScoreChange?.(side, nextValue);
            setPick((currentPick) => ({
              ...currentPick,
              [side]: sanitizeScoreInput(nextValue),
              updatedAt: new Date().toISOString(),
            }));
          }}
        />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const homeScore = canvas.getByRole("spinbutton", { name: /mexico/i });
    const awayScore = canvas.getByRole("spinbutton", { name: /south africa/i });

    await userEvent.clear(homeScore);
    await userEvent.type(homeScore, "3");
    await expect(canvas.getByText(/in progress/i)).toBeInTheDocument();

    await userEvent.clear(awayScore);
    await userEvent.type(awayScore, "1");

    await expect(homeScore).toHaveValue(3);
    await expect(awayScore).toHaveValue(1);
    await expect(canvas.getByText(/ready to save/i)).toBeInTheDocument();
    await expect(args.onScoreChange).toHaveBeenLastCalledWith("awayScore", "1");
  },
};

export const DirtyDraft: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the dirty draft variant when the current draft differs from the last saved version and the UI should make unsaved changes obvious at the match level.",
      },
    },
  },
  render: (args) => (
    <div style={narrowCanvas}>
      <MatchCard
        {...args}
        match={secondaryMatch}
        pick={dirtyReferencePick}
        comparisonPick={cleanReferencePick}
        mode="interactive"
        lockState="editable"
      />
    </div>
  ),
};

export const SummarySaved: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the summary variant in calmer read-only surfaces like review screens, where the goal is scanning saved picks rather than editing them in place.",
      },
    },
  },
  render: (args) => (
    <div style={narrowCanvas}>
      <MatchCard
        {...args}
        match={referenceMatch}
        pick={completeReferencePick}
        mode="summary"
        lockState="editable"
      />
    </div>
  ),
};

export const Locked: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the locked variant when the same match information should remain visible after the deadline, but score entry and change cues must be suppressed.",
      },
    },
  },
  render: (args) => (
    <div style={narrowCanvas}>
      <MatchCard
        {...args}
        match={referenceMatch}
        pick={completeReferencePick}
        mode="interactive"
        lockState="locked"
      />
    </div>
  ),
};
