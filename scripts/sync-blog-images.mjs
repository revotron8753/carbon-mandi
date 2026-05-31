/**
 * Scans /public/blog-images/ for cover-image files and attaches them to
 * matching blogs in src/data/blogs.json.
 *
 *  Usage:  node scripts/sync-blog-images.mjs
 *
 * Naming contract:
 *   public/blog-images/<handle>.<ext>     where <ext> ∈ {jpg, jpeg, png, webp, avif, gif}
 *
 * The script is idempotent: re-run it after adding more files. It also
 * detects orphan files (no matching handle) and reports them so nothing
 * gets silently dropped.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BLOGS_JSON = path.join(ROOT, "src/data/blogs.json");
const IMAGES_DIR = path.join(ROOT, "public/blog-images");
const ACCEPTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

if (!fs.existsSync(IMAGES_DIR)) {
  console.error(`!! ${IMAGES_DIR} doesn't exist. Create it and drop image files in.`);
  process.exit(1);
}

const blogs = JSON.parse(fs.readFileSync(BLOGS_JSON, "utf8"));
const handleSet = new Set(blogs.map((b) => b.handle));

// Build a map of handle → image path. If a handle has multiple files (e.g.
// .jpg and .webp), prefer the order in ACCEPTED above.
const PREFERENCE = [".webp", ".avif", ".jpg", ".jpeg", ".png", ".gif"];
const byHandle = new Map();

const files = fs.readdirSync(IMAGES_DIR);
const orphans = [];
let scanned = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!ACCEPTED.has(ext)) continue;
  scanned++;

  const handle = file.slice(0, -ext.length);
  if (!handleSet.has(handle)) {
    orphans.push(file);
    continue;
  }

  const existing = byHandle.get(handle);
  if (!existing) {
    byHandle.set(handle, { file, ext });
  } else {
    // Pick the preferred extension if multiple variants exist.
    const newRank = PREFERENCE.indexOf(ext);
    const oldRank = PREFERENCE.indexOf(existing.ext);
    if (newRank !== -1 && (oldRank === -1 || newRank < oldRank)) {
      byHandle.set(handle, { file, ext });
    }
  }
}

// Apply to blogs.json
let attached = 0;
let detached = 0;
let unchanged = 0;
for (const blog of blogs) {
  const match = byHandle.get(blog.handle);
  const newPath = match ? `/blog-images/${match.file}` : null;
  if (blog.coverImage !== newPath) {
    if (newPath) attached++;
    else if (blog.coverImage) detached++;
    blog.coverImage = newPath;
  } else if (newPath) {
    unchanged++;
  }
}

fs.writeFileSync(BLOGS_JSON, JSON.stringify(blogs, null, 2), "utf8");

const missing = blogs.filter((b) => !b.coverImage).length;

console.log("✓ Image sync complete.");
console.log(`  · Files in /public/blog-images/   : ${scanned}`);
console.log(`  · Cover images attached this run  : ${attached}`);
console.log(`  · Cover images unchanged          : ${unchanged}`);
console.log(`  · Cover images detached this run  : ${detached}`);
console.log(`  · Blogs WITH a cover image        : ${blogs.length - missing}/${blogs.length}`);
console.log(`  · Blogs MISSING a cover image     : ${missing}`);

if (orphans.length) {
  console.log(`\n!! Orphan files (no matching blog handle): ${orphans.length}`);
  console.log("   These files exist in /public/blog-images/ but no blog has that handle:");
  orphans.slice(0, 10).forEach((f) => console.log(`     - ${f}`));
  if (orphans.length > 10) console.log(`     ... and ${orphans.length - 10} more`);
  console.log("   Rename them to <handle>.<ext> or delete them.");
}
