"use client";

import { useEffect, useRef } from "react";

type P = {
  lane: number;
  x: number;
  y: number;
  sy: number;
  ty: number;
  st: number;
  tlane: number;
  speed: number;
  amb: boolean;
  trail: number;
  px: number;
  py: number;
  age: number;
  mouse: boolean;
};

export default function Packets() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let running = !reduced;
    let raf = 0;
    let visible = true;

    const lanes = [0.2, 0.4, 0.6, 0.8];
    let nodes: number[][] = [];
    let packets: P[] = [];

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        acc: cs.getPropertyValue("--acc").trim() || "#b9f24e",
        line: cs.getPropertyValue("--line").trim() || "#242b24",
        amb: cs.getPropertyValue("--amb").trim() || "#ffb454",
      };
    };
    let colors = readColors();
    const mo = new MutationObserver(() => {
      colors = readColors();
      if (reduced) drawStatic();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = lanes.map((_, li) => {
        const n = 3 + (li % 2);
        const arr: number[] = [];
        for (let i = 0; i < n; i++) {
          arr.push(((i + 1) / (n + 1)) * w + Math.sin(li * 7 + i * 3) * 22);
        }
        return arr.sort((a, b) => a - b);
      });
      if (reduced) drawStatic();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawn = (x?: number, lane?: number, mouse = false) => {
      if (packets.length > 36) return;
      const li = lane ?? Math.floor(Math.random() * lanes.length);
      packets.push({
        lane: li,
        x: x ?? -6,
        y: lanes[li] * h,
        sy: lanes[li] * h,
        ty: lanes[li] * h,
        st: 1,
        tlane: li,
        speed: mouse ? 130 + Math.random() * 90 : 36 + Math.random() * 66,
        amb: Math.random() < 0.12,
        trail: 12 + Math.random() * 22,
        px: x ?? -6,
        py: lanes[li] * h,
        age: 0,
        mouse,
      });
    };

    const drawFrame = (alpha: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.line;
      ctx.globalAlpha = 0.55;
      lanes.forEach((ly) => {
        const y = ly * h;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      });
      ctx.fillStyle = colors.line;
      ctx.globalAlpha = 0.9;
      nodes.forEach((row, li) =>
        row.forEach((nx) => {
          ctx.fillRect(nx - 1.5, lanes[li] * h - 1.5, 3, 3);
        })
      );
      for (const p of packets) {
        const fade = p.mouse ? Math.max(0, 1 - Math.max(0, p.age - 2.2)) : 1;
        const a = alpha * fade;
        if (a <= 0.01) continue;
        const col = p.amb ? colors.amb : colors.acc;
        ctx.strokeStyle = col;
        ctx.globalAlpha = 0.3 * a;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(Math.max(0, p.x - p.trail), p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.75 * a;
        ctx.fillRect(p.x - 1.4, p.y - 1.4, 2.8, 2.8);
      }
      ctx.globalAlpha = 1;
    };

    const drawStatic = () => {
      packets = [];
      for (let i = 0; i < 9; i++) {
        const li = i % lanes.length;
        const x = ((i * 173) % 97) / 100;
        packets.push({
          lane: li,
          x: x * w,
          y: lanes[li] * h,
          sy: lanes[li] * h,
          ty: lanes[li] * h,
          st: 1,
          tlane: li,
          speed: 0,
          amb: i % 4 === 0,
          trail: 16,
          px: x * w,
          py: lanes[li] * h,
          age: 0,
          mouse: false,
        });
      }
      drawFrame(0.8);
    };

    let last = performance.now();
    let spawnAcc = 0;
    const loop = (t: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      ctx.clearRect(0, 0, w, h);
      spawnAcc += dt * 1000;
      if (spawnAcc > 430) {
        spawnAcc = 0;
        spawn();
      }
      packets = packets.filter((p) => p.x < w + 24 && p.age < 6);
      for (const p of packets) {
        p.age += dt;
        p.px = p.x;
        p.py = p.y;
        p.x += p.speed * dt;
        if (p.st < 1) {
          p.st = Math.min(1, p.st + dt * 2.2);
          const e = 1 - Math.pow(1 - p.st, 3);
          p.y = p.sy + (p.ty - p.sy) * e;
          if (p.st >= 1) p.lane = p.tlane;
        } else {
          p.y = lanes[p.lane] * h;
        }
        const row = nodes[p.lane];
        if (row && p.st >= 1) {
          for (const nx of row) {
            if (p.px < nx && p.x >= nx && Math.random() < 0.3) {
              const dir = Math.random() < 0.5 ? -1 : 1;
              const tl = Math.min(lanes.length - 1, Math.max(0, p.lane + dir));
              if (tl !== p.lane) {
                p.sy = p.y;
                p.ty = lanes[tl] * h;
                p.st = 0;
                p.tlane = tl;
              }
              break;
            }
          }
        }
      }
      drawFrame(1);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: PointerEvent) => {
      if (reduced || !visible) return;
      const r = canvas.getBoundingClientRect();
      const y = e.clientY - r.top;
      let li = 0;
      let best = Infinity;
      lanes.forEach((ly, i) => {
        const d = Math.abs(ly * h - y);
        if (d < best) {
          best = d;
          li = i;
        }
      });
      spawn(e.clientX - r.left, li, true);
      if (Math.random() < 0.5) spawn(e.clientX - r.left - 14, li, true);
    };
    const host = canvas.parentElement;
    host?.addEventListener("pointermove", onMove);

    if (reduced) drawStatic();
    else start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host?.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
