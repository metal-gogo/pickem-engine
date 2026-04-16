import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  editableDeadlineLabel,
  lockedDeadlineLabel,
  seededTournamentGroups,
  storyFamilyPool,
  storyResumeGroupId,
} from "../../storybook";

import { PoolDashboard } from ".";

const meta = {
  title: "Views/PoolDashboard",
  component: PoolDashboard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Current pool dashboard view for the grouped tournament prototype. This is the primary reference surface for checking whether progress, deadline context, rules scaffolding, and predicted group tables work together without overwhelming the user.",
      },
    },
  },
  args: {
    pool: storyFamilyPool,
    groups: seededTournamentGroups,
    lockState: "editable",
    deadlineLabel: editableDeadlineLabel,
    resumeGroupId: storyResumeGroupId,
    draftDirty: false,
  },
} satisfies Meta<typeof PoolDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CleanState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the clean state as the baseline pool dashboard when saved picks are in a stable state and the page should emphasize structure, progress, deadline, and direct paths into group picking.",
      },
    },
  },
  render: () => (
    <PoolDashboard
      pool={storyFamilyPool}
      groups={seededTournamentGroups}
      lockState="editable"
      deadlineLabel={editableDeadlineLabel}
      resumeGroupId={storyResumeGroupId}
      draftDirty={false}
    />
  ),
};

export const WithDraftWarning: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the draft-warning variant when the user has unsaved group edits elsewhere and the dashboard needs to remind them that the projected tables only reflect the last saved snapshot.",
      },
    },
  },
  render: () => (
    <PoolDashboard
      pool={storyFamilyPool}
      groups={seededTournamentGroups}
      lockState="editable"
      deadlineLabel={editableDeadlineLabel}
      resumeGroupId={storyResumeGroupId}
      draftDirty
    />
  ),
};

export const LockedPreview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the locked preview to inspect the same dashboard hierarchy when editing is no longer available but the user still needs clear access to the predicted tournament map and rules scaffolding.",
      },
    },
  },
  render: () => (
    <PoolDashboard
      pool={storyFamilyPool}
      groups={seededTournamentGroups}
      lockState="locked"
      deadlineLabel={lockedDeadlineLabel}
      resumeGroupId={storyResumeGroupId}
      draftDirty={false}
    />
  ),
};

export const Phone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the phone variant to verify that the dashboard still feels like one coherent pool surface rather than a stack of unrelated cards on narrow screens.",
      },
    },
  },
  render: () => (
    <PoolDashboard
      pool={storyFamilyPool}
      groups={seededTournamentGroups}
      lockState="editable"
      deadlineLabel={editableDeadlineLabel}
      resumeGroupId={storyResumeGroupId}
      draftDirty={false}
    />
  ),
  globals: {
    viewport: { value: "mobile2" },
  },
};
