"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import { achievements } from "@/data/achievements";
import { cn } from "@/lib/utils";

export function AchievementsTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Timeline"
          title="How the lab was built."
          description="Seven years of shipping systems, one milestone at a time."
          align="center"
          className="mx-auto"
        />

        <div ref={containerRef} className="relative mt-20 pl-10 sm:pl-0">
          <div className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2 sm:-translate-x-1/2">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-electric via-electric-2 to-cyan"
            />
          </div>

          <div className="flex flex-col gap-14">
            {achievements.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "relative flex flex-col sm:w-1/2",
                    isEven
                      ? "sm:pr-12 sm:text-right sm:items-end"
                      : "sm:ml-auto sm:pl-12"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-electric shadow-[0_0_16px_2px_var(--electric)]",
                      "left-[-24px] sm:left-auto",
                      isEven ? "sm:right-[-6px] sm:translate-x-1/2" : "sm:left-[-6px] sm:-translate-x-1/2"
                    )}
                  />
                  <div className="glass rounded-2xl p-6">
                    <div
                      className={cn(
                        "flex items-center gap-3",
                        isEven && "sm:flex-row-reverse"
                      )}
                    >
                      <span className="font-mono text-sm text-electric-2">
                        {item.year}
                      </span>
                      <span className="rounded-full border border-border-strong px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="section-heading mt-3 text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
