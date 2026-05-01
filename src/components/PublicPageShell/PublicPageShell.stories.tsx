import type { Meta, StoryObj } from "@storybook/react-vite";

import { sectionPanelClass } from "../../app/ui";

import { PublicPageShell } from ".";

const meta = {
  title: "Frames/PublicPageShell",
  component: PublicPageShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Page frame for unauthenticated tournament information surfaces. It provides the shared public header, page width, and vertical rhythm used by tournament, group, and team views.",
      },
    },
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof PublicPageShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PublicPageShell>
      <section className={sectionPanelClass}>
        <h1 className="m-0 font-display text-3xl font-black uppercase text-app-ink">
          Public page content
        </h1>
      </section>
    </PublicPageShell>
  ),
};
