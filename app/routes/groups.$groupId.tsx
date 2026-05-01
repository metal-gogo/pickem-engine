import { Navigate, useParams } from "react-router";

import { getGroupById } from "../../src/data/tournament";
import { GroupProfile } from "../../src/views/GroupProfile";

export default function GroupRoute() {
  const { groupId = "" } = useParams();
  const group = getGroupById(groupId);

  if (!group) {
    return <Navigate replace to="/" />;
  }

  return <GroupProfile group={group} />;
}
