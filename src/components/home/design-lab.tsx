"use client";

import { useRef, useState } from "react";
import { IconEye, IconGrid, IconTimer } from "@/components/icons";
import { Reveal } from "@/components/motion";

/**
 * Interactive Design Lab — optical stress-testing in real time.
 * 1) Highway glance simulator: blurs the billboard, then reveals it in a
 *    simulated 3.0s perception window at 50 mph.
 * 2) 12-column Swiss grid toggle over the same frame.
 */
export function DesignLab() {
  const [glance, setGlance] = useState<"idle" | "blur" | "reveal">("idle");
  const [grid, setGrid] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runGlance = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setGlance("blur");
    // next frame: animate the 3s perception bar, then reveal
    requestAnimationFrame(() => {
      const bar = barRef.current;
      if (bar) {
        bar.style.transition = "none";
        bar.style.transform = "scaleX(0)";
        requestAnimationFrame(() => {
          bar.style.transition = "transform 3s linear";
          bar.style.transform = "scaleX(1)";
        });
      }
      timerRef.current = setTimeout(() => setGlance("reveal"), 3000);
    });
  };

  return (
    <section className="section border-t border-hairline" id="lab">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Interactive Design Lab</p>
          <h2 className="display-lg mt-5">Optical stress-testing in real time.</h2>
          <p className="lead headline-gap max-w-[660px]">
            A working demonstration of how the work is validated before it ships — simulated perception
            windows, grid architecture, and the tolerances that decide whether a layout survives contact
            with the real world.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="card p-5 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <button
                  className="btn btn-primary !py-2.5 !px-5 text-[13.5px]"
                  onClick={runGlance}
                  disabled={glance === "blur"}
                >
                  <IconTimer size={15} /> Simulate 3.0s Highway Glance
                </button>
                <button
                  className="btn btn-ghost !py-2.5 !px-5 text-[13.5px]"
                  onClick={() => setGrid(!grid)}
                  aria-pressed={grid}
                >
                  <IconGrid size={15} /> Toggle 12-Col Swiss Grid
                </button>
              </div>
              <p className="hud">50 MPH / Perception Window: 3.0s</p>
            </div>

            <div className="lab-frame" data-glance={glance}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/carvendors-1800.webp"
                alt="CarVendors LED billboard under optical stress test"
                className="lab-image block aspect-[16/9] w-full object-cover md:aspect-[21/9]"
                loading="lazy"
              />
              {glance === "blur" && (
                <div className="absolute left-5 top-5 rounded-full bg-ink-950/85 px-4 py-2 backdrop-blur">
                  <span className="hud !text-gold-soft">GLANCE WINDOW ACTIVE — 3.0s</span>
                </div>
              )}
              {glance === "reveal" && (
                <div className="absolute left-5 top-5 rounded-full bg-ink-950/85 px-4 py-2 backdrop-blur">
                  <span className="hud !text-status">LEGIBILITY CONFIRMED — 100% &lt; 3.0s</span>
                </div>
              )}
              <div ref={barRef} className="lab-glance-bar" aria-hidden="true" />
              <div className="lab-grid" data-on={grid} aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
              </div>
            </div>

            <dl className="mt-6 grid gap-4 text-[12.5px] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["UK Roadside Spec", "96-Sheet Digital LED"],
                ["Physical Scale", "12.2m × 3.0m (40×10 ft)"],
                ["Perception Target", "< 3.0s @ 50 mph"],
                ["Grid Architecture", "12-Column Swiss Modular"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[12px] border border-hairline bg-ink-900/50 p-4">
                  <dt className="hud !text-dim">{k}</dt>
                  <dd className="mt-1.5 font-display text-[13.5px] font-bold text-soft">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex justify-center" delay={100}>
          <p className="inline-flex items-center gap-2.5 text-[13px] text-dim">
            <IconEye size={14} />
            Optical tolerance: &lt; 3.0s highway glancing threshold · Color calibration RGB / CMYK proof profiled
          </p>
        </Reveal>
      </div>
    </section>
  );
}
