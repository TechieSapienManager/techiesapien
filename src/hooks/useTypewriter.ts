"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Per-character typing speed in ms. */
  speed?: number;
  /** Delay before typing starts, in ms. */
  startDelay?: number;
  /** How long a completed phrase is held before deleting, in ms. */
  holdTime?: number;
  /** Per-character deleting speed in ms. */
  deleteSpeed?: number;
  /** Loop through the phrases forever. */
  loop?: boolean;
  /** When false, immediately shows the first phrase with no animation. */
  enabled?: boolean;
}

/**
 * Types out a rotating list of phrases, character by character.
 * Returns the current text and whether the caret should be shown.
 */
export function useTypewriter(
  phrases: readonly string[],
  {
    speed = 34,
    startDelay = 600,
    holdTime = 1600,
    deleteSpeed = 18,
    loop = true,
    enabled = true,
  }: Options = {}
) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!phrases.length) return;

    if (!enabled) {
      setText(phrases[0]);
      setDone(true);
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const clear = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const tick = () => {
      const current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        setText(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          // Finished a phrase.
          if (!loop && phraseIndex === phrases.length - 1) {
            setDone(true);
            return;
          }
          deleting = true;
          timeoutRef.current = setTimeout(tick, holdTime);
          return;
        }
        timeoutRef.current = setTimeout(tick, speed);
      } else {
        charIndex--;
        setText(current.slice(0, Math.max(0, charIndex)));
        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeoutRef.current = setTimeout(tick, speed);
          return;
        }
        timeoutRef.current = setTimeout(tick, deleteSpeed);
      }
    };

    setDone(false);
    setText("");
    timeoutRef.current = setTimeout(tick, startDelay);

    return clear;
  }, [phrases, speed, startDelay, holdTime, deleteSpeed, loop, enabled]);

  // Caret shows while animating; hides only when a non-looping run completes.
  return { text, caretVisible: !done };
}
