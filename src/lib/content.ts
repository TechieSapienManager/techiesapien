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
