// Single source of truth for Techie Sapien site copy.
// Everything here is REAL — pulled from techie-sapien-website-blueprint.md.
// Rule: no invented projects, numbers, clients, or history.

export const site = {
  name: "Techie Sapien",
  role: "AI & Tech Creator · App Builder · AI Filmmaker",
  location: "Chhatarpur, Madhya Pradesh, India",
  email: "founder@techiesapien.com",
  url: "https://techiesapien.com",
  description:
    "AI & Tech Creator building apps, automations, and AI-generated visuals — and sharing the whole journey with 145K+ followers and 1B+ views. Creator of Scanline QR and CommitFlow AI, founder of Revyon AI Studio, and AI creative for Brava Studio.",
} as const;

export const heroContent = {
  eyebrow: "AI & TECH CREATOR · APP BUILDER · AI FILMMAKER",
  // Headline split into lines for the per-line mask reveal.
  headlineLines: [
    "I build AI apps,",
    "automations & visuals —",
    "for 145K+ people.",
  ],
  // Rotating typewriter sublines (all real, from the blueprint).
  typewriterPhrases: [
    "Creator of Scanline QR & CommitFlow AI.",
    "Founder of Revyon AI Studio.",
    "AI creative for Brava Studio.",
    "122K subscribers · 1B+ views.",
  ],
  image: {
    src: "/hero/techie-sapien.webp",
    mobileSrc: "/hero/techie-sapien-mobile.webp",
    alt: "Portrait of Techie Sapien, AI and tech creator.",
    width: 2400,
    height: 1340,
  },
} as const;

export interface HeroStat {
  /** Numeric target that counts up. */
  value: number;
  /** Text appended after the number, e.g. "B+", "K". */
  suffix: string;
  label: string;
}

export const heroStats: HeroStat[] = [
  { value: 1, suffix: "B+", label: "Views" },
  { value: 122, suffix: "K", label: "Subscribers" },
  { value: 145, suffix: "K+", label: "Followers" },
];

export interface HeroCta {
  label: string;
  href?: string;
  variant: "solid" | "glass" | "outline";
  external?: boolean;
  /** Marks the email copy pill. */
  copy?: string;
}

export const heroCtas: HeroCta[] = [
  {
    label: "Watch on YouTube",
    href: "https://youtube.com/@TechieSapien",
    variant: "solid",
    external: true,
  },
  { label: "See my apps", href: "#apps", variant: "glass" },
  { label: "Work with me", href: "#contact", variant: "glass" },
  {
    label: "founder@techiesapien.com",
    variant: "outline",
    copy: "founder@techiesapien.com",
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Apps", href: "#apps" },
  { label: "Studio", href: "#studio" },
  { label: "Content", href: "#content" },
];

export const navCta = { label: "Let's talk", href: "#contact" };

export const socials = {
  youtube: "https://youtube.com/@TechieSapien",
  instagram: "https://instagram.com/techie.sapien",
  x: "https://x.com/TechieSapien",
  threads: "https://threads.com/@techie.sapien",
  facebook: "https://facebook.com/61582933821004",
  linkedin: "https://linkedin.com/in/techie-sapien-631660420",
  github: "https://github.com/TechieSapienManager",
} as const;

/* -------------------- Proof / audience strip (§2, §3, §4) -------------------- */

export const audienceContent = {
  eyebrow: "The Proof",
  title: "An audience of 145K+.",
  subtitle:
    "Over a billion views across YouTube, Instagram, and beyond — built by showing the real work, not just talking about it.",
  // Repeating ticker line (all real, from §3).
  marquee: ["1B+ Views", "122K Subscribers", "145K+ Followers", "959 Videos", "Verified ✓"],
};

/* -------------------- Apps / selected work (§5) -------------------- */

export type AppId = "scanline-qr" | "commitflow-ai" | "logo-match-cut";

export interface AppProject {
  id: AppId;
  name: string;
  category: string;
  description: string;
  features: string[];
  status: "live" | "coming";
  statusLabel: string;
  accent: string;
  /** Play Store URL — fill in when available. */
  playStoreUrl?: string;
  /** On-site privacy policy, where one exists. */
  privacyUrl?: string;
  /** Email used for the "notify me" waitlist on unreleased apps. */
  notifyEmail?: string;
}

export const appsContent = {
  eyebrow: "Selected Work",
  title: "Real apps, shipped.",
  subtitle:
    "Products I've designed, built, and released — from live Play Store apps to a SaaS tool in the making.",
};

export const apps: AppProject[] = [
  {
    id: "scanline-qr",
    name: "Scanline QR",
    category: "QR Scanner & Generator",
    description:
      "An advanced QR scanner with a deep set of QR tools — scan, generate, keep a history, and more.",
    features: ["Scan", "Generate", "History"],
    status: "live",
    statusLabel: "Live on Google Play",
    accent: "#22d3ee",
    // playStoreUrl: fill in when available
  },
  {
    id: "commitflow-ai",
    name: "CommitFlow AI",
    category: "Productivity · AI",
    description:
      "A GitHub-style productivity app: notes, to-dos, a Pomodoro timer, a contribution graph, and an AI chat feature.",
    features: ["Notes & to-dos", "Pomodoro", "Contribution graph", "AI chat"],
    status: "live",
    statusLabel: "Live on Google Play",
    accent: "#1e63e9",
    privacyUrl: "/commitflow-ai/privacy-policy",
    // playStoreUrl: fill in when available
  },
  {
    id: "logo-match-cut",
    name: "Logo Match Cut",
    category: "SaaS · Web App",
    description:
      "A match-cut logo tool, built as a web app. Currently in active development.",
    features: ["Match-cut engine", "Web-based", "In development"],
    status: "coming",
    statusLabel: "Coming soon",
    accent: "#8b7bff",
    notifyEmail: "founder@techiesapien.com",
  },
];

/* -------------------- About (§1, §6b) -------------------- */

export type IdentityKey = "creator" | "builder" | "ai" | "professional";

export interface Identity {
  key: IdentityKey;
  title: string;
  description: string;
}

export const aboutContent = {
  eyebrow: "About",
  title: "Creator. Builder. AI Filmmaker.",
  lead: "An AI & tech creator who builds real apps, automations, and AI-generated visuals — and shares the entire journey with an audience of 145K+.",
  bio: site.description,
  location: site.location,
  // Real paid role (§6b) — a credibility marker, kept factual.
  current: {
    label: "Currently creating AI-driven visuals & ads for Brava Studio",
    href: "https://bravastudion.ru",
  },
  identities: [
    {
      key: "creator",
      title: "A Creator",
      description:
        "145K+ followers and 1B+ views — teaching and showing AI and next-gen tech.",
    },
    {
      key: "builder",
      title: "A Builder",
      description:
        "Shipped Android apps to the Play Store, and building web & SaaS products.",
    },
    {
      key: "ai",
      title: "An AI Creative",
      description:
        "AI ads, commercials, and CGI visuals through Revyon AI Studio.",
    },
    {
      key: "professional",
      title: "A Professional",
      description:
        "Creating AI-driven visuals, ads, posters & motion design for Brava Studio.",
    },
  ] as Identity[],
  image: {
    src: "/hero/techie-sapien.webp",
    alt: "Techie Sapien, AI & tech creator based in Chhatarpur, India.",
    width: 2400,
    height: 1340,
  },
};

export type PlatformId =
  | "youtube"
  | "instagram"
  | "x"
  | "threads"
  | "facebook"
  | "linkedin"
  | "github";

export interface Platform {
  id: PlatformId;
  name: string;
  handle: string;
  url: string;
  /** Numeric follower/subscriber count that animates up. */
  value: number;
  /** Unit appended to the count, e.g. "K". */
  unit: string;
  /** Decimal places for the count (e.g. 22.7K → 1). */
  decimals?: number;
  metric: string;
  verified?: boolean;
  /** Optional secondary detail, e.g. "959 videos". */
  extra?: string;
}

// Lead platforms with real, defensible follower counts (§3).
export const platforms: Platform[] = [
  {
    id: "youtube",
    name: "YouTube",
    handle: "@TechieSapien",
    url: socials.youtube,
    value: 122,
    unit: "K",
    metric: "subscribers",
    extra: "959 videos",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@techie.sapien",
    url: socials.instagram,
    value: 22.7,
    unit: "K",
    decimals: 1,
    metric: "followers",
    verified: true,
  },
  {
    id: "x",
    name: "X",
    handle: "@TechieSapien",
    url: socials.x,
    value: 175,
    unit: "",
    metric: "followers",
    verified: true,
  },
  {
    id: "threads",
    name: "Threads",
    handle: "@techie.sapien",
    url: socials.threads,
    value: 210,
    unit: "",
    metric: "followers",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "Techie Sapien",
    url: socials.facebook,
    value: 640,
    unit: "",
    metric: "followers",
  },
];

// Additional real profiles without public follower counts (shown as links).
export const alsoOn: { id: PlatformId; name: string; url: string }[] = [
  { id: "linkedin", name: "LinkedIn", url: socials.linkedin },
  { id: "github", name: "GitHub", url: socials.github },
];
