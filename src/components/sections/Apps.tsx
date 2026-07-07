"use client";

import { motion } from "framer-motion";
import {
  QrCode,
  GitCommitHorizontal,
  Scissors,
  Play,
  Bell,
  Shield,
  Check,
  type LucideIcon,
} from "lucide-react";

import { appsContent, apps, type AppProject, type AppId } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";

const appIcons: Record<AppId, LucideIcon> = {
  "scanline-qr": QrCode,
  "commitflow-ai": GitCommitHorizontal,
  "logo-match-cut": Scissors,
};

export function Apps() {
  return (
    <section id="apps" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={appsContent.eyebrow}
          title={appsContent.title}
          description={appsContent.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AppCard({ app, index }: { app: AppProject; index: number }) {
  const Icon = appIcons[app.id];
  const isLive = app.status === "live";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1"
      style={{ ["--accent" as string]: app.accent }}
    >
      {/* Accent glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: app.accent }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ borderColor: `color-mix(in srgb, ${app.accent} 45%, transparent)` }}
      />

      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${app.accent}, color-mix(in srgb, ${app.accent} 55%, #05060a))`,
          }}
        >
          <Icon size={24} />
        </div>
        <StatusBadge live={isLive} label={app.statusLabel} accent={app.accent} />
      </div>

      {/* Body */}
      <div className="relative mt-6 flex flex-1 flex-col">
        <p
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: app.accent }}
        >
          {app.category}
        </p>
        <h3 className="section-heading mt-2 text-2xl font-semibold text-foreground">
          {app.name}
        </h3>
        <p className="mt-2 text-sm text-muted">{app.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {app.features.map((feature) => (
            <li
              key={feature}
              className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 text-[11px] text-muted"
            >
              <Check size={11} style={{ color: app.accent }} />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
          {isLive ? (
            app.playStoreUrl ? (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor-hover
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-colors hover:bg-white"
              >
                <Play size={13} className="fill-current" />
                Get it on Google Play
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-xs font-medium text-foreground/80">
                <Play size={13} className="fill-current" style={{ color: app.accent }} />
                Live on Google Play
              </span>
            )
          ) : (
            <a
              href={`mailto:${app.notifyEmail}?subject=${encodeURIComponent(
                `Notify me: ${app.name}`
              )}&body=${encodeURIComponent(
                `Hi — please let me know when ${app.name} launches.`
              )}`}
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: app.accent }}
            >
              <Bell size={13} />
              Notify me
            </a>
          )}

          {app.privacyUrl && (
            <a
              href={app.privacyUrl}
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
            >
              <Shield size={13} />
              Privacy
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function StatusBadge({
  live,
  label,
  accent,
}: {
  live: boolean;
  label: string;
  accent: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground/80">
      <span className="relative flex h-1.5 w-1.5">
        {live && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ background: accent }}
          />
        )}
        <span
          className="relative inline-flex h-1.5 w-1.5 rounded-full"
          style={{ background: accent }}
        />
      </span>
      {label}
    </span>
  );
}
