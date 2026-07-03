"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/providers/smooth-scroll-provider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => handleNavigate("#top")}
          className={cn(
            "glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-all duration-500",
            scrolled ? "opacity-100" : "opacity-90"
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          <span className="font-display">{siteConfig.name}</span>
        </button>

        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-2 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavigate(link.href)}
              className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => handleNavigate("#contact")}
          className="glass hidden rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-electric hover:text-electric-2 lg:block"
        >
          Initiate Contact
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className="glass rounded-full p-2.5 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-strong mx-4 mt-3 flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate("#contact")}
              className="mt-1 rounded-xl bg-electric px-4 py-3 text-left text-sm font-semibold text-white"
            >
              Initiate Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
