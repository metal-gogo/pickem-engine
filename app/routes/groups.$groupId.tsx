import { useLoaderData, type LoaderFunctionArgs } from "react-router";

import { getGroupProfileData } from "../data/publicTournament.server";
import { GroupProfile } from "../../src/views/GroupProfile";

export async function loader({ context, params }: LoaderFunctionArgs) {
  const groupId = params["groupId"];

  if (!groupId) {
    throw new Response("Group was not found.", { status: 404 });
  }

  return getGroupProfileData(context.cloudflare.env, groupId);
}

export default function GroupRoute() {
  const data = useLoaderData<typeof loader>();

  return <GroupProfile group={data.group} />;
}
