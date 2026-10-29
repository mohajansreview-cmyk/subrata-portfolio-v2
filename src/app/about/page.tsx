import type { Metadata } from "next";
import Image from "next/image";
import { about, site, whatsappLink } from "@/lib/content";
import { IconCheck, IconWhatsApp } from "@/components/icons";
import { Magnetic, Reveal } from "@/components/motion";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "About Subrata Mohajan — Graphic Designer & Brand Visualizer",
  description:
    "Biography, philosophy and commercial experience of Subrata Mohajan — graphic designer & brand visualizer from Chattogram, Bangladesh, working remotely with brands across the UK, USA, Europe and Asia.",
  alternates: { canonical: "/about" },
  openGraph: { title: `About ${site.name}`, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero / bio header */}
      <section className="relative overflow-hidden pt-[72px]">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(44rem 30rem at 78% 0%, rgba(3,181,231,0.12), transparent 62%), radial-gradient(36rem 24rem at 12% 40%, rgba(1,92,177,0.12), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="shell grid items-start gap-14 pb-16 pt-16 md:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <span className="chip">{about.badge}</span>
            <h1 className="display-xl mt-6 !text-[clamp(2.5rem,1.2rem+4.4vw,4.5rem)]">
              The intersection of visual discipline & commercial clarity.
            </h1>
            <p className="lead headline-gap max-w-[600px]">{about.lead}</p>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7">
              {about.meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-dim">{m.label}</dt>
                  <dd className="mt-1.5 font-display text-[15px] font-bold text-mist">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap gap-4">
              <Magnetic>
                <a href={whatsappLink("Hi Subrata, I read your bio and would like to collaborate.")} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <IconWhatsApp size={16} /> Collaborate with me
                </a>
              </Magnetic>
              <a href="#contact" className="btn btn-ghost">Send a project brief</a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <figure className="card overflow-hidden !rounded-[24px]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/portrait-800.webp"
                  alt="Subrata Mohajan — portrait"
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 90vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#030816] to-transparent" />
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Pull quote */}
      <section className="border-y border-hairline bg-ink-900/40">
        <div className="shell py-20 md:py-24">
          <Reveal>
            <blockquote className="mx-auto max-w-[840px] text-center">
              <p className="font-display text-[clamp(1.5rem,1.1rem+2vw,2.5rem)] font-bold leading-snug tracking-tight text-mist">
                <span className="text-gradient">&ldquo;{about.pullQuote}&rdquo;</span>
              </p>
              <footer className="mt-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-dim">
                — {site.name}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Experience */}
      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Track Record</p>
            <h2 className="display-lg mt-5 !text-[clamp(1.8rem,1.1rem+2vw,2.75rem)]">
              {about.experienceTitle}
            </h2>
          </Reveal>
          <div className="flex flex-col">
            {about.experiences.map((e, i) => (
              <Reveal key={e.name} delay={i * 80}>
                <div className="flex flex-col gap-2 border-b border-hairline py-7 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
                  <h3 className="font-display text-[19px] font-bold tracking-tight text-mist">{e.name}</h3>
                  <p className="max-w-md text-[14px] leading-relaxed text-mute">{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section border-t border-hairline">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Method</p>
            <h2 className="display-lg mt-5">{about.pillarsTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {about.pillars.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <div className="card h-full p-8">
                  <div className="flex items-center gap-4">
                    <span className="grid size-10 place-items-center rounded-full border border-hairline-2 bg-ink-800 font-display text-[13px] font-bold text-cyan-soft">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-[19px] font-bold tracking-tight text-mist">{p.name}</h3>
                  </div>
                  <p className="mt-5 text-[14.5px] leading-relaxed text-mute">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14" delay={100}>
            <div className="card p-8 md:p-10">
              <p className="hud mb-5">Toolchain</p>
              <ul className="flex flex-wrap gap-2.5">
                {about.toolchain.map((t) => (
                  <li key={t} className="chip !text-soft">{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="mt-10" delay={150}>
            <p className="mx-auto max-w-[680px] text-center text-[13px] leading-relaxed text-dim">
              Not to be confused with late Indian politician Subrata Mukherjee or Bangladeshi film actor
              Subrata Chakraborty — this is the designer {site.name}, {site.location}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values strip */}
      <section className="border-t border-hairline bg-ink-900/40">
        <div className="shell grid gap-6 py-14 sm:grid-cols-3">
          {["Clarity over noise", "Physics before decoration", "Systems, not one-offs"].map((v) => (
            <p key={v} className="flex items-center gap-3 font-display text-[15px] font-bold text-mist">
              <span className="grid size-6 place-items-center rounded-full bg-[rgba(52,211,153,0.12)] text-status">
                <IconCheck size={12} />
              </span>
              {v}
            </p>
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
