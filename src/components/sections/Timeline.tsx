"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { timelineContent, milestones } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";

export function Timeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow={timelineContent.eyebrow}
          title={timelineContent.title}
          description={timelineContent.subtitle}
        />

        <div ref={railRef} className="relative mt-16 pl-10 sm:pl-14">
          {/* Rail */}
          <div className="absolute bottom-0 left-3 top-2 w-px bg-border sm:left-4">
            <motion.div
              style={{ scaleY: progress, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-brand via-electric-2 to-cyan"
            />
          </div>

          <div className="flex flex-col gap-12">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.period}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Dot */}
                <span
                  className="absolute top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-brand shadow-[0_0_14px_2px_var(--brand)]"
                  style={{ left: "-34px" }}
                >
                  <span className="h-1 w-1 rounded-full bg-white" />
                </span>

                <div className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm text-electric-2">
                      {milestone.period}
                    </span>
                    <span className="rounded-full border border-border-strong px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                      {milestone.tag}
                    </span>
                  </div>
                  <h3 className="section-heading mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted sm:text-base">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
