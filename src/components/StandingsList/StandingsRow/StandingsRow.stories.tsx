import type { Meta, StoryObj } from "@storybook/react-vite";

import { storyLeaderboard, narrowCanvas } from "../../../storybook";

import { StandingsRow } from ".";

const meta = {
  title: "Modules/StandingsList/StandingsRow",
  component: StandingsRow,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Single standings row. These stories compare how the row should feel for a leading participant versus the more common mid-table state.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    entry: storyLeaderboard[0],
  },
} satisfies Meta<typeof StandingsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPlace: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use this as the reference for top-of-table emphasis, where rank, points, and positive movement should feel clearly elevated without needing a separate layout.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <StandingsRow entry={storyLeaderboard[0]} />
    </div>
  ),
};

export const MidTable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use this as the baseline row state for most participants, where the layout stays scannable and informative without hero-style emphasis.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <StandingsRow entry={storyLeaderboard[4]} />
    </div>
  ),
};
