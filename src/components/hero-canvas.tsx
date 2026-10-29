"use client";

import { useEffect, useRef } from "react";

/**
 * Hero canvas — slow aurora field: three drifting luminous blobs over a faint
 * dot grid, gently parallaxing toward the pointer. 2D canvas, DPR-aware,
 * pauses offscreen/hidden, static fallback for prefers-reduced-motion.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // CSS gradient fallback behind it stays visible

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let raf = 0;
    let running = true;
    let visible = true;
    let px = 0.5, py = 0.35; // pointer influence (normalized)
    let tx = px, ty = py;

    type Blob = { x: number; y: number; r: number; hue: string; sx: number; sy: number; phase: number; speed: number };
    const blobs: Blob[] = [
      { x: 0.72, y: 0.22, r: 0.5, hue: "3, 181, 231",  sx: 0.06, sy: 0.045, phase: 0.0, speed: 0.00022 },
      { x: 0.25, y: 0.55, r: 0.42, hue: "1, 92, 177",  sx: 0.05, sy: 0.06,  phase: 2.1, speed: 0.00017 },
      { x: 0.55, y: 0.85, r: 0.46, hue: "55, 118, 221", sx: 0.045, sy: 0.04, phase: 4.4, speed: 0.00013 },
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGrid = () => {
      ctx.fillStyle = "rgba(125, 211, 252, 0.05)";
      const gap = 56;
      const ox = (px - 0.5) * 10;
      const oy = (py - 0.5) * 10;
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          ctx.beginPath();
          ctx.arc(x + ox, y + oy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let last = 0;
    const frame = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (t - last < 1000 / 30) return; // 30fps is plenty for slow drift
      last = t;

      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;

      ctx.clearRect(0, 0, w, h);
      drawGrid();

      ctx.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        const a = t * b.speed + b.phase;
        const bx = (b.x + Math.sin(a) * b.sx + (px - 0.5) * 0.06) * w;
        const by = (b.y + Math.cos(a * 0.9) * b.sy + (py - 0.5) * 0.06) * h;
        const r = b.r * Math.min(w, h);
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        g.addColorStop(0, `rgba(${b.hue}, 0.16)`);
        g.addColorStop(0.5, `rgba(${b.hue}, 0.05)`);
        g.addColorStop(1, `rgba(${b.hue}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      tx = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      ty = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    };

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
    const onVis = () => { visible = !document.hidden && visible !== false ? !document.hidden : visible && !document.hidden; };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    io.observe(canvas);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* static fallback layer (also the reduced-motion / no-JS visual) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46rem 30rem at 78% 18%, rgba(3,181,231,0.13), transparent 60%)," +
            "radial-gradient(40rem 26rem at 18% 55%, rgba(1,92,177,0.14), transparent 58%)," +
            "radial-gradient(50rem 34rem at 55% 100%, rgba(55,118,221,0.1), transparent 62%)",
        }}
      />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
