import type { Meta, StoryObj } from "@storybook/react-vite";

import { expectVisibleTextContrast, storyBrazil, storyMexico } from "../../storybook";

import { TeamProfile } from ".";

const meta = {
  title: "Views/TeamProfile",
  component: TeamProfile,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Public team single page with identity, manager, FIFA ranking, World Cup history, group context, fixtures, venues, and a team-specific calendar export.",
      },
    },
  },
  args: {
    team: storyMexico,
  },
} satisfies Meta<typeof TeamProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HostTeam: Story = {
  render: () => <TeamProfile team={storyMexico} />,
};

export const ContenderTeam: Story = {
  render: () => <TeamProfile team={storyBrazil} />,
};

export const Phone: Story = {
  render: () => <TeamProfile team={storyMexico} />,
  globals: {
    viewport: { value: "mobile2" },
  },
};

export const DarkMode: Story = {
  render: () => <TeamProfile team={storyBrazil} />,
  globals: {
    themeMode: "dark",
  },
  play: async ({ canvasElement }) => {
    await expectVisibleTextContrast(canvasElement);
  },
};
