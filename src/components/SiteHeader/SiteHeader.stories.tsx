import type { Meta, StoryObj } from "@storybook/react-vite";

import { expectVisibleTextContrast } from "../../storybook";

import { SiteHeader } from ".";

const meta = {
  title: "Frames/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Shared top navigation for public tournament pages and the private pool prototype. It keeps tournament and pool navigation together without requiring authentication state.",
      },
    },
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tournament: Story = {
  render: () => <SiteHeader current="tournament" />,
};

export const Pools: Story = {
  render: () => <SiteHeader current="pools" />,
};

export const DarkMode: Story = {
  render: () => <SiteHeader current="tournament" />,
  globals: {
    themeMode: "dark",
  },
  play: async ({ canvasElement }) => {
    await expectVisibleTextContrast(canvasElement);
  },
};
