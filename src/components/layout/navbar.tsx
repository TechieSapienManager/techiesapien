"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { navLinks, navCta, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { ThemeToggle } from "@/components/layout/theme-toggle";

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

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  const navigate = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => navigate("#top")}
          className="group flex items-center gap-2 font-display text-[22px] font-semibold tracking-tight text-foreground"
          data-cursor-hover
        >
          <span
            aria-hidden
            className="text-brand transition-transform duration-500 group-hover:rotate-90"
            style={{ color: "var(--brand)" }}
          >
            ✳
          </span>
          {site.name}
        </button>

        {/* Center links — single glass pill behind all four */}
        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-foreground/80 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground"
              data-cursor-hover
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <button
            onClick={() => navigate(navCta.href)}
            className="group relative hidden text-sm font-medium text-foreground md:inline-block"
            data-cursor-hover
          >
            {navCta.label}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-foreground/70 transition-transform duration-300 group-hover:scale-x-0" />
            <span
              className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
              style={{ background: "var(--brand)" }}
            />
          </button>

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block h-0.5 w-6 bg-foreground"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-6 bg-foreground"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block h-0.5 w-6 bg-foreground"
            />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{
              background: "color-mix(in srgb, var(--bg) 95%, transparent)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {[...navLinks, navCta].map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
                onClick={() => navigate(link.href)}
                className="font-display text-[32px] font-medium text-foreground"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
