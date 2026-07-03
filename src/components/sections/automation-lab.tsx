import { Zap, GitBranch, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { AutomationDiagram } from "@/components/sections/automation-diagram";

const highlights = [
  {
    icon: Zap,
    title: "Event-driven triggers",
    description: "Pipelines react instantly to signals from any connected system.",
  },
  {
    icon: GitBranch,
    title: "Adaptive branching",
    description: "Agents route decisions dynamically based on confidence and policy.",
  },
  {
    icon: ShieldCheck,
    title: "Self-healing",
    description: "Failures are detected, retried, and logged without human intervention.",
  },
];

export function AutomationLab() {
  return (
    <section id="automation" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Automation Laboratory"
            title="Pipelines that run themselves."
            description="Every workflow is designed as a living system — ingesting signals, reasoning with models, and acting autonomously across your stack."
          />

          <div className="flex flex-col gap-6">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={0.1 + i * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-electric-2">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="glass rounded-3xl p-4 sm:p-8">
          <AutomationDiagram />
        </Reveal>
      </div>
    </section>
  );
}
