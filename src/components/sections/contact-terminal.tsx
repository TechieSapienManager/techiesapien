"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site";

const bootLines = [
  "$ initializing techie_sapien --contact",
  "> loading identity module... done",
  `> location: ${siteConfig.location}`,
  `> status: ${siteConfig.status}`,
  "> awaiting transmission...",
];

type Status = "idle" | "sending" | "sent";

export function ContactTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (visibleLines >= bootLines.length) {
      const t = window.setTimeout(() => setFormVisible(true), 300);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setVisibleLines((v) => v + 1), 350);
    return () => window.clearTimeout(t);
  }, [visibleLines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("sending");

    const subject = encodeURIComponent(`New transmission from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.setTimeout(() => {
      setStatus("sent");
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    }, 900);
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Contact"
          title="Open a channel."
          description="No forms, no friction — just a direct line to the lab."
          align="center"
          className="mx-auto"
        />

        <div className="glass-strong mt-16 overflow-hidden rounded-2xl border border-border-strong font-mono">
          <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted">
              guest@techiesapien: ~/contact
            </span>
          </div>

          <div className="p-6 text-sm sm:p-8">
            <div className="flex flex-col gap-1.5">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={
                    line.startsWith("$")
                      ? "text-foreground"
                      : "text-electric-2"
                  }
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {formVisible && (
              <motion.form
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-4"
              >
                {status !== "sent" ? (
                  <>
                    <TerminalField label="name" value={name} onChange={setName} />
                    <TerminalField
                      label="email"
                      type="email"
                      value={email}
                      onChange={setEmail}
                    />
                    <TerminalTextarea
                      label="message"
                      value={message}
                      onChange={setMessage}
                    />

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor-hover
                      className="mt-2 flex items-center gap-2 self-start rounded-lg bg-electric px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-electric-2 disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                          transmitting...
                        </>
                      ) : (
                        "./send_message.sh"
                      )}
                    </button>
                  </>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-electric-2"
                  >
                    &gt; transmission complete. opening mail client...
                  </motion.p>
                )}
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="w-24 shrink-0 text-electric-2">{label} &gt;</span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full flex-1 border-b border-border-strong bg-transparent py-1.5 text-foreground outline-none focus:border-electric"
      />
    </label>
  );
}

function TerminalTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5 sm:flex-row sm:gap-3">
      <span className="w-24 shrink-0 pt-1.5 text-electric-2">{label} &gt;</span>
      <textarea
        required
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full flex-1 resize-none border-b border-border-strong bg-transparent py-1.5 text-foreground outline-none focus:border-electric"
      />
    </label>
  );
}
