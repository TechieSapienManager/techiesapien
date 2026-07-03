# Techie Sapien — Futuristic AI Laboratory

An award-winning, cinematic personal branding website for **Techie Sapien**, themed as a futuristic AI laboratory exploring artificial intelligence, automation, robotics, and software innovation.

Built to feel like a blend of Apple, Linear, Stripe, and Awwwards-winning 3D experiences.

## ✨ Features

| # | Section | Highlights |
|---|---------|-----------|
| 1 | **Hero** | Cinematic landing with an interactive 3D **neural sphere** (particles + connections), GSAP intro timeline, bloom post-processing |
| 2 | **Project Showcase** | Immersive cards with 3D tilt, parallax glow, and scroll reveals |
| 3 | **Automation Lab** | Animated workflow diagram with flowing packets along edges and interactive nodes |
| 4 | **AI Playground** | Interactive prompt/response simulation with a typewriter effect |
| 5 | **Achievements Timeline** | Scroll-driven progress line with alternating milestone cards |
| 6 | **Services** | Glassmorphism service grid with hover glow |
| 7 | **Social Universe** | 3D orbital system of planets, each a clickable social channel |
| 8 | **Contact Terminal** | Terminal-style boot sequence + form that composes an email |

Plus: Lenis smooth scrolling, a custom magnetic cursor, animated navigation, and full mobile responsiveness.

## 🛠 Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** (custom black/electric-blue theme, glassmorphism)
- **Framer Motion** — UI animation & scroll reveals
- **GSAP** — hero timeline
- **Three.js / React Three Fiber / Drei / Postprocessing** — 3D scenes
- **Lenis** — smooth scrolling
- **shadcn-style UI primitives** (Button, Badge) + **lucide-react** icons

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## ⚡ Performance

- 3D scenes are **dynamically imported** (`ssr: false`) and **lazy-mounted** via `IntersectionObserver` — Three.js is code-split out of the initial bundle (~199 kB First Load JS for `/`).
- R3F render loops **pause when off-screen** (`frameloop="never"`), and particle density is **reduced on mobile / coarse pointers**.
- `prefers-reduced-motion` is respected globally (CSS) and disables Lenis smooth scroll.
- Fonts optimized via `next/font`; images set to AVIF/WebP.

## 📁 Architecture

```
src/
├─ app/                 # layout, page, global styles
├─ components/
│  ├─ layout/           # navbar, footer, cursor
│  ├─ providers/        # Lenis smooth-scroll provider
│  ├─ sections/         # one component per page section
│  ├─ three/            # R3F scenes (neural sphere, social universe)
│  └─ ui/               # button, badge, reveal, section-heading, lazy-mount
├─ data/                # typed content (projects, services, timeline, social…)
└─ hooks/               # useTypewriter
```

Content lives in `src/data/*` — edit those files to update projects, services, achievements, and social links without touching component code.
