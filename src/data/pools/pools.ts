import { PoolDetails } from "../../domain/models";

export const prototypePools: PoolDetails[] = [
  {
    id: "family-pool",
    name: "My Family Pool",
    participantCount: 8,
    deadlineAt: "2026-06-10T21:00:00-06:00",
    pointsOverview: [
      "Exact score preview: 5 pts",
      "Pick correct outcome: 2 pts",
    ],
  },
  {
    id: "work-pool",
    name: "My Work Pool",
    participantCount: 14,
    deadlineAt: "2026-06-10T21:00:00-06:00",
    pointsOverview: [
      "Exact score preview: 5 pts",
      "Pick correct outcome: 2 pts",
    ],
  },
];

export function getPoolById(poolId: string) {
  return prototypePools.find((pool) => pool.id === poolId) ?? null;
}
