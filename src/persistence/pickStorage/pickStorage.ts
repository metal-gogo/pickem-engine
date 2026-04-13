import { Match, MatchPick, UserPickSet } from "../../domain/models";
import { createEmptyPick, createEmptyPickSet } from "../../domain/picks";

const STORAGE_KEY = "pickem-engine/discovery-picks/v1";

interface StoredPickSetRecord {
  version: 1;
  pickSet: UserPickSet;
}

export interface PickStorage {
  load(matches: Match[]): UserPickSet;
  save(pickSet: UserPickSet): void;
  clear(): void;
}

function getSafeStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function normalizeScore(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    return null;
  }

  return value;
}

function normalizePick(candidate: unknown, matchId: string): MatchPick {
  const emptyPick = createEmptyPick(matchId);

  if (!candidate || typeof candidate !== "object") {
    return emptyPick;
  }

  const pickRecord = candidate as Record<string, unknown>;

  return {
    matchId,
    homeScore: normalizeScore(pickRecord.homeScore),
    awayScore: normalizeScore(pickRecord.awayScore),
    updatedAt: typeof pickRecord.updatedAt === "string" ? pickRecord.updatedAt : null,
  };
}

function hydratePickSet(candidate: unknown, matches: Match[]): UserPickSet {
  const emptyPickSet = createEmptyPickSet(matches);

  if (!candidate || typeof candidate !== "object") {
    return emptyPickSet;
  }

  const pickSetRecord = candidate as Record<string, unknown>;
  const storedPicks =
    pickSetRecord.picks && typeof pickSetRecord.picks === "object"
      ? (pickSetRecord.picks as Record<string, unknown>)
      : {};

  return {
    userId: typeof pickSetRecord.userId === "string" ? pickSetRecord.userId : emptyPickSet.userId,
    displayName:
      typeof pickSetRecord.displayName === "string" ? pickSetRecord.displayName : emptyPickSet.displayName,
    updatedAt: typeof pickSetRecord.updatedAt === "string" ? pickSetRecord.updatedAt : null,
    picks: Object.fromEntries(
      matches.map((match) => [match.id, normalizePick(storedPicks[match.id], match.id)]),
    ),
  };
}

export const localPickStorage: PickStorage = {
  load(matches) {
    const storage = getSafeStorage();

    if (!storage) {
      return createEmptyPickSet(matches);
    }

    try {
      const rawValue = storage.getItem(STORAGE_KEY);

      if (!rawValue) {
        return createEmptyPickSet(matches);
      }

      const parsed = JSON.parse(rawValue) as Partial<StoredPickSetRecord>;

      if (parsed.version !== 1) {
        return createEmptyPickSet(matches);
      }

      return hydratePickSet(parsed.pickSet, matches);
    } catch {
      return createEmptyPickSet(matches);
    }
  },

  save(pickSet) {
    const storage = getSafeStorage();

    if (!storage) {
      return;
    }

    const record: StoredPickSetRecord = {
      version: 1,
      pickSet,
    };

    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Ignore storage failures in the discovery build and keep the session usable.
    }
  },

  clear() {
    const storage = getSafeStorage();

    if (!storage) {
      return;
    }

    try {
      storage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures in the discovery build and keep the session usable.
    }
  },
};
