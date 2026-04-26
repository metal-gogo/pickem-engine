import { describe, expect, it } from "vitest";

import { getDeadlineLabel, getLockState, getPrototypeLockedNow } from ".";

describe("lock", () => {
  it("returns locked once the deadline has passed", () => {
    expect(getLockState("2026-06-10T12:00:00-06:00", new Date("2026-06-10T12:01:00-06:00"))).toBe(
      "locked",
    );
  });

  it("returns locking-soon inside the warning window", () => {
    expect(getLockState("2026-06-10T12:00:00-06:00", new Date("2026-06-09T12:00:00-06:00"))).toBe(
      "locking-soon",
    );
  });

  it("returns editable when more than two days remain", () => {
    expect(getLockState("2026-06-10T12:00:00-06:00", new Date("2026-06-07T11:59:00-06:00"))).toBe(
      "editable",
    );
  });

  it("formats day, hour, minute, and locked labels across branches", () => {
    expect(
      getDeadlineLabel("2026-06-10T12:00:00-06:00", new Date("2026-06-08T06:00:00-06:00")),
    ).toMatch(/^2 days left until /);
    expect(
      getDeadlineLabel("2026-06-10T12:00:00-06:00", new Date("2026-06-10T07:00:00-06:00")),
    ).toMatch(/^5 hours left until /);
    expect(
      getDeadlineLabel("2026-06-10T12:00:00-06:00", new Date("2026-06-10T11:15:00-06:00")),
    ).toMatch(/^45 minutes left until /);
    expect(
      getDeadlineLabel("2026-06-10T12:00:00-06:00", new Date("2026-06-10T12:01:00-06:00")),
    ).toMatch(/^Locked /);
  });

  it("creates a prototype locked preview time after the deadline", () => {
    expect(getPrototypeLockedNow("2026-06-10T12:00:00-06:00").toISOString()).toBe(
      "2026-06-10T21:00:00.000Z",
    );
  });
});
