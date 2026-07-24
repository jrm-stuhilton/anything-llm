import { useEffect, useState } from "react";
import Workspace from "@/models/workspace";

/**
 * CHIMAERA Insight: this deployment is locked to a single workspace so every
 * user works against the one curated document repository. Workspace creation
 * is only possible while no workspace exists yet (first-boot/onboarding) —
 * the server enforces the same rule in Workspace.new.
 * @returns {boolean} true when workspace creation should be hidden/blocked.
 */
export default function useWorkspaceCreationLocked() {
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    Workspace.all()
      .then((workspaces) => setLocked(workspaces.length > 0))
      .catch(() => setLocked(true));
  }, []);

  return locked;
}
