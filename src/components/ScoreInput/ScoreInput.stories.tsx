import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn, userEvent } from "storybook/test";

import { ScoreInput } from ".";

const meta = {
  title: "Inputs/ScoreInput",
  component: ScoreInput,
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Compact numeric score field for exact-score picks inside denser match-entry surfaces. It should feel like a tactile scoreboard control: team accent strip, heavy stroke, oversized number, and state changes expressed through surface shifts rather than tiny chrome tweaks.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    teamId: "mex",
    label: "Mexico",
    teamCode: "MEX",
    fallbackFlag: "🇲🇽",
    accent: "linear-gradient(180deg, #0b8f47, #ffffff, #d0453b)",
    value: 2,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof ScoreInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the score row inside the match card flow; the same layout can cover filled, empty, and disabled states through controls without introducing separate ornamental variants.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<number | null>(args.value);

    return (
      <div style={{ width: "340px" }}>
        <ScoreInput
          {...args}
          value={value}
          onChange={(nextValue) => {
            args.onChange(nextValue);

            if (nextValue.trim() === "") {
              setValue(null);
              return;
            }

            const parsed = Number.parseInt(nextValue, 10);
            setValue(Number.isNaN(parsed) ? null : parsed);
          }}
        />
      </div>
    );
  },
  play: async ({ canvas, args }) => {
    const input = canvas.getByRole("spinbutton", { name: /mexico/i });

    await userEvent.clear(input);
    await userEvent.type(input, "2");

    await expect(input).toHaveValue(2);
    await expect(args.onChange).toHaveBeenLastCalledWith("2");
  },
};
