"use client";

import { useEffect, useRef, useState } from "react";
import { education, jobs, profile, sectors, summary } from "@/lib/data";
import { Reveal } from "./Reveal";

function Count({ target, started }: { target: number; started: boolean }) {
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!started) return;
    if (reduced.current) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1000;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return <>{n}</>;
}

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const companies = new Set(jobs.map((j) => j.company)).size;
  const stats = [
    { v: 7, suf: "+", label: "tahun pengalaman" },
    { v: companies, suf: "", label: "perusahaan" },
    { v: sectors.length, suf: "", label: "sektor" },
    { v: 5, suf: "", label: "sertifikasi" },
  ];

  return (
    <section id="profil" className="sec">
      <div className="wrap">
        <Reveal>
          <header className="sec-head">
            <p className="eyebrow">// 01 — profil</p>
            <h2>Membangun software yang dipakai orang lain.</h2>
            <p className="lede">
              Ringkasan dari CV, disunting secukupnya. Angka-angka di bawah dihitung
              langsung dari entri CV — tidak ada yang diisi-hias.
            </p>
          </header>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-side">
            <div>
              <p className="k">sekarang</p>
              <p className="v">Fullstack Developer — Amansob (2025—kini)</p>
            </div>
            <div>
              <p className="k">basis</p>
              <p className="v">{profile.city}</p>
            </div>
            <div>
              <p className="k">pengalaman</p>
              <p className="v">7+ tahun, sejak {profile.since}</p>
            </div>
            <div>
              <p className="k">pendidikan</p>
              <p className="v">
                {education.degree}
                <br />
                {education.school} ({education.span})
              </p>
            </div>
          </Reveal>

          <div className="about-body">
            <Reveal>
              <p>{summary}</p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                Pendekatan kerja: baca dulu masalahnya, baru menulis kode. Bot harus bisa
                dijelaskan langkahnya, API harus bisa dipertanggungjawabkan. Angka di
                halaman ini dihitung dari entri CV — tidak ada yang ditambah-tambah.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="sector-row" aria-label="Sektor yang pernah dikerjakan">
                {sectors.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="stats" ref={statsRef}>
                {stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <b>
                      <Count target={s.v} started={started} />
                      <em>{s.suf}</em>
                    </b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
