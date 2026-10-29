import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { whatsappLink } from "@/lib/content";
import { IconArrowUpRight, IconBehance, IconChart, IconCheck, IconHoney, IconWhatsApp } from "@/components/icons";
import { Magnetic, Reveal } from "@/components/motion";

export function CaseStudy({ project }: { project: Project }) {
  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden pt-[72px]">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(42rem 26rem at 75% 0%, rgba(3,181,231,0.12), transparent 62%), radial-gradient(34rem 22rem at 15% 50%, rgba(1,92,177,0.1), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="shell pb-14 pt-16 md:pt-24">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8 text-[12.5px] font-semibold text-dim">
              <Link href="/" className="transition-colors hover:text-cyan-soft">Home</Link>
              <span className="mx-2.5 text-hairline-3">/</span>
              <span className="text-mute">Case Study {project.index}</span>
            </nav>
            <span className="tag">{project.category}</span>
            <h1 className="display-xl mt-6 !text-[clamp(2.25rem,1.2rem+3.8vw,4.25rem)]">{project.title}</h1>
            <p className="lead headline-gap max-w-[680px]">{project.summary}</p>
          </Reveal>
        </div>
      </header>

      {/* Hero image */}
      <Reveal className="shell">
        <div className="lab-frame">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={1800}
            height={1012}
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="block h-auto w-full"
          />
        </div>
      </Reveal>

      {/* Meta strip */}
      <Reveal className="shell mt-10">
        <dl className="grid gap-5 rounded-[20px] border border-hairline bg-ink-900/50 p-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Client", project.client],
            ["Role", project.role],
            ["Deliverables", project.deliverables],
            ["Context", project.context],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="hud !text-dim">{k}</dt>
              <dd className="mt-2 text-[14px] font-semibold leading-snug text-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Outcome */}
      <Reveal className="shell mt-10">
        <div className="outcome !max-w-none !items-center !p-6 md:!px-8">
          <span className="shrink-0 text-gold">
            {project.outcomeIcon === "chart" ? <IconChart size={20} /> : <IconHoney size={20} />}
          </span>
          <p className="font-display text-[15.5px] font-bold tracking-tight md:text-[16.5px]">{project.outcome}</p>
        </div>
      </Reveal>

      {/* Objectives + challenges */}
      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Brief & Objectives</p>
            <h2 className="display-lg mt-5 !text-[clamp(1.7rem,1.1rem+1.8vw,2.5rem)]">
              What the work had to achieve.
            </h2>
            <ul className="mt-8 space-y-4">
              {project.objectives.map((o) => (
                <li key={o} className="flex items-start gap-3 text-[15px] leading-relaxed text-soft">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-[rgba(52,211,153,0.12)] text-status">
                    <IconCheck size={11} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={`https://wa.me/8801601168996?text=${encodeURIComponent(project.whatsapp)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-whatsapp !py-3 text-[14px]"
                >
                  <IconWhatsApp size={15} /> Discuss a similar project
                </a>
              </Magnetic>
              <a href={project.behance} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-3 text-[14px]">
                <IconBehance size={15} /> View on Behance <IconArrowUpRight size={13} />
              </a>
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-mute transition-colors hover:text-cyan-soft"
              >
                Live deployment: {project.liveUrl.replace("https://", "")} <IconArrowUpRight size={12} />
              </a>
            )}
          </Reveal>

          <div className="flex flex-col gap-5">
            {project.challenges.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div className="card p-8">
                  <h3 className="font-display text-[18px] font-bold tracking-tight text-mist">
                    <span className="mr-3 font-display text-[13px] font-bold tracking-[0.2em] text-cyan-soft">0{i + 1}</span>
                    {c.title}
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-mute">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
