import { cn } from "../../app/cn";
import {
  eyebrowClass,
  pageStackClass,
  panelHeaderClass,
  sectionCopyClass,
  sectionPanelClass,
  sectionTitleClass,
  tileCardClass,
} from "../../app/ui";
import { Badge } from "../../components/Badge";
import { StandingsList } from "../../components/StandingsList";
import { LeaderboardEntry } from "../../domain/models";

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

export function Leaderboard({ leaderboard }: LeaderboardProps) {
  const leaders = leaderboard.slice(0, 3);

  return (
    <div className={pageStackClass}>
      <section className={sectionPanelClass}>
        <div className={panelHeaderClass}>
          <div>
            <div className={eyebrowClass}>Standings preview</div>
            <h1 className={sectionTitleClass}>Leaderboard hierarchy without overcommitting the scoring model</h1>
            <p className={sectionCopyClass}>
              Scores are mocked on purpose. This screen is here to validate rhythm, emphasis, and how competitive state
              should feel once real scoring rules are confirmed.
            </p>
          </div>
          <Badge label="Mocked scoring" tone="warning" />
        </div>
      </section>

      <section className="grid gap-3.5 lg:grid-cols-3">
        {leaders.map((entry) => (
          <article
            key={entry.id}
            className={cn(tileCardClass, "grid min-h-[164px] justify-items-start gap-2 rounded-[26px] shadow-surface")}
          >
            <span className="text-[0.84rem] font-extrabold uppercase tracking-[0.14em] text-app-muted">#{entry.rank}</span>
            <span className="font-display text-[1.18rem] tracking-[-0.02em] text-app-ink">{entry.name}</span>
            <span className="font-display text-[clamp(1.7rem,3vw,2.4rem)] tracking-[-0.03em] text-app-ink">
              {entry.points}
            </span>
            <span className="text-app-muted">points</span>
          </article>
        ))}
      </section>

      <section className={sectionPanelClass}>
        <StandingsList entries={leaderboard} />
      </section>
    </div>
  );
}
