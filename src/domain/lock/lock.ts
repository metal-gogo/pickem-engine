import { LockState } from "../models";

const LOCKING_SOON_WINDOW_HOURS = 48;

const longDeadlineFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const shortDeadlineFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function getLockState(deadlineAt: string, now = new Date()): LockState {
  const deadline = new Date(deadlineAt);
  const remainingMs = deadline.getTime() - now.getTime();

  if (remainingMs <= 0) {
    return "locked";
  }

  if (remainingMs <= LOCKING_SOON_WINDOW_HOURS * 60 * 60 * 1000) {
    return "locking-soon";
  }

  return "editable";
}

export function getDeadlineLabel(deadlineAt: string, now = new Date()): string {
  const deadline = new Date(deadlineAt);
  const remainingMs = deadline.getTime() - now.getTime();

  if (remainingMs <= 0) {
    return `Locked ${longDeadlineFormatter.format(deadline)}`;
  }

  const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const remainingDays = Math.floor(remainingHours / 24);

  if (remainingDays >= 1) {
    return `${remainingDays} day${remainingDays === 1 ? "" : "s"} left until ${shortDeadlineFormatter.format(deadline)}`;
  }

  if (remainingHours >= 1) {
    return `${remainingHours} hour${remainingHours === 1 ? "" : "s"} left until ${shortDeadlineFormatter.format(deadline)}`;
  }

  const remainingMinutes = Math.max(1, Math.floor(remainingMs / (1000 * 60)));
  return `${remainingMinutes} minute${remainingMinutes === 1 ? "" : "s"} left until ${shortDeadlineFormatter.format(deadline)}`;
}

export function getPrototypeLockedNow(deadlineAt: string): Date {
  return new Date(new Date(deadlineAt).getTime() + 3 * 60 * 60 * 1000);
}
