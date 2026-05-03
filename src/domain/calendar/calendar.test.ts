import { describe, expect, it } from "vitest";

import { createIcsCalendar } from "./calendar";

describe("createIcsCalendar", () => {
  it("serializes match events as portable ICS content", () => {
    const calendar = createIcsCalendar(
      [
        {
          id: "match-1",
          title: "World Cup 2026: Mexico vs South Africa",
          startsAt: "2026-06-11T13:00:00-06:00",
          location: "Mexico City Stadium, Mexico City",
          description: "Match 1, Group A",
        },
      ],
      { calendarName: "World Cup 2026" },
    );

    expect(calendar).toContain("BEGIN:VCALENDAR");
    expect(calendar).toContain("VERSION:2.0");
    expect(calendar).toContain("DTSTAMP:20260611T190000Z");
    expect(calendar).toContain("DTSTART:20260611T190000Z");
    expect(calendar).toContain("DTEND:20260611T210000Z");
    expect(calendar).toContain("SUMMARY:World Cup 2026: Mexico vs South Africa");
    expect(calendar).toContain("LOCATION:Mexico City Stadium\\, Mexico City");
    expect(calendar).toContain("END:VCALENDAR");
  });

  it("escapes text fields that calendar clients parse specially", () => {
    const calendar = createIcsCalendar(
      [
        {
          id: "group-a",
          title: "Group A: one, two; three",
          startsAt: "2026-06-11T13:00:00-06:00",
          description: "Line one\nLine two",
        },
      ],
      { calendarName: "A; B" },
    );

    expect(calendar).toContain("X-WR-CALNAME:A\\; B");
    expect(calendar).toContain("SUMMARY:Group A: one\\, two\\; three");
    expect(calendar).toContain("DESCRIPTION:Line one\\nLine two");
  });

  it("allows callers to provide a calendar revision timestamp", () => {
    const calendar = createIcsCalendar(
      [
        {
          id: "match-1",
          title: "World Cup 2026: Mexico vs South Africa",
          startsAt: "2026-06-11T13:00:00-06:00",
        },
      ],
      { calendarName: "World Cup 2026", revisionAt: "2026-01-01T00:00:00.000Z" },
    );

    expect(calendar).toContain("DTSTAMP:20260101T000000Z");
  });
});
