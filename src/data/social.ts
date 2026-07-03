export interface SocialPlanet {
  id: string;
  label: string;
  handle: string;
  href: string;
  color: string;
  size: number;
  distance: number;
  speed: number;
}

export const socialPlanets: SocialPlanet[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@techiesapien",
    href: "https://github.com",
    color: "#f5f7fb",
    size: 0.55,
    distance: 3.2,
    speed: 0.18,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "/in/techiesapien",
    href: "https://linkedin.com",
    color: "#3e7bfa",
    size: 0.7,
    distance: 4.4,
    speed: 0.12,
  },
  {
    id: "x",
    label: "X",
    handle: "@techiesapien",
    href: "https://x.com",
    color: "#22d3ee",
    size: 0.5,
    distance: 5.6,
    speed: 0.22,
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "Techie Sapien",
    href: "https://youtube.com",
    color: "#ff4d4d",
    size: 0.62,
    distance: 6.8,
    speed: 0.09,
  },
  {
    id: "email",
    label: "Email",
    handle: "techiesapienmanager@gmail.com",
    href: "mailto:techiesapienmanager@gmail.com",
    color: "#8b7bff",
    size: 0.45,
    distance: 8.0,
    speed: 0.15,
  },
];
