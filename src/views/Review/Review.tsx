import { Link } from "react-router";

import {
  dashboardGridClass,
  eyebrowClass,
  inlineSummaryClass,
  noticeClass,
  pageStackClass,
  panelHeaderClass,
  sectionCopyClass,
  sectionPanelClass,
  sectionTitleClass,
} from "../../app/ui";
import { formatSavedAt } from "../../app/format";
import { Badge } from "../../components/Badge";
import { getButtonClassName } from "../../components/Button";
import { MatchCard } from "../../components/MatchCard";
import { LockState, Match, UserPickSet } from "../../domain/models";
import { getPick, isPickComplete } from "../../domain/picks";

interface ReviewProps {
  matches: Match[];
  savedPickSet: UserPickSet;
  lockState: LockState;
  draftDirty: boolean;
}

export function Review({ matches, savedPickSet, lockState, draftDirty }: ReviewProps) {
  const savedMatches = matches.filter((match) => isPickComplete(getPick(savedPickSet, match.id)));
  const missingMatches = matches.filter((match) => !isPickComplete(getPick(savedPickSet, match.id)));

  return (
    <div className={pageStackClass}>
      <section className={sectionPanelClass}>
        <div className={panelHeaderClass}>
          <div>
            <div className={eyebrowClass}>Review and edit</div>
            <h1 className={sectionTitleClass}>Saved picks snapshot</h1>
            <p className={sectionCopyClass}>
              This screen is intentionally calm and scannable so a returning user can understand their state quickly.
            </p>
          </div>
          <div className={inlineSummaryClass}>
            <Badge
              label={lockState === "locked" ? "Locked" : "Editable before deadline"}
              tone={lockState === "locked" ? "locked" : "info"}
            />
            <span>{formatSavedAt(savedPickSet.updatedAt)}</span>
          </div>
        </div>
      </section>

      {draftDirty ? (
        <section className={noticeClass}>
          <div>
            <h2 className="mb-1.5 font-display text-[1.35rem] tracking-[-0.02em] text-app-ink">
              Unsaved draft changes are still open.
            </h2>
            <p className="m-0 leading-7 text-app-muted">
              Save from the picks screen if you want review and leaderboard to reflect them.
            </p>
          </div>
          <Link to="/picks" className={getButtonClassName({ tone: "secondary" })}>
            Return to picks
          </Link>
        </section>
      ) : null}

      <section className={dashboardGridClass}>
        <div className={sectionPanelClass}>
          <div className={panelHeaderClass}>
            <div>
              <div className={eyebrowClass}>Saved picks</div>
              <h2 className={sectionTitleClass}>{savedMatches.length} fixtures locked into your local snapshot</h2>
            </div>
          </div>

          {savedMatches.length > 0 ? (
            <div className="grid gap-3.5">
              {savedMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  pick={getPick(savedPickSet, match.id)}
                  lockState={lockState}
                  mode="summary"
                  actions={
                    lockState === "locked" ? null : (
                      <Link to={`/picks?match=${match.id}`} className={getButtonClassName({ tone: "ghost", size: "compact" })}>
                        Edit pick
                      </Link>
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <div className="grid justify-items-start gap-3.5 pb-1.5 pt-4">
              <h3 className="m-0 font-display text-[1.35rem] tracking-[-0.02em] text-app-ink">No saved picks yet.</h3>
              <p className="m-0 leading-7 text-app-muted">
                Make at least one exact-score pick to start validating the flow.
              </p>
              <Link to="/picks" className={getButtonClassName()}>
                Start picking
              </Link>
            </div>
          )}
        </div>

        <div className={sectionPanelClass}>
          <div className={panelHeaderClass}>
            <div>
              <div className={eyebrowClass}>Still open</div>
              <h2 className={sectionTitleClass}>{missingMatches.length} fixtures without a saved score</h2>
            </div>
          </div>

          <div className="grid gap-3">
            {missingMatches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col gap-3 rounded-[18px] bg-app-surface-soft p-[18px] lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="grid gap-1">
                  <span className="font-bold text-app-ink">
                    {match.homeTeam.code} vs {match.awayTeam.code}
                  </span>
                  <span className="text-sm text-app-muted">{match.venue}</span>
                </div>
                <Link to={`/picks?match=${match.id}`} className={getButtonClassName({ tone: "ghost", size: "compact" })}>
                  Add score
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
