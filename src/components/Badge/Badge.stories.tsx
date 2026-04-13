import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from ".";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Compact status signal for pick state, movement, or system state. Use stronger tones when the label should actively guide the user, and subtle badges when the value is supportive context rather than the main message.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    label: "Status",
    tone: "neutral",
    subtle: false,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use this set to compare the core semantic tones: neutral for no state yet, info for editable or in-progress state, success for confirmed progress, warning for attention-needed changes, and locked for unavailable states.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
      <Badge label="No pick yet" tone="neutral" />
      <Badge label="Editable" tone="info" />
      <Badge label="Saved" tone="success" />
      <Badge label="Unsaved change" tone="warning" />
      <Badge label="Locked" tone="locked" />
    </div>
  ),
};

export const SubtleMovement: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use subtle badges for secondary metrics like leaderboard movement where the signal matters, but should not compete with the row's main content.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: "12px" }}>
      <Badge label="+2" tone="success" subtle />
      <Badge label="--" tone="neutral" subtle />
      <Badge label="-1" tone="warning" subtle />
    </div>
  ),
};
