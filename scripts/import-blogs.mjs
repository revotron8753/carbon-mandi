/**
 * Imports `src/Blogs and Blog Posts.xlsx` ("Blog Posts" sheet) into
 * `src/data/blogs.json`. Runs faithfully — does NOT transform body HTML.
 *
 *  Usage:  node scripts/import-blogs.mjs
 *
 * Output schema (per blog):
 *   {
 *     title, handle, content (HTML),
 *     author, tags (string[]),
 *     shopifyId, blogId, articleId,
 *     seoTitle, seoDescription
 *   }
 */
import xlsx from "xlsx";
import fs from "node:fs";
import path from "node:path";

const { readFile, utils } = xlsx;

const SOURCE = "./src/Blogs and Blog Posts.xlsx";
const OUT = "./src/data/blogs.json";

console.log(`→ Reading ${SOURCE}`);
const wb = readFile(SOURCE);
const sheet = wb.Sheets["Blog Posts"];
if (!sheet) {
  console.error('!! Sheet "Blog Posts" not found.');
  process.exit(1);
}

const rows = utils.sheet_to_json(sheet, { defval: null });
console.log(`→ ${rows.length} rows read`);

const blogs = rows.map((r, i) => {
  if (!r.Title || !r.Handle) {
    console.warn(`!! Row ${i + 2} missing Title or Handle:`, {
      title: r.Title,
      handle: r.Handle,
    });
  }
  const tags = typeof r.Tags === "string"
    ? r.Tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  // Extract numeric Article ID from the Shopify gid (e.g. gid://shopify/Article/611340747056)
  const articleId = r["Shopify ID"]?.split("/").pop() ?? null;

  return {
    title: r.Title,
    handle: r.Handle,
    content: r.Content ?? "",
    author: r.Author ?? null,
    tags,
    shopifyId: r["Shopify ID"] ?? null,
    blogId: r["Blog ID"] ?? null,
    articleId,
    seoTitle: r["SEO Page Title"] ?? null,
    seoDescription: r["SEO Meta Description"] ?? null,
    /**
     * Populated separately by scripts/sync-blog-images.mjs once files land in
     * /public/blog-images/. Re-run that script after importing so any
     * already-attached covers re-link.
     */
    coverImage: null,
  };
});

// Validation: all must have title + handle
const invalid = blogs.filter((b) => !b.title || !b.handle);
if (invalid.length) {
  console.error(`!! ${invalid.length} rows are missing title or handle — aborting.`);
  process.exit(1);
}

// Duplicate handle check (URL collision = catastrophic)
const handleCount = new Map();
for (const b of blogs) {
  handleCount.set(b.handle, (handleCount.get(b.handle) ?? 0) + 1);
}
const dupes = [...handleCount.entries()].filter(([, n]) => n > 1);
if (dupes.length) {
  console.error("!! Duplicate handles found — aborting:", dupes);
  process.exit(1);
}

// Sort: higher Article ID = newer (Shopify IDs are monotonic). Newest first.
blogs.sort((a, b) => {
  const aId = BigInt(a.articleId ?? "0");
  const bId = BigInt(b.articleId ?? "0");
  if (aId < bId) return 1;
  if (aId > bId) return -1;
  return 0;
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(blogs, null, 2), "utf8");

const size = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`✓ Wrote ${OUT} (${blogs.length} blogs, ${size} KB)`);

// Quick stats
const withSeoTitle = blogs.filter((b) => b.seoTitle).length;
const withSeoDesc = blogs.filter((b) => b.seoDescription).length;
const avgContentLen = Math.round(
  blogs.reduce((a, b) => a + b.content.length, 0) / blogs.length
);
console.log(`  · with custom SEO title:       ${withSeoTitle}/${blogs.length}`);
console.log(`  · with custom SEO description: ${withSeoDesc}/${blogs.length}`);
console.log(`  · avg content length:          ${avgContentLen} chars`);
console.log(`\n  Newest 3 handles:`);
blogs.slice(0, 3).forEach((b) => console.log(`    - ${b.handle}`));
console.log(`\n  Oldest 3 handles:`);
blogs.slice(-3).forEach((b) => console.log(`    - ${b.handle}`));
