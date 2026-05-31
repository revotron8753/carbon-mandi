/**
 * Scans every blog's HTML body for <img src="..."> URLs and writes a
 * manifest at src/data/blog-images-manifest.json.
 *
 *  Usage:  node scripts/extract-image-urls.mjs
 *
 * The manifest tells you exactly which images you need to source, what
 * to name them locally, and which blog handles use each one. Feed it
 * back into scripts/rewrite-image-urls.mjs once the files are in
 * /public/blog-images/.
 */
import fs from "node:fs";
import path from "node:path";

const SRC = "./src/data/blogs.json";
const OUT = "./src/data/blog-images-manifest.json";

const blogs = JSON.parse(fs.readFileSync(SRC, "utf8"));

/** url → { suggestedLocalPath, usedInBlogs[] } */
const byUrl = new Map();
/** Counts to surface filename collisions before they bite us. */
const basenameCount = new Map();

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');
}

function basenameFromUrl(url) {
  const noQuery = url.split(/[?#]/)[0];
  const last = noQuery.split("/").pop() ?? "image";
  return decodeURIComponent(last);
}

for (const blog of blogs) {
  // Pull every <img ... src="..."> from the body. Matches single or double quotes.
  const re = /<img[^>]+?src\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(blog.content)) !== null) {
    const url = decodeEntities(m[1].trim());
    if (!url) continue;
    if (!byUrl.has(url)) {
      const basename = basenameFromUrl(url);
      basenameCount.set(basename, (basenameCount.get(basename) ?? 0) + 1);
      byUrl.set(url, {
        suggestedLocalPath: `/blog-images/${basename}`,
        basename,
        usedInBlogs: [],
      });
    }
    byUrl.get(url).usedInBlogs.push(blog.handle);
  }
}

const manifest = [...byUrl.entries()].map(([originalUrl, info]) => ({
  originalUrl,
  ...info,
  // Flag basename collisions so we can disambiguate before download.
  collision: basenameCount.get(info.basename) > 1,
}));

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2), "utf8");

const collisions = manifest.filter((m) => m.collision).length;
const hosts = new Set(
  manifest.map((m) => {
    try {
      return new URL(m.originalUrl).host;
    } catch {
      return "(relative)";
    }
  })
);

console.log(`✓ Wrote ${OUT}`);
console.log(`  · Unique image URLs found:  ${manifest.length}`);
console.log(`  · Hosts:                    ${[...hosts].join(", ")}`);
console.log(`  · Filename collisions:      ${collisions}  ${collisions ? "(will need disambiguating)" : ""}`);
console.log(`  · Avg images per blog:      ${(manifest.reduce((a, x) => a + x.usedInBlogs.length, 0) / blogs.length).toFixed(2)}`);
