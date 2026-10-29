"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { IconPlus } from "@/components/icons";
import { Reveal } from "@/components/motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section border-t border-hairline" id="faq">
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="display-lg mt-5">Transparent process, contracts & deliverables.</h2>
          <p className="lead headline-gap max-w-[480px]">
            Everything international clients usually ask before the first invoice — answered plainly.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="border-t border-hairline">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="faq-item" data-open={isOpen}>
                  <h3>
                    <button
                      className="faq-trigger flex items-center justify-between gap-6 py-6"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className="font-display text-[16.5px] font-bold leading-snug tracking-tight text-mist md:text-[17.5px]">
                        {f.q}
                      </span>
                      <span className="faq-icon grid size-8 shrink-0 place-items-center rounded-full border border-hairline-2 text-cyan-soft">
                        <IconPlus size={14} />
                      </span>
                    </button>
                  </h3>
                  <div className="faq-body" id={`faq-panel-${i}`} role="region" aria-hidden={!isOpen}>
                    <div>
                      <p className="max-w-[600px] pb-7 text-[14.5px] leading-relaxed text-mute">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
