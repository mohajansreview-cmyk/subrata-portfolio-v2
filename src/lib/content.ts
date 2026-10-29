/**
 * Single source of truth for every piece of copy on the site.
 * Sections read from here so content stays consistent across pages.
 */

export const site = {
  name: "Subrata Mohajan",
  title: "Graphic Designer & Brand Visualizer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://subrata-portfolio-v2.vercel.app",
  locale: "en_US",
  email: "subratamohajanniloy@gmail.com",
  whatsappNumber: "+880 1601 168996",
  whatsappIntl: "8801601168996",
  location: "Chattogram, Bangladesh",
  timezone: "GMT+6",
  role: "Designer @ B & F Corporate (Northampton, UK)",
  experience: "4+ Years Active",
  whatsappMessage:
    "Hi Subrata, I came across your portfolio and would like to discuss a project.",
} as const;

export const whatsappLink = (text: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappIntl}?text=${encodeURIComponent(text)}`;

export const socials = [
  { label: "Behance", href: "https://www.behance.net/Subrata_Mohajan", icon: "behance" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/subrata-mohajan-visualizer", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/subrata_mohajan_tech", icon: "instagram" },
  { label: "Telegram", href: "https://t.me/Subrata_Mohajan", icon: "telegram" },
  { label: "YouTube", href: "https://youtube.com/channel/UCQTbLtjBv_hiFtkP2rWcj9A", icon: "youtube" },
  { label: "Facebook", href: "https://www.facebook.com/MohaVisuals.Subrata.Mohajan", icon: "facebook" },
] as const;

export const hero = {
  eyebrow: "Graphic Designer · Visualizer · Brand Identity",
  headline: ["Design that makes", "a brand feel considered."],
  lead: "I'm Subrata Mohajan, a graphic designer and visualizer focused on brand identity, campaign design and visual communication. I turn a brief into a strong visual direction, then refine the details until the work feels clear, consistent and ready to use.",
  reassurance: [
    "Fast reply typically in < 1 hour",
    "Direct 1-on-1 with Subrata",
    "No pressure, just a friendly project chat",
  ],
  focus: "Visual identity systems, large-scale campaigns, and communication design.",
  stats: [
    { label: "Commercial Practice", value: "4+ Years Active" },
    { label: "Scale Standard", value: "40ft+ Highway LED" },
    { label: "Layout Architecture", value: "12-Col Swiss Grids" },
  ],
} as const;

export const marquee = [
  "Brand Identity",
  "Visual Direction",
  "Campaign Design",
  "Social Media Systems",
  "Digital Graphics",
  "Visual Communication",
  "Large-Format Outdoor",
] as const;

export const services = [
  { name: "Brand Identity Systems", desc: "Logos, marks and the visual language that holds a brand together." },
  { name: "LED Billboards & Advertising", desc: "Large-format outdoor built for 3-second legibility at highway speed." },
  { name: "Social Media Ad Creatives", desc: "Performance graphics engineered for feeds, reels and paid campaigns." },
  { name: "Photo Manipulation & Compositing", desc: "Commercial-grade retouching and seamless scene building." },
  { name: "Packaging & Print Production", desc: "Dielines, press-ready files and CMYK-accurate packaging systems." },
  { name: "Infographic Architecture", desc: "Technical information made instantly scannable and persuasive." },
  { name: "Web Graphics & UI Assets", desc: "Crisp, optimized visual systems for sites and product interfaces." },
  { name: "Presentation & Pitch Decks", desc: "Executive decks where hierarchy does the selling for you." },
] as const;

export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  category: string;
  formatTag: string;
  outcome: string;
  outcomeIcon: "chart" | "honey";
  summary: string;
  role: string;
  format: string;
  deliverables: string;
  context: string;
  image: { src: string; alt: string };
  behance: string;
  liveUrl?: string;
  whatsapp: string;
  objectives: string[];
  challenges: { title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "carvendors-led-billboard",
    index: "01",
    title: "CarVendors.co.uk — LED Billboard",
    client: "CarVendors UK",
    category: "Outdoor Advertising & Visual Direction",
    formatTag: "Interactive Layer Split",
    outcome:
      "Verified Outcome: Instant 100% legibility within a 3.0s viewing window at 50 mph across UK roadside LED networks.",
    outcomeIcon: "chart",
    summary:
      "Designed for high-impact roadside visibility across the United Kingdom. Built around a sharp, high-contrast visual architecture that delivers instantaneous brand comprehension within a three-second viewing window.",
    role: "Graphic Design · Visual Direction",
    format: "Digital LED Billboard (High-Res Outdoor)",
    deliverables: "Large-Format Digital LED Billboard, Typographic Architecture & Production Assets",
    context: "UK Automotive Marketplace Campaign",
    image: { src: "/images/carvendors-1800.webp", alt: "CarVendors.co.uk digital LED billboard design for UK roadside networks" },
    behance: "https://www.behance.net/gallery/253873471/CarVendorscouk_LED_Billboard",
    liveUrl: "https://www.carvendors.co.uk",
    whatsapp:
      "Hi Subrata, I saw your CarVendors billboard project and want to discuss a campaign project.",
    objectives: [
      "Maximize brand recognition and commuter recall for a high-growth UK used car marketplace.",
      "Guarantee full message legibility inside a 3.0-second glance window at 50 mph.",
      "Deliver a production-ready file spec for 12.2m × 3.0m (40×10 ft) 96-sheet digital LED networks.",
    ],
    challenges: [
      { title: "Perception window", body: "Roadside LED placements get one glance. The composition was reduced to a single focal tension point — the mark and the value proposition — so nothing competes with comprehension." },
      { title: "Luminance engineering", body: "Contrast ratios were calibrated for daylight, dusk and headlight wash, keeping the billboard readable in every real-world viewing condition." },
      { title: "Production discipline", body: "The file shipped at 1800 × 1012px target resolution with a CMYK proof profile, so the network operator could run it without a single correction round." },
    ],
  },
  {
    slug: "biqolpo-brand-identity",
    index: "02",
    title: "Biqolpo — Brand Identity & Social Campaign",
    client: "Biqolpo Natural Goods",
    category: "Brand Identity & Campaign Design",
    formatTag: "Identity System",
    outcome:
      "Verified Outcome: 35% higher social media engagement rate and unified retail packaging system across multi-product line.",
    outcomeIcon: "honey",
    summary:
      "A comprehensive visual identity and social communication rollout for an organic honey brand. Balances authentic raw warmth with disciplined graphic structure, creating a flexible, high-converting visual system across digital platforms.",
    role: "Identity Design · Campaign Direction",
    format: "Brand Guidelines, Social Feed & Packaging",
    deliverables: "Master Packaging & 12+ Social Creatives",
    context: "Organic Consumer Goods Brand",
    image: { src: "/images/biqolpo-1800.webp", alt: "Biqolpo organic honey brand identity, packaging and social campaign design" },
    behance: "https://www.behance.net/gallery/253444543/Biqolpo-Brand-Identity-Social-Media-Campaign",
    whatsapp:
      "Hi Subrata, I saw your Biqolpo brand identity project and would like to discuss an identity system.",
    objectives: [
      "Establish authentic consumer trust and elevated shelf presence for retail and digital commerce.",
      "Build a flexible identity system that scales from product packaging to a 12-creative social rollout.",
      "Balance raw organic warmth with disciplined graphic structure so every touchpoint feels premium.",
    ],
    challenges: [
      { title: "Warmth with discipline", body: "Organic brands drift into visual noise. The system locked color, typography and spacing into strict tokens, letting texture and photography carry the warmth." },
      { title: "Multi-product coherence", body: "A full product line had to read as one family on shelf. A master packaging architecture fixed hierarchy, so new SKUs drop in without redesign." },
      { title: "Social velocity", body: "Twelve-plus campaign creatives were templated from the identity grid, giving the brand a consistent, high-converting feed it can extend in-house." },
    ],
  },
];

export const principles = [
  {
    keys: ["P"],
    tool: "Pen Tool",
    title: "Mathematical Vector Purity",
    body: "Every curve is calculated with pure bezier nodes. Zero rasterization artifacts, guaranteeing flawless optical clarity whether deployed on a 16px favicon or a 40-meter highway billboard.",
    metric: "Bezier Node Geometry · Scalable ∞",
  },
  {
    keys: ["F7"],
    tool: "Layers",
    title: "Non-Destructive Architecture",
    body: "Organized smart objects, systematic typography hierarchies, and modular design tokens. Brand deliverables are scalable and intuitive for client teams to maintain without breaking visual balance.",
    metric: "Smart Objects · Systematic Handoff",
  },
  {
    keys: ["Ctrl", "M"],
    tool: "Curves",
    title: "Ambient Contrast Calibration",
    body: "Color luminance and specular values engineered for real-world environmental viewing. Outdoor advertising is tested for rapid 3-second comprehension; packaging is profiled for ambient store illumination.",
    metric: "Luminance Contrast · Real-World Testing",
  },
  {
    keys: ["Ctrl", ";"],
    tool: "Guides",
    title: "Swiss Architectural Grids",
    body: "Disciplined adherence to the 12-column architectural grid and typographic baseline rhythm. Every negative space, margin, and focal tension point is mathematically justified.",
    metric: "12-Column Swiss Grid · Baseline Rhythm",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Subrata consistently delivers high-impact visuals that adhere strictly to brand guidelines. His billboard designs for our UK campaigns captured the exact balance of contrast and immediacy we needed.",
    author: "B & F Corporate Leadership",
    context: "Corporate Client · Northampton, UK",
    initials: "BF",
  },
  {
    quote:
      "The digital LED billboard designed for CarVendors was razor-sharp. Subrata understands optical hierarchy — drivers instantly absorbed the logo and value proposition within 2 to 3 seconds.",
    author: "CarVendors.co.uk Campaign Team",
    context: "Digital Outdoor Campaign · United Kingdom",
    initials: "CV",
  },
  {
    quote:
      "From product packaging to high-converting social campaign templates, Subrata transformed Biqolpo into a coherent, premium identity. Professional, punctual, and meticulous with source files.",
    author: "Biqolpo Natural Products",
    context: "Brand Identity & Packaging · Bangladesh",
    initials: "BQ",
  },
] as const;

export const guides = [
  {
    tag: "OOH Design",
    readTime: "8 min",
    title: "The Physics of Outdoor Advertising: Designing for 50 mph Perception Windows",
  },
  {
    tag: "Layout Architecture",
    readTime: "5 min",
    title: "Why 12-Column Swiss Grids Create Sustainable Brand Systems",
  },
  {
    tag: "Production Guide",
    readTime: "6 min",
    title: "From RGB Canvas to Industrial CMYK: Preventing Color Shifts in Large Format Print",
  },
] as const;

export const faqs = [
  {
    q: "What assets do I receive at handover?",
    a: "Vector masters (.AI, .EPS, .SVG), layered .PSD files with Smart Objects, press-ready PDFs with bleed and trim marks, brand guideline decks, and web-optimized WebP/PNG exports. Everything is production-ready and yours to keep.",
  },
  {
    q: "What is your typical turnaround time?",
    a: "Single assets and billboards typically ship in 2–3 business days. Full identity or packaging systems take 1–2 weeks with milestone check-ins, so you always know where the work stands.",
  },
  {
    q: "How do we handle international contracts and IP?",
    a: "You receive 100% full commercial copyright transfer on completion and final payment. NDAs and service contracts are signed before work begins — standard practice for my UK and EU clients.",
  },
  {
    q: "How are international payments processed?",
    a: "Wise, SWIFT bank wire, Payoneer, or freelance escrow — whichever your finance team prefers, always accompanied by formal corporate invoices.",
  },
  {
    q: "Who is Subrata Mohajan and what does he specialize in?",
    a: "A Chattogram-based graphic designer and brand visualizer working worldwide. Eight core disciplines: brand identity systems, outdoor LED billboards (DOOH), social media advertising, commercial photo manipulation, packaging dielines, technical infographics, web graphics and executive pitch decks.",
  },
  {
    q: "How can international clients contact and hire you?",
    a: "WhatsApp at +880 1601 168996 or email subratamohajanniloy@gmail.com. Share your scope and timeline, and you'll typically hear back within the hour — direct with me, no agency middlemen.",
  },
] as const;

export const contactTopics = [
  "Brand Identity System",
  "Campaign / Billboard",
  "Social Media Creatives",
  "Packaging & Print",
  "Quick Quote & Timeline",
  "I Have a Brief Ready",
] as const;

export const promises = [
  "Direct communication with Subrata — no agency middlemen",
  "Clear quotes, realistic timelines & transparent process",
  "Production-ready source files and brand guidelines",
] as const;

export const about = {
  badge: "Author & Principal Designer",
  lead: "Crafting disciplined visual identities, high-impact commercial campaigns, and large-format outdoor advertising for forward-thinking brands across the UK, USA, Europe, and Asia.",
  meta: [
    { label: "Location", value: "Chattogram, Bangladesh" },
    { label: "Global Role", value: "Designer @ B & F Corporate (UK)" },
    { label: "Availability", value: "Open for International Remote" },
    { label: "Direct Contact", value: site.whatsappNumber },
  ],
  pullQuote:
    "Good design does not demand attention through noise. It commands attention through clarity, contrast, and intentional spatial rhythm.",
  experienceTitle: "Firsthand Commercial Experience",
  experiences: [
    { name: "B & F Corporate", detail: "UK corporate design standards, campaign consistency and brand governance." },
    { name: "CarVendors.co.uk", detail: "Large-format digital LED billboard for a UK automotive marketplace." },
    { name: "Biqolpo Bangladesh", detail: "Full brand identity, packaging system and social rollout for an organic brand." },
    { name: "Global Remote Clients", detail: "Ongoing identity and campaign work across North America, Europe and Australia." },
  ],
  pillarsTitle: "The 4 Pillars of the Mohajan Visual System",
  pillars: [
    { name: "Strict Hierarchy", body: "One focal point per layout. Every element earns its place through optical weight — never through noise." },
    { name: "Color Physics & Production Integrity", body: "sRGB to CMYK ISO Coated discipline, so what you approve on screen survives the press and the LED cabinet." },
    { name: "Spatial Tension & Negative Space", body: "Whitespace is a load-bearing element. Margins and focal tension points are mathematically justified, never leftover." },
    { name: "Contextual Adaptation", body: "An 8-meter LED at a 2.5-second glance window demands different physics than a retail shelf — the system adapts to the viewing context." },
  ],
  toolchain: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Pre-Press & Color Management", "Pantone PMS"],
} as const;
