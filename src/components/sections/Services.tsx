"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  AppWindow,
  LayoutTemplate,
  Workflow,
  Clapperboard,
  PenTool,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import { servicesContent, services, type ServiceKey } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";

const serviceIcons: Record<ServiceKey, LucideIcon> = {
  android: Smartphone,
  web: AppWindow,
  landing: LayoutTemplate,
  automation: Workflow,
  ai: Clapperboard,
  design: PenTool,
};

export function Services() {
  return (
    <section id="services" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={servicesContent.eyebrow}
          title={servicesContent.title}
          description={servicesContent.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.key];
            return (
              <motion.a
                key={service.key}
                href="#contact"
                data-cursor-hover
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="glass flex h-12 w-12 items-center justify-center rounded-xl text-electric-2 transition-colors duration-300 group-hover:text-cyan">
                    <Icon size={20} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand group-hover:opacity-100"
                  />
                </div>

                <h3 className="section-heading text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{service.description}</p>

                <span className="mt-5 inline-flex items-center rounded-full border border-border-strong px-3 py-1 text-[11px] font-medium text-foreground/70">
                  {service.tag}
                </span>

                <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-brand/0 blur-3xl transition-all duration-500 group-hover:bg-brand/20" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
