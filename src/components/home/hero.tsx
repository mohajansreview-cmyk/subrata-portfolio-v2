import Image from "next/image";
import { hero, site, whatsappLink } from "@/lib/content";
import { IconArrowDown, IconCheck, IconWhatsApp } from "@/components/icons";
import { Magnetic } from "@/components/motion";
import { HeroCanvas } from "@/components/hero-canvas";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[72px]" id="top">
      <HeroCanvas />

      <div className="shell grid items-center gap-16 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-28">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>

          <h1 className="display-xl mt-6">
            Design that makes
            <br />
            a brand <span className="text-gradient">feel considered.</span>
          </h1>

          <p className="lead headline-gap max-w-[560px]">{hero.lead}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <IconWhatsApp size={17} /> Start on WhatsApp
                <span aria-hidden="true" className="opacity-70">↗</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#work" className="btn btn-ghost">
                Selected Work <IconArrowDown size={16} />
              </a>
            </Magnetic>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {hero.reassurance.map((r) => (
              <li key={r} className="flex items-center gap-2 text-[13.5px] font-semibold text-mute">
                <span className="grid size-5 place-items-center rounded-full bg-[rgba(52,211,153,0.12)] text-status">
                  <IconCheck size={11} />
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Portrait card */}
        <div className="relative mx-auto w-full max-w-[420px]">
          <div
            className="absolute -inset-6 -z-10 rounded-[32px] opacity-70"
            style={{ background: "radial-gradient(24rem 18rem at 60% 30%, rgba(3,181,231,0.16), transparent 65%)" }}
            aria-hidden="true"
          />
          <figure className="card overflow-hidden !rounded-[24px]" data-cursor="view">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/portrait-800.webp"
                alt="Subrata Mohajan, graphic designer and brand visualizer"
                fill
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 90vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#030816] via-[#030816]/60 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="hud mb-2">Current Focus</p>
                <p className="text-[15px] font-semibold leading-snug text-mist">{hero.focus}</p>
              </figcaption>
            </div>
          </figure>
          <div className="glass absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5">
            <span className="pulse-dot" />
            <span className="font-display text-[12px] font-semibold tracking-[0.08em] text-soft">
              Remote worldwide collaboration · {site.timezone}
            </span>
          </div>
        </div>
      </div>

      {/* Trust stats */}
      <div className="border-t border-hairline">
        <div className="shell grid sm:grid-cols-3">
          {hero.stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0 ${i > 0 ? "border-t border-hairline sm:border-l sm:border-t-0" : ""}`}
            >
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-dim">{s.label}</span>
              <span className="font-display text-xl font-bold tracking-tight text-mist">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

