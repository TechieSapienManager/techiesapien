"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { workflowEdges, workflowNodes } from "@/data/workflow";
import { cn } from "@/lib/utils";

function edgePath(fromX: number, fromY: number, toX: number, toY: number) {
  const midX = (fromX + toX) / 2;
  return `M ${fromX} ${fromY} Q ${midX} ${fromY} ${midX} ${(fromY + toY) / 2} T ${toX} ${toY}`;
}

export function AutomationDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const nodeMap = useMemo(
    () => new Map(workflowNodes.map((n) => [n.id, n])),
    []
  );

  return (
    <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3e7bfa" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#3e7bfa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="node-glow">
            <stop offset="0%" stopColor="#3e7bfa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3e7bfa" stopOpacity="0" />
          </radialGradient>
        </defs>

        {workflowEdges.map((edge, i) => {
          const from = nodeMap.get(edge.from)!;
          const to = nodeMap.get(edge.to)!;
          const d = edgePath(from.x, from.y, to.x, to.y);
          const isActive = active === from.id || active === to.id;
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <path
                id={`edge-${i}`}
                d={d}
                fill="none"
                stroke="url(#edge-gradient)"
                strokeWidth={isActive ? 0.5 : 0.3}
                className="transition-all duration-300"
              />
              <circle r={0.6} fill="#bcd4ff">
                <animateMotion
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                  path={d}
                  begin={`${i * 0.4}s`}
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {workflowNodes.map((node, i) => (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          onMouseEnter={() => setActive(node.id)}
          onMouseLeave={() => setActive(null)}
          data-cursor-hover
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div
            className={cn(
              "glass-strong flex h-14 w-14 items-center justify-center rounded-2xl text-[10px] font-semibold uppercase tracking-wide text-foreground transition-all duration-300 sm:h-16 sm:w-16 sm:text-xs",
              active === node.id && "border-electric text-electric-2 shadow-[0_0_30px_-4px_var(--electric)]"
            )}
          >
            {node.label}
          </div>
          <span
            className={cn(
              "pointer-events-none absolute top-full mt-2 w-36 rounded-lg bg-surface-2 px-2.5 py-1.5 text-center text-[10px] text-muted opacity-0 transition-opacity duration-300",
              active === node.id && "opacity-100"
            )}
          >
            {node.description}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
