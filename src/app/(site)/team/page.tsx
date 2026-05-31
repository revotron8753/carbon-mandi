import type { Metadata } from "next";

import { PageHeader } from "@/components/custom/PageHeader";

export const metadata: Metadata = {
  title: "Global Team",
  description: "Meet the global team behind the mission.",
};

export default function TeamPage() {
  return (
    <PageHeader
      title="Global Team"
      description="Team member cards, grouped by region, will render here from the CMS."
    />
  );
}
