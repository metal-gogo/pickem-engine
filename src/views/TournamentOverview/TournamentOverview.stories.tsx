import type { Meta, StoryObj } from "@storybook/react-vite";

import { expectVisibleTextContrast } from "../../storybook";

import { TournamentOverview } from ".";

const meta = {
  title: "Views/TournamentOverview",
  component: TournamentOverview,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Public tournament landing page for unauthenticated users. It combines tournament rules, groups, opening fixtures, venues, source links, and a full ICS calendar export.",
      },
    },
  },
} satisfies Meta<typeof TournamentOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TournamentOverview />,
};

export const Phone: Story = {
  render: () => <TournamentOverview />,
  globals: {
    viewport: { value: "mobile2" },
  },
};

export const DarkMode: Story = {
  render: () => <TournamentOverview />,
  globals: {
    themeMode: "dark",
  },
  play: async ({ canvasElement }) => {
    await expectVisibleTextContrast(canvasElement);
  },
};
