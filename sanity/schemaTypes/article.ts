import { defineType, defineField } from "sanity";
import { Newspaper } from "lucide-react";

/**
 * Articles / blog posts.
 */
export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        'The URL path (e.g. "my-first-post"). Lowercase letters, numbers and hyphens only — no spaces or capitals. Click "Generate" to build it from the title.',
      options: {
        source: "title",
        maxLength: 96,
        // Always produce a URL-safe slug, even from titles with spaces/caps.
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 96),
      },
      // Block publishing a manually-typed bad slug (spaces, capitals, etc.) —
      // those break the /blogs/blog/<slug> URL.
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = (value as { current?: string } | undefined)?.current;
          if (!current) return "Slug is required";
          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current)
            ? true
            : "Use lowercase letters, numbers and single hyphens only — no spaces or capitals.";
        }),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown in article listings.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "seo",
      title: "SEO & Social",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Published date, newest",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "author", media: "coverImage" },
  },
});
