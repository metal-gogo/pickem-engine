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
          "Current persistent frame for the prototype pool experience. This is the main surface for tuning breadcrumb placement, pool identity hierarchy, saved-picks framing, and the locked-preview controls around the new grouped tournament flow.",
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
          "Use the live-edit shell as the main reference for the active prototype, where the user should feel oriented inside a pool and immediately see both overall progress and editing mode.",
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
          Use this frame story to adjust shell density, saved-progress framing, and how the breadcrumb sits above the main pool card.
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
          "Use the locked-preview shell to validate that the persistent controls still read clearly when the rest of the pool flow shifts into inspection instead of editing.",
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
        <p className={sectionCopyClass}>This variant helps tune the persistent shell while the prototype is intentionally locked.</p>
      </section>
    </PoolShell>
  ),
};
