import { useLoaderData, type LoaderFunctionArgs } from "react-router";

import { getTeamProfileData } from "../data/publicTournament.server";
import { TeamProfile } from "../../src/views/TeamProfile";

export async function loader({ context, params }: LoaderFunctionArgs) {
  const teamId = params["teamId"];

  if (!teamId) {
    throw new Response("Team was not found.", { status: 404 });
  }

  return getTeamProfileData(context.cloudflare.env, teamId);
}

export default function TeamRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <TeamProfile group={data.group} matches={data.matches} team={data.team} venues={data.venues} />
  );
}
