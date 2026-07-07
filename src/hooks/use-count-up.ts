"use client";

import { useEffect, useRef, useState } from "react";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 up to `target` once `active` becomes true.
 * When `instant` is set (reduced motion), the target is shown immediately.
 */
export function useCountUp(
  target: number,
  active: boolean,
  { duration = 1600, instant = false }: { duration?: number; instant?: boolean } = {}
) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (instant || duration <= 0) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration, instant]);

  return value;
}
