"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";

const NeuralSphere = dynamic(
  () => import("@/components/three/neural-sphere").then((m) => m.NeuralSphere),
  { ssr: false }
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-eyebrow]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.2
      )
        .fromTo(
          "[data-hero-line]",
          { opacity: 0, y: 60, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.12 },
          0.35
        )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-scroll]",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <NeuralSphere className="h-full w-full opacity-90" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/40" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background/70 via-transparent to-background/70" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-start gap-6">
        <span
          data-hero-eyebrow
          className="glass rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-electric-2"
        >
          {siteConfig.status}
        </span>

        <h1 className="section-heading text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span data-hero-line className="block overflow-hidden">
            Engineering
          </span>
          <span data-hero-line className="block overflow-hidden text-gradient">
            Intelligence.
          </span>
          <span data-hero-line className="block overflow-hidden">
            Automating Reality.
          </span>
        </h1>

        <p
          data-hero-sub
          className="max-w-xl text-base text-muted sm:text-lg"
        >
          I&apos;m {siteConfig.name}, an {siteConfig.role.toLowerCase()}.
          I design AI systems, robotics, and automation pipelines that feel
          alive — built with precision, shipped with polish.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-4">
          <span data-hero-cta>
            <Button
              variant="electric"
              size="lg"
              onClick={() =>
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore The Lab
            </Button>
          </span>
          <span data-hero-cta>
            <Button
              variant="glass"
              size="lg"
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Start a Project
            </Button>
          </span>
        </div>
      </div>

      <div
        data-hero-scroll
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
