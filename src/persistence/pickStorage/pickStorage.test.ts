import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createEmptyPickSet, markPickSetSaved, updatePickScore } from "../../domain/picks";
import { sampleMatches } from "../../data/fixtures";
import { createLocalPickStorage, localPickStorage } from "./pickStorage";

function createLocalStorageMock() {
  const store = new Map<string, string>();

  return {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
  };
}

describe("localPickStorage", () => {
  let originalWindow: unknown;

  beforeEach(() => {
    originalWindow = (globalThis as unknown as { window?: unknown }).window;
  });

  afterEach(() => {
    if (originalWindow === undefined) {
      delete (globalThis as unknown as { window?: unknown }).window;
    } else {
      (globalThis as unknown as { window?: unknown }).window = originalWindow;
    }
    vi.restoreAllMocks();
  });

  function attachStorage(storage: Storage) {
    (globalThis as unknown as { window: { localStorage: Storage } }).window = {
      localStorage: storage,
    } as { localStorage: Storage };
    return storage;
  }

  it("returns an empty pick set when localStorage is unavailable", () => {
    delete (globalThis as unknown as { window?: unknown }).window;

    const result = localPickStorage.load(sampleMatches);

    expect(result.picks).toEqual(createEmptyPickSet(sampleMatches).picks);
    expect(result.userId).toBeDefined();
    expect(result.displayName).toBeDefined();
  });

  it("saves and loads a persisted pick set", () => {
    attachStorage(createLocalStorageMock() as unknown as Storage);
    const savedPickSet = markPickSetSaved(updatePickScore(createEmptyPickSet(sampleMatches), sampleMatches[0].id, "homeScore", "1"));

    localPickStorage.save(savedPickSet);
    const loaded = localPickStorage.load(sampleMatches);

    expect(loaded.picks[sampleMatches[0].id].homeScore).toBe(1);
    expect(loaded.updatedAt).toBe(savedPickSet.updatedAt);
    expect(loaded.displayName).toBe(savedPickSet.displayName);
  });

  it("returns an empty pick set when stored data is invalid JSON", () => {
    const storage = attachStorage(createLocalStorageMock() as unknown as Storage);
    storage.setItem("pickem-engine/discovery-picks/v1/global", "{ invalid-json ");

    const loaded = localPickStorage.load(sampleMatches);

    expect(loaded.picks).toEqual(createEmptyPickSet(sampleMatches).picks);
  });

  it("returns an empty pick set when version is unsupported", () => {
    const storage = attachStorage(createLocalStorageMock() as unknown as Storage);
    storage.setItem(
      "pickem-engine/discovery-picks/v1/global",
      JSON.stringify({ version: 2, pickSet: createEmptyPickSet(sampleMatches) }),
    );

    const loaded = localPickStorage.load(sampleMatches);

    expect(loaded.picks).toEqual(createEmptyPickSet(sampleMatches).picks);
  });

  it("normalizes invalid persisted pick data on hydrate", () => {
    const storage = attachStorage(createLocalStorageMock() as unknown as Storage);
    storage.setItem(
      "pickem-engine/discovery-picks/v1/global",
      JSON.stringify({
        version: 1,
        pickSet: {
          userId: "test-user",
          displayName: "Test User",
          updatedAt: "invalid-date",
          picks: {
            [sampleMatches[0].id]: {
              homeScore: "x",
              awayScore: -1,
              updatedAt: 123,
            },
          },
        },
      }),
    );

    const loaded = localPickStorage.load(sampleMatches);

    expect(loaded.userId).toBe("test-user");
    expect(loaded.displayName).toBe("Test User");
    expect(loaded.updatedAt).toBe("invalid-date");
    expect(loaded.picks[sampleMatches[0].id].homeScore).toBeNull();
    expect(loaded.picks[sampleMatches[0].id].awayScore).toBeNull();
    expect(loaded.picks[sampleMatches[0].id].updatedAt).toBeNull();
  });

  it("does not throw when localStorage.save fails", () => {
    const failingStorage = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(() => {
        throw new Error("storage full");
      }),
      removeItem: vi.fn(),
    };

    attachStorage(failingStorage as unknown as Storage);

    expect(() => localPickStorage.save(createEmptyPickSet(sampleMatches))).not.toThrow();
  });

  it("clears persisted picks from localStorage", () => {
    const storage = attachStorage(createLocalStorageMock() as unknown as Storage);
    storage.setItem("pickem-engine/discovery-picks/v1/global", "some-value");

    localPickStorage.clear();

    expect(storage.getItem("pickem-engine/discovery-picks/v1/global")).toBeNull();
  });

  it("keeps different pool scopes isolated from each other", () => {
    const storage = attachStorage(createLocalStorageMock() as unknown as Storage);
    const familyStorage = createLocalPickStorage("family-pool");
    const workStorage = createLocalPickStorage("work-pool");

    const familyPickSet = markPickSetSaved(
      updatePickScore(createEmptyPickSet(sampleMatches), sampleMatches[0].id, "homeScore", "2"),
    );
    const workPickSet = markPickSetSaved(
      updatePickScore(createEmptyPickSet(sampleMatches), sampleMatches[1].id, "awayScore", "4"),
    );

    familyStorage.save(familyPickSet);
    workStorage.save(workPickSet);

    expect(familyStorage.load(sampleMatches).picks[sampleMatches[0].id].homeScore).toBe(2);
    expect(familyStorage.load(sampleMatches).picks[sampleMatches[1].id].awayScore).toBeNull();
    expect(workStorage.load(sampleMatches).picks[sampleMatches[0].id].homeScore).toBeNull();
    expect(workStorage.load(sampleMatches).picks[sampleMatches[1].id].awayScore).toBe(4);
    expect(storage.getItem("pickem-engine/discovery-picks/v1/family-pool")).not.toBeNull();
    expect(storage.getItem("pickem-engine/discovery-picks/v1/work-pool")).not.toBeNull();
  });
});
