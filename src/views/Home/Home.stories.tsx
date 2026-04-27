import type { Meta, StoryObj } from "@storybook/react-vite";

import { expectVisibleTextContrast, storyPools } from "../../storybook";

import { Home } from ".";

const meta = {
  title: "Views/Home",
  component: Home,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pool-selection home for the current prototype. It exists to validate the returning-user entry point before the user drills into a specific pool, dashboard, and group-pick flow.",
      },
    },
  },
  args: {
    pools: storyPools,
  },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the default home story to review the current entry point into the prototype, including how pool choice, pool creation deferral, and overall page atmosphere read together.",
      },
    },
  },
  render: () => <Home pools={storyPools} />,
};

export const Phone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the phone variant to confirm that pool cards remain scannable and that the entry-point hierarchy still reads clearly without desktop width.",
      },
    },
  },
  render: () => <Home pools={storyPools} />,
  globals: {
    viewport: { value: "mobile2" },
  },
};

export const DarkMode: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the dark-mode variant to keep the returning-user entry point inside automated contrast checks instead of treating dark mode as a visual-only review.",
      },
    },
  },
  render: () => <Home pools={storyPools} />,
  globals: {
    themeMode: "dark",
  },
  play: async ({ canvasElement }) => {
    await expectVisibleTextContrast(canvasElement);
  },
};
