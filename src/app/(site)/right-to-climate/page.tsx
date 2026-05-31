import type { Metadata } from "next";

import { PageHeader } from "@/components/custom/PageHeader";

export const metadata: Metadata = {
  title: "Right to Climate",
  description: "Our CSR initiative for climate action.",
};

export default function RightToClimatePage() {
  return (
    <PageHeader
      title="Right to Climate"
      description="CSR initiative content (intro, initiatives, body) will render here from the CMS."
    />
  );
}
