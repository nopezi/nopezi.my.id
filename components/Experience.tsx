"use client";

import { useEffect, useState } from "react";
import { jobs } from "@/lib/data";
import { Reveal } from "./Reveal";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Experience() {
  const [open, setOpen] = useState<Set<string>>(() => new Set(["amansob"]));

  useEffect(() => {
    const flash = (ids: string[]) => {
      ids.forEach((id) => {
        const el = document.getElementById(`job-${id}`);
        if (!el) return;
        el.classList.add("flash");
        window.setTimeout(() => el.classList.remove("flash"), 1900);
      });
    };
    const onFocus = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setOpen((s) => {
        const n = new Set(s);
        n.add(id);
        return n;
      });
      requestAnimationFrame(() => {
        document
          .getElementById(`job-${id}`)
          ?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
        flash([id]);
      });
    };
    const onFlash = (e: Event) => {
      const ids = (e as CustomEvent<string[]>).detail;
      if (!ids.length) return;
      requestAnimationFrame(() => {
        document
          .getElementById(`job-${ids[0]}`)
          ?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
        flash(ids);
      });
    };
    window.addEventListener("nz:focus-job", onFocus);
    window.addEventListener("nz:flash-jobs", onFlash);
    return () => {
      window.removeEventListener("nz:focus-job", onFocus);
      window.removeEventListener("nz:flash-jobs", onFlash);
    };
  }, []);

  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <section id="pengalaman" className="sec">
      <div className="wrap">
        <Reveal>
          <header className="sec-head">
            <p className="eyebrow">// 02 — pengalaman</p>
            <h2>Dari bot rumah sakit sampai core banking.</h2>
            <p className="lede">
              {jobs.length} entri, {jobs.reduce((a, j) => a + j.roles.length, 0)} peran, satu
              jalur yang terus naik. Klik setiap peran untuk membuka detailnya — semua teks
              berasal dari CV.
            </p>
          </header>
        </Reveal>

        <ol className="exp-tl">
          {jobs.map((j, i) => (
            <Reveal key={j.id} delay={Math.min(i, 4) * 50}>
              <div
                id={`job-${j.id}`}
                className={`job${j.current ? " current" : ""}${j.legal ? " legal" : ""}${
                  open.has(j.id) ? " open" : ""
                }`}
              >
                <div className="job-card">
                  <button
                    className="job-head"
                    onClick={() => toggle(j.id)}
                    aria-expanded={open.has(j.id)}
                    aria-controls={`jb-${j.id}`}
                  >
                    <span className="job-period">{j.span}</span>
                    <span>
                      <span className="job-company">
                        {j.company}
                        {j.current && (
                          <span className="badge-now">
                            <i />sekarang
                          </span>
                        )}
                      </span>
                      {j.legal && <span className="job-legal">{j.legal}</span>}
                      <span className="job-role">
                        {j.roles.map((r) => r.title).join(" · ")}
                        {j.place && (
                          <>
                            <span className="sep">/</span>
                            <span className="place">{j.place}</span>
                          </>
                        )}
                      </span>
                    </span>
                    <span className="chev" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <div className="job-body" id={`jb-${j.id}`}>
                    <div className="job-body-in">
                      <div className="job-body-pad">
                        {j.roles.map((r, ri) => (
                          <div className="role-block" key={ri}>
                            <p className="role-title">
                              {r.title}
                              <span className="rs">{r.span}</span>
                            </p>
                            {r.bullets.length > 0 && (
                              <ul className="bullets">
                                {r.bullets.map((b, bi) => (
                                  <li key={bi}>{b}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                        <div className="job-tags">
                          {j.tags.map((t) => (
                            <span className="tag" key={t}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
