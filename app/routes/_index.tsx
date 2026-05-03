import { useLoaderData, type LoaderFunctionArgs } from "react-router";

import { getTournamentOverviewData } from "../data/publicTournament.server";
import { TournamentOverview } from "../../src/views/TournamentOverview";

export async function loader({ context }: LoaderFunctionArgs) {
  return getTournamentOverviewData(context.cloudflare.env);
}

export default function TournamentRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <TournamentOverview
      groups={data.groups}
      matches={data.matches}
      tournamentInfo={data.tournamentInfo}
      venues={data.venues}
    />
  );
}
