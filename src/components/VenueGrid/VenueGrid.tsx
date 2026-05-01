import type { PublicMatch, TournamentVenue } from "../../data/tournament";

interface VenueGridProps {
  venues: TournamentVenue[];
  matches?: PublicMatch[];
}

function getVenueMatchCount(venue: TournamentVenue, matches: PublicMatch[] | undefined) {
  if (!matches) {
    return null;
  }

  return matches.filter((match) => match.venue.id === venue.id).length;
}

export function VenueGrid({ venues, matches }: VenueGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {venues.map((venue) => {
        const matchCount = getVenueMatchCount(venue, matches);

        return (
          <article
            key={venue.id}
            className="grid gap-2 rounded-none border-[3px] border-app-ink bg-app-surface-strong p-4 shadow-[0_8px_24px_-14px_rgba(56,56,52,0.24)]"
          >
            <div className="font-display text-[0.68rem] font-black uppercase tracking-[0.18em] text-app-rust">
              {venue.country}
            </div>
            <h3 className="m-0 font-display text-[1.25rem] font-black uppercase leading-none tracking-[-0.05em] text-app-ink">
              {venue.city}
            </h3>
            <p className="m-0 text-sm font-semibold leading-6 text-app-muted">{venue.stadium}</p>
            {matchCount !== null ? (
              <p className="m-0 font-display text-[0.72rem] font-black uppercase tracking-[0.18em] text-app-muted">
                {matchCount} {matchCount === 1 ? "match" : "matches"}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
