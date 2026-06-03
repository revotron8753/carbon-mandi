/**
 * Central registry of all photographic image slots used on the site.
 *
 * Drop the real file into /public/images/<filename> and replace the
 * empty string with the path (e.g. "/images/hero-farmer.jpg").
 * Each entry also documents the recommended aspect ratio and a default
 * alt text used by `<PhotoSlot>` if no override is passed.
 */
export interface ImageSlot {
  /** Path under /public (e.g. "/images/hero-farmer.jpg"). Leave empty to render the placeholder. */
  src: string;
  /** Recommended file name + dimensions — shown in the placeholder. */
  filename: string;
  /** Default alt text — used for SEO and accessibility. */
  alt: string;
}

export const IMAGES = {
  // ── Section 1: Hero ────────────────────────────────────────────────────
  heroBackground: {
    src: "/images/hero-background.png",
    filename: "hero-background.png · upscaled high-res",
    alt:
      "Indian farmer in traditional dress with hemp and napier fields, Indian flag, and a green hydrogen production plant at sunrise.",
  },

  // ── Section 2: What is Green Hydrogen ──────────────────────────────────
  hydrogenPlant: {
    src: "/images/hydrogen-plant.jpg",
    filename: "hydrogen-plant.jpg · 1500×360 · 21:5",
    alt: "How green hydrogen is made — water + renewable energy → electrolysis → H₂, with a green hydrogen plant scene.",
  },
  // Section 2 — full-bleed backgrounds
  section2BgTop: {
    src: "/images/2a.png",
    filename: "2a.png · upscaled · sky + green hydrogen plant + HOW IT'S MADE diagram baked in",
    alt: "Bright landscape backdrop with a green hydrogen production plant on the right and the HOW IT'S MADE process diagram.",
  },
  section2BgBottom: {
    src: "/images/2b.png",
    filename: "2b.png · upscaled · dark industrial silhouettes",
    alt: "Moody dark backdrop with faint silhouettes of fossil-fuel infrastructure — power pylons and chimneys.",
  },
  challengeCost: {
    src: "/images/current challenges/1.png",
    filename: "challenge-cost.jpg · 1200×800 · 3:2",
    alt: "Stacks of coins growing upward against a green growth arrow representing high production cost.",
  },
  challengeGrid: {
    src: "/images/current challenges/2.png",
    filename: "challenge-grid.jpg · 1200×800 · 3:2",
    alt: "Electricity transmission pylons at sunset symbolising grid dependence and renewable intermittency.",
  },
  challengeFossil: {
    src: "/images/current challenges/3.png",
    filename: "challenge-fossil.jpg · 1200×800 · 3:2",
    alt: "Coal mining operation with industrial machinery and smokestacks in the background.",
  },

  // ── Section 3: India's National Opportunity ────────────────────────────
  // 3A — wide horizontal backdrop, empty white on the left half, India+H2 composite on the right.
  indiaOpportunityMap: {
    src: "/images/3a.png",
    filename: "3a.png · upscaled · India map + tricolour brushstroke + H2 plant on right",
    alt: "Illustrated India map with tricolour brushstroke fading into a green hydrogen production facility.",
  },
  // 3B section backdrop — dark teal India silhouette + H₂ bubbles + wheat
  section3BgBottom: {
    src: "/images/3-bg.jpg",
    filename: "3-bg.jpg · 3B viewport backdrop · dark teal India silhouette with H₂ bubbles",
    alt: "Stylised glowing India silhouette on a dark teal backdrop with floating H₂ bubbles and wheat at the base.",
  },
  // 3B — Problem card
  problemShip: {
    src: "/images/3B.png",
    filename: "3B.png · upscaled · oil tanker with arrows pointing toward India",
    alt: "Oil tanker on the sea with red arrows pointing toward a faded India map silhouette — fuel import dependence.",
  },
  // 3C — Opportunity card
  opportunityField: {
    src: "/images/3C.png",
    filename: "3C.png · upscaled · farmer overlooking a hemp/napier field at sunrise",
    alt: "Indian farmer in white attire looking out over a tall hemp/napier field at sunrise.",
  },
  // 3D — Solution card (now with labeled circular-economy badges baked in)
  solutionPlant: {
    src: "/images/3D.png",
    filename: "3D.png · upscaled · green hydrogen plant with Agricultural Feedstock / Rural Income / Transport labels",
    alt: "Green hydrogen plant with three labeled circular-economy badges — Agricultural Feedstock, Rural Income & Employment, Transport & Distribution.",
  },

  // ── Section 4: Why Hemp & Napier ───────────────────────────────────────
  // 4.png — ambient backdrop for the whole of Section 4
  section4Bg: {
    src: "/images/4.png",
    filename: "4.png · Section 4 ambient backdrop · mature hemp + napier field with crop rows",
    alt: "Mature hemp plants and napier grass behind rows of intercropped crops in a clean field.",
  },
  hempNapierField: {
    src: "/images/hemp-napier-field.jpg",
    filename: "hemp-napier-field.jpg · 770×513 · 3:2",
    alt: "Industrial hemp and napier grass growing tall side-by-side under daylight, with HEMP and NAPIER GRASS labels.",
  },
  intercroppingField: {
    src: "/images/hemp-napier.png",
    filename: "hemp-napier.png · intercropping rows with HEMP / NAPIER pill labels baked in",
    alt: "Field of hemp and napier grass intercropped in alternating rows, with HEMP and NAPIER labels above each row.",
  },
  outputGreenH2: {
    src: "/images/circular economy/circular economy-1.png",
    filename: "circular economy-1.png · 800×800 · 1:1",
    alt: "Green hydrogen storage tanks with H2 labelling.",
  },
  outputBiochar: {
    src: "/images/circular economy/circular economy-2.png",
    filename: "circular economy-2.png · 800×800 · 1:1",
    alt: "Pile of black biochar — carbon-locking soil amendment.",
  },
  outputCarbonCredits: {
    src: "/images/circular economy/circular economy-3.png",
    filename: "circular economy-3.png · 800×800 · 1:1",
    alt: "Forest canopy overlaid with CO2 symbol representing carbon-credit revenue.",
  },
  outputFiber: {
    src: "/images/circular economy/circular economy-4.png",
    filename: "circular economy-4.png · 800×800 · 1:1",
    alt: "Spool of natural hemp fibre rope.",
  },
  outputConstruction: {
    src: "/images/circular economy/circular economy-5.png",
    filename: "circular economy-5.png · 800×800 · 1:1",
    alt: "Stacks of hempcrete and biocomposite construction boards.",
  },

  // ── Section 5: Who Uses Hydrogen / Validation / Advisors ───────────────
  useIndustry: {
    src: "/images/who uses hydrogen/1.png",
    filename: "who uses hydrogen/1.png · 1200×900 · 4:3",
    alt: "Industrial chemical plant with smokestacks and processing units.",
  },
  useTransport: {
    src: "/images/who uses hydrogen/2.png",
    filename: "who uses hydrogen/2.png · 1200×900 · 4:3",
    alt: "Hydrogen fuel-cell freight truck on a highway.",
  },
  usePower: {
    src: "/images/who uses hydrogen/3.png",
    filename: "who uses hydrogen/3.png · 1200×900 · 4:3",
    alt: "Hydrogen energy storage containers with renewable energy infrastructure.",
  },
  useShipping: {
    src: "/images/who uses hydrogen/4.png",
    filename: "who uses hydrogen/4.png · 1200×900 · 4:3",
    alt: "Container ship at port — hydrogen-powered maritime logistics.",
  },
  useAviation: {
    src: "/images/who uses hydrogen/5.png",
    filename: "who uses hydrogen/5.png · 1200×900 · 4:3",
    alt: "Commercial passenger aircraft on the tarmac — sustainable aviation fuel.",
  },
  useChemicals: {
    src: "/images/who uses hydrogen/6.png",
    filename: "who uses hydrogen/6.png · 1200×900 · 4:3",
    alt: "Petrochemical refinery with distillation columns and piping at twilight.",
  },
  iitRoparCampus: {
    src: "/images/IIT-ROPAR.jpeg",
    filename: "IIT-ROPAR.jpeg · campus entrance signage at sunset",
    alt: "IIT Ropar campus entrance signage with academic block visible at sunset.",
  },
  iitRoparLab: {
    src: "/images/Scientist.jpeg",
    filename: "Scientist.jpeg · researcher in lab coat operating gasification equipment",
    alt: "Researcher in lab coat and safety goggles operating gasification / hydrogen-purification equipment at IIT Ropar.",
  },
  advisorGermany: {
    src: "",
    filename: "advisor-germany.jpg · 600×600 · 1:1",
    alt: "Portrait of Dr. Andreas Walther, renewable energy & hydrogen advisor (Germany).",
  },
  advisorUK: {
    src: "",
    filename: "advisor-uk.jpg · 600×600 · 1:1",
    alt: "Portrait of Prof. David Wilkinson, hydrogen systems & energy transition advisor (UK).",
  },
  advisorSouthAfrica: {
    src: "",
    filename: "advisor-south-africa.jpg · 600×600 · 1:1",
    alt: "Portrait of Dr. Sipho Nzima, biomass & circular economy advisor (South Africa).",
  },
  advisorUS: {
    src: "",
    filename: "advisor-us.jpg · 600×600 · 1:1",
    alt: "Portrait of Dr. Emily Carter, clean-energy innovation & policy advisor (United States).",
  },
  advisorIndia: {
    src: "",
    filename: "advisor-india.jpg · 600×600 · 1:1",
    alt: "Portrait of Dr. Rajeev Sharma, sustainable development & climate-strategy advisor (India).",
  },

  // ── Section 6: Who Benefits / Opportunity / Vision ─────────────────────
  benefitFarmers: {
    src: "/images/who gest beinfitted/5.png",
    filename: "benefit-farmers.jpg · 1200×900 · 4:3",
    alt: "Smiling Indian farmer in turban standing in a hemp field.",
  },
  benefitCommunity: {
    src: "/images/who gest beinfitted/4.png",
    filename: "benefit-community.jpg · 1200×900 · 4:3",
    alt: "Group of rural Indian community members of mixed ages and genders.",
  },
  benefitIndustries: {
    src: "/images/who gest beinfitted/3.png",
    filename: "benefit-industries.jpg · 1200×900 · 4:3",
    alt: "Clean industrial plant with H2 tank and modular green hydrogen infrastructure.",
  },
  benefitIndia: {
    src: "/images/who gest beinfitted/6.jpg",
    filename: "benefit-india.jpg · 1200×900 · 4:3",
    alt: "Indian tricolour flag flying against a clear sky.",
  },
  benefitPlanet: {
    src: "/images/who gest beinfitted/2.png",
    filename: "benefit-planet.jpg · 1200×900 · 4:3",
    alt: "Stylised green globe with leaves representing climate-positive growth.",
  },
  whoBenefitsHero: {
    src: "/images/6A.png",
    filename: "who-benefits-hero.jpg · 1600×1100 · 16:11",
    alt: "Indian farmer and his child looking out toward a hemp field and a green hydrogen production unit.",
  },
  visionAtScaleMap: {
    src: "",
    filename: "vision-india-map.jpg · 1000×1100 · 10:11",
    alt: "Stylised green India map overlaid with hydrogen, solar and wind iconography.",
  },

  // ── Section 7: Be A Part Of ────────────────────────────────────────────
  // Full-bleed backdrop for the right half — washed white on the left so the
  // heading + cards stay readable, image shows through behind the quote/QR band.
  beAPartHero: {
    src: "/images/7.png",
    filename: "be-a-part-hero.jpg · wide · turbine + H2 plant + solar + Indian flag + Carbon Mandi container over green field",
    alt: "Green hydrogen plant with a wind turbine, solar panels, the Indian flag and a Carbon Mandi container in a green field at daytime.",
  },
  invitePolicyMakers: {
    src: "/images/visionary and change/1.png",
    filename: "invite-policy.jpg · 1200×800 · 3:2",
    alt: "Indian Parliament building exterior — policy makers and government leaders.",
  },
  inviteInvestors: {
    src: "/images/visionary and change/2.png",
    filename: "invite-investors.jpg · 1200×800 · 3:2",
    alt: "Investor reviewing financial growth charts on a tablet.",
  },
  inviteResearchers: {
    src: "/images/visionary and change/3.png",
    filename: "invite-researchers.jpg · 1200×800 · 3:2",
    alt: "Researcher operating a microscope in a laboratory.",
  },
  inviteInnovators: {
    src: "/images/visionary and change/4.png",
    filename: "invite-innovators.jpg · 1200×800 · 3:2",
    alt: "Two engineers in hard hats reviewing plans on-site at an industrial facility.",
  },

  // ── Section 8: Carbon Neutral CTA ──────────────────────────────────────
  plantTree: {
    src: "/images/plant-tree.png",
    filename: "plant-tree.png · 1130×832 · 4:3",
    alt: "Indian farmer and a young girl together planting a sapling in fresh soil at golden sunrise.",
  },

  // ── Mandi page: Biomass Aggregation Platform ───────────────────────────
  // Hero — wide, bleeds to the right edge behind the heading.
  mandiHero: {
    src: "/images/mandi/hero.png",
    filename: "mandi/hero.png · wide",
    alt: "Green hydrogen biomass facility with H₂ storage tanks and a tractor hauling a trailer of harvested biomass through a field at sunrise.",
  },
  // Explore Biomass — 5 feedstock cards (≈4:3)
  mandiBiomassNapier: {
    src: "/images/mandi/napier-grass.png",
    filename: "mandi/napier-grass.png · 4:3",
    alt: "Tall, dense green napier grass growing in a field — a high-yield energy crop.",
  },
  mandiBiomassHemp: {
    src: "/images/mandi/hemp-stalks.png",
    filename: "mandi/hemp-stalks.png · 4:3",
    alt: "Industrial hemp stalks growing tall — sustainable biomass for industrial and energy use.",
  },
  mandiBiomassPaddy: {
    src: "/images/mandi/paddy-straw.png",
    filename: "mandi/paddy-straw.png · 4:3",
    alt: "Bundles of paddy straw stacked in a harvested field — agri-residue for clean energy conversion.",
  },
  mandiBiomassWheat: {
    src: "/images/mandi/wheat-straw.png",
    filename: "mandi/wheat-straw.png · 4:3",
    alt: "Golden wheat straw in a sunlit field — widely available biomass with high energy potential.",
  },
  mandiBiomassAgri: {
    src: "/images/mandi/agri-residue.png",
    filename: "mandi/agri-residue.png · 4:3",
    alt: "Mixed agricultural crop residue and stubble — responsibly sourced biomass.",
  },
  // Our Final Products — 3 product cards (≈16:9)
  mandiProductHydrogen: {
    src: "/images/mandi/green-hydrogen.png",
    filename: "mandi/green-hydrogen.png · 16:9",
    alt: "Green hydrogen storage tanks labelled H₂ at a clean production facility.",
  },
  mandiProductCBG: {
    src: "/images/mandi/cbg.png",
    filename: "mandi/cbg.png · 16:9",
    alt: "Compressed bio-gas (CBG) plant with green domed digesters.",
  },
  mandiProductCarbonCredits: {
    src: "/images/mandi/carbon-credits.png",
    filename: "mandi/carbon-credits.png · 16:9",
    alt: "Lush green forest beside a calm river representing carbon-credit climate value.",
  },
  // Sustainable Products from Partners — 6 product cards (1:1)
  mandiPartnerPottingMix: {
    src: "/images/mandi/organic-potting-mix.png",
    filename: "mandi/organic-potting-mix.png · 1:1",
    alt: "Bag of organic potting mix for healthy plant growth.",
  },
  mandiPartnerLubricants: {
    src: "/images/mandi/plant-based-lubricants.png",
    filename: "mandi/plant-based-lubricants.png · 1:1",
    alt: "Green canister of plant-based, eco-friendly lubricant.",
  },
  mandiPartnerJute: {
    src: "/images/mandi/jute-products.png",
    filename: "mandi/jute-products.png · 1:1",
    alt: "Reusable jute bag — a sustainable, biodegradable product.",
  },
  mandiPartnerHempFabric: {
    src: "/images/mandi/hemp-fabric.png",
    filename: "mandi/hemp-fabric.png · 1:1",
    alt: "Rolls of natural hemp fabric — a strong and durable textile.",
  },
  mandiPartnerCleaners: {
    src: "/images/mandi/natural-cleaners.png",
    filename: "mandi/natural-cleaners.png · 1:1",
    alt: "Bottles of natural, plant-based cleaning products.",
  },
  mandiPartnerCoir: {
    src: "/images/mandi/coir-products.png",
    filename: "mandi/coir-products.png · 1:1",
    alt: "Compressed coir blocks — an eco-friendly coconut-fibre product.",
  },
  // CTA band — hands holding soil with a young sprouting plant.
  mandiCtaSapling: {
    src: "/images/mandi/plant-in-hand.png",
    filename: "mandi/plant-in-hand.png · wide",
    alt: "Two cupped hands holding fresh soil with a young green plant sprouting — growing India's green future together.",
  },

  // ── Team page: Global Ecosystem partner logos ──────────────────────────
  // Logos sit on white — recommend transparent PNG/SVG, roughly 3:1 landscape.
  partnerBCG: {
    src: "",
    filename: "team/partners/bcg.png · ~3:1 · transparent",
    alt: "Boston Consulting Group (BCG) logo.",
  },
  partnerPraj: {
    src: "",
    filename: "team/partners/praj.png · ~3:1 · transparent",
    alt: "Praj Industries logo.",
  },
  partnerReNew: {
    src: "",
    filename: "team/partners/renew-power.png · ~3:1 · transparent",
    alt: "ReNew Power logo.",
  },
  partnerIITRopar: {
    src: "",
    filename: "team/partners/iit-ropar.png · ~3:1 · transparent",
    alt: "IIT Ropar logo.",
  },
  partnerTERI: {
    src: "",
    filename: "team/partners/teri.png · ~3:1 · transparent",
    alt: "The Energy and Resources Institute (TERI) logo.",
  },
  partnerDBFZ: {
    src: "",
    filename: "team/partners/dbfz.png · ~3:1 · transparent",
    alt: "DBFZ Deutsches Biomasseforschungszentrum logo.",
  },
  partnerCirculor: {
    src: "",
    filename: "team/partners/circulor.png · ~3:1 · transparent",
    alt: "Circulor logo.",
  },
  partnerNREL: {
    src: "",
    filename: "team/partners/nrel.png · ~3:1 · transparent",
    alt: "National Renewable Energy Laboratory (NREL) logo.",
  },
  partnerEarthood: {
    src: "",
    filename: "team/partners/earthood.png · ~3:1 · transparent",
    alt: "Earthood logo.",
  },
  partnerEESL: {
    src: "",
    filename: "team/partners/eesl.png · ~3:1 · transparent",
    alt: "Energy Efficiency Services Limited (EESL) logo.",
  },
  partnerGIZ: {
    src: "",
    filename: "team/partners/giz.png · ~3:1 · transparent",
    alt: "Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) logo.",
  },
  partnerShellFoundation: {
    src: "",
    filename: "team/partners/shell-foundation.png · ~3:1 · transparent",
    alt: "Shell Foundation logo.",
  },
  partnerFAO: {
    src: "",
    filename: "team/partners/fao.png · ~3:1 · transparent",
    alt: "Food and Agriculture Organization of the United Nations (FAO) logo.",
  },
  partnerWorldBank: {
    src: "",
    filename: "team/partners/world-bank.png · ~3:1 · transparent",
    alt: "The World Bank logo.",
  },
  partnerIFC: {
    src: "",
    filename: "team/partners/ifc.png · ~3:1 · transparent",
    alt: "International Finance Corporation (IFC) logo.",
  },

  // ── Team page: Global Climate Experts portraits (≈4:5) ─────────────────
  globalForstner: {
    src: "",
    filename: "team/global/christian-forstner.jpg · 4:5",
    alt: "Portrait of Dr. Christian Forstner, Co-Founder of Ubuntu Hemp.",
  },
  globalBezuidenhout: {
    src: "",
    filename: "team/global/freddy-bezuidenhout.jpg · 4:5",
    alt: "Portrait of Freddy Bezuidenhout, Co-Founder of Q-Lub.",
  },
  globalLoschmann: {
    src: "",
    filename: "team/global/frank-loschmann.jpg · 4:5",
    alt: "Portrait of Dr. Frank Löschmann, Founder of HyCell Energy and former CEO of Volkswagen.",
  },
  globalLambert: {
    src: "",
    filename: "team/global/chris-lambert.jpg · 4:5",
    alt: "Portrait of Chris Lambert, Executive Chairman of Aether Innovations.",
  },
  globalFritschen: {
    src: "",
    filename: "team/global/dan-fritschen.jpg · 4:5",
    alt: "Portrait of Dan Fritschen, Senior Researcher at Waste Free '23.",
  },

  // ── Team page: Ground Expert Team portraits (≈4:5) ─────────────────────
  groundMohanVerma: {
    src: "",
    filename: "team/ground/mohan-verma.jpg · 4:5",
    alt: "Portrait of Mohan Verma, Co-Founder.",
  },
  groundSarahRawat: {
    src: "",
    filename: "team/ground/sarah-rawat.jpg · 4:5",
    alt: "Portrait of Sarah Rawat, Co-Founder & COO at Carbon Mandi.",
  },
  groundAnuragGupta: {
    src: "",
    filename: "team/ground/anurag-gupta.jpg · 4:5",
    alt: "Portrait of Anurag Gupta, Co-Founder at Carbon Mandi.",
  },
  groundPriyamKapoor: {
    src: "",
    filename: "team/ground/priyam-kapoor.jpg · 4:5",
    alt: "Portrait of Priyam Kapoor, Founder & Chief Advisor, BNI Delhi SDG Council.",
  },
  groundNitinsinhRaulji: {
    src: "",
    filename: "team/ground/nitinsinh-raulji.jpg · 4:5",
    alt: "Portrait of Nitinsinh Raulji, Founder of Aquawelder India.",
  },
  groundChetanShukla: {
    src: "",
    filename: "team/ground/chetan-shukla.jpg · 4:5",
    alt: "Portrait of Chetan Shukla, Clean Technology Industrial Expert.",
  },
} as const;

export type ImageKey = keyof typeof IMAGES;
