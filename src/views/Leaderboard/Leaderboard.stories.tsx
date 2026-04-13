import type { Meta, StoryObj } from "@storybook/react-vite";

import { storyLeaderboard, wideCanvas } from "../../storybook";

import { Leaderboard } from ".";

const meta = {
  title: "Views/Leaderboard",
  component: Leaderboard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Leaderboard screen for validating competitive hierarchy and pacing before the scoring model is finalized. The variants compare the standard desktop presentation and the phone layout.",
      },
    },
  },
  args: {
    leaderboard: storyLeaderboard,
  },
} satisfies Meta<typeof Leaderboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the default leaderboard to review rank emphasis, top-of-table hierarchy, and row density on a standard desktop canvas.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <Leaderboard leaderboard={storyLeaderboard} />
    </div>
  ),
};

export const DefaultPhone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the phone variant to verify that leaderboard emphasis and row readability survive the move to a narrower viewport.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <Leaderboard leaderboard={storyLeaderboard} />
    </div>
  ),
  globals: {
    viewport: { value: "mobile2" },
  },
};
