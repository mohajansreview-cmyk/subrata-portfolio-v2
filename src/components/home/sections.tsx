import Image from "next/image";
import Link from "next/link";
import { marquee, principles, projects, guides, testimonials } from "@/lib/content";
import {
  IconArrowUpRight, IconBehance, IconChart, IconHoney, IconStar, IconWhatsApp, IconExternal,
} from "@/components/icons";
import { Reveal, TiltCard } from "@/components/motion";

/* ------------------------------------------------------------------ Marquee */

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <section aria-label="Disciplines" className="overflow-hidden border-y border-hairline py-7">
      <div className="marquee items-center gap-0">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
            <span className="font-display text-lg font-semibold tracking-tight text-soft/85 md:text-xl">{item}</span>
            <span className="mx-8 inline-block size-1.5 rotate-45 bg-cyan/70" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- Work */

function OutcomeIcon({ icon }: { icon: "chart" | "honey" }) {
  return icon === "chart" ? <IconChart size={16} /> : <IconHoney size={16} />;
}

function WorkCard({ project, flip }: { project: (typeof projects)[number]; flip: boolean }) {
  const waHref = `https://wa.me/8801601168996?text=${encodeURIComponent(project.whatsapp)}`;

  return (
    <Reveal as="article">
      <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* Image */}
        <div className="tilt-scene">
          <TiltCard max={3.5} className="card overflow-hidden !rounded-[20px]" data-cursor="view">
            <div className="relative aspect-[16/10]">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <div className="tilt-layer absolute left-5 top-5">
                <span className="glass-strong rounded-full px-3.5 py-1.5 font-display text-[11px] font-bold tracking-[0.18em] text-cyan-soft">
                  PROJECT {project.index}
                </span>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Copy */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="tag">{project.category}</span>
            <span className="tag !text-cyan-soft/90">{project.formatTag}</span>
          </div>

          <h3 className="display-lg mt-5 !text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)]">
            <Link href={`/case-studies/${project.slug}`} className="transition-colors hover:text-cyan-soft">
              {project.title}
            </Link>
          </h3>

          <p className="mt-5 text-[15.5px] leading-relaxed text-mute">{project.summary}</p>

          <div className="outcome mt-6 max-w-xl">
            <span className="mt-0.5 shrink-0 text-gold"><OutcomeIcon icon={project.outcomeIcon} /></span>
            <span>{project.outcome}</span>
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 text-[13px] sm:grid-cols-3">
            <div>
              <dt className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-dim">Role</dt>
              <dd className="mt-1 font-semibold leading-snug text-soft">{project.role}</dd>
            </div>
            <div>
              <dt className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-dim">Format</dt>
              <dd className="mt-1 font-semibold leading-snug text-soft">{project.format}</dd>
            </div>
            <div>
              <dt className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-dim">Context</dt>
              <dd className="mt-1 font-semibold leading-snug text-soft">{project.context}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/case-studies/${project.slug}`} className="btn btn-primary !py-3 !px-6 text-[14px]">
              Read Case Study <IconArrowUpRight size={15} />
            </Link>
            <a href={project.behance} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-3 !px-6 text-[14px]">
              <IconBehance size={15} /> Behance
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-3 !px-6 text-[14px]">
              <IconWhatsApp size={15} /> Discuss Similar
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-mute transition-colors hover:text-cyan-soft">
                <IconExternal size={13} /> carvendors.co.uk
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Work() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Selected Work</p>
          <h2 className="display-lg mt-5">A curated selection of focused projects.</h2>
          <p className="lead headline-gap max-w-[640px]">
            Real work where typographic hierarchy, visual order, and brand consistency were the priority.
          </p>
        </Reveal>

        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {projects.map((p, i) => (
            <WorkCard key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        <Reveal className="mt-16 flex justify-center">
          <a
            href="https://www.behance.net/Subrata_Mohajan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <IconBehance size={16} /> View full Behance portfolio
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Principles */

export function Principles() {
  return (
    <section className="section border-t border-hairline" id="principles">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Design Principles</p>
          <h2 className="display-lg mt-5">The quiet decisions behind finished work.</h2>
          <p className="lead headline-gap max-w-[640px]">
            Four standards that separate generic visuals from enduring, high-converting design.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="card group h-full p-8 md:p-10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    {p.keys.map((k) => (
                      <kbd key={k} className="keycap">{k}</kbd>
                    ))}
                    <span className="ml-1 font-display text-[13px] font-semibold tracking-[0.12em] text-dim">
                      {p.tool}
                    </span>
                  </div>
                  <span className="font-display text-[12px] font-bold tracking-[0.2em] text-dim/70">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[21px] font-bold tracking-tight text-mist">{p.title}</h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-mute">{p.body}</p>
                <p className="mt-6 border-t border-hairline pt-5 font-display text-[12px] font-semibold tracking-[0.14em] text-cyan-soft/90">
                  {p.metric}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Testimonials */

export function Testimonials() {
  return (
    <section className="section border-t border-hairline" id="testimonials">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Verified Social Proof</p>
          <h2 className="display-lg mt-5">Endorsed by clients across the UK & Bangladesh.</h2>
          <p className="lead headline-gap max-w-[640px]">
            Authentic feedback from business leaders and founders who rely on disciplined visual execution.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 100}>
              <figure className="card flex h-full flex-col p-8">
                <span className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => <IconStar key={s} />)}
                </span>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-soft">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-hairline pt-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-hairline-2 bg-ink-800 font-display text-[13px] font-bold tracking-wide text-cyan-soft">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-display text-[14.5px] font-bold text-mist">{t.author}</span>
                    <span className="block text-[12.5px] text-dim">{t.context}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Guides */

export function Guides() {
  return (
    <section className="section border-t border-hairline" id="guides">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Knowledge Hub</p>
          <h2 className="display-lg mt-5">Field notes from production floors.</h2>
          <p className="lead headline-gap max-w-[640px]">
            Written from live campaign and press work — the physics, grids and color science behind the portfolio.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.title} delay={i * 100}>
              <a
                href={`https://subrata.fedardokan.com/learn/#guide-${i + 1}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="tag !text-cyan-soft/90">{g.tag}</span>
                  <span className="text-[12px] font-semibold text-dim">{g.readTime}</span>
                </div>
                <h3 className="mt-6 flex-1 font-display text-[19px] font-bold leading-snug tracking-tight text-mist transition-colors group-hover:text-cyan-soft">
                  {g.title}
                </h3>
                <span className="mt-7 inline-flex items-center gap-1.5 font-display text-[13px] font-semibold tracking-wide text-mute transition-colors group-hover:text-cyan-soft">
                  Read on the Knowledge Hub <IconArrowUpRight size={13} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
