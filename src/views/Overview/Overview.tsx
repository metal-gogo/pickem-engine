import { Link } from "react-router";

import {
  dashboardGridClass,
  eyebrowClass,
  heroTitleClass,
  linkAccentClass,
  metricValueClass,
  metricValueSmallClass,
  noticeClass,
  pageStackClass,
  panelHeaderClass,
  sectionCopyClass,
  sectionPanelClass,
  sectionTitleClass,
  tileCardClass,
} from "../../app/ui";
import { Badge } from "../../components/Badge";
import { getButtonClassName } from "../../components/Button";
import { MatchCard } from "../../components/MatchCard";
import { StandingsList } from "../../components/StandingsList";
import { LeaderboardEntry, LockState, Match, PoolSummary, UserPickSet } from "../../domain/models";
import { getPick } from "../../domain/picks";

interface OverviewProps {
  pool: PoolSummary;
  matches: Match[];
  savedPickSet: UserPickSet;
  lockState: LockState;
  deadlineLabel: string;
  savedPickCount: number;
  draftDirty: boolean;
  leaderboard: LeaderboardEntry[];
}

export function Overview({
  pool,
  matches,
  savedPickSet,
  lockState,
  deadlineLabel,
  savedPickCount,
  draftDirty,
  leaderboard,
}: OverviewProps) {
  const progressPercent = Math.round((savedPickCount / matches.length) * 100);
  const upcomingMatches = matches.slice(0, 3);

  return (
    <div className={pageStackClass}>
      <section className="grid gap-7 rounded-[26px] border border-app-line bg-app-surface p-6 shadow-surface backdrop-blur-[16px] lg:grid-cols-[1.35fr_0.95fr] lg:p-8">
        <div className="grid content-start gap-4">
          <div className={eyebrowClass}>2026 FIFA World Cup discovery build</div>
          <h1 className={heroTitleClass}>
            Quiet structure at rest, tactile confidence when it is time to pick.
          </h1>
          <p className={sectionCopyClass}>
            This first slice is deliberately local-first: exact-score entry, editable picks before
            the prototype lock, and standings mocked just enough to validate hierarchy and
            competitive energy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/picks" className={getButtonClassName()}>
              Continue picks
            </Link>
            <Link to="/review" className={getButtonClassName({ tone: "ghost" })}>
              Review saved picks
            </Link>
          </div>
        </div>

        <div className="grid gap-3.5">
          <div className={tileCardClass}>
            <span className="font-bold text-app-ink">Progress</span>
            <span className={metricValueClass}>
              {savedPickCount}/{matches.length}
            </span>
            <div className="relative h-3 overflow-hidden rounded-full bg-app-cobalt-soft">
              <span
                className="block h-full rounded-full bg-[linear-gradient(90deg,#7eb3ff_0%,#2563ff_55%,#0d42d6_100%)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="leading-7 text-app-muted">
              {progressPercent}% of fixtures saved locally
            </span>
          </div>

          <div className={tileCardClass}>
            <span className="font-bold text-app-ink">Global deadline</span>
            <span className={metricValueSmallClass}>{deadlineLabel}</span>
            <Badge
              label={
                lockState === "locked"
                  ? "Locked"
                  : lockState === "locking-soon"
                    ? "Locking soon"
                    : "Editable"
              }
              tone={
                lockState === "locked"
                  ? "locked"
                  : lockState === "locking-soon"
                    ? "warning"
                    : "info"
              }
            />
          </div>

          <div className={tileCardClass}>
            <span className="font-bold text-app-ink">Pool snapshot</span>
            <span className={metricValueSmallClass}>{pool.participantCount} players active</span>
            <span className="leading-7 text-app-muted">{pool.name}</span>
          </div>
        </div>
      </section>

      {draftDirty ? (
        <section className={noticeClass}>
          <div>
            <h2 className="mb-1.5 font-display text-[1.35rem] tracking-[-0.02em] text-app-ink">
              You have unsaved pick changes.
            </h2>
            <p className="m-0 leading-7 text-app-muted">
              Review uses the last saved local snapshot, not your current draft.
            </p>
          </div>
          <Link to="/picks" className={getButtonClassName({ tone: "secondary" })}>
            Go to picks
          </Link>
        </section>
      ) : null}

      <section className={dashboardGridClass}>
        <div className={sectionPanelClass}>
          <div className={panelHeaderClass}>
            <div>
              <div className={eyebrowClass}>Next up</div>
              <h2 className={sectionTitleClass}>Upcoming fixtures</h2>
            </div>
            <Link to="/picks" className={linkAccentClass}>
              Make picks
            </Link>
          </div>

          <div className="grid gap-3.5">
            {upcomingMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                pick={getPick(savedPickSet, match.id)}
                lockState={lockState}
                mode="summary"
              />
            ))}
          </div>
        </div>

        <div className={sectionPanelClass}>
          <div className={panelHeaderClass}>
            <div>
              <div className={eyebrowClass}>Standings preview</div>
              <h2 className={sectionTitleClass}>Competitive shape</h2>
            </div>
            <Link to="/leaderboard" className={linkAccentClass}>
              View all
            </Link>
          </div>

          <StandingsList entries={leaderboard.slice(0, 4)} />
        </div>
      </section>
    </div>
  );
}
