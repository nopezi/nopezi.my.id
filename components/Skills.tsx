"use client";

import { useState } from "react";
import { certs, jobs, skillGroups, type Skill } from "@/lib/data";
import { Reveal } from "./Reveal";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Skills() {
  const [active, setActive] = useState<Skill | null>(null);

  const select = (s: Skill) => {
    setActive(s);
    const jobIds = s.jobs ?? [];
    if (jobIds.length) {
      window.dispatchEvent(new CustomEvent("nz:flash-jobs", { detail: jobIds }));
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("nz:focus-job", { detail: jobIds[0] }));
      }, 250);
    } else if (s.certs) {
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("nz:flash-certs"));
      }, 200);
    }
  };

  const jobName = (id: string) => jobs.find((j) => j.id === id)?.company ?? id;

  return (
    <section id="keahlian" className="sec">
      <div className="wrap">
        <Reveal>
          <header className="sec-head">
            <p className="eyebrow">// 03 — keahlian</p>
            <h2>Keahlian, lengkap dengan buktinya.</h2>
            <p className="lede">
              Klik sebuah keahlian — panel di samping menunjukkan buktinya di CV dan
              pekerjaan yang terkait. Tidak ada skill yang mengambang.
            </p>
          </header>
        </Reveal>

        <div className="sk-grid">
          <div>
            {skillGroups.map((g, gi) => (
              <Reveal key={g.group} delay={gi * 60}>
                <div className="sk-group">
                  <h3>{g.group}</h3>
                  <div className="chip-row">
                    {g.skills.map((s) => (
                      <button
                        key={s.name}
                        className={`chip${active?.name === s.name ? " on" : ""}`}
                        onClick={() => select(s)}
                        aria-pressed={active?.name === s.name}
                      >
                        {s.name}
                        <span className="kd">{s.kind}</span>
                        {(s.jobs?.length ?? 0) + (s.certs ? 1 : 0) > 0 && (
                          <span className="cnt">
                            {(s.jobs?.length ?? 0) + (s.certs ? 1 : 0)} bukti
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <aside className="ev-panel" aria-live="polite">
              {active ? (
                <>
                  <p className="ev-k">bukti dari cv</p>
                  <h3>{active.name}</h3>
                  <span className="ev-kind">{active.kind}</span>
                  <ul className="ev-list">
                    {active.evidence.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                  {(active.jobs?.length || active.certs) && (
                    <div className="ev-actions">
                      {active.jobs?.map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() =>
                            window.dispatchEvent(new CustomEvent("nz:focus-job", { detail: id }))
                          }
                        >
                          → {jobName(id)}
                        </button>
                      ))}
                      {active.certs && (
                        <button
                          type="button"
                          onClick={() =>
                            window.dispatchEvent(new CustomEvent("nz:flash-certs"))
                          }
                        >
                          → sertifikasi
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="ev-empty">
                  <span className="big">Pilih sebuah keahlian.</span>
                  Panel ini akan menampilkan buktinya: tugas nyata di CV, sertifikasi,
                  atau keduanya. Tekan tombol di bawah untuk lompat ke bagian yang bersangkutan.
                </div>
              )}
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
