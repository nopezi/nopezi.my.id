"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import { Reveal } from "./Reveal";

function CopyBtn({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* tidak bisa menyalin */
      }
      ta.remove();
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1600);
  };
  return (
    <button
      className={`copy-btn${done ? " done" : ""}`}
      onClick={copy}
      aria-label={`${label}: ${text}`}
      type="button"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
      </svg>
      {done ? "tersalin" : "salin"}
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="kontak" className="sec">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">// 06 — kontak</p>
          <h2 className="contact-big">
            Punya proyek, bug, atau <em>ide bot?</em>
          </h2>
          <p className="contact-sub">
            Email untuk hal yang bisa menunggu, WA untuk yang mendesak. Riwayat bot asli —
            janji rumah sakit, absensi, blast vaksin — ada di §02 dan bisa dicoba di §05.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="c-rows">
            <div className="c-row">
              <span className="k">email</span>
              <a className="v" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <CopyBtn text={profile.email} label="Salin email" />
            </div>
            <div className="c-row">
              <span className="k">telepon</span>
              <a className="v" href={profile.phoneHref}>
                {profile.phone}
                <small>WhatsApp / seluler</small>
              </a>
              <CopyBtn text={profile.phone} label="Salin nomor telepon" />
            </div>
            <a className="c-row" href={profile.linkedin} target="_blank" rel="me noopener">
              <span className="k">linkedin</span>
              <span className="v">
                linkedin.com/in/nopezi-saputra-pratama
                <ArrowIcon />
              </span>
              <span className="copy-btn" aria-hidden="true">
                buka →
              </span>
            </a>
            <a className="c-row" href={profile.site} target="_blank" rel="me noopener">
              <span className="k">web lama</span>
              <span className="v">
                nopezi.github.io
                <ArrowIcon />
              </span>
              <span className="copy-btn" aria-hidden="true">
                buka →
              </span>
            </a>
            <div className="c-row">
              <span className="k">basis</span>
              <span className="v">
                {profile.city}
                <small>Indonesia · WIB</small>
              </span>
              <span className="copy-btn" style={{ visibility: "hidden" }} aria-hidden="true">
                .
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="contact-cta">
            <a className="btn btn-acc" href="/CV-NOPEZI.pdf" download>
              Unduh CV (PDF)
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v12M6 10l6 6 6-6M4 20h16" />
              </svg>
            </a>
            <a className="btn" href={`mailto:${profile.email}`}>
              Tulis email
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
