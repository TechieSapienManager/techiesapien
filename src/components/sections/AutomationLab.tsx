"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Globe,
  Sparkles,
  Filter,
  Wand2,
  Database,
  Bell,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import {
  automationContent,
  type FlowNode,
  type FlowNodeType,
} from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const nodeIcons: Record<FlowNodeType, LucideIcon> = {
  trigger: Zap,
  http: Globe,
  ai: Sparkles,
  filter: Filter,
  transform: Wand2,
  action: Database,
  notify: Bell,
};

export function AutomationLab() {
  const [active, setActive] = useState(0);
  const workflow = automationContent.workflows[active];

  return (
    <section id="automation" className="relative overflow-hidden px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(30,99,233,0.35), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow={automationContent.eyebrow}
              title={automationContent.title}
              description={automationContent.subtitle}
            />
            <div className="mt-2 flex flex-col gap-4">
              {automationContent.capabilities.map((cap, i) => (
                <Reveal key={cap.title} delay={0.1 + i * 0.08}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <div>
                      <h3 className="font-medium text-foreground">{cap.title}</h3>
                      <p className="text-sm text-muted">{cap.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <a
                href="#contact"
                data-cursor-hover
                className="inline-flex items-center gap-2 self-start rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-electric-2"
              >
                Automate something
                <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>

          {/* Workflow canvas */}
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-5 sm:p-6">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2">
                {automationContent.workflows.map((wf, i) => (
                  <button
                    key={wf.id}
                    onClick={() => setActive(i)}
                    data-cursor-hover
                    className={cn(
                      "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                      i === active
                        ? "bg-electric text-white"
                        : "border border-border-strong text-muted hover:text-foreground"
                    )}
                  >
                    {wf.name}
                  </button>
                ))}
              </div>

              {/* Flow */}
              <div className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6">
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col md:flex-row md:items-stretch"
                >
                  {workflow.nodes.map((node, i) => (
                    <div
                      key={`${workflow.id}-${i}`}
                      className="flex flex-col md:flex-1 md:flex-row md:items-center"
                    >
                      <FlowNodeCard node={node} index={i} />
                      {i < workflow.nodes.length - 1 && <Connector index={i} />}
                    </div>
                  ))}
                </motion.div>

                <p className="mt-5 text-center font-mono text-[11px] text-muted">
                  {automationContent.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FlowNodeCard({ node, index }: { node: FlowNode; index: number }) {
  const Icon = nodeIcons[node.type];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="group relative flex items-center gap-3 rounded-xl border border-border-strong bg-surface-2 p-3 md:flex-col md:gap-2 md:p-3 md:text-center"
      data-cursor-hover
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-electric/15 text-electric-2">
        <Icon size={16} />
      </div>
      <div className="md:mt-0.5">
        <p className="text-xs font-semibold text-foreground">{node.label}</p>
        <p className="text-[10px] leading-tight text-muted md:hidden">{node.note}</p>
      </div>
      {/* Desktop tooltip */}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-36 -translate-x-1/2 rounded-lg bg-surface-2 px-2.5 py-1.5 text-center text-[10px] text-muted opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 md:block">
        {node.note}
      </span>
    </motion.div>
  );
}

function Connector({ index }: { index: number }) {
  const delay = `${index * 0.5}s`;
  return (
    <div className="relative flex items-center justify-center py-2 md:flex-1 md:py-0">
      {/* Vertical line (mobile) */}
      <div className="relative h-6 w-px bg-border-strong md:hidden">
        <span
          className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-electric shadow-[0_0_8px_var(--electric)] [animation:flow-dot-y_2.2s_linear_infinite]"
          style={{ animationDelay: delay }}
        />
      </div>
      {/* Horizontal line (desktop) */}
      <div className="relative hidden h-px w-full bg-border-strong md:block">
        <span
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-electric shadow-[0_0_8px_var(--electric)] [animation:flow-dot-x_2.2s_linear_infinite]"
          style={{ animationDelay: delay }}
        />
      </div>
    </div>
  );
}
