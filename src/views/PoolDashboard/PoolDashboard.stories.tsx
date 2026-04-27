import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  editableDeadlineLabel,
  expectVisibleTextContrast,
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
          "Current pool dashboard view for the grouped tournament prototype. This is the primary reference surface for checking whether progress, deadline context, rules scaffolding, and predicted group tables read as one editorial sports surface instead of a stack of generic cards.",
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
          "Use the clean state as the baseline dashboard when the page should communicate structural mass, generous spacing, and clear next actions without relying on extra separators or filler decoration.",
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
          "Use the draft-warning variant when the user has unsaved group edits elsewhere and the dashboard needs one concentrated warning surface without letting alert styling overtake the rest of the page.",
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
          "Use the locked preview to inspect the same dashboard hierarchy when editing is no longer available but the user still needs the projected tournament map and rules scaffolding to feel solid and legible.",
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
          "Use the phone variant to verify that the dashboard still feels like one coherent pool surface rather than a pile of unrelated modules on narrow screens.",
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

export const DarkMode: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the dark-mode variant to verify that the main pool dashboard keeps enough contrast for progress, rules scaffolding, predicted tables, and primary actions.",
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
    themeMode: "dark",
  },
  play: async ({ canvasElement }) => {
    await expectVisibleTextContrast(canvasElement);
  },
};
