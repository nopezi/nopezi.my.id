"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

type Msg = { id: number; from: "bot" | "user"; text: string };

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const GREETING =
  "Halo, saya demo bot ala Morbis (2019—2021). Pilih topik di bawah atau ketik apa saja — saya balas dengan balasan canned yang jujur.";

function reply(q: string): string {
  const s = q.toLowerCase();
  if (/janji|booking|poli|dokter|konsul|rawat/.test(s)) {
    return (
      "Mengerti. Kirim format: nama · no RM · poli · tanggal.\n" +
      "Contoh: Budi · 1234 · Gigi · 12 Maret.\n" +
      "(Demo: janji tersimpan, konfirmasi dikirim via WA.)"
    );
  }
  if (/absen|stempel|masuk|pulang|presensi/.test(s)) {
    return (
      "Absen masuk tercatat. Stempel terkirim ke Telegram tim.\n" +
      "(Demo: meniru bot absensi Morbis 2020 — notifikasi in/out office.)"
    );
  }
  if (/vaksin|covid|booster|jadwal/.test(s)) {
    return (
      "Info vaksinasi DIY: lokasi dan jadwal terdekat dikirim via WA.\n" +
      "(Demo: meniru chat blast vaksinasi Pemda DIY, 2021.)"
    );
  }
  if (/help|bantuan|menu/.test(s)) {
    return "Coba: 'buat janji poli', 'absen masuk', atau 'info vaksin'.";
  }
  return (
    "Ini balasan canned — bot aslinya terhubung ke WhatsApp/Telegram via API. " +
    "Lihat §02 pengalaman untuk pekerjaan bot yang asli."
  );
}

function TypedMsg({ m }: { m: Msg }) {
  const r = useRef(false);
  const [n, setN] = useState(() => (m.from === "user" || r.current ? m.text.length : 0));

  useEffect(() => {
    r.current = reduced();
    if (m.from === "user" || r.current) {
      setN(m.text.length);
      return;
    }
    let i = 0;
    const t = window.setInterval(() => {
      i += 2;
      setN(Math.min(m.text.length, i));
      if (i >= m.text.length) window.clearInterval(t);
    }, 12);
    return () => window.clearInterval(t);
  }, [m.text, m.from]);

  return <div className={`msg ${m.from}`}>{m.text.slice(0, n)}</div>;
}

export default function BotDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "bot", text: GREETING }]);
  const [val, setVal] = useState("");
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setBusy(true);
    setMsgs((m) => [...m, { id: idRef.current++, from: "user", text: q }]);
    setVal("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: idRef.current++, from: "bot", text: reply(q) }]);
      setBusy(false);
    }, reduced() ? 60 : 650);
  };

  const reset = () => {
    if (busy) return;
    setMsgs([{ id: idRef.current++, from: "bot", text: GREETING }]);
  };

  const quicks = ["Buat janji poli", "Absen masuk", "Info vaksin"];

  return (
    <section id="bot" className="sec">
      <div className="wrap">
        <div className="bot-grid">
          <div>
            <Reveal>
              <header className="sec-head" style={{ marginBottom: 0 }}>
                <p className="eyebrow">// 05 — coba bot</p>
                <h2>Dulu saya membuat bot. Sekarang Anda bisa mengecohnya.</h2>
                <p className="lede">
                  Simulasi kecil bergaya bot yang dibangun di Morbis (2019—2021): janji temu
                  rumah sakit via Telegram/WhatsApp, notifikasi absensi, dan chat blast vaksinasi
                  COVID-19 untuk Pemda DIY.
                </p>
              </header>
            </Reveal>
            <Reveal delay={100}>
              <div className="bot-notes">
                <p className="n">
                  <i>01</i> Balasan bersifat canned — ini demo, bukan bot live.
                </p>
                <p className="n">
                  <i>02</i> Bot aslinya berjalan di Telegram, WhatsApp, Facebook, dan Web Chat.
                </p>
                <p className="n">
                  <i>03</i> Tekan tombol topik atau ketik sendiri di kolom input.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="chat">
              <div className="chat-head">
                <span className="av" aria-hidden="true">
                  M
                </span>
                <span className="who">
                  <b>morbis-bot</b>
                  <span>2019—2021 · telegram / wa</span>
                </span>
                <span className="sim">simulasi</span>
              </div>
              <div className="chat-msgs" ref={scrollRef} aria-live="polite">
                {msgs.map((m) => (
                  <TypedMsg key={m.id} m={m} />
                ))}
                {typing && (
                  <div className="msg bot typing" aria-label="Bot sedang mengetik">
                    <i />
                    <i />
                    <i />
                  </div>
                )}
              </div>
              <div className="chat-quick">
                {quicks.map((q) => (
                  <button key={q} type="button" onClick={() => send(q)} disabled={busy}>
                    {q}
                  </button>
                ))}
              </div>
              <form
                className="chat-input"
                onSubmit={(e) => {
                  e.preventDefault();
                  send(val);
                }}
              >
                <input
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  placeholder="Ketik apa saja…"
                  aria-label="Ketik pesan ke demo bot"
                  disabled={busy}
                  suppressHydrationWarning
                />
                <button className="send" type="submit" disabled={busy}>
                  kirim
                </button>
              </form>
              <div className="chat-reset">
                <button type="button" onClick={reset}>
                  ulang dari awal
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
