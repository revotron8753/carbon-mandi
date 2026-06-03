/**
 * One-time seed: Team members + Partners for the /team page.
 *
 * Run with:  node scripts/seed-team.mjs
 *
 * Reads NEXT_PUBLIC_SANITY_* and SANITY_API_READ_TOKEN from .env.local.
 * Uses deterministic _id values, so re-running updates the same documents
 * instead of creating duplicates. Does NOT touch photos/logos — those are
 * uploaded later in the studio.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

// ── Load .env.local (tiny parser, no dependency) ──────────────────────────────
const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
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

// ── Team members ──────────────────────────────────────────────────────────────
const GLOBAL = "Global Climate Experts";
const GROUND = "Ground Expert Team";

const members = [
  {
    _id: "team.global.forstner",
    name: "Dr. Christian Forstner",
    role: "Co-Founder, Ubuntu Hemp",
    group: GLOBAL,
    country: "DE",
    order: 1,
    bio: "Former Vice President at Siemens and part of the team that delivered one of the world's first wind-powered green hydrogen projects. He provides technical direction, hydrogen system architecture, and global hydrogen project experience, ensuring alignment with international hydrogen production standards.",
  },
  {
    _id: "team.global.bezuidenhout",
    name: "Freddy Bezuidenhout",
    role: "Co-Founder, Q-Lub",
    group: GLOBAL,
    country: "ZA",
    order: 2,
    bio: "Pioneering Co-Founder whose high-performance, plant-based lubricants are trusted by the US Army vehicles. He is now collaborating with our team to bring this battle-tested business experience to the next level of global industry and lead the project.",
  },
  {
    _id: "team.global.loschmann",
    name: "Dr. Frank Löschmann",
    role: "Founder, HyCell Energy · Ex-CEO Volkswagen",
    group: GLOBAL,
    country: "DE",
    order: 3,
    bio: "Global industry leader with 25+ years of experience, now building the future of electricity at HyCell Energy, converting hydrogen into electricity; former CEO at Volkswagen and driving India's hydrogen mobility with Carbon Mandi.",
  },
  {
    _id: "team.global.lambert",
    name: "Chris Lambert",
    role: "Executive Chairman, Aether Innovations",
    group: GLOBAL,
    country: "GB",
    order: 4,
    bio: "Strategic Advisor to the Carbon Mandi board as a Non-Executive Director, supporting organisations with international governments, structured cross-border transactions, and managed P&Ls in environments where precision, timing, and credibility matter.",
  },
  {
    _id: "team.global.fritschen",
    name: "Dan Fritschen",
    role: "Senior Researcher, Waste Free '23",
    group: GLOBAL,
    country: "US",
    order: 5,
    bio: "Expert leader with 35 years of experience building successful global companies that mix high-tech innovation with environmental sustainability. From running factories to launching tech products across Asia and Europe, turning complex ideas into profitable, planet-friendly businesses.",
  },
  {
    _id: "team.ground.mohanVerma",
    name: "Mohan Verma",
    role: "Co-Founder",
    group: GROUND,
    country: "IN",
    order: 1,
    bio: "Former Exxon plant-based lubricant specialist and Airtel Vice President with extensive experience managing large-scale industrial and operational systems. He supports operational planning, industrial scalability, and infrastructure management for biomass-to-hydrogen facilities.",
  },
  {
    _id: "team.ground.sarahRawat",
    name: "Sarah Rawat",
    role: "Co-Founder & COO, Carbon Mandi",
    group: GROUND,
    country: "IN",
    order: 2,
    bio: "A sustainability leader with 20+ years of NGO leadership and grassroots environmental programs, helping build farmer networks and on-ground implementation strategies.",
  },
  {
    _id: "team.ground.anuragGupta",
    name: "Anurag Gupta",
    role: "Co-Founder, Carbon Mandi",
    group: GROUND,
    country: "IN",
    order: 3,
    bio: "Climate entrepreneur and policy strategist leading the alignment of the project with India's National Green Hydrogen Mission, decentralized energy models, and farmer-integrated biomass supply chains.",
  },
  {
    _id: "team.ground.priyamKapoor",
    name: "Priyam Kapoor",
    role: "Founder & Chief Advisor, BNI Delhi SDG Council",
    group: GROUND,
    country: "IN",
    order: 4,
    bio: "Leading the farmer-integrated biomass supply model, ensuring agricultural participation and alignment with UN Sustainable Development Goals and rural economic development.",
  },
  {
    _id: "team.ground.nitinsinhRaulji",
    name: "Nitinsinh Raulji",
    role: "Founder, Aquawelder India",
    group: GROUND,
    country: "IN",
    order: 5,
    bio: "Engineering systems expert responsible for plant safety, compliance frameworks, and industrial reliability required for hydrogen production facilities.",
  },
  {
    _id: "team.ground.chetanShukla",
    name: "Chetan Shukla",
    role: "Clean Technology Industrial Expert",
    group: GROUND,
    country: "IN",
    order: 6,
    bio: "With 35+ years of experience in corporate sustainability and industrial operations, he focuses on translating environmental innovations into practical plant systems and operational models.",
  },
];

// ── Partners (Global Ecosystem) ───────────────────────────────────────────────
const partnerNames = [
  "Boston Consulting Group",
  "Praj Industries",
  "ReNew Power",
  "IIT Ropar",
  "The Energy and Resources Institute (TERI)",
  "DBFZ",
  "Circulor",
  "National Renewable Energy Laboratory (NREL)",
  "Earthood",
  "Energy Efficiency Services Limited (EESL)",
  "GIZ",
  "Shell Foundation",
  "Food and Agriculture Organization (FAO)",
  "The World Bank",
  "International Finance Corporation (IFC)",
];

const slug = (s) =>
  s.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const partners = partnerNames.map((name, i) => ({
  _id: `partner.${slug(name)}`,
  _type: "partner",
  name,
  order: i + 1,
}));

// ── Run ───────────────────────────────────────────────────────────────────────
const docs = [
  ...members.map((m) => ({ _type: "teamMember", ...m })),
  ...partners,
];

const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction());

console.log(
  `Seeding ${members.length} team members + ${partners.length} partners into "${env.NEXT_PUBLIC_SANITY_DATASET}"…`
);

tx.commit()
  .then(() => console.log("✅ Done. Refresh the studio to see them."))
  .catch((err) => {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  });
