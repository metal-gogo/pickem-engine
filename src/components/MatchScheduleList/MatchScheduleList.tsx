import { formatKickoffDay, formatKickoffTime } from "../../app/format";
import type { PublicMatch } from "../../data/tournament";
import { TeamFlag } from "../TeamFlag";

interface MatchScheduleListProps {
  matches: PublicMatch[];
  emptyLabel?: string;
  limit?: number;
}

function MatchTeamLabel({ match, side }: { match: PublicMatch; side: "home" | "away" }) {
  const team = side === "home" ? match.homeTeam : match.awayTeam;
  const label = side === "home" ? match.homeLabel : match.awayLabel;

  return (
    <span className="flex min-w-0 items-center gap-2">
      {team ? (
        <TeamFlag
          fallbackFlag={team.flag}
          shape="pill"
          size="sm"
          teamId={team.id}
          teamName={team.name}
        />
      ) : null}
      <span className="truncate font-display text-[0.95rem] font-black uppercase tracking-[-0.03em] text-app-ink">
        {label}
      </span>
    </span>
  );
}

export function MatchScheduleList({
  matches,
  emptyLabel = "No matches loaded yet.",
  limit,
}: MatchScheduleListProps) {
  const visibleMatches = typeof limit === "number" ? matches.slice(0, limit) : matches;

  if (visibleMatches.length === 0) {
    return <p className="m-0 font-medium leading-7 text-app-muted">{emptyLabel}</p>;
  }

  return (
    <ol className="grid gap-3">
      {visibleMatches.map((match) => (
        <li
          key={match.id}
          className="grid gap-3 rounded-none border-[3px] border-app-ink bg-app-surface-strong p-3 shadow-[0_8px_24px_-14px_rgba(56,56,52,0.24)] sm:grid-cols-[minmax(7rem,0.8fr)_minmax(0,1.6fr)_minmax(9rem,0.9fr)] sm:items-center"
        >
          <div className="grid gap-1">
            <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-rust">
              {match.matchNumber ? `Match ${match.matchNumber}` : match.stageLabel}
            </span>
            <span className="font-semibold text-app-muted">
              {formatKickoffDay(match.kickoffAt)} · {formatKickoffTime(match.kickoffAt)}
            </span>
          </div>

          <div className="grid min-w-0 gap-2">
            <MatchTeamLabel match={match} side="home" />
            <span className="font-display text-[0.66rem] font-black uppercase tracking-[0.18em] text-app-muted">
              vs
            </span>
            <MatchTeamLabel match={match} side="away" />
          </div>

          <div className="grid gap-1 text-sm font-semibold text-app-muted sm:text-right">
            <span className="text-app-ink">{match.venue.city}</span>
            <span>{match.venue.stadium}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
