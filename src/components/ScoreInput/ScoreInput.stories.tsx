import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn, userEvent, within } from "storybook/test";

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
          "Numeric score field for exact-score picks. These stories clarify the normal editing state, the unfilled state before a prediction exists, and the locked state when input should remain visible but unavailable.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    label: "Mexico",
    teamCode: "MEX",
    accent: "linear-gradient(180deg, #0b8f47, #ffffff, #d0453b)",
    value: 2,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof ScoreInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the interactive state for normal pick entry when the user can type or revise a score before the lock condition applies.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<number | null>(args.value);

    return (
      <div style={{ width: "240px" }}>
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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: /mexico/i });

    await userEvent.clear(input);
    await userEvent.type(input, "4");

    await expect(input).toHaveValue(4);
    await expect(args.onChange).toHaveBeenLastCalledWith("4");
  },
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the empty state when a score has not been entered yet and the interface should encourage a first prediction rather than show a default value.",
      },
    },
  },
  args: {
    value: null,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the disabled state when the saved or predicted score should remain visible, but editing is temporarily unavailable because of a locked or read-only mode.",
      },
    },
  },
  args: {
    value: 1,
    disabled: true,
  },
};

export const Compact: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the compact variant when score entry needs to live directly inside a denser surface like the match card, where the team label and one- or two-digit input should share the same row footprint.",
      },
    },
  },
  args: {
    value: 1,
    variant: "compact",
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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: /mexico/i });

    await userEvent.clear(input);
    await userEvent.type(input, "2");

    await expect(input).toHaveValue(2);
    await expect(args.onChange).toHaveBeenLastCalledWith("2");
  },
};
