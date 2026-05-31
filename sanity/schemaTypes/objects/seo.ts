import { defineType, defineField } from "sanity";

/**
 * Per-document SEO / social metadata. Falls back to the document's own
 * title/excerpt when left empty (handled in the page's generateMetadata).
 */
export const seo = defineType({
  name: "seo",
  title: "SEO & Social",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      validation: (rule) => rule.max(60).warning("Keep under 60 characters."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning("Keep under 160 characters."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description: "Recommended 1200x630px.",
    }),
  ],
});
