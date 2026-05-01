import type { Meta, StoryObj } from "@storybook/react-vite";

import { narrowCanvas, storyGroupA, storyPublicGroupA } from "../../storybook";

import { GroupTable } from ".";

const meta = {
  title: "Modules/GroupTable",
  component: GroupTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Reusable group standings table shared by the pool dashboard and the public tournament guide. It keeps the dense football table treatment in one place while letting contexts choose whether qualification rows should be highlighted.",
      },
    },
  },
  args: {
    label: storyGroupA.label,
    rows: storyGroupA.rows,
  },
} satisfies Meta<typeof GroupTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PredictedPoolTable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the predicted pool table when saved picks are driving provisional standings and the top two rows should receive the bright qualification treatment.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <GroupTable label={storyGroupA.label} rows={storyGroupA.rows} />
    </div>
  ),
};

export const PublicPreTournamentTable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the public pre-tournament table when every team starts level and the table should avoid implying qualification before official results exist.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <GroupTable
        label={storyPublicGroupA.label}
        rows={storyPublicGroupA.rows}
        highlightQualifiedRows={false}
      />
    </div>
  ),
};

export const Phone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the phone variant to verify the shared table still collapses lower-priority stat columns without losing team identity or points.",
      },
    },
  },
  render: () => (
    <div style={narrowCanvas}>
      <GroupTable label={storyGroupA.label} rows={storyGroupA.rows} />
    </div>
  ),
  globals: {
    viewport: { value: "mobile2" },
  },
};
