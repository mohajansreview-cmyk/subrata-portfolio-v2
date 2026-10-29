"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { contactTopics, promises, site, socials, whatsappLink } from "@/lib/content";
import {
  brandIcon, IconCheck, IconCopy, IconMail, IconSend, IconSpinner, IconWhatsApp,
} from "@/components/icons";
import { Magnetic, Reveal } from "@/components/motion";

/* ------------------------------------------------------------------ Form */

type Status = "idle" | "sending" | "success" | "error";

function ContactFormInner() {
  const [topic, setTopic] = useState<string>(contactTopics[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const mountedAt = useRef<number>(Date.now());
  const searchParams = useSearchParams();

  // Footer service links arrive as /contact?topic=Brand Identity Systems
  useEffect(() => {
    const t = searchParams.get("topic");
    if (!t) return;
    const match = contactTopics.find((c) => c.toLowerCase() === t.toLowerCase());
    if (match) setTopic(match);
  }, [searchParams]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    setErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic,
      message: String(data.get("message") ?? "").trim(),
      company: String(data.get("company") ?? ""), // honeypot — must stay empty
      elapsedMs: Date.now() - mountedAt.current,
    };

    // Client-side validation pass (server re-validates)
    const errs: Record<string, string> = {};
    if (payload.name.length < 2) errs.name = "Please tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) errs.email = "That email doesn't look right.";
    if (payload.message.length < 10) errs.message = "A few more details would help (10+ characters).";
    if (Object.keys(errs).length) {
      setErrors(errs);
      setStatus("error");
      setError("Please fix the highlighted fields.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        if (res.status === 429) setError(json.error ?? "Too many attempts — please try again shortly.");
        else if (res.status === 503) setError("The inbox automation isn't configured on this deployment yet. WhatsApp or email will reach me instantly.");
        else setError(json.error ?? "Something went wrong delivering your message. WhatsApp or email will reach me instantly.");
      }
    } catch {
      setStatus("error");
      setError("Network issue — your message didn't leave the browser. WhatsApp or email will reach me instantly.");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-start p-8 md:p-10" role="status">
        <span className="grid size-12 place-items-center rounded-full bg-[rgba(52,211,153,0.12)] text-status">
          <IconCheck size={20} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-mist">Message delivered.</h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mute">
          Your brief landed directly with me — expect a reply within the hour during working time
          ({site.timezone}). Need an instant answer? WhatsApp is faster.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp !py-3 text-[14px]">
            <IconWhatsApp size={15} /> Continue on WhatsApp
          </a>
          <button className="btn btn-ghost !py-3 text-[14px]" onClick={() => setStatus("idle")}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-8 md:p-10" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="hud mb-2.5 block">Your Name</label>
          <input
            id="cf-name" name="name" type="text" autoComplete="name" required
            placeholder="Jane Cooper" className={`field ${errors.name ? "field-error" : ""}`}
            maxLength={80}
          />
          {errors.name && <p className="mt-2 text-[12.5px] font-semibold text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="hud mb-2.5 block">Email</label>
          <input
            id="cf-email" name="email" type="email" autoComplete="email" required
            placeholder="jane@company.com" className={`field ${errors.email ? "field-error" : ""}`}
            maxLength={120}
          />
          {errors.email && <p className="mt-2 text-[12.5px] font-semibold text-red-400">{errors.email}</p>}
        </div>
      </div>

      {/* Honeypot — invisible to humans, catnip for bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6">
        <p className="hud mb-3">What do you need?</p>
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Project topic">
          {contactTopics.map((t) => (
            <button
              key={t} type="button" className="topic-chip"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="cf-message" className="hud mb-2.5 block">Project Brief</label>
        <textarea
          id="cf-message" name="message" required rows={6}
          placeholder="Tell me about your brand, what you're looking to design, and your timeline…"
          className={`field resize-y ${errors.message ? "field-error" : ""}`}
          maxLength={2000}
        />
        {errors.message && <p className="mt-2 text-[12.5px] font-semibold text-red-400">{errors.message}</p>}
      </div>

      {status === "error" && error && (
        <p className="mt-5 rounded-[12px] border border-red-400/30 bg-red-400/10 px-4 py-3 text-[13.5px] font-semibold text-red-300" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Magnetic>
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? <IconSpinner size={16} /> : <IconSend size={16} />}
            {status === "sending" ? "Delivering…" : "Send Project Brief"}
          </button>
        </Magnetic>
        <p className="text-[12.5px] text-dim">
          Lands directly with Subrata — no third-party inbox, no spam lists.
        </p>
      </div>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="card h-[560px] animate-pulse" aria-hidden="true" />}>
      <ContactFormInner />
    </Suspense>
  );
}

/* --------------------------------------------------------------- Section */

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch { /* clipboard unavailable — the mailto link still works */ }
  }

  return (
    <section className="section border-t border-hairline" id="contact">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="display-lg mt-5">Have a project? Let&apos;s talk.</h2>
          <p className="lead headline-gap max-w-[660px]">
            Tell me about your brand, what you&apos;re looking to design, and your timeline. Send the brief
            through the form, WhatsApp, or email — whatever suits your workflow.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal><ContactForm /></Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={80}>
              <div className="card p-8">
                <p className="hud mb-4">Prefer direct channels?</p>
                <a
                  href={whatsappLink()}
                  target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-[12px] border border-hairline bg-ink-900/50 p-4 transition-colors hover:border-[rgba(37,211,102,0.4)]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[rgba(37,211,102,0.12)] text-whatsapp">
                    <IconWhatsApp size={19} />
                  </span>
                  <span>
                    <span className="block font-display text-[14.5px] font-bold text-mist">WhatsApp — {site.whatsappNumber}</span>
                    <span className="block text-[12.5px] text-dim">Fast reply typically in &lt; 1 hour</span>
                  </span>
                </a>
                <div className="mt-3 flex items-center gap-4 rounded-[12px] border border-hairline bg-ink-900/50 p-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[rgba(3,181,231,0.1)] text-cyan-soft">
                    <IconMail size={19} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-[14px] font-bold text-mist">{site.email}</span>
                    <span className="block text-[12.5px] text-dim">For formal inquiries, proposals & project details.</span>
                  </span>
                </div>
                <div className="mt-3 flex gap-3">
                  <button onClick={copyEmail} className="btn btn-ghost flex-1 justify-center !py-3 text-[13.5px]">
                    {copied ? <IconCheck size={15} /> : <IconCopy size={15} />}
                    {copied ? "Email Copied" : "Copy Email"}
                  </button>
                  <a href={`mailto:${site.email}`} className="btn btn-primary flex-1 justify-center !py-3 text-[13.5px]">
                    <IconMail size={15} /> Write Email
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="card p-8">
                <p className="hud mb-4">Working promises</p>
                <ul className="space-y-3.5">
                  {promises.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[14px] leading-snug text-soft">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[rgba(52,211,153,0.12)] text-status">
                        <IconCheck size={11} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="card p-8">
                <p className="hud mb-4">Verified profiles</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {socials.map((s) => {
                    const Icon = brandIcon[s.icon];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank" rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 rounded-[12px] border border-hairline bg-ink-900/50 py-4 text-[11.5px] font-semibold text-mute transition-colors hover:border-hairline-2 hover:text-cyan-soft"
                      >
                        <Icon size={17} />
                        {s.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
