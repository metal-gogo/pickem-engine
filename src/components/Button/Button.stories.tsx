import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Button } from ".";

const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Reusable action button for the discovery UI. Use the default primary tone for the main action in a section, secondary for supporting but still important actions, and ghost for low-emphasis or reversible actions.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    children: "Save picks locally",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use the primary button for the main action in a surface or flow, such as saving picks or continuing to the next important step.",
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    tone: "secondary",
    children: "Review saved picks",
  },
  parameters: {
    docs: {
      description: {
        story: "Use the secondary button for important supporting actions when there is already a clearer primary action nearby.",
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    tone: "ghost",
    children: "Reset draft",
  },
  parameters: {
    docs: {
      description: {
        story: "Use the ghost button for lower-emphasis actions, especially reversible or optional actions like reset, edit, or return links styled as buttons.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Use the disabled state when the action exists but is temporarily unavailable, such as when nothing has changed yet or a lock state prevents saving.",
      },
    },
  },
};
