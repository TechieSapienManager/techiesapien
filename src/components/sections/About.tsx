"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Hammer,
  Clapperboard,
  Briefcase,
  MapPin,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import { aboutContent, type IdentityKey } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const identityIcons: Record<IdentityKey, LucideIcon> = {
  creator: Sparkles,
  builder: Hammer,
  ai: Clapperboard,
  professional: Briefcase,
};

export function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-1/3 h-[50vmin] w-[50vmin] rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(30,99,233,0.35), transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Photo */}
        <Reveal>
          <div className="group relative mx-auto w-full max-w-md">
            <div
              aria-hidden
              className="absolute -inset-2 rounded-[26px] opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
              style={{
                background: "linear-gradient(135deg, rgba(30,99,233,0.5), rgba(34,211,238,0.35))",
              }}
            />
            <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface">
              <Image
                src={aboutContent.image.src}
                alt={aboutContent.image.alt}
                width={aboutContent.image.width}
                height={aboutContent.image.height}
                quality={90}
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="h-full w-full object-cover grayscale-[0.15] transition-all duration-500 group-hover:grayscale-0"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(5,6,10,0.75), transparent 55%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    Techie Sapien
                  </p>
                  <p className="text-xs text-muted">AI &amp; Tech Creator</p>
                </div>
                <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-foreground/80">
                  <MapPin size={12} style={{ color: "var(--brand-2)" }} />
                  Chhatarpur, India
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <Badge variant="electric">{aboutContent.eyebrow}</Badge>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="section-heading text-4xl font-semibold text-foreground sm:text-5xl">
              {aboutContent.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-2xl text-lg text-foreground/80">{aboutContent.lead}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="max-w-2xl text-base text-muted">{aboutContent.bio}</p>
          </Reveal>

          {/* Identity grid */}
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aboutContent.identities.map((identity, i) => {
              const Icon = identityIcons[identity.key];
              return (
                <motion.div
                  key={identity.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-brand/40"
                >
                  <div className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-foreground/80 transition-colors duration-300 group-hover:text-brand">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{identity.title}</h3>
                    <p className="mt-1 text-sm text-muted">{identity.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Currently */}
          <Reveal delay={0.2}>
            <a
              href={aboutContent.current.href}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor-hover
              className="group inline-flex items-center gap-2 self-start rounded-full border border-border-strong px-5 py-2.5 text-sm text-foreground/80 transition-colors hover:border-brand hover:text-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ background: "var(--brand-2)" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--brand-2)" }}
                />
              </span>
              {aboutContent.current.label}
              <ArrowUpRight
                size={15}
                className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
