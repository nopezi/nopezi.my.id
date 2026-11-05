"use client";

import { useEffect, useRef, useState } from "react";
import Terminal from "./Terminal";
import Packets from "./Packets";
import { profile } from "@/lib/data";

function WIBNow() {
  const [s, setS] = useState("");
  useEffect(() => {
    const f = () =>
      setS(
        new Date().toLocaleTimeString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    f();
    const t = window.setInterval(f, 30000);
    return () => window.clearInterval(t);
  }, []);
  return <span>wib {s || "--:--"}</span>;
}

const CHARS = "!<>-_\\/[]{}=+*^?#";

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<number | null>(null);

  const start = () => {
    if (timer.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame / 2);
      setDisplay(
        text
          .split("")
          .map((ch, i) => (i < settled || ch === " " ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
      if (settled >= text.length) {
        if (timer.current) window.clearInterval(timer.current);
        timer.current = null;
        setDisplay(text);
      }
    }, 28);
  };

  return (
    <span onMouseEnter={start} onFocus={start}>
      {display}
    </span>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

const pills = ["java", "typescript", "node.js", "express", "nestjs", "php", "golang", "restful api", "mongodb", "jquery", "chatbot"];

export default function Hero() {
  return (
    <section id="terminal" className="hero">
      <Packets />
      <div className="watermark" aria-hidden="true">
        NOPEZI
      </div>
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow-hero">nopezi.my.id — portfolio/01</p>
          <h1 className="h1">
            <ScrambleText text="Nopezi" />
            <span className="sub">
              <b>Saputra Pratama</b> — software engineer.
              <br />
              Backend · front end · chatbot developer.
              <br />
              {profile.city}.
            </span>
          </h1>
          <div className="role-pills" role="list">
            {pills.map((p) => (
              <span key={p} role="listitem">
                {p}
              </span>
            ))}
          </div>
          <p className="hero-copy">
            7+ tahun membangun web untuk perbankan inti, kesehatan, e-commerce, dan
            otomasi proses — dari REST API dan migrasi data sampai chat bot WhatsApp/Telegram.
            Coba terminal di samping (atau di bawah, di HP): ini situsnya, bukan tangkapan layar.
          </p>
          <div className="meta-row">
            <span className="loc">
              <PinIcon />
              {profile.city}
            </span>
            <span>sejak {profile.since}</span>
            <span>
              <WIBNow />
            </span>
          </div>
          <div className="cta-row">
            <a className="btn btn-acc" href="#pengalaman">
              Lihat pengalaman
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v14M6 12l6 6 6-6" />
              </svg>
            </a>
            <a className="btn" href="#kontak">
              Kontak
            </a>
          </div>
        </div>
        <div>
          <Terminal />
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        gulir
        <i />
      </div>
    </section>
  );
}
