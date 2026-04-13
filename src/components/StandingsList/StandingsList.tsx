import { cn } from "../../app/cn";
import { LeaderboardEntry } from "../../domain/models";
import { StandingsRow } from "./StandingsRow";

interface StandingsListProps {
  entries: LeaderboardEntry[];
  className?: string;
}

export function StandingsList({ entries, className }: StandingsListProps) {
  return (
    <div className={cn("grid gap-3.5", className)}>
      {entries.map((entry) => (
        <StandingsRow key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
