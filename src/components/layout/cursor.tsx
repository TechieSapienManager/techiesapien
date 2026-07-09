"use client";

import { useEffect, useRef, useState } from "react";

import { usePointerCapabilities } from "@/hooks/use-pointer-capabilities";
import { cn } from "@/lib/utils";

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
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, input, textarea, [data-cursor-hover]"));
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
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div
          className={cn(
            "transition-[width,height,border-radius,background-color,border-color] duration-200 ease-out",
            !hovering && "caret-blink"
          )}
          style={{
            width: hovering ? 30 : 9,
            height: hovering ? 30 : 20,
            borderRadius: hovering ? 9 : 2,
            backgroundColor: hovering ? "transparent" : "var(--brand)",
            border: hovering ? "1.5px solid var(--brand)" : "1.5px solid transparent",
            boxShadow: hovering ? "none" : "0 0 10px -2px var(--brand)",
          }}
        />
      </div>
    </div>
  );
}
