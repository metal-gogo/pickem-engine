import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, within } from "storybook/test";

import { narrowCanvas, storyFamilyPool } from "../../storybook";

import { RulesSummary } from ".";

const meta = {
  title: "Modules/RulesSummary",
  component: RulesSummary,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Compact rules-and-points summary module for the pool dashboard and group pick flow. It keeps placeholder points information visible while moving the fuller caveats and rule copy into a modal so the core dashboard stays lighter.",
      },
    },
  },
  args: {
    pool: storyFamilyPool,
  },
} satisfies Meta<typeof RulesSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InlineSummary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the inline summary when the current screen needs a quick points reminder and an obvious route into the fuller placeholder rules, without letting explanatory copy take over the surface.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <RulesSummary pool={storyFamilyPool} />
    </div>
  ),
};

export const RulesModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the modal path when a user wants the fuller pool explanation without leaving the current dashboard or group-pick context.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <RulesSummary pool={storyFamilyPool} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/points overview/i)).toBeInTheDocument();
    await expect(canvas.getByText(/exact score preview: 5 pts/i)).toBeInTheDocument();
    await expect(canvas.getByText(/pick correct outcome: 2 pts/i)).toBeInTheDocument();
  },
};
