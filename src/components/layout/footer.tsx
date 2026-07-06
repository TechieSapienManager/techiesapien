import Link from "next/link";

import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
        <p className="font-mono">
          © {new Date().getFullYear()} {siteConfig.name}. All systems nominal.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono">
          <Link
            href="/commitflow-ai/privacy-policy"
            className="transition-colors hover:text-electric-2"
          >
            CommitFlow AI Privacy
          </Link>
          <span className="hidden sm:inline">
            Built with Next.js · Three.js · GSAP · Framer Motion
          </span>
        </nav>
      </div>
    </footer>
  );
}
