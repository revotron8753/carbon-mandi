import type { Metadata } from "next";

import { PageHeader } from "@/components/custom/PageHeader";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team.",
};

export default function ContactPage() {
  return (
    <PageHeader
      title="Contact Us"
      description="A contact form (react-hook-form + zod) posting to /api/contact will render here."
    />
  );
}
