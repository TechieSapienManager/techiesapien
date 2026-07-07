"use client";

import { useEffect, useState } from "react";

interface PointerCapabilities {
  /** True once mounted on the client (avoids SSR/hydration mismatch). */
  ready: boolean;
  /** Coarse pointer / no hover — treat as touch. */
  isTouch: boolean;
  prefersReducedMotion: boolean;
  /** Convenience: safe to run cursor-driven motion. */
  canInteract: boolean;
}

export function usePointerCapabilities(): PointerCapabilities {
  const [state, setState] = useState<Omit<PointerCapabilities, "canInteract">>({
    ready: false,
    isTouch: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () =>
      setState({
        ready: true,
        isTouch: !fine.matches,
        prefersReducedMotion: reduced.matches,
      });

    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return {
    ...state,
    canInteract: state.ready && !state.isTouch && !state.prefersReducedMotion,
  };
}
