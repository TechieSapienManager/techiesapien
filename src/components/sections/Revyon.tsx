"use client";

import { motion } from "framer-motion";
import {
  Clapperboard,
  Palette,
  Wand2,
  Box,
  ArrowUpRight,
  Play,
  type LucideIcon,
} from "lucide-react";

import { revyonContent, type CapabilityKey } from "@/lib/content";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const capabilityIcons: Record<CapabilityKey, LucideIcon> = {
  commercials: Clapperboard,
  branding: Palette,
  motion: Wand2,
  cgi: Box,
};

export function Revyon() {
  return (
    <section id="studio" className="relative overflow-hidden px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15%] top-1/4 h-[55vmin] w-[55vmin] rounded-full opacity-40 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(139,123,255,0.4), transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <Reveal className="flex flex-wrap items-center gap-3">
            <Badge variant="electric">{revyonContent.eyebrow}</Badge>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 text-[11px] text-foreground/80">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              {revyonContent.status}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="section-heading text-4xl font-semibold text-foreground sm:text-5xl">
              {revyonContent.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-xl text-base text-muted sm:text-lg">
              {revyonContent.subtitle}
            </p>
          </Reveal>

          {/* Capabilities */}
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {revyonContent.capabilities.map((cap, i) => {
              const Icon = capabilityIcons[cap.key];
              return (
                <motion.div
                  key={cap.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-violet/50"
                >
                  <div className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-violet transition-colors duration-300 group-hover:text-cyan">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{cap.title}</h3>
                    <p className="mt-1 text-sm text-muted">{cap.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTAs */}
          <Reveal delay={0.2} className="mt-2 flex flex-wrap items-center gap-3">
            <a
              href={revyonContent.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              <InstagramIcon className="h-4 w-4" />
              See the work
            </a>
            <a
              href="#contact"
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm text-foreground transition-colors hover:border-violet hover:text-violet"
            >
              Start a project
              <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>

        {/* Visual canvas */}
        <Reveal delay={0.1}>
          <a
            href={revyonContent.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor-hover
            className="group relative block aspect-square w-full overflow-hidden rounded-3xl border border-border-strong"
          >
            {/* Layered gradient mesh */}
            <div className="absolute inset-0" style={{ background: "var(--surface-2)" }} />
            <div
              className="absolute left-[-10%] top-[-10%] h-2/3 w-2/3 animate-pulse-glow rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(139,123,255,0.55), transparent 70%)" }}
            />
            <div
              className="absolute bottom-[-15%] right-[-5%] h-2/3 w-2/3 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(34,211,238,0.4), transparent 70%)" }}
            />
            <div
              className="absolute left-1/3 top-1/2 h-1/2 w-1/2 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(30,99,233,0.35), transparent 70%)" }}
            />
            <div className="hero-grain" aria-hidden />

            {/* Reel affordance */}
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
              <Play size={22} className="translate-x-0.5 fill-white text-white" />
            </span>

            {/* Wordmark overlay */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <p className="font-display text-2xl font-semibold text-foreground">Revyon</p>
                <p className="text-sm text-muted">{revyonContent.handle}</p>
              </div>
              <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-foreground/80">
                <InstagramIcon className="h-3.5 w-3.5" />
                Reels
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
