"use client";

import { useEffect, useRef, useState } from "react";

import { usePointerCapabilities } from "@/hooks/use-pointer-capabilities";

export function Cursor() {
  const { ready, isTouch } = usePointerCapabilities();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!ready || isTouch) return;

    const pos = { x: -100, y: -100 };
    let raf = 0;
    const loop = () => {
      if (wrapRef.current) {
        // Direct transform every frame — instant follow, no spring lag.
        wrapRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (hidden) setHidden(false);
    };
    const over = (e: MouseEvent) => {
      // e.target can be a non-Element (e.g. the document) — guard before .closest.
      const el = e.target instanceof Element ? e.target : null;
      setHovering(
        !!el?.closest("a, button, input, textarea, [data-cursor-hover]")
      );
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [ready, isTouch, hidden]);

  if (!ready || isTouch) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.2s" }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        className="transition-transform duration-150 ease-out"
        style={{
          transform: hovering ? "scale(1.35)" : "scale(1)",
          transformOrigin: "4px 3px",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))",
        }}
      >
        {/* Classic pointer arrow; tip sits at ~(4,3) = the actual pointer point */}
        <path
          d="M4 3 L4 20.5 L8.7 16.2 L11.6 22.5 L14.4 21.3 L11.5 15.2 L18 15.2 Z"
          fill="var(--brand)"
          stroke="#ffffff"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
