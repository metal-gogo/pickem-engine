import type { Meta, StoryObj } from "@storybook/react-vite";

import { narrowCanvas, storyLeaderboard } from "../../storybook";

import { StandingsList } from ".";

const meta = {
  title: "Modules/StandingsList",
  component: StandingsList,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Composable standings list that owns the row rendering and spacing for ranked participants. Use this when a screen needs to present standings without rebuilding the list structure in the view layer.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    entries: storyLeaderboard,
  },
} satisfies Meta<typeof StandingsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullTable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the full table when the screen's primary job is to show standings, such as the dedicated leaderboard view.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <StandingsList entries={storyLeaderboard} />
    </div>
  ),
};

export const PreviewSlice: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use a shorter leaderboard slice for dashboard-style previews, where the user only needs a quick sense of competitive shape before drilling into the full standings.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <StandingsList entries={storyLeaderboard.slice(0, 4)} />
    </div>
  ),
};
