import { Navigate, useParams } from "react-router";

import { getTeamById } from "../../src/data/tournament";
import { TeamProfile } from "../../src/views/TeamProfile";

export default function TeamRoute() {
  const { teamId = "" } = useParams();
  const team = getTeamById(teamId.toLowerCase());

  if (!team) {
    return <Navigate replace to="/" />;
  }

  return <TeamProfile team={team} />;
}
