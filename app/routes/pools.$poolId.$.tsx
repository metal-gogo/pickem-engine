import { useState } from "react";

import { PoolExperience } from "../../src/app/App/App";

export default function PoolRoute() {
  const [previewLocked, setPreviewLocked] = useState(false);

  return <PoolExperience previewLocked={previewLocked} onPreviewLockedChange={setPreviewLocked} />;
}
