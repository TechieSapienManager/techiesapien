"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Play, Copy, Check } from "lucide-react";

import { heroContent, heroStats, heroCtas, type HeroStat, type HeroCta } from "@/lib/content";
import { usePointerCapabilities } from "@/hooks/use-pointer-capabilities";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const lineWrapV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const lineV: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const { canInteract, prefersReducedMotion } = usePointerCapabilities();
  const sectionRef = useRef<HTMLElement>(null);

  // Normalized pointer position within the section (-0.5 .. 0.5).
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  // Weighty tilt, clamped to ±8deg.
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 20,
  });

  // Spotlight follows the cursor across the image.
  const spotX = useTransform(px, [-0.5, 0.5], [15, 85]);
  const spotY = useTransform(py, [-0.5, 0.5], [15, 85]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX}% ${spotY}%, rgba(30,99,233,0.45), rgba(34,211,238,0.15) 35%, transparent 60%)`;

  // Background glow + grid drift the opposite way for depth (~15px).
  const glowX = useSpring(useTransform(px, [-0.5, 0.5], [18, -18]), { stiffness: 80, damping: 20 });
  const glowY = useSpring(useTransform(py, [-0.5, 0.5], [18, -18]), { stiffness: 80, damping: 20 });
  const gridX = useSpring(useTransform(px, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 20 });
  const gridY = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 20 });

  // rAF-throttled pointer handling.
  const frame = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const handleMove = (e: React.MouseEvent) => {
    if (!canInteract) return;
    pos.current = { x: e.clientX, y: e.clientY };
    if (frame.current != null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      px.set(clamp((pos.current.x - rect.left) / rect.width - 0.5, -0.5, 0.5));
      py.set(clamp((pos.current.y - rect.top) / rect.height - 0.5, -0.5, 0.5));
    });
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  const typewriter = useTypewriter(heroContent.typewriterPhrases, {
    speed: 34,
    startDelay: 600,
    enabled: !prefersReducedMotion,
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-bg px-6 pb-16 pt-28 sm:pt-32"
    >
      {/* Soft radial brand glow behind the character */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full opacity-70 blur-[120px] lg:right-[8%]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(30,99,233,0.55) 0%, rgba(34,211,238,0.18) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Faint animated dot grid backdrop */}
      <motion.div
        aria-hidden
        style={{
          x: gridX,
          y: gridY,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent 75%)",
        }}
        className="pointer-events-none absolute inset-[-40px] opacity-60"
      />

      {/* Film grain */}
      <div className="hero-grain" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 self-center lg:grid-cols-2 lg:gap-8">
        {/* ---------- Text column ---------- */}
        <motion.div
          variants={containerV}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="show"
          className="order-2 flex max-w-2xl flex-col gap-6 lg:order-1"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemV}
            className="font-mono text-xs tracking-[0.22em] text-foreground/60"
            style={{ filter: "blur(0.2px)" }}
          >
            {heroContent.eyebrow}
          </motion.p>

          {/* Headline with per-line mask reveal */}
          <motion.h1
            variants={lineWrapV}
            className="font-display text-[clamp(40px,7vw,88px)] font-semibold leading-[1.02] tracking-tight text-foreground"
          >
            {heroContent.headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={lineV} className="block">
                  {i === heroContent.headlineLines.length - 1 ? (
                    <span
                      style={{
                        background: "linear-gradient(100deg, #f5f7fa 30%, var(--brand-2) 90%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Typewriter subline */}
          <motion.p
            variants={itemV}
            className="font-mono text-base text-foreground/70 sm:text-lg"
            aria-live="polite"
          >
            <span>{typewriter.text}</span>
            <span
              className={cn(
                "ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em]",
                typewriter.caretVisible ? "caret-blink" : "opacity-0"
              )}
              style={{ background: "var(--brand)" }}
              aria-hidden
            />
          </motion.p>

          {/* Stat band */}
          <motion.div variants={itemV}>
            <StatBand instant={prefersReducedMotion} />
          </motion.div>

          {/* CTAs — appear 400ms after load, independent of typewriter */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: 0.5, ease: "easeOut" }}
            className="mt-1 flex flex-wrap items-center gap-3"
          >
            {heroCtas.map((cta) => (
              <Pill key={cta.label} cta={cta} canInteract={canInteract} />
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- Image column ---------- */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto w-full max-w-[420px]" style={{ perspective: 1200 }}>
            <div className={cn(!prefersReducedMotion && "hero-float")}>
              <motion.div
                style={
                  canInteract
                    ? { rotateX, rotateY, transformStyle: "preserve-3d" }
                    : undefined
                }
                className="relative"
              >
                {/* Frame glow */}
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[28px] opacity-60 blur-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(30,99,233,0.5), rgba(34,211,238,0.35))",
                  }}
                />
                <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface">
                  <Image
                    src={heroContent.image.src}
                    alt={heroContent.image.alt}
                    width={heroContent.image.width}
                    height={heroContent.image.height}
                    priority
                    quality={90}
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="h-auto w-full select-none object-cover"
                    draggable={false}
                  />
                  {/* Cursor spotlight */}
                  {canInteract && (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 mix-blend-screen"
                      style={{ background: spotlight }}
                    />
                  )}
                  {/* Bottom fade for legibility with any overlaid UI */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                    style={{
                      background: "linear-gradient(to top, rgba(5,6,10,0.5), transparent)",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Stat band -------------------- */

function StatBand({ instant }: { instant: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div
      ref={ref}
      className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm text-foreground/80"
    >
      {heroStats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-6">
          {i > 0 && <span className="text-foreground/20">·</span>}
          <Stat stat={stat} active={inView} instant={instant} />
        </div>
      ))}
    </div>
  );
}

function Stat({ stat, active, instant }: { stat: HeroStat; active: boolean; instant: boolean }) {
  const count = useCountUp(stat.value, active, { instant });
  return (
    <span>
      <span className="text-lg font-semibold text-foreground">
        {count}
        {stat.suffix}
      </span>{" "}
      <span className="text-foreground/55">{stat.label}</span>
    </span>
  );
}

/* -------------------- Pill (magnetic) -------------------- */

function Pill({ cta, canInteract }: { cta: HeroCta; canInteract: boolean }) {
  const [copied, setCopied] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 15 });
  const y = useSpring(my, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canInteract) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const base =
    "inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-medium outline-none transition-[box-shadow,background,border-color,color] duration-200 focus-visible:ring-2 focus-visible:ring-brand/60";

  const variantClass: Record<HeroCta["variant"], string> = {
    solid: "text-white hover:shadow-[0_0_34px_-6px_var(--brand)]",
    glass: "glass text-foreground hover:border-brand/50 hover:shadow-[0_0_30px_-8px_var(--brand)]",
    outline:
      "border border-border-strong text-foreground hover:border-brand hover:shadow-[0_0_30px_-8px_var(--brand)]",
  };

  const inner =
    cta.variant === "solid" ? (
      <span
        className={cn(base, variantClass.solid)}
        style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
      >
        <Play size={15} className="fill-current" />
        {cta.label}
      </span>
    ) : cta.copy ? (
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(cta.copy!);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          } catch {
            /* clipboard unavailable */
          }
        }}
        className={cn(base, variantClass.outline)}
        data-cursor-hover
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied" : cta.label}
      </button>
    ) : (
      <span className={cn(base, variantClass[cta.variant])}>{cta.label}</span>
    );

  return (
    <motion.div style={{ x, y }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {cta.href ? (
        <a
          href={cta.href}
          target={cta.external ? "_blank" : undefined}
          rel={cta.external ? "noreferrer noopener" : undefined}
          data-cursor-hover
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}
