import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, userEvent, within } from "storybook/test";

import { InfoTooltip } from ".";

const meta = {
  title: "Primitives/InfoTooltip",
  component: InfoTooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Compact disclosure control for caveats that matter, but should not permanently occupy dashboard space. Use it for prototype warnings, scoring caveats, or projected-table explanations that need to stay close to a heading.",
      },
    },
  },
  args: {
    label: "About the projection",
    content:
      "Table order is derived from saved picks with a temporary discovery sort. Treat it as a prototype preview, not as a finalized rule interpretation.",
  },
} satisfies Meta<typeof InfoTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the default tooltip for compact explanatory caveats that support, but should not visually compete with, the main heading or table content.",
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: args.label });

    await userEvent.click(trigger);

    await expect(canvas.getByRole("tooltip")).toHaveTextContent(/temporary discovery sort/i);
  },
};
