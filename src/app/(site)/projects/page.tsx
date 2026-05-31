import type { Metadata } from "next";

import { PageHeader } from "@/components/custom/PageHeader";

export const metadata: Metadata = {
  title: "National Projects",
  description: "Our national green hydrogen projects.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="National Projects"
        description="Chris, qlub, Bilopellets, Venu and more. Project cards will render here from the CMS."
      />
    </>
  );
}
