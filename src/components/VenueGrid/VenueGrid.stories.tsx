import type { Meta, StoryObj } from "@storybook/react-vite";

import { storyPublicMatches, storyPublicVenues, wideCanvas } from "../../storybook";

import { VenueGrid } from ".";

const meta = {
  title: "Modules/VenueGrid",
  component: VenueGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Venue grid for public tournament and group pages. It keeps host-city, stadium, country, and match-count presentation consistent across public guide surfaces.",
      },
    },
  },
  args: {
    venues: storyPublicVenues,
    matches: storyPublicMatches,
  },
} satisfies Meta<typeof VenueGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TournamentVenues: Story = {
  render: () => (
    <div style={wideCanvas}>
      <VenueGrid venues={storyPublicVenues} matches={storyPublicMatches} />
    </div>
  ),
};

export const GroupVenues: Story = {
  render: () => (
    <div style={wideCanvas}>
      <VenueGrid venues={storyPublicVenues.slice(0, 4)} matches={storyPublicMatches.slice(0, 8)} />
    </div>
  ),
};
