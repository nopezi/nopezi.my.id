"use client";

import { useEffect, useRef, useState } from "react";
import { certs } from "@/lib/data";
import { Reveal } from "./Reveal";

function SealIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="9" r="5" />
      <path d="M9.5 13.5L8 21l4-2.2L16 21l-1.5-7.5" />
    </svg>
  );
}

export default function Certs() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [flashed, setFlashed] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fn = () => {
      setFlashed(true);
      document
        .getElementById("sertifikasi")
        ?.scrollIntoView({ behavior: reducedRef.current ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => setFlashed(false), 1900);
    };
    window.addEventListener("nz:flash-certs", fn);
    return () => window.removeEventListener("nz:flash-certs", fn);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedRef.current) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
    el.style.transform = `perspective(700px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section id="sertifikasi" className="sec">
      <div className="wrap">
        <Reveal>
          <header className="sec-head">
            <p className="eyebrow">// 04 — sertifikasi</p>
            <h2>Lima sertifikat, lima arah.</h2>
            <p className="lede">
              Dari Java dasar sampai cloud. Kartu miring jika Anda mengarahkan kursor —
              seperti kartu fisik di meja.
            </p>
          </header>
        </Reveal>

        <div className={`cert-grid${flashed ? " flash" : ""}`} ref={gridRef}>
          {certs.map((c, i) => (
            <Reveal key={c.name} delay={i * 60}>
              <div className="cert" onMouseMove={onMove} onMouseLeave={onLeave}>
                <span className="idx">
                  {String(i + 1).padStart(2, "0")} / {String(certs.length).padStart(2, "0")}
                </span>
                <span className="seal">
                  <SealIcon />
                </span>
                <h3>{c.name}</h3>
                <p className="iss">{c.issuer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
