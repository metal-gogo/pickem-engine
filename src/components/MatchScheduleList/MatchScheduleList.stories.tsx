import type { Meta, StoryObj } from "@storybook/react-vite";

import { narrowCanvas, storyPublicMatches } from "../../storybook";

import { MatchScheduleList } from ".";

const meta = {
  title: "Modules/MatchScheduleList",
  component: MatchScheduleList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Reusable schedule list for public tournament, team, and group pages. It supports known team fixtures and unresolved knockout slots without changing the row structure.",
      },
    },
  },
  args: {
    matches: storyPublicMatches.slice(0, 4),
  },
} satisfies Meta<typeof MatchScheduleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupFixtures: Story = {
  render: () => (
    <div style={narrowCanvas}>
      <MatchScheduleList matches={storyPublicMatches.slice(0, 4)} />
    </div>
  ),
};

export const KnockoutSlots: Story = {
  render: () => (
    <div style={narrowCanvas}>
      <MatchScheduleList matches={storyPublicMatches.slice(72, 76)} />
    </div>
  ),
};

export const Phone: Story = {
  render: () => (
    <div style={narrowCanvas}>
      <MatchScheduleList matches={storyPublicMatches.slice(0, 3)} />
    </div>
  ),
  globals: {
    viewport: { value: "mobile2" },
  },
};
