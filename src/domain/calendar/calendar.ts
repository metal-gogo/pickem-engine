export interface CalendarEventInput {
  id: string;
  title: string;
  startsAt: string;
  durationMinutes?: number;
  location?: string;
  description?: string;
  url?: string;
}

interface CalendarOptions {
  calendarName: string;
  productId?: string;
  revisionAt?: string | Date;
}

const WORLD_CUP_2026_CALENDAR_REVISION_AT = "2026-06-11T19:00:00.000Z";

function escapeCalendarText(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

function toCalendarTimestamp(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;

  return date
    .toISOString()
    .replaceAll("-", "")
    .replaceAll(":", "")
    .replace(/\.\d{3}Z$/, "Z");
}

function addMinutes(value: string, durationMinutes: number) {
  return new Date(new Date(value).getTime() + durationMinutes * 60_000);
}

export function createIcsCalendar(events: CalendarEventInput[], options: CalendarOptions) {
  const revisionAt = toCalendarTimestamp(options.revisionAt ?? WORLD_CUP_2026_CALENDAR_REVISION_AT);
  const productId = options.productId ?? "-//pickem-engine//World Cup 2026//EN";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:${productId}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeCalendarText(options.calendarName)}`,
  ];

  for (const event of events) {
    const durationMinutes = event.durationMinutes ?? 120;
    const startsAt = toCalendarTimestamp(event.startsAt);
    const endsAt = toCalendarTimestamp(addMinutes(event.startsAt, durationMinutes));

    lines.push(
      "BEGIN:VEVENT",
      `UID:${escapeCalendarText(event.id)}@pickem-engine.local`,
      `DTSTAMP:${revisionAt}`,
      `DTSTART:${startsAt}`,
      `DTEND:${endsAt}`,
      `SUMMARY:${escapeCalendarText(event.title)}`,
    );

    if (event.location) {
      lines.push(`LOCATION:${escapeCalendarText(event.location)}`);
    }

    if (event.description) {
      lines.push(`DESCRIPTION:${escapeCalendarText(event.description)}`);
    }

    if (event.url) {
      lines.push(`URL:${escapeCalendarText(event.url)}`);
    }

    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  return `${lines.join("\r\n")}\r\n`;
}

export function createCalendarDataUri(events: CalendarEventInput[], options: CalendarOptions) {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(createIcsCalendar(events, options))}`;
}
