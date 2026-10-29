"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/* ---------------------------------------------------------------------------
 * Reveal — IntersectionObserver-driven entrance, staggered via `delay` (ms)
 * ------------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
 * Magnetic — element gently follows the pointer, springs back on leave
 * ------------------------------------------------------------------------- */
export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let active = false;

    const tick = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      if (active || Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      active = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      tx = 0; ty = 0; active = false;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const parent = el.parentElement;
    parent?.addEventListener("pointermove", onMove);
    parent?.addEventListener("pointerleave", onLeave);
    return () => {
      parent?.removeEventListener("pointermove", onMove);
      parent?.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
 * Tilt — 3D perspective tilt for work cards (rAF-throttled, spring release)
 * ------------------------------------------------------------------------- */
export function TiltCard({
  children,
  max = 4,
  className = "",
  ...rest
}: {
  children: ReactNode;
  max?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let rx = 0, ry = 0, crx = 0, cry = 0, active = false;

    const tick = () => {
      crx += (rx - crx) * 0.12;
      cry += (ry - cry) * 0.12;
      el.style.transform = `rotateX(${crx.toFixed(3)}deg) rotateY(${cry.toFixed(3)}deg)`;
      if (active || Math.abs(rx - crx) > 0.02 || Math.abs(ry - cry) > 0.02) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        el.classList.remove("is-tilting");
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry = px * max * 2;
      rx = -py * max * 2;
      active = true;
      el.classList.add("is-tilting");
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      rx = 0; ry = 0; active = false;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt-card ${className}`} {...rest}>
      {children}
    </div>
  );
}
