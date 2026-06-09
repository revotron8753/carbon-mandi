import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";

import { apiVersion, dataset, projectId } from "../../../../sanity/env";

/**
 * Programmatic blog ingestion.
 *
 *   POST /api/articles
 *   Authorization: Bearer <BLOG_INGEST_SECRET>
 *   Content-Type: application/json
 *
 * Creates a PUBLISHED `article` document in Sanity from a JSON payload. Designed
 * for an automated pipeline — it's idempotent per slug (re-posting the same slug
 * returns 409 unless `overwrite: true`). See the guide in the PR / docs.
 */

// Writes require a token with Editor/write permissions (NOT the read token).
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

type Payload = {
  title?: string;
  slug?: string;
  excerpt?: string;
  author?: string;
  categories?: string[];
  publishedAt?: string;
  /** Body as Markdown (converted to Portable Text). */
  markdown?: string;
  /** Body as ready-made Portable Text — takes precedence over `markdown`. */
  body?: PortableTextBlock[];
  /** Public image URL — fetched and uploaded to Sanity as the cover. */
  coverImageUrl?: string;
  seo?: { title?: string; description?: string };
  /** Replace an existing article with the same slug instead of 409-ing. */
  overwrite?: boolean;
};

export async function POST(request: Request) {
  // ── Auth ────────────────────────────────────────────────────────────────
  const secret = process.env.BLOG_INGEST_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Server not configured: BLOG_INGEST_SECRET is missing." },
      { status: 500 }
    );
  }
  const auth = request.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Server not configured: SANITY_API_WRITE_TOKEN is missing." },
      { status: 500 }
    );
  }

  // ── Parse + validate ──────────────────────────────────────────────────────
  const data = (await request.json().catch(() => null)) as Payload | null;
  if (!data || typeof data.title !== "string" || !data.title.trim()) {
    return NextResponse.json(
      { error: "`title` is required." },
      { status: 400 }
    );
  }

  const slug = slugify(data.slug || data.title);
  if (!slug) {
    return NextResponse.json(
      { error: "Could not derive a valid slug — provide a `slug`." },
      { status: 400 }
    );
  }

  if (data.body && !Array.isArray(data.body)) {
    return NextResponse.json(
      { error: "`body` must be a Portable Text array." },
      { status: 400 }
    );
  }

  try {
    // ── Duplicate check ─────────────────────────────────────────────────────
    const existingId = await writeClient.fetch<string | null>(
      `*[_type == "article" && slug.current == $slug][0]._id`,
      { slug }
    );
    if (existingId && !data.overwrite) {
      return NextResponse.json(
        {
          error: `An article with slug "${slug}" already exists. Pass "overwrite": true to replace it.`,
          id: existingId,
        },
        { status: 409 }
      );
    }

    // ── Cover image (optional) ───────────────────────────────────────────────
    let coverImage: Record<string, unknown> | undefined;
    if (data.coverImageUrl) {
      coverImage = await uploadImage(data.coverImageUrl);
    }

    // ── Body ─────────────────────────────────────────────────────────────────
    const body = data.body ?? (data.markdown ? markdownToBlocks(data.markdown) : []);

    // ── Build + write the document ───────────────────────────────────────────
    const doc = {
      _type: "article" as const,
      title: data.title.trim(),
      slug: { _type: "slug", current: slug },
      ...(data.excerpt ? { excerpt: data.excerpt } : {}),
      ...(data.author ? { author: data.author } : {}),
      ...(data.categories?.length ? { categories: data.categories } : {}),
      publishedAt: data.publishedAt || new Date().toISOString(),
      ...(body.length ? { body } : {}),
      ...(coverImage ? { coverImage } : {}),
      ...(data.seo ? { seo: { _type: "seo", ...data.seo } } : {}),
    };

    const result =
      existingId && data.overwrite
        ? await writeClient.createOrReplace({ _id: existingId, ...doc })
        : await writeClient.create(doc);

    return NextResponse.json(
      {
        ok: true,
        id: result._id,
        slug,
        url: `/blogs/blog/${slug}`,
        replaced: Boolean(existingId && data.overwrite),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[articles] ingestion failed:", err);
    return NextResponse.json(
      { error: "Failed to create article.", detail: (err as Error).message },
      { status: 500 }
    );
  }
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */

/** URL-safe slug: lowercase, hyphens, no spaces/capitals (matches the schema). */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

let keySeq = 0;
const key = () => `${Date.now().toString(36)}${(keySeq++).toString(36)}`;

/** Fetch a remote image and upload it as a Sanity image asset reference. */
async function uploadImage(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not fetch coverImageUrl (${res.status})`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = url.split("/").pop()?.split("?")[0] || "cover";
  const asset = await writeClient.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

/**
 * Minimal Markdown → Portable Text. Supports headings (##, ###, ####),
 * blockquotes (>), bullet (- / *) and numbered (1.) lists, and paragraphs.
 * For rich inline formatting (bold, links, images), send `body` as Portable
 * Text directly instead of `markdown`.
 */
function markdownToBlocks(md: string): PortableTextBlock[] {
  const chunks = md.replace(/\r\n/g, "\n").split(/\n{2,}/);
  const blocks: PortableTextBlock[] = [];

  const textBlock = (
    text: string,
    style: string,
    list?: { listItem: "bullet" | "number" }
  ) =>
    ({
      _type: "block",
      _key: key(),
      style,
      markDefs: [],
      children: [{ _type: "span", _key: key(), text, marks: [] }],
      ...(list ? { listItem: list.listItem, level: 1 } : {}),
    }) as unknown as PortableTextBlock;

  for (const raw of chunks) {
    const chunk = raw.trim();
    if (!chunk) continue;

    const lines = chunk.split("\n");
    const isBullet = lines.every((l) => /^\s*[-*]\s+/.test(l));
    const isNumber = lines.every((l) => /^\s*\d+\.\s+/.test(l));

    if (isBullet) {
      for (const l of lines)
        blocks.push(
          textBlock(l.replace(/^\s*[-*]\s+/, ""), "normal", { listItem: "bullet" })
        );
      continue;
    }
    if (isNumber) {
      for (const l of lines)
        blocks.push(
          textBlock(l.replace(/^\s*\d+\.\s+/, ""), "normal", { listItem: "number" })
        );
      continue;
    }

    const h = chunk.match(/^(#{2,4})\s+([\s\S]+)$/);
    if (h) {
      const level = h[1].length; // 2,3,4
      blocks.push(textBlock(h[2].trim(), `h${level}`));
      continue;
    }

    if (chunk.startsWith(">")) {
      blocks.push(textBlock(chunk.replace(/^>\s?/gm, "").trim(), "blockquote"));
      continue;
    }

    // Plain paragraph — collapse soft line breaks into spaces.
    blocks.push(textBlock(lines.join(" "), "normal"));
  }

  return blocks;
}
