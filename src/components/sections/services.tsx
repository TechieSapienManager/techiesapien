import { Check } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="Ways we can build together."
          description="From first architecture sketch to production-grade deployment — choose the depth of collaboration that fits."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <div
                data-cursor-hover
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-electric/40"
              >
                <div className="glass mb-6 flex h-12 w-12 items-center justify-center rounded-xl text-electric-2 transition-colors duration-300 group-hover:text-cyan">
                  <service.icon size={20} />
                </div>
                <h3 className="section-heading text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
                <ul className="mt-5 flex flex-col gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-xs text-muted"
                    >
                      <Check size={13} className="text-electric-2" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-electric/0 blur-3xl transition-all duration-500 group-hover:bg-electric/20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
