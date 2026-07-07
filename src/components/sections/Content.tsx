"use client";

import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";

import { contentSection, type ContentChannel } from "@/lib/content";
import { YouTubeIcon, InstagramIcon } from "@/components/icons/brand-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Content() {
  return (
    <section id="content" className="relative overflow-hidden px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={contentSection.eyebrow}
          title={contentSection.title}
          description={contentSection.subtitle}
        />

        {/* Topic tags */}
        <Reveal delay={0.12} className="mt-6 flex flex-wrap gap-2">
          {contentSection.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-border-strong px-3 py-1 text-xs text-muted"
            >
              {topic}
            </span>
          ))}
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {contentSection.channels.map((channel, i) => (
            <ChannelCard key={channel.id} channel={channel} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelCard({
  channel,
  index,
}: {
  channel: ContentChannel;
  index: number;
}) {
  const Icon = channel.id === "youtube" ? YouTubeIcon : InstagramIcon;
  const featured = channel.featured;

  return (
    <motion.a
      href={channel.url}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor-hover
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1",
        featured ? "lg:col-span-2" : "lg:col-span-1"
      )}
      style={{ ["--accent" as string]: channel.accent }}
    >
      {/* Ambient accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: channel.accent }}
      />

      {/* Player / visual motif */}
      <div
        className="relative flex min-h-[190px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-border-strong"
        style={{
          background: `radial-gradient(circle at 50% 40%, color-mix(in srgb, ${channel.accent} 22%, transparent), transparent 70%), var(--surface-2)`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative flex flex-col items-center gap-3">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-xl transition-transform duration-500 group-hover:scale-110"
            style={{ background: channel.accent }}
          >
            <Play size={24} className="translate-x-0.5 fill-current" />
          </span>
          <Icon className="h-7 w-7 text-foreground/80" />
        </div>
      </div>

      {/* Meta */}
      <div className="relative mt-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              {channel.name}
            </h3>
            <p className="text-sm text-muted">{channel.handle}</p>
          </div>
          <ArrowUpRight
            size={18}
            className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            style={{ color: "var(--muted)" }}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-foreground/70">
          {channel.stats.map((stat, i) => (
            <span key={stat} className="flex items-center gap-4">
              {i > 0 && <span className="text-foreground/20">·</span>}
              {stat}
            </span>
          ))}
        </div>

        <p className="mt-3 max-w-md text-sm text-muted">{channel.description}</p>

        <span
          className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-opacity group-hover:opacity-90"
          style={{ background: channel.accent }}
        >
          <Play size={13} className="fill-current" />
          {channel.cta}
        </span>
      </div>
    </motion.a>
  );
}
