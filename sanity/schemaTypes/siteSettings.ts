import { defineType, defineField, defineArrayMember } from "sanity";
import { Cog } from "lucide-react";

/**
 * Singleton: global site configuration (logo, contact details, socials).
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Cog,
  fields: [
    defineField({
      name: "title",
      title: "Company name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "e.g. India's first hemp & napier based green hydrogen.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Default description",
      type: "text",
      rows: 3,
      description: "Used as the fallback meta description site-wide.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: {
                list: [
                  "LinkedIn",
                  "X (Twitter)",
                  "Instagram",
                  "YouTube",
                  "Facebook",
                ],
              },
            }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
