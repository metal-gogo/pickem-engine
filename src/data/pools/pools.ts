import { PoolDetails } from "../../domain/models";

export const prototypePools: PoolDetails[] = [
  {
    id: "family-pool",
    name: "My Family Pool",
    participantCount: 8,
    deadlineAt: "2026-06-10T21:00:00-06:00",
    description: "Prototype pool home for discovery-only tournament and pick-flow work.",
    shortRulesSummary:
      "Exact-score picks stay editable in this discovery build until the shared tournament deadline. The scoring and tie-break details below are placeholders so the flow can be tested before the final rules are settled.",
    pointsOverview: [
      "Placeholder only: exact score preview = 5 pts",
      "Placeholder only: correct outcome preview = 2 pts",
      "Tie-break and knockout handling are still unresolved",
    ],
    fullRules: [
      {
        id: "discovery-scope",
        title: "Discovery-only scope",
        body: "This modal exists to test how a pool can explain itself. The copy is intentionally provisional and should not be treated as a final rule set.",
      },
      {
        id: "placeholder-scoring",
        title: "Placeholder scoring preview",
        body: "Use the points summary as a temporary interaction aid only. The real scoring model, tie-break rules, and knockout handling still need final product decisions.",
      },
      {
        id: "editing-window",
        title: "Editing window in the prototype",
        body: "Picks remain editable in the discovery shell until the shared deadline passes or the locked preview is enabled. This supports UX testing and does not resolve the permanent editing rule.",
      },
    ],
  },
  {
    id: "work-pool",
    name: "My Work Pool",
    participantCount: 14,
    deadlineAt: "2026-06-10T21:00:00-06:00",
    description: "Second placeholder pool used to test multi-pool navigation and scoped persistence.",
    shortRulesSummary:
      "This second pool uses the same prototype tournament data but keeps its own local pick state. The rules summary and points overview remain placeholders here as well.",
    pointsOverview: [
      "Placeholder only: exact score preview = 5 pts",
      "Placeholder only: correct outcome preview = 2 pts",
      "Final scoring and tie-break rules still pending",
    ],
    fullRules: [
      {
        id: "prototype-note",
        title: "Prototype note",
        body: "This pool is here mainly to validate the home screen and scoped persistence. It should behave like a separate space even though the tournament data is shared.",
      },
      {
        id: "rules-status",
        title: "Rules status",
        body: "All points, tie-break, and knockout rule details shown in this experience are temporary placeholders until the canonical business rules are finalized.",
      },
    ],
  },
];

export function getPoolById(poolId: string) {
  return prototypePools.find((pool) => pool.id === poolId) ?? null;
}
