import type { Meta, StoryObj } from "@storybook/react-vite";

import { narrowCanvas, storyFamilyPool, storyGroupA, storyGroupAComplete, storyGroupB } from "../../storybook";

import { GroupOverviewCard } from ".";

const meta = {
  title: "Modules/GroupOverviewCard",
  component: GroupOverviewCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Dashboard group card that combines progress state, provisional group table, and the main action into the focused group workflow. It exists to make the tournament overview actionable without forcing the user into a giant flat match list.",
      },
    },
  },
  args: {
    poolId: storyFamilyPool.id,
    group: storyGroupA,
  },
} satisfies Meta<typeof GroupOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the in-progress state when a group already has saved picks and should communicate both partial completion and a provisional predicted table.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <GroupOverviewCard poolId={storyFamilyPool.id} group={storyGroupA} />
    </div>
  ),
};

export const NotStarted: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the not-started state when the group should read as available but untouched, so the user can quickly see where to begin next.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <GroupOverviewCard poolId={storyFamilyPool.id} group={storyGroupB} />
    </div>
  ),
};

export const Complete: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the complete state when all six matches in a group have saved picks and the card should emphasize a calm, revisitable summary rather than unfinished work.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <GroupOverviewCard poolId={storyFamilyPool.id} group={storyGroupAComplete} />
    </div>
  ),
};
