"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { usePointerCapabilities } from "@/hooks/use-pointer-capabilities";

export function Cursor() {
  const { ready, isTouch } = usePointerCapabilities();
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Dot tracks precisely; ring trails with a softer spring.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 1000, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 40, mass: 0.2 });

  useEffect(() => {
    if (!ready || isTouch) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, input, textarea, [data-cursor-hover]"));
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [ready, isTouch, x, y]);

  if (!ready || isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ mixBlendMode: "difference", opacity: hidden ? 0 : 1, transition: "opacity 0.2s" }}
      aria-hidden
    >
      {/* Trailing ring */}
      <motion.div
        style={{ translateX: ringX, translateY: ringY }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 34,
            height: hovering ? 56 : 34,
            borderColor: hovering ? "var(--brand-2)" : "#ffffff",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="rounded-full border"
        />
      </motion.div>

      {/* Precise dot */}
      <motion.div
        style={{ translateX: dotX, translateY: dotY }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hovering ? 0.5 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="h-1.5 w-1.5 rounded-full bg-white"
        />
      </motion.div>
    </div>
  );
}
