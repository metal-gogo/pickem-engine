import { Link } from "react-router";

import {
  dashboardGridClass,
  eyebrowClass,
  heroTitleClass,
  metricValueSmallClass,
  sectionCopyClass,
  sectionPanelClass,
  sectionTitleClass,
  tileCardClass,
} from "../../app/ui";
import { CalendarDownloadLink } from "../../components/CalendarDownloadLink";
import { MatchScheduleList } from "../../components/MatchScheduleList";
import { PublicPageShell } from "../../components/PublicPageShell";
import { TeamFlag } from "../../components/TeamFlag";
import { VenueGrid } from "../../components/VenueGrid";
import { getButtonClassName } from "../../components/Button";
import {
  formatAppearanceCount,
  formatYears,
  getCalendarEventsForMatches,
  getMatchesForTeam,
  getTeamGroup,
  getVenuesForMatches,
  type PublicGroup,
  type PublicMatch,
  type PublicTeam,
  type TournamentVenue,
} from "../../data/tournament";
import { createCalendarDataUri } from "../../domain/calendar";

interface TeamProfileProps {
  team: PublicTeam;
  group?: PublicGroup | null;
  matches?: PublicMatch[];
  venues?: TournamentVenue[];
}

function formatLastAppearance(team: PublicTeam) {
  return team.lastQualifiedYear ? String(team.lastQualifiedYear) : "Tournament debut";
}

function formatBestFinish(team: PublicTeam) {
  if (!team.bestFinish) {
    return "Tournament debut";
  }

  return `${team.bestFinish} (${formatYears(team.bestFinishYears)})`;
}

export function TeamProfile({
  team,
  group: providedGroup,
  matches: providedMatches,
  venues: providedVenues,
}: TeamProfileProps) {
  const group = providedGroup === undefined ? getTeamGroup(team.id) : providedGroup;
  const matches = providedMatches ?? getMatchesForTeam(team.id);
  const venues = providedVenues ?? getVenuesForMatches(matches);
  const calendarHref = createCalendarDataUri(getCalendarEventsForMatches(matches), {
    calendarName: `World Cup 2026 - ${team.name}`,
  });
  const groupMates = group?.teams.filter((groupTeam) => groupTeam.id !== team.id) ?? [];

  return (
    <PublicPageShell>
      <section className="grid gap-6 py-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-8">
        <div className="grid gap-5">
          <span className={eyebrowClass}>Team guide · Group {team.groupId}</span>
          <div className="flex flex-wrap items-end gap-4">
            <TeamFlag
              fallbackFlag={team.flag}
              shape="rectangle"
              size="lg"
              teamId={team.id}
              teamName={team.name}
              className="h-16 w-24 border-[3px] border-app-ink"
            />
            <h1 className={heroTitleClass}>{team.name}</h1>
          </div>
          <p className={sectionCopyClass}>
            World Cup record, manager, FIFA ranking, group opponents, venues, and a team calendar.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CalendarDownloadLink
              fileName={`world-cup-2026-${team.id}.ics`}
              href={calendarHref}
              label="Download team calendar"
            />
            {group ? (
              <Link
                className={getButtonClassName({ tone: "secondary" })}
                to={`/groups/${group.id}`}
              >
                Open group
              </Link>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className={tileCardClass}>
            <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
              FIFA ranking
            </span>
            <span className={metricValueSmallClass}>#{team.fifaRanking}</span>
          </div>
          <div className={tileCardClass}>
            <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
              Manager
            </span>
            <span className={metricValueSmallClass}>{team.managerName ?? "TBD"}</span>
          </div>
          <div className={tileCardClass}>
            <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
              Appearances
            </span>
            <span className={metricValueSmallClass}>{team.totalQualifications}</span>
          </div>
          <div className={tileCardClass}>
            <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
              Last played
            </span>
            <span className={metricValueSmallClass}>{formatLastAppearance(team)}</span>
          </div>
        </div>
      </section>

      <section className={dashboardGridClass}>
        <div className={sectionPanelClass}>
          <div className="mb-5 grid gap-2">
            <h2 className={sectionTitleClass}>Profile</h2>
            <p className={sectionCopyClass}>
              The team profile keeps identity, qualification history, and tournament context in one
              compact page.
            </p>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {[
              ["Confederation", team.confederation],
              ["Continent", team.continent],
              ["World Cup history", formatAppearanceCount(team)],
              ["Best finish", formatBestFinish(team)],
              ["Consecutive appearances", String(team.currentConsecutiveAppearances)],
              ["Qualified on", team.qualificationDate],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-none border-[3px] border-app-ink bg-app-surface p-4"
              >
                <dt className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
                  {label}
                </dt>
                <dd className="m-0 mt-2 font-semibold leading-6 text-app-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={sectionPanelClass}>
          <div className="mb-5 grid gap-2">
            <h2 className={sectionTitleClass}>Group {team.groupId}</h2>
            <p className={sectionCopyClass}>Opponents in the opening phase.</p>
          </div>
          <div className="grid gap-3">
            {groupMates.map((opponent) => (
              <Link
                key={opponent.id}
                className="flex items-center justify-between gap-3 rounded-none border-[3px] border-app-ink bg-app-surface p-3 hover:bg-app-panel"
                to={`/teams/${opponent.id}`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <TeamFlag
                    fallbackFlag={opponent.flag}
                    shape="pill"
                    size="md"
                    teamId={opponent.id}
                    teamName={opponent.name}
                  />
                  <span className="truncate font-display text-[1rem] font-black uppercase tracking-[-0.03em] text-app-ink">
                    {opponent.name}
                  </span>
                </span>
                <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
                  #{opponent.fifaRanking}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionPanelClass}>
        <div className="mb-5 grid gap-2">
          <h2 className={sectionTitleClass}>Schedule</h2>
          <p className={sectionCopyClass}>
            The team calendar includes known group-stage matches. Knockout dates become
            team-specific only after advancement is known.
          </p>
        </div>
        <MatchScheduleList matches={matches} />
      </section>

      <section className={sectionPanelClass}>
        <div className="mb-5 grid gap-2">
          <h2 className={sectionTitleClass}>Venues</h2>
          <p className={sectionCopyClass}>
            {team.name} group matches are scheduled across these venues.
          </p>
        </div>
        <VenueGrid venues={venues} matches={matches} />
      </section>
    </PublicPageShell>
  );
}
