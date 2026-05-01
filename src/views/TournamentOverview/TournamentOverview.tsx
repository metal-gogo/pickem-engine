import { Link } from "react-router";

import {
  dashboardGridClass,
  eyebrowClass,
  heroTitleClass,
  metricValueClass,
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
  getCalendarEventsForMatches,
  publicGroups,
  publicMatches,
  publicVenues,
  tournamentInfo,
  tournamentRuleSections,
  tournamentSources,
} from "../../data/tournament";
import { createCalendarDataUri } from "../../domain/calendar";

const tournamentCalendarHref = createCalendarDataUri(getCalendarEventsForMatches(publicMatches), {
  calendarName: "World Cup 2026 full tournament",
});

const metricTiles = [
  { label: "Teams", value: tournamentInfo.teamCount },
  { label: "Groups", value: tournamentInfo.groupCount },
  { label: "Matches", value: tournamentInfo.matchCount },
  { label: "Venues", value: tournamentInfo.venueCount },
];

export function TournamentOverview() {
  const openingMatches = publicMatches.slice(0, 8);

  return (
    <PublicPageShell>
      <section className="grid gap-6 py-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-8">
        <div className="grid gap-5">
          <span className={eyebrowClass}>Public tournament guide</span>
          <h1 className={heroTitleClass}>{tournamentInfo.name}</h1>
          <p className={sectionCopyClass}>
            Groups, rules, venues, and calendar files for following the whole tournament without
            signing in.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CalendarDownloadLink
              fileName="world-cup-2026.ics"
              href={tournamentCalendarHref}
              label="Download calendar"
            />
            <Link className={getButtonClassName({ tone: "secondary" })} to="/pools">
              Open pools
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {metricTiles.map((tile) => (
            <div key={tile.label} className={tileCardClass}>
              <span className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-muted">
                {tile.label}
              </span>
              <span className={metricValueClass}>{tile.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={dashboardGridClass}>
        <div className={sectionPanelClass}>
          <div className="mb-5 grid gap-2">
            <h2 className={sectionTitleClass}>How it works</h2>
            <p className={sectionCopyClass}>
              The public rules guide is about the real tournament format, not pool-specific scoring
              settings.
            </p>
          </div>
          <div className="grid gap-3">
            {tournamentRuleSections.map((section) => (
              <article
                key={section.id}
                className="grid gap-3 rounded-none border-[3px] border-app-ink bg-app-surface p-4"
              >
                <div>
                  <h3 className="m-0 font-display text-[1.2rem] font-black uppercase tracking-[-0.04em] text-app-ink">
                    {section.title}
                  </h3>
                  <p className="m-0 mt-1 font-medium leading-7 text-app-muted">{section.summary}</p>
                </div>
                <ul className="m-0 grid gap-2 ps-5 text-sm font-semibold leading-6 text-app-ink">
                  {section.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
                <a
                  className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-rust hover:text-app-ink"
                  href={section.sourceHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  {section.sourceLabel}
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className={sectionPanelClass}>
          <div className="mb-5 grid gap-2">
            <h2 className={sectionTitleClass}>Opening run</h2>
            <p className={sectionCopyClass}>
              The first match kicks off in Mexico City on 11 June 2026.
            </p>
          </div>
          <MatchScheduleList matches={openingMatches} />
        </div>
      </section>

      <section id="groups" className="grid gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="grid gap-2">
            <h2 className={sectionTitleClass}>Groups</h2>
            <p className={sectionCopyClass}>
              Each group starts level. Tables become live once official results are attached.
            </p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {publicGroups.map((group) => (
            <article
              key={group.id}
              className="overflow-hidden rounded-none border-[4px] border-app-ink bg-app-surface shadow-surface"
            >
              <header className="grid gap-4 bg-app-ink-fill px-3 py-4 text-app-on-ink-fill sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="grid gap-2">
                  <h3 className="m-0 font-display text-[1.55rem] font-black uppercase leading-none tracking-[-0.05em]">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.teams.map((team) => (
                      <Link
                        key={team.id}
                        className="inline-flex items-center gap-2 rounded-none border-2 border-app-lime bg-app-surface-strong px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-app-ink"
                        to={`/teams/${team.id}`}
                      >
                        <TeamFlag
                          fallbackFlag={team.flag}
                          shape="pill"
                          size="sm"
                          teamId={team.id}
                          teamName={team.name}
                        />
                        {team.code}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  className={getButtonClassName({ tone: "secondary", size: "compact" })}
                  to={`/groups/${group.id}`}
                >
                  Open group
                </Link>
              </header>
              <GroupTable label={group.label} rows={group.rows} highlightQualifiedRows={false} />
            </article>
          ))}
        </div>
      </section>

      <section className={sectionPanelClass}>
        <div className="mb-5 grid gap-2">
          <h2 className={sectionTitleClass}>Venues</h2>
          <p className={sectionCopyClass}>
            The tournament is spread across Canada, Mexico, and the USA, with 16 host-city venues.
          </p>
        </div>
        <VenueGrid venues={publicVenues} matches={publicMatches} />
      </section>

      <section className={sectionPanelClass}>
        <div className="mb-4 grid gap-2">
          <h2 className={sectionTitleClass}>Sources</h2>
          <p className={sectionCopyClass}>
            Tournament rules, schedule, ranking, team, venue, and manager fields should remain
            source-backed when this seed layer moves into the database.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tournamentSources.map((source) => (
            <a
              key={source.href}
              className="rounded-none border-[3px] border-app-ink bg-app-panel px-3 py-2 font-display text-[0.68rem] font-black uppercase tracking-[0.16em] text-app-ink hover:bg-app-surface-strong"
              href={source.href}
              rel="noreferrer"
              target="_blank"
            >
              {source.label}
            </a>
          ))}
        </div>
      </section>
    </PublicPageShell>
  );
}
