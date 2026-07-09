"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, MapPin, ArrowUpRight } from "lucide-react";

import { contactContent, contactSocials, web3formsKey } from "@/lib/content";
import { brandIcons } from "@/components/icons/brand-icons";
import { SectionHeading } from "@/components/ui/section-heading";

const bootLines = [
  "$ ./open_channel.sh",
  "> loading identity module... done",
  `> role: ${contactContent.role}`,
  `> location: ${contactContent.location}`,
  `> status: ${contactContent.status}`,
  "> awaiting transmission...",
];

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (visibleLines >= bootLines.length) {
      const t = window.setTimeout(() => setFormVisible(true), 300);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setVisibleLines((v) => v + 1), 320);
    return () => window.clearTimeout(t);
  }, [visibleLines]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || status === "sending") return;
    if (botcheck) return; // honeypot: silently drop bots
    if (!web3formsKey) {
      // Not configured yet — surface the direct email instead of failing quietly.
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `New message from ${name} — techiesapien.com`,
          from_name: name,
          name,
          email,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSentName(name.trim());
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactContent.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={contactContent.eyebrow}
          title={contactContent.title}
          description={contactContent.subtitle}
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Terminal */}
          <div className="glass-strong overflow-hidden rounded-2xl border border-border-strong font-mono">
            <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-muted">techiesapien: ~/contact</span>
            </div>

            <div className="p-6 text-sm sm:p-8">
              <div className="flex flex-col gap-1.5">
                {bootLines.slice(0, visibleLines).map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={line.startsWith("$") ? "text-foreground" : "text-electric-2"}
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
                  {status === "sent" ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-2"
                    >
                      <p className="text-electric-2">
                        &gt; message received{" "}
                        <span className="text-[#28c840]">✓</span>
                      </p>
                      <p className="text-foreground">
                        Thanks{sentName ? `, ${sentName}` : ""} — your message
                        landed in my inbox. I&apos;ll get back to you within 1–2
                        days.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        data-cursor-hover
                        className="mt-1 self-start text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
                      >
                        send another
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <TerminalField label="name" value={name} onChange={setName} />
                      <TerminalField
                        label="email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                      />
                      <TerminalTextarea label="message" value={message} onChange={setMessage} />

                      {/* Honeypot — hidden from humans, catches bots */}
                      <input
                        type="text"
                        name="botcheck"
                        tabIndex={-1}
                        autoComplete="off"
                        value={botcheck}
                        onChange={(e) => setBotcheck(e.target.value)}
                        className="hidden"
                        aria-hidden
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
                            sending...
                          </>
                        ) : (
                          "./send_message.sh"
                        )}
                      </button>

                      {status === "error" && (
                        <p className="text-xs text-[#ff6b6b]">
                          &gt; couldn&apos;t send that. Please email me directly at{" "}
                          <a
                            href={`mailto:${contactContent.email}`}
                            className="underline underline-offset-2"
                          >
                            {contactContent.email}
                          </a>
                          .
                        </p>
                      )}
                    </>
                  )}
                </motion.form>
              )}
            </div>
          </div>

          {/* Direct lines */}
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="glass flex flex-col gap-3 rounded-2xl p-5">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                Direct line
              </span>
              <a
                href={`mailto:${contactContent.email}`}
                data-cursor-hover
                className="text-lg font-medium text-foreground transition-colors hover:text-electric-2"
              >
                {contactContent.email}
              </a>
              <button
                onClick={copyEmail}
                data-cursor-hover
                className="inline-flex items-center gap-2 self-start rounded-full border border-border-strong px-3 py-1.5 text-xs text-muted transition-colors hover:border-brand hover:text-foreground"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>

            {/* Location */}
            <div className="glass flex items-center gap-3 rounded-2xl p-5">
              <MapPin size={16} style={{ color: "var(--brand-2)" }} />
              <span className="text-sm text-muted">{contactContent.location}</span>
            </div>

            {/* Socials */}
            <div className="glass flex flex-col gap-2 rounded-2xl p-3">
              {contactSocials.map((social) => {
                const Icon = brandIcons[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor-hover
                    className="group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-foreground/5"
                  >
                    <Icon className="h-4 w-4 text-foreground/80" />
                    <span className="text-sm font-medium text-foreground">{social.label}</span>
                    <span className="text-xs text-muted">{social.handle}</span>
                    <ArrowUpRight
                      size={14}
                      className="ml-auto text-muted opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                );
              })}
            </div>
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
      <span className="w-20 shrink-0 text-electric-2">{label} &gt;</span>
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
      <span className="w-20 shrink-0 pt-1.5 text-electric-2">{label} &gt;</span>
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
