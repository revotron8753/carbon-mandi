import type { Metadata } from "next";

import { PageHeader } from "@/components/custom/PageHeader";

export const metadata: Metadata = {
  title: "Mandi — India Mart",
  description: "Our products showcase, with links to IndiaMart listings.",
};

export default function MandiPage() {
  return (
    <PageHeader
      title="Mandi — India Mart"
      description="Product showcase cards (with 'Enquire on IndiaMart' links) will render here from the CMS."
    />
  );
}
