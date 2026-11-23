import type { Metadata } from "next";
import { ManageClient } from "./manager-client";

export const metadata: Metadata = {
  title: "Synkrew — Manage Profiles",
  description:
    "Team Directory — rename, add or delete team members for the Credential Delivery Portal. Powered by Synkrew.",
};

export default function ManagePage() {
  return <ManageClient />;
}
