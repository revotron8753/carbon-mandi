import { defineType, defineField, defineArrayMember } from "sanity";
import { Leaf } from "lucide-react";

/**
 * Singleton: "Right to Climate" CSR initiative page.
 */
export const csrPage = defineType({
  name: "csrPage",
  title: "Right to Climate (CSR)",
  type: "document",
  icon: Leaf,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Right to Climate",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "initiatives",
      title: "Initiatives",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 3 }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "title", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO & Social",
      type: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Right to Climate (CSR)" }),
  },
});
