import { defineType, defineField } from "sanity";
import { Handshake } from "lucide-react";

/**
 * Partner logos shown in the "Global Ecosystem" grid on the /team page.
 */
export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: Handshake,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Transparent PNG or SVG, roughly landscape (~3:1).",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
      description: "Optional — makes the logo link to the partner's site.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
