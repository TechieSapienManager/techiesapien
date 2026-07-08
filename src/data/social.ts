export interface SocialPlanet {
  id: string;
  label: string;
  handle: string;
  /** Public follower/subscriber count, where one exists. */
  count?: string;
  href: string;
  color: string;
  size: number;
  distance: number;
  speed: number;
}

// Real handles, counts, and links (blueprint §3, §4).
export const socialPlanets: SocialPlanet[] = [
  {
    id: "youtube",
    label: "YouTube",
    handle: "@TechieSapien",
    count: "122K",
    href: "https://youtube.com/@TechieSapien",
    color: "#ff4d4d",
    size: 0.78,
    distance: 3.4,
    speed: 0.1,
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@techie.sapien",
    count: "22.7K",
    href: "https://instagram.com/techie.sapien",
    color: "#d946a6",
    size: 0.62,
    distance: 4.4,
    speed: 0.13,
  },
  {
    id: "x",
    label: "X",
    handle: "@TechieSapien",
    count: "175",
    href: "https://x.com/TechieSapien",
    color: "#f5f7fb",
    size: 0.48,
    distance: 5.3,
    speed: 0.18,
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@techie.sapien",
    count: "210",
    href: "https://threads.com/@techie.sapien",
    color: "#c7d0e0",
    size: 0.46,
    distance: 6.1,
    speed: 0.15,
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Techie Sapien",
    count: "640",
    href: "https://facebook.com/61582933821004",
    color: "#1877f2",
    size: 0.5,
    distance: 6.9,
    speed: 0.11,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/techie-sapien",
    href: "https://linkedin.com/in/techie-sapien-631660420",
    color: "#0a66c2",
    size: 0.55,
    distance: 7.7,
    speed: 0.09,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "TechieSapienManager",
    href: "https://github.com/TechieSapienManager",
    color: "#f5f7fb",
    size: 0.52,
    distance: 8.5,
    speed: 0.12,
  },
];
