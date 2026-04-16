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
    children: "Save and continue",
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
    children: "Save",
  },
  parameters: {
    docs: {
      description: {
        story: "Use the secondary button for important supporting actions when there is already a clearer primary action nearby, such as keeping Save separate from Save and continue.",
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    tone: "ghost",
    children: "See rules",
  },
  parameters: {
    docs: {
      description: {
        story: "Use the ghost button for lower-emphasis actions, especially optional or informational actions like opening rules, returning to a previous surface, or dismissing a secondary control.",
      },
    },
  },
};

export const Compact: Story = {
  args: {
    tone: "secondary",
    size: "compact",
    children: "Make picks",
  },
  parameters: {
    docs: {
      description: {
        story: "Use the compact size inside denser dashboard modules like group cards, where the action still needs button treatment but should not dominate the table content.",
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
