import { defineType, defineField, defineArrayMember } from "sanity";
import { Package } from "lucide-react";

/** The three sections of the Mandi page. */
export const PRODUCT_CATEGORIES = [
  "Biomass",
  "Final Product",
  "Partner Product",
] as const;

/** Icon shown on "Final Product" cards (mapped to a glyph on the site). */
export const PRODUCT_ICONS = [
  { title: "H₂ (Green Hydrogen)", value: "h2" },
  { title: "Flame (CBG)", value: "flame" },
  { title: "Leaf (Carbon Credits)", value: "leaf" },
] as const;

/**
 * Mandi products, split into three sections by `category`:
 * "Biomass", "Final Product" and "Partner Product".
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: Package,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Primary image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Which section of the Mandi page this product appears in.",
      options: {
        list: PRODUCT_CATEGORIES.map((c) => ({ title: c, value: c })),
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Only used for \"Final Product\" cards.",
      options: { list: PRODUCT_ICONS.map((i) => ({ ...i })) },
      hidden: ({ parent }) => parent?.category !== "Final Product",
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 2,
      description: "The text shown on the product card.",
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "blockContent",
    }),
    defineField({
      name: "indiaMartUrl",
      title: "IndiaMart listing URL",
      type: "url",
      description: "Link out to the live IndiaMart listing.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
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
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
