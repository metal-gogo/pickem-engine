const kickoffDayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

const kickoffTimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

const savedAtFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function formatKickoffDay(kickoffAt: string): string {
  return kickoffDayFormatter.format(new Date(kickoffAt));
}

export function formatKickoffTime(kickoffAt: string): string {
  return kickoffTimeFormatter.format(new Date(kickoffAt));
}

export function formatSavedAt(savedAt: string | null): string {
  if (!savedAt) {
    return "Not saved yet";
  }

  return savedAtFormatter.format(new Date(savedAt));
}

export function formatStageLabel(stage: string, group?: string): string {
  if (stage === "group" && group) {
    return `Group ${group}`;
  }

  const normalized = stage.replaceAll("-", " ");
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
