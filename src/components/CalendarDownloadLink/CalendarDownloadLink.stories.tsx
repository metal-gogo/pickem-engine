import type { Meta, StoryObj } from "@storybook/react-vite";

import { createCalendarDataUri } from "../../domain/calendar";
import { storyPublicMatches } from "../../storybook";
import { getCalendarEventsForMatches } from "../../data/tournament";

import { CalendarDownloadLink } from ".";

const meta = {
  title: "Modules/CalendarDownloadLink",
  component: CalendarDownloadLink,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Download link for generated ICS calendars. Tournament, team, and group pages use the same control so calendar export behavior stays consistent.",
      },
    },
  },
  args: {
    fileName: "world-cup-2026.ics",
    href: createCalendarDataUri(getCalendarEventsForMatches(storyPublicMatches.slice(0, 3)), {
      calendarName: "World Cup 2026 sample",
    }),
    label: "Download calendar",
  },
} satisfies Meta<typeof CalendarDownloadLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TournamentCalendar: Story = {
  render: (args) => <CalendarDownloadLink {...args} />,
};
