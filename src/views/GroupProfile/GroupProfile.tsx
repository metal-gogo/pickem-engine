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
import { GroupTable } from "../../components/GroupTable";
import { MatchScheduleList } from "../../components/MatchScheduleList";
import { PublicPageShell } from "../../components/PublicPageShell";
import { TeamFlag } from "../../components/TeamFlag";
import { VenueGrid } from "../../components/VenueGrid";
import { getButtonClassName } from "../../components/Button";
import {
  formatYears,
  getCalendarEventsForMatches,
  type PublicGroup,
  type PublicTeam,
} from "../../data/tournament";
import { createCalendarDataUri } from "../../domain/calendar";

interface GroupProfileProps {
  group: PublicGroup;
}

function formatTeamBestFinish(team: PublicTeam) {
  if (!team.bestFinish) {
    return "Tournament debut";
  }

  return `${team.bestFinish} · ${formatYears(team.bestFinishYears)}`;
}

export function GroupProfile({ group }: GroupProfileProps) {
  const calendarHref = createCalendarDataUri(getCalendarEventsForMatches(group.matches), {
    calendarName: `World Cup 2026 - ${group.label}`,
  });

  return (
    <PublicPageShell>
      <section className="grid gap-6 py-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-8">
        <div className="grid gap-5">
          <span className={eyebrowClass}>Group guide</span>
          <h1 className={heroTitleClass}>{group.label}</h1>
          <p className={sectionCopyClass}>
            Teams, fixtures, venues, ranking context, and loaded World Cup finals head-to-head
            history.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CalendarDownloadLink
              fileName={`world-cup-2026-group-${group.id.toLowerCase()}.ics`}
              href={calendarHref}
              label="Download group calendar"
            />
            <Link className={getButtonClassName({ tone: "secondary" })} to="/">
              Tournament guide
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className={tileCardClass}>
            <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
              Teams
            </span>
            <span className={metricValueSmallClass}>{group.teams.length}</span>
          </div>
          <div className={tileCardClass}>
            <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
              Matches
            </span>
            <span className={metricValueSmallClass}>{group.matches.length}</span>
          </div>
          <div className={tileCardClass}>
            <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
              Venues
            </span>
            <span className={metricValueSmallClass}>{group.venues.length}</span>
          </div>
          <div className={tileCardClass}>
            <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
              Prior meetings
            </span>
            <span className={metricValueSmallClass}>{group.headToHeads.length}</span>
          </div>
        </div>
      </section>

      <section className={dashboardGridClass}>
        <div className={sectionPanelClass}>
          <div className="mb-5 grid gap-2">
            <h2 className={sectionTitleClass}>Table</h2>
            <p className={sectionCopyClass}>
              The pre-tournament table starts level. Official results will decide the top two and
              the third-place ranking.
            </p>
          </div>
          <div className="overflow-hidden rounded-none border-[4px] border-app-ink bg-app-surface shadow-surface">
            <GroupTable label={group.label} rows={group.rows} highlightQualifiedRows={false} />
          </div>
        </div>

        <div className={sectionPanelClass}>
          <div className="mb-5 grid gap-2">
            <h2 className={sectionTitleClass}>Teams</h2>
            <p className={sectionCopyClass}>Ranking, manager, and World Cup history at a glance.</p>
          </div>
          <div className="grid gap-3">
            {group.teams.map((team) => (
              <Link
                key={team.id}
                className="grid gap-3 rounded-none border-[3px] border-app-ink bg-app-surface p-4 hover:bg-app-panel"
                to={`/teams/${team.id}`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <TeamFlag
                    fallbackFlag={team.flag}
                    shape="pill"
                    size="md"
                    teamId={team.id}
                    teamName={team.name}
                  />
                  <div className="min-w-0">
                    <h3 className="m-0 truncate font-display text-[1.05rem] font-black uppercase tracking-[-0.03em] text-app-ink">
                      {team.name}
                    </h3>
                    <p className="m-0 text-sm font-semibold text-app-muted">
                      #{team.fifaRanking} · {team.managerName ?? "Manager TBD"}
                    </p>
                  </div>
                </div>
                <p className="m-0 text-sm font-semibold leading-6 text-app-muted">
                  {formatTeamBestFinish(team)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionPanelClass}>
        <div className="mb-5 grid gap-2">
          <h2 className={sectionTitleClass}>Fixtures</h2>
          <p className={sectionCopyClass}>All six group fixtures with venue context.</p>
        </div>
        <MatchScheduleList matches={group.matches} />
      </section>

      <section className={sectionPanelClass}>
        <div className="mb-5 grid gap-2">
          <h2 className={sectionTitleClass}>World Cup head-to-head</h2>
          <p className={sectionCopyClass}>
            Prior finals meetings for pairings in this group, loaded as seed history for the public
            guide.
          </p>
        </div>
        {group.headToHeads.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {group.headToHeads.map((headToHead) => (
              <article
                key={headToHead.id}
                className="grid gap-3 rounded-none border-[3px] border-app-ink bg-app-surface p-4"
              >
                <h3 className="m-0 font-display text-[1.05rem] font-black uppercase tracking-[-0.03em] text-app-ink">
                  {headToHead.teams[0].name} vs {headToHead.teams[1].name}
                </h3>
                <ul className="m-0 grid gap-2 ps-5 text-sm font-semibold leading-6 text-app-muted">
                  {headToHead.meetings.map((meeting) => (
                    <li key={`${headToHead.id}-${meeting.year}-${meeting.result}`}>
                      {meeting.year} · {meeting.stage} · {meeting.result}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <p className="m-0 rounded-none border-[3px] border-app-ink bg-app-surface p-4 font-semibold leading-7 text-app-muted">
            No previous World Cup finals meetings are listed for these pairings.
          </p>
        )}
      </section>

      <section className={sectionPanelClass}>
        <div className="mb-5 grid gap-2">
          <h2 className={sectionTitleClass}>Venues</h2>
          <p className={sectionCopyClass}>Host venues assigned to {group.label} fixtures.</p>
        </div>
        <VenueGrid venues={group.venues} matches={group.matches} />
      </section>
    </PublicPageShell>
  );
}
