"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 900 }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-colors duration-500 hover:border-electric/40"
      data-cursor-hover
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: project.color }}
      />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-sm text-muted">{project.id}</span>
        <ArrowUpRight
          size={20}
          className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-electric-2"
        />
      </div>

      <div className="relative mt-16 flex flex-col gap-3" style={{ transform: "translateZ(30px)" }}>
        <span
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: project.color }}
        >
          {project.category} · {project.year}
        </span>
        <h3 className="section-heading text-3xl font-semibold text-foreground sm:text-4xl">
          {project.title}
        </h3>
        <p className="max-w-md text-sm text-muted sm:text-base">
          {project.description}
        </p>
      </div>

      <div className="relative mt-8 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border-strong px-3 py-1 text-[11px] font-medium text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
