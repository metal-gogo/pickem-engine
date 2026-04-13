import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { eyebrowClass, panelHeaderClass, sectionCopyClass, sectionPanelClass, sectionTitleClass } from "../ui";
import { wideCanvas } from "../../storybook";

import { AppShell } from ".";

const meta = {
  title: "Frames/AppShell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Persistent application frame for the discovery build. This story is the reference surface for tuning header presence, navigation framing, and how page content sits within the shell.",
      },
    },
  },
  args: {
    children: null,
    previewLocked: false,
    onPreviewLockedChange: fn(),
    savedPickCount: 3,
    totalMatches: 6,
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the default shell story when adjusting top-level framing decisions like header density, navigation balance, and how a representative page module sits inside the app chrome.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <AppShell previewLocked={false} onPreviewLockedChange={() => undefined} savedPickCount={3} totalMatches={6}>
        <section className={sectionPanelClass}>
          <div className={panelHeaderClass}>
            <div>
              <div className={eyebrowClass}>Workbench</div>
              <h2 className={sectionTitleClass}>Storybook evaluation frame</h2>
              <p className={sectionCopyClass}>
                Use this shell story to tune the persistent header, navigation weight, and overall page framing.
              </p>
            </div>
          </div>
        </section>
      </AppShell>
    </div>
  ),
};
