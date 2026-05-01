import type { Meta, StoryObj } from "@storybook/react-vite";

import { expectVisibleTextContrast, storyPublicGroupA, storyPublicGroupC } from "../../storybook";

import { GroupProfile } from ".";

const meta = {
  title: "Views/GroupProfile",
  component: GroupProfile,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Public group single page with teams, pre-tournament table, fixtures, venues, loaded World Cup finals head-to-head history, and a group calendar export.",
      },
    },
  },
  args: {
    group: storyPublicGroupA,
  },
} satisfies Meta<typeof GroupProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupA: Story = {
  render: () => <GroupProfile group={storyPublicGroupA} />,
};

export const HistoryHeavyGroup: Story = {
  render: () => <GroupProfile group={storyPublicGroupC} />,
};

export const Phone: Story = {
  render: () => <GroupProfile group={storyPublicGroupA} />,
  globals: {
    viewport: { value: "mobile2" },
  },
};

export const DarkMode: Story = {
  render: () => <GroupProfile group={storyPublicGroupC} />,
  globals: {
    themeMode: "dark",
  },
  play: async ({ canvasElement }) => {
    await expectVisibleTextContrast(canvasElement);
  },
};
