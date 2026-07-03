"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Loader2 } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/use-typewriter";
import {
  defaultPlaygroundResponse,
  playgroundPresets,
} from "@/data/playground";

export function AIPlayground() {
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const { text, isTyping, type } = useTypewriter(16);

  const runPrompt = (prompt: string) => {
    if (thinking || isTyping) return;
    setActivePrompt(prompt);
    setThinking(true);
    const preset = playgroundPresets.find((p) => p.prompt === prompt);
    const response = preset ? preset.response : defaultPlaygroundResponse;

    window.setTimeout(() => {
      setThinking(false);
      type(response);
    }, 700 + Math.random() * 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    runPrompt(input.trim());
    setInput("");
  };

  return (
    <section id="playground" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="AI Playground"
          title="Talk to the system."
          description="A lightweight simulation of how I design conversational systems — try a preset or type your own prompt."
          align="center"
          className="mx-auto"
        />

        <div className="glass-strong mx-auto mt-16 max-w-3xl rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {playgroundPresets.map((preset) => (
              <button
                key={preset.prompt}
                onClick={() => runPrompt(preset.prompt)}
                data-cursor-hover
                className="rounded-full border border-border-strong px-4 py-2 text-xs text-muted transition-colors hover:border-electric hover:text-electric-2 disabled:opacity-40"
                disabled={thinking || isTyping}
              >
                {preset.prompt}
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-[160px] rounded-2xl border border-border bg-surface p-6">
            <AnimatePresence mode="wait">
              {!activePrompt && !thinking && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[110px] flex-col items-center justify-center gap-2 text-center text-muted"
                >
                  <Sparkles size={20} className="text-electric-2" />
                  <p className="text-sm">
                    Select a prompt or type below to activate the system.
                  </p>
                </motion.div>
              )}

              {activePrompt && (
                <motion.div
                  key={activePrompt}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-muted">You</span>
                    <p className="text-sm text-foreground">{activePrompt}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-electric-2">
                      System
                    </span>
                    <p className="min-h-[1.5em] text-sm text-foreground">
                      {thinking ? (
                        <span className="inline-flex items-center gap-2 text-muted">
                          <Loader2 size={14} className="animate-spin" />
                          synthesizing response
                        </span>
                      ) : (
                        <>
                          {text}
                          {isTyping && (
                            <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-electric align-middle" />
                          )}
                        </>
                      )}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my work, stack, or availability..."
              className="h-12 flex-1 rounded-full border border-border-strong bg-surface px-5 text-sm text-foreground placeholder:text-muted focus:border-electric focus:outline-none"
            />
            <Button
              type="submit"
              variant="electric"
              size="icon"
              className="h-12 w-12 shrink-0 rounded-full"
              disabled={thinking || isTyping}
            >
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
