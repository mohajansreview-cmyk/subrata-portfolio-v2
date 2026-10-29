"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor — dot + trailing ring with a "VIEW" mode over work cards.
 * Desktop fine-pointer devices only; disabled for reduced-motion users.
 * ~1.5KB of logic, rAF-lerped so it stays smooth and cheap.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mx = -100, my = -100;   // mouse position
    let rx = -100, ry = -100;   // ring lerped position
    let shown = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        rx = mx; ry = my;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      const half = ring.offsetWidth / 2;
      ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
      raf = requestAnimationFrame(tick);
    };

    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      const view = t.closest('[data-cursor="view"]');
      if (view) {
        ring.dataset.mode = "view";
        ring.textContent = "VIEW";
      } else if (t.closest("a, button, [role='button'], input, textarea, select, label")) {
        ring.dataset.mode = "hover";
        ring.textContent = "";
      } else {
        ring.dataset.mode = "";
        ring.textContent = "";
      }
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      shown = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden="true" />
    </>
  );
}
