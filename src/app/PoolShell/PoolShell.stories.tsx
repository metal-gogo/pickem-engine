import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { sectionCopyClass, sectionPanelClass, sectionTitleClass } from "../ui";
import { storyFamilyPool } from "../../storybook";

import { PoolShell } from ".";

const meta = {
  title: "Frames/PoolShell",
  component: PoolShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Current persistent frame for the prototype pool experience. Treat it as the paper-and-scoreboard chassis for the app: a sticky frosted header, bold display hierarchy, and layered structural panels that should feel sturdier than default SaaS chrome.",
      },
    },
  },
  args: {
    pool: storyFamilyPool,
    previewLocked: false,
    onPreviewLockedChange: fn(),
    savedPickCount: 12,
    totalMatches: 72,
    children: null,
  },
} satisfies Meta<typeof PoolShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LiveEdit: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the live-edit shell as the main reference for checking whether the pool frame feels grounded and editorial while still keeping progress, navigation, and edit mode obvious at a glance.",
      },
    },
  },
  render: () => (
    <PoolShell
      pool={storyFamilyPool}
      previewLocked={false}
      onPreviewLockedChange={() => undefined}
      savedPickCount={12}
      totalMatches={72}
    >
      <section className={sectionPanelClass}>
        <h2 className={sectionTitleClass}>Representative content area</h2>
        <p className={sectionCopyClass}>
          Use this frame story to adjust shell density, saved-progress framing, and how the
          breadcrumb sits above the main pool card.
        </p>
      </section>
    </PoolShell>
  ),
};

export const LockedPreview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the locked-preview shell to validate that the same structural frame still reads clearly when the flow shifts from active editing to inspection.",
      },
    },
  },
  render: () => (
    <PoolShell
      pool={storyFamilyPool}
      previewLocked
      onPreviewLockedChange={() => undefined}
      savedPickCount={12}
      totalMatches={72}
    >
      <section className={sectionPanelClass}>
        <h2 className={sectionTitleClass}>Representative content area</h2>
        <p className={sectionCopyClass}>
          This variant helps tune the persistent shell while the prototype is intentionally locked.
        </p>
      </section>
    </PoolShell>
  ),
};
