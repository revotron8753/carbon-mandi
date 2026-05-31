/**
 * Matches files in /public/blog-images/ to blogs by TAG name (the images
 * are named after blog topics, not handles).
 *
 *  Usage:  node scripts/match-blog-images.mjs
 *
 * Matching logic (in order of preference):
 *   1. Exact:    normalised(filename without ext) === normalised(tag)
 *   2. Prefix:   normalised(filename without ext) starts with normalised(tag)
 *                (handles "Advantages...PDF Visualization.png" → tag "advantages...pdf")
 *
 * Each image attaches to the FIRST blog whose tag matches (so an image
 * isn't shared across blogs — keeps the result deterministic). The blog
 * keeps the FIRST image that matches any of its tags (first tag wins).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BLOGS_JSON = path.join(ROOT, "src/data/blogs.json");
const IMAGES_DIR = path.join(ROOT, "public/blog-images");

const blogs = JSON.parse(fs.readFileSync(BLOGS_JSON, "utf8"));

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/\([0-9]+\)/g, "") // drop "(1)" duplicate markers
    .replace(/[_\-]+/g, " ") // unify separators
    .replace(/[^a-z0-9 ]+/g, " ") // strip punctuation
    .replace(/\s+/g, " ")
    .trim();
}

// ── 1. Read files ───────────────────────────────────────────────────────
const allFiles = fs
  .readdirSync(IMAGES_DIR)
  .filter((f) => /\.(png|jpe?g|webp|avif|gif)$/i.test(f));

console.log(`→ Scanning ${allFiles.length} image files`);

// Normalised filename → list of files with that normalised form (handles
// duplicates like "Foo.png" + "Foo(1).png").
const filesByNormalised = new Map();
for (const file of allFiles) {
  const base = file.replace(/\.[a-zA-Z]+$/, "");
  const norm = normalize(base);
  if (!filesByNormalised.has(norm)) filesByNormalised.set(norm, []);
  filesByNormalised.get(norm).push(file);
}
// Prefer the non-"(1)" variant when there are duplicates.
for (const [k, v] of filesByNormalised.entries()) {
  v.sort((a, b) => {
    const aHasDup = /\(\d+\)/.test(a) ? 1 : 0;
    const bHasDup = /\(\d+\)/.test(b) ? 1 : 0;
    return aHasDup - bHasDup;
  });
}

// ── 2. Build a lookup: normalised tag → [blog handles in tag order] ────
/** Each blog has tags[]; normalise each. Track the ORDER tags appeared in. */
const tagIndex = new Map(); // normalised tag → [{ handle, tagIndex }]
for (const blog of blogs) {
  blog.tags.forEach((tag, i) => {
    const norm = normalize(tag);
    if (!norm) return;
    if (!tagIndex.has(norm)) tagIndex.set(norm, []);
    tagIndex.get(norm).push({ handle: blog.handle, tagIndex: i });
  });
}

// ── 3. Match images → blogs ────────────────────────────────────────────
/** handle → { file, score, matchedTag, mode } */
const bestForBlog = new Map();
const matchedFiles = new Set();
const stats = { exact: 0, prefix: 0, orphan: 0 };

function consider(handle, file, score, matchedTag, mode) {
  const cur = bestForBlog.get(handle);
  if (!cur || score < cur.score) {
    bestForBlog.set(handle, { file, score, matchedTag, mode });
  }
}

// Phase 1 — exact normalised matches.
for (const [norm, files] of filesByNormalised.entries()) {
  const blogsForTag = tagIndex.get(norm);
  if (!blogsForTag) continue;
  for (const { handle, tagIndex: ti } of blogsForTag) {
    consider(handle, files[0], ti, norm, "exact");
    matchedFiles.add(files[0]);
    stats.exact++;
  }
}

// Phase 2 — prefix matches (filename begins with a tag).
// Only attempt for files NOT already matched, and only for blogs without a match.
const allNormTags = [...tagIndex.keys()].sort((a, b) => b.length - a.length);
for (const [norm, files] of filesByNormalised.entries()) {
  if (matchedFiles.has(files[0])) continue;
  // Find the LONGEST tag that the file name begins with (prefer specificity).
  const hit = allNormTags.find((t) => norm.startsWith(t + " ") || norm === t);
  if (!hit) continue;
  for (const { handle, tagIndex: ti } of tagIndex.get(hit) ?? []) {
    consider(handle, files[0], ti + 100, hit, "prefix"); // bias against prefix
    matchedFiles.add(files[0]);
    stats.prefix++;
  }
}

// ── 4. Apply results to blogs.json ─────────────────────────────────────
let attached = 0;
let cleared = 0;
for (const blog of blogs) {
  const m = bestForBlog.get(blog.handle);
  const newPath = m ? `/blog-images/${m.file}` : null;
  if (blog.coverImage !== newPath) {
    if (newPath) attached++;
    else if (blog.coverImage) cleared++;
    blog.coverImage = newPath;
  }
}
fs.writeFileSync(BLOGS_JSON, JSON.stringify(blogs, null, 2), "utf8");

// ── 5. Build report ────────────────────────────────────────────────────
const orphanFiles = allFiles.filter((f) => !matchedFiles.has(f));
const blogsWithCover = blogs.filter((b) => b.coverImage).length;
const blogsWithoutCover = blogs.length - blogsWithCover;

console.log(`✓ Done.`);
console.log(`  · Files scanned                : ${allFiles.length}`);
console.log(`  · Matched files (used)         : ${matchedFiles.size}`);
console.log(`    - exact tag matches          : ${stats.exact}`);
console.log(`    - prefix tag matches         : ${stats.prefix}`);
console.log(`  · Orphan files (not used)      : ${orphanFiles.length}`);
console.log(`  · Blogs WITH a cover           : ${blogsWithCover}/${blogs.length}`);
console.log(`  · Blogs WITHOUT a cover        : ${blogsWithoutCover}`);

// Write orphan list + uncovered list to disk for the user's review.
const reportPath = path.join(ROOT, "src/data/image-match-report.json");
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    {
      summary: {
        totalImages: allFiles.length,
        matched: matchedFiles.size,
        orphans: orphanFiles.length,
        blogsCovered: blogsWithCover,
        blogsUncovered: blogsWithoutCover,
      },
      orphans: orphanFiles,
      uncoveredBlogs: blogs
        .filter((b) => !b.coverImage)
        .map((b) => ({ handle: b.handle, title: b.title, tags: b.tags })),
    },
    null,
    2
  ),
  "utf8"
);
console.log(`\n  → Detailed report: ${path.relative(ROOT, reportPath)}`);

if (orphanFiles.length) {
  console.log("\n  First 10 orphan files:");
  orphanFiles.slice(0, 10).forEach((f) => console.log(`    - ${f}`));
}
if (blogsWithoutCover > 0) {
  console.log("\n  First 10 blogs without a cover (handle / title):");
  blogs
    .filter((b) => !b.coverImage)
    .slice(0, 10)
    .forEach((b) => console.log(`    - ${b.handle}  ·  ${b.title}`));
}
