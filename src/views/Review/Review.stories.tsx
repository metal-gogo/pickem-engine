import type { Meta, StoryObj } from "@storybook/react-vite";

import { emptyPickSet, partiallySavedPickSet, seededSavedPickSet, storyMatches, wideCanvas } from "../../storybook";

import { Review } from ".";

const meta = {
  title: "Views/Review",
  component: Review,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Read-only review surface for saved picks. These variants show the ideal saved snapshot, warning states when a draft diverges, and incomplete states that help tune empty and partial-review behavior.",
      },
    },
  },
  args: {
    matches: storyMatches,
    savedPickSet: seededSavedPickSet,
    lockState: "editable",
    draftDirty: false,
  },
} satisfies Meta<typeof Review>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SavedSnapshot: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the saved snapshot as the baseline review state when the user should be able to calmly scan what is already stored.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <Review matches={storyMatches} savedPickSet={seededSavedPickSet} lockState="editable" draftDirty={false} />
    </div>
  ),
};

export const WithDraftWarning: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the draft warning variant when the saved snapshot is still valid, but the user should be reminded that newer unsaved changes exist in the picks flow.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <Review matches={storyMatches} savedPickSet={seededSavedPickSet} lockState="editable" draftDirty />
    </div>
  ),
};

export const PartialSave: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the partial save variant to tune the balance between what has already been predicted and what still needs attention before the slate feels complete.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <Review matches={storyMatches} savedPickSet={partiallySavedPickSet} lockState="editable" draftDirty={false} />
    </div>
  ),
};

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the empty state when no saved picks exist yet and review should guide the user back toward first-time action rather than present an empty shell.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <Review matches={storyMatches} savedPickSet={emptyPickSet} lockState="editable" draftDirty={false} />
    </div>
  ),
};

export const SavedSnapshotPhone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the phone variant to verify that the saved review layout stays calm and legible on mobile without losing scanability.",
      },
    },
  },
  render: () => (
    <div style={wideCanvas}>
      <Review matches={storyMatches} savedPickSet={seededSavedPickSet} lockState="editable" draftDirty={false} />
    </div>
  ),
  globals: {
    viewport: { value: "mobile2" },
  },
};
