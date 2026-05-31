import { PageHeader } from "@/components/custom/PageHeader";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <PageHeader
      title={`Project: ${slug}`}
      description="Single project detail. Content will be fetched from the CMS by slug."
    />
  );
}
