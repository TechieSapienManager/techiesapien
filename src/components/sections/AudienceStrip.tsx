"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

import {
  audienceContent,
  platforms,
  alsoOn,
  type Platform,
} from "@/lib/content";
import { brandIcons } from "@/components/icons/brand-icons";
import { usePointerCapabilities } from "@/hooks/use-pointer-capabilities";
import { useCountUp } from "@/hooks/use-count-up";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

export function AudienceStrip() {
  const { prefersReducedMotion } = usePointerCapabilities();
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.3 });

  return (
    <section id="proof" className="relative overflow-hidden border-t border-border px-6 py-24 sm:py-28">
      {/* Stat marquee */}
      <div className="relative mb-16 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...audienceContent.marquee, ...audienceContent.marquee].map((item, i) => (
            <MarqueeItem key={`a-${i}`} label={item} />
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-marquee items-center gap-8 pr-8"
        >
          {[...audienceContent.marquee, ...audienceContent.marquee].map((item, i) => (
            <MarqueeItem key={`b-${i}`} label={item} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-4">
          <Reveal>
            <Badge variant="electric">{audienceContent.eyebrow}</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-heading max-w-3xl text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
              {audienceContent.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-2xl text-base text-muted sm:text-lg">
              {audienceContent.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Platform cards */}
        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {platforms.map((platform, i) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              active={inView}
              instant={prefersReducedMotion}
              index={i}
            />
          ))}
        </div>

        {/* Also on */}
        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Also on
          </span>
          {alsoOn.map((item) => {
            const Icon = brandIcons[item.id];
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor-hover
                className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm text-muted transition-colors hover:border-brand hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </a>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function MarqueeItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-8 font-display text-2xl font-medium text-foreground/70 sm:text-3xl">
      {label}
      <span className="text-brand" style={{ color: "var(--brand)" }}>
        ✳
      </span>
    </span>
  );
}

function PlatformCard({
  platform,
  active,
  instant,
  index,
}: {
  platform: Platform;
  active: boolean;
  instant: boolean;
  index: number;
}) {
  const Icon = brandIcons[platform.id];
  const decimals = platform.decimals ?? 0;
  const count = useCountUp(platform.value, active, { instant, decimals });
  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor-hover
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: "var(--brand)" }}
      />
      <div className="relative flex items-center justify-between">
        <Icon className="h-6 w-6 text-foreground/80 transition-colors duration-300 group-hover:text-foreground" />
        <ArrowUpRight
          size={16}
          className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          style={{}}
        />
      </div>

      <div className="relative">
        <div className="flex items-baseline gap-0.5">
          <span className="font-display text-3xl font-semibold text-foreground">
            {display}
          </span>
          <span className="font-display text-xl font-semibold text-foreground/80">
            {platform.unit}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted">{platform.metric}</p>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-sm font-medium text-foreground">{platform.name}</span>
          {platform.verified && (
            <BadgeCheck size={14} className="text-brand" style={{ color: "var(--brand-2)" }} />
          )}
        </div>
        <p className="truncate text-xs text-muted">
          {platform.extra ?? platform.handle}
        </p>
      </div>
    </motion.a>
  );
}
