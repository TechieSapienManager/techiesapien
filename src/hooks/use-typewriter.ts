"use client";

import { useEffect, useRef, useState } from "react";

export function useTypewriter(speedMs = 18) {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const type = (fullText: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText("");
    setIsTyping(true);
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setText(fullText.slice(0, i));
      if (i >= fullText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsTyping(false);
      }
    }, speedMs);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { text, isTyping, type };
}
