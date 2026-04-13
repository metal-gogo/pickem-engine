import type { Meta, StoryObj } from "@storybook/react-vite";

import { Overview } from ".";
import {
  editableDeadlineLabel,
  lockedDeadlineLabel,
  seededSavedPickSet,
  storyLeaderboard,
  storyMatches,
  storyPool,
  wideCanvas,
} from "../../storybook";

const meta = {
  title: "Views/Overview",
  component: Overview,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Top-level summary screen for the discovery build. The variants compare the calm default overview, a more urgent state with unsaved work, and the phone layout used to validate responsive hierarchy.",
      },
    },
  },
  args: {
    pool: storyPool,
    matches: storyMatches,
    savedPickSet: seededSavedPickSet,
    lockState: "editable",
    deadlineLabel: editableDeadlineLabel,
    savedPickCount: 3,
    draftDirty: false,
    leaderboard: storyLeaderboard,
  },
} satisfies Meta<typeof Overview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CleanState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the clean state as the baseline overview when picks are saved and the screen should emphasize progress, deadline context, and quick navigation.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <Overview
        pool={storyPool}
        matches={storyMatches}
        savedPickSet={seededSavedPickSet}
        lockState="editable"
        deadlineLabel={editableDeadlineLabel}
        savedPickCount={3}
        draftDirty={false}
        leaderboard={storyLeaderboard}
      />
    </div>
  ),
};

export const WithDraftWarning: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the draft warning state when the user has unsaved changes elsewhere and the overview should gently redirect them back to finish that work.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <Overview
        pool={storyPool}
        matches={storyMatches}
        savedPickSet={seededSavedPickSet}
        lockState="locking-soon"
        deadlineLabel={lockedDeadlineLabel}
        savedPickCount={3}
        draftDirty
        leaderboard={storyLeaderboard}
      />
    </div>
  ),
};

export const CleanStatePhone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the phone variant to validate that the clean overview keeps its hierarchy, rhythm, and call-to-action clarity on a narrow viewport.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <Overview
        pool={storyPool}
        matches={storyMatches}
        savedPickSet={seededSavedPickSet}
        lockState="editable"
        deadlineLabel={editableDeadlineLabel}
        savedPickCount={3}
        draftDirty={false}
        leaderboard={storyLeaderboard}
      />
    </div>
  ),
  globals: {
    viewport: { value: "mobile2" },
  },
};
