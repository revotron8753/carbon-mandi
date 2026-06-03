/**
 * One-time seed: Mandi products (Biomass, Final Products, Partner Products).
 *
 * Run with:  node scripts/seed-mandi.mjs
 *
 * Uploads the existing /public/images/mandi/*.png files into Sanity (Sanity
 * content-hashes assets, so re-running reuses the same asset — no duplicates)
 * and creates one product document per card. Deterministic _id values mean
 * re-running updates the same docs instead of creating new ones.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@sanity/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const imgDir = join(root, "public", "images", "mandi");

// ── Load .env.local ───────────────────────────────────────────────────────────
const env = Object.fromEntries(
  readFileSync(join(root, ".env.local"), "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
    })
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01",
  token: env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

// ── Product data (file = name in /public/images/mandi) ────────────────────────
const products = [
  // Explore Biomass
  { cat: "Biomass", name: "Napier Grass", file: "napier-grass.png", body: "High-yield energy crop ideal for green fuel production." },
  { cat: "Biomass", name: "Hemp Stalks", file: "hemp-stalks.png", body: "Strong, sustainable biomass ideal for industrial & energy use." },
  { cat: "Biomass", name: "Paddy Straw", file: "paddy-straw.png", body: "Abundant agri-residue perfect for clean energy conversion." },
  { cat: "Biomass", name: "Wheat Straw", file: "wheat-straw.png", body: "Widely available biomass with high energy potential." },
  { cat: "Biomass", name: "Agri Residue", file: "agri-residue.png", body: "Mixed agri-residue sourced responsibly for a greener planet." },

  // Our Final Products
  { cat: "Final Product", name: "Green Hydrogen", file: "green-hydrogen.png", icon: "h2", body: "Clean fuel for industry, mobility and a greener tomorrow." },
  { cat: "Final Product", name: "CBG", file: "cbg.png", icon: "flame", body: "Renewable gas for a sustainable and self-reliant India." },
  { cat: "Final Product", name: "Carbon Credits", file: "carbon-credits.png", icon: "leaf", body: "Enabling climate action and creating value for a better planet." },

  // Sustainable Products From Our Partners
  { cat: "Partner Product", name: "Organic Potting Mix", file: "organic-potting-mix.png", body: "Nutrient-rich soil mix for healthy plant growth." },
  { cat: "Partner Product", name: "Plant Based Lubricants", file: "plant-based-lubricants.png", body: "High performance, eco-friendly lubricants for all applications." },
  { cat: "Partner Product", name: "Jute Products", file: "jute-products.png", body: "Sustainable, biodegradable and responsibly crafted." },
  { cat: "Partner Product", name: "Hemp Fabric", file: "hemp-fabric.png", body: "Strong, durable and naturally sustainable." },
  { cat: "Partner Product", name: "Natural Cleaners", file: "natural-cleaners.png", body: "Tough on dirt, gentle on you and the planet." },
  { cat: "Partner Product", name: "Coir Products", file: "coir-products.png", body: "Eco-friendly solutions for a greener tomorrow." },
];

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Per-category display order.
const counters = {};

async function run() {
  console.log(`Uploading images + seeding ${products.length} products into "${env.NEXT_PUBLIC_SANITY_DATASET}"…`);

  const docs = [];
  for (const p of products) {
    const buf = readFileSync(join(imgDir, p.file));
    const asset = await client.assets.upload("image", buf, { filename: p.file });
    const slug = slugify(p.name);
    counters[p.cat] = (counters[p.cat] || 0) + 1;

    const doc = {
      _id: `product.${slug}`,
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: slug },
      category: p.cat,
      shortDescription: p.body,
      order: counters[p.cat],
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    };
    if (p.icon) doc.icon = p.icon;
    docs.push(doc);
    console.log(`  ✓ ${p.cat.padEnd(15)} ${p.name}`);
  }

  const tx = docs.reduce((t, d) => t.createOrReplace(d), client.transaction());
  await tx.commit();
  console.log("✅ Done. Refresh the studio (Products) to see them.");
}

run().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
