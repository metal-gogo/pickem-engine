import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { ThemeModeSelector } from "./ThemeModeSelector";
import { ThemeProvider } from "./ThemeProvider";

const meta = {
  title: "Foundations/ThemeModeSelector",
  component: ThemeModeSelector,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Three-state color-mode selector used in persistent page headers. It should stay compact, tactile, and tied to the warm editorial token system.",
      },
    },
  },
} satisfies Meta<typeof ThemeModeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightSelected: Story = {
  render: () => (
    <ThemeProvider defaultMode="light" persist={false}>
      <ThemeModeSelector />
    </ThemeProvider>
  ),
};

export const DarkSelected: Story = {
  render: () => (
    <ThemeProvider defaultMode="dark" persist={false}>
      <ThemeModeSelector />
    </ThemeProvider>
  ),
};

export const Interactive: Story = {
  render: () => (
    <ThemeProvider defaultMode="light" persist={false}>
      <ThemeModeSelector />
    </ThemeProvider>
  ),
  play: async ({ canvas }) => {
    const darkMode = canvas.getByRole("radio", { name: "Dark" });

    await userEvent.click(darkMode);
    await expect(darkMode).toHaveAttribute("aria-checked", "true");
  },
};
