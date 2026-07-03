"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

export function LazyMount({
  children,
  fallback,
  className,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} className={className}>
      {inView ? children : fallback}
    </div>
  );
}
