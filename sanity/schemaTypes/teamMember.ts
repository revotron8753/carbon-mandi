import { defineType, defineField } from "sanity";
import { User } from "lucide-react";

/** The groups (sections) shown on the Team page, in display order. */
export const TEAM_GROUPS = [
  "Global Climate Experts",
  "Carbon Mandi Executive Team",
] as const;

/** Country options. The value is an ISO code; the site maps it to a flag. */
export const TEAM_COUNTRIES = [
  { title: "🇮🇳  India", value: "IN" },
  { title: "🇩🇪  Germany", value: "DE" },
  { title: "🇿🇦  South Africa", value: "ZA" },
  { title: "🇬🇧  United Kingdom", value: "GB" },
  { title: "🇺🇸  United States", value: "US" },
  { title: "🇫🇷  France", value: "FR" },
  { title: "🇳🇱  Netherlands", value: "NL" },
  { title: "🇦🇪  United Arab Emirates", value: "AE" },
  { title: "🇸🇬  Singapore", value: "SG" },
  { title: "🇦🇺  Australia", value: "AU" },
] as const;

/**
 * Team members shown on the /team page, split into two groups:
 * "Global Climate Experts" and "Ground Expert Team".
 */
export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: User,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "e.g. \"Co-Founder, Ubuntu Hemp\" or \"Co-Founder & COO, Carbon Mandi\".",
    }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      description: "Which section of the Team page this member appears in.",
      options: {
        list: TEAM_GROUPS.map((g) => ({ title: g, value: g })),
        layout: "radio",
      },
      initialValue: "Global Climate Experts",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      description: "Drives the small flag shown on the card.",
      options: { list: TEAM_COUNTRIES.map((c) => ({ ...c })) },
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      description: "Optional — drives the LinkedIn chip on the card.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first within the group.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Group, then display order",
      name: "groupOrderAsc",
      by: [
        { field: "group", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", role: "role", group: "group", media: "photo" },
    prepare({ title, role, group, media }) {
      return {
        title,
        subtitle: [role, group].filter(Boolean).join("  ·  "),
        media,
      };
    },
  },
});
