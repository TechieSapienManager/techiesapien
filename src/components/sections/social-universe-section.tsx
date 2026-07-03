"use client";

import dynamic from "next/dynamic";

import { SectionHeading } from "@/components/ui/section-heading";
import { LazyMount } from "@/components/ui/lazy-mount";
import { socialPlanets } from "@/data/social";

const SocialUniverse = dynamic(
  () => import("@/components/three/social-universe").then((m) => m.SocialUniverse),
  { ssr: false }
);

export function SocialUniverseSection() {
  return (
    <section id="universe" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Social Universe"
          title="Find me in orbit."
          description="Every planet is a channel — click one to connect."
          align="center"
          className="mx-auto"
        />

        <LazyMount
          className="relative mt-16 h-[520px] w-full overflow-hidden rounded-3xl border border-border sm:h-[600px]"
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-wrap justify-center gap-3 px-6">
                {socialPlanets.map((p) => (
                  <span
                    key={p.id}
                    className="glass rounded-full px-4 py-2 text-xs text-muted"
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          }
        >
          <SocialUniverse className="h-full w-full" />
        </LazyMount>
      </div>
    </section>
  );
}
