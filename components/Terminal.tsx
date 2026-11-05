"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { certs, jobs, profile, skillGroups } from "@/lib/data";

type L = { id: number; cls: string; text: string };
type Frame = { cls: string; text: string }[];

let lid = 1;
const COMMANDS = [
  "help",
  "whoami",
  "about",
  "experience",
  "skills",
  "certs",
  "contact",
  "neofetch",
  "date",
  "ls",
  "clear",
  "sudo hire nopezi",
];

const isReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const wrap = (s: string, width = 62) => {
  const words = s.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const word of words) {
    if ((cur + " " + word).trim().length > width) {
      lines.push(cur);
      cur = word;
    } else {
      cur = (cur + " " + word).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
};

const box = (rows: [string, string][]) => {
  const lw = Math.max(...rows.map((r) => r[0].length));
  const vw = Math.max(...rows.map((r) => r[1].length));
  const w = lw + vw + 7;
  const edge = "─".repeat(w);
  const lines = [`┌${edge}┐`];
  rows.forEach(([k, v], i) => {
    lines.push(`│ ${k.padEnd(lw)} · ${v.padEnd(vw)} │`);
    if (i === 0) lines.push(`├${edge}┤`);
  });
  lines.push(`└${edge}┘`);
  return lines;
};

function aboutFrames(): Frame[] {
  const p1 =
    "Halo — saya Nopezi. Insinyur perangkat lunak dengan 6+ tahun pengalaman membangun dan mengelola solusi software untuk perhotelan/penerbitan, perbankan online, otomasi proses, properti, dan e-commerce.";
  const p2 =
    "Pengalaman komprehensif dalam desain dan pengembangan web Java. Web developer dengan JavaScript, TypeScript (Node.js — Express atau NestJS), jQuery, HTML, RESTful API, PHP.";
  return [
    [
      ...wrap(p1).map((t) => ({ cls: "out", text: t })),
      { cls: "dim", text: "" },
      ...wrap(p2).map((t) => ({ cls: "out", text: t })),
    ],
  ];
}

function experienceFrames(): Frame[] {
  const f: Frame = [];
  jobs.forEach((j) => {
    f.push({ cls: "ok", text: `${j.span}  ${j.company}` });
    j.roles.forEach((r) => {
      f.push({ cls: "out", text: `    └─ ${r.title}` });
    });
  });
  f.push({ cls: "dim", text: "" });
  f.push({ cls: "dim", text: "detail lengkap: gulir ke §02 pengalaman" });
  return [f];
}

function skillsFrames(): Frame[] {
  const f: Frame = [];
  skillGroups.forEach((g) => {
    f.push({ cls: "dim", text: `// ${g.group}` });
    f.push({ cls: "out", text: "  " + g.skills.map((s) => s.name).join(", ") });
    f.push({ cls: "dim", text: "" });
  });
  return [f];
}

function certsFrames(): Frame[] {
  const f: Frame = certs.map((c) => ({ cls: "out", text: `▸ ${c.name} — ${c.issuer}` }));
  f.push({ cls: "dim", text: "" });
  f.push({ cls: "dim", text: "lihat kartunya di §04 sertifikasi" });
  return [f];
}

function contactFrames(): Frame[] {
  return [
    [
      { cls: "out", text: `email     ${profile.email}` },
      { cls: "out", text: `hp/wa     ${profile.phone}` },
      { cls: "out", text: `linkedin  ${profile.linkedin}` },
      { cls: "out", text: `web       ${profile.site}` },
      { cls: "dim", text: "" },
      { cls: "dim", text: "tombol salin siap pakai di §06 kontak" },
    ],
  ];
}

function neofetchFrames(): Frame[] {
  const rows: [string, string][] = [
    ["nama", "Nopezi Saputra Pratama"],
    ["peran", "backend · front end · chatbot"],
    ["sejak", "2019 — kini"],
    ["basis", "ragunan, jakarta selatan"],
    ["stack", "java ts node php golang"],
    ["", "mongodb rest api jquery"],
    ["bot", "tg wa fb webchat liveperson"],
    ["sertif", "5"],
    ["perusahaan", "7"],
    ["sektor", "6"],
  ];
  return [box(rows).map((t) => ({ cls: "ok", text: t }))];
}

function lsFrames(): Frame[] {
  return [
    [
      { cls: "out", text: "§00 terminal   §01 profil   §02 pengalaman" },
      { cls: "out", text: "§03 keahlian   §04 sertifikasi   §05 bot" },
      { cls: "out", text: "§06 kontak" },
      { cls: "dim", text: "" },
      { cls: "dim", text: "klik nama bagian di rel kiri, atau scroll" },
    ],
  ];
}

function sudoFrames(): Frame[] {
  return [
    [
      { cls: "ok", text: "[ sudo ] permintaan diterima." },
      { cls: "out", text: "status   : siap diajak ngoding" },
      { cls: "out", text: "langkah  : kirim email atau WA — §06 kontak" },
      { cls: "dim", text: "membuka §06..." },
    ],
  ];
}

const ALIAS: Record<string, string> = {
  who: "whoami",
  "--who": "whoami",
};

function outFor(cmd: string): Frame[] | null {
  const raw = cmd.toLowerCase().replace(/^(nopezi\s+)?-+/, "").trim();
  const c = ALIAS[raw] ?? raw;
  switch (c) {
    case "help":
      return [
        [
          { cls: "dim", text: "perintah:" },
          ...COMMANDS.map((x) => ({ cls: "out", text: `  ${x.padEnd(18)} ${x === "sudo hire nopezi" ? "eh, ini menarik" : ""}`.replace(/\s+$/, "") })),
          { cls: "dim", text: "" },
          { cls: "dim", text: "tombol ↑/↓ untuk riwayat · tab untuk autocompletion" },
        ],
      ];
    case "whoami":
      return [
        [
          { cls: "out", text: profile.name },
          { cls: "out", text: "software engineer — backend · front end · chatbot developer" },
          { cls: "dim", text: `basis: ${profile.city.toLowerCase()}` },
        ],
      ];
    case "about":
      return aboutFrames();
    case "experience":
      return experienceFrames();
    case "skills":
      return skillsFrames();
    case "certs":
    case "certifications":
      return certsFrames();
    case "contact":
      return contactFrames();
    case "neofetch":
      return neofetchFrames();
    case "date":
      return [
        [
          {
            cls: "out",
            text: new Date().toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }) + " WIB",
          },
        ],
      ];
    case "status":
      return [[{ cls: "ok", text: "online — ragunan, jakarta selatan" }]];
    case "ls":
      return lsFrames();
    case "sudo hire nopezi":
      return sudoFrames();
    default:
      return null;
  }
}

const CHIPS = ["help", "whoami", "about", "experience", "skills", "certs", "contact", "neofetch"];

export default function Terminal() {
  const [lines, setLines] = useState<L[]>([]);
  const [val, setVal] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const histRef = useRef<string[]>([]);
  const hIdxRef = useRef(-1);
  const busyRef = useRef(false);

  const printFrames = useCallback((frames: Frame[], done?: () => void) => {
    const delay = isReduced() ? 0 : 95;
    frames.forEach((frame, fi) => {
      window.setTimeout(() => {
        setLines((ls) => [...ls, ...frame.map((l) => ({ id: lid++, ...l }))]);
        if (fi === frames.length - 1) done?.();
      }, fi * delay);
    });
  }, []);

  useEffect(() => {
    const boot: Frame[] = [
      [{ cls: "dim", text: `last login: ${new Date().toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" })} on ttys001` }],
      [{ cls: "cmd", text: "nopezi --who" }],
      [{ cls: "out", text: profile.name }],
      [{ cls: "out", text: "software engineer — backend · front end · chatbot" }],
      [{ cls: "cmd", text: "nopezi --status" }],
      [{ cls: "ok", text: "online — ragunan, jakarta selatan" }],
      [{ cls: "dim", text: "" }],
      [{ cls: "dim", text: `ketik 'help' untuk daftar perintah, atau klik chip di bawah.` }],
    ];
    printFrames(boot);
  }, [printFrames]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;
      setLines((ls) => [...ls, { id: lid++, cls: "cmd", text: cmd }]);
      if (cmd === "clear") {
        setLines([]);
        return;
      }
      const frames = outFor(cmd);
      if (!frames) {
        printFrames([
          [
            { cls: "err", text: `zsh: command not found: ${cmd.split(" ")[0]}` },
            { cls: "dim", text: "ketik 'help' untuk daftar perintah" },
          ],
        ]);
        return;
      }
      busyRef.current = true;
      printFrames(frames, () => {
        busyRef.current = false;
        if (cmd.toLowerCase() === "sudo hire nopezi") {
          window.setTimeout(() => {
            window.dispatchEvent(new CustomEvent("nz:hire"));
            document
              .getElementById("kontak")
              ?.scrollIntoView({ behavior: isReduced() ? "auto" : "smooth", block: "start" });
          }, isReduced() ? 50 : 700);
        }
      });
    },
    [printFrames]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = val.trim();
    if (!v) return;
    if (histRef.current[histRef.current.length - 1] !== v) histRef.current.push(v);
    hIdxRef.current = histRef.current.length;
    setVal("");
    run(v);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIdxRef.current > 0) {
        hIdxRef.current -= 1;
        setVal(histRef.current[hIdxRef.current] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdxRef.current < histRef.current.length - 1) {
        hIdxRef.current += 1;
        setVal(histRef.current[hIdxRef.current]);
      } else {
        hIdxRef.current = histRef.current.length;
        setVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = val.toLowerCase();
      if (!v) return;
      const hit = COMMANDS.find((c) => c.startsWith(v));
      if (hit) setVal(hit);
    }
  };

  const focusInput = () => {
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) return;
    inputRef.current?.focus();
  };

  return (
    <div>
      <div className="term">
        <div className="term-head">
          <span className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="tt">nopezi@my.id — zsh</span>
          <span aria-hidden="true">utf-8</span>
        </div>
        <div className="term-body" ref={bodyRef} onClick={focusInput}>
          {lines.map((l) => (
            <div className={`tl ${l.cls}`} key={l.id}>
              {l.cls === "cmd" ? (
                <>
                  <span className="prompt">nopezi@my.id ~ %</span>
                  <span>{l.text}</span>
                </>
              ) : (
                <span>{l.text}</span>
              )}
            </div>
          ))}
          <span className="caret-blink" aria-hidden="true" />
        </div>
        <form className="term-input-row" onSubmit={submit}>
          <span className="prompt">nopezi@my.id ~ %</span>
          <input
            ref={inputRef}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={onKey}
            placeholder="ketik perintah — coba 'help'"
            aria-label="Terminal: ketik perintah, misalnya help"
            autoComplete="off"
            spellCheck={false}
            suppressHydrationWarning
          />
        </form>
      </div>
      <div className="chips" role="group" aria-label="Perintah cepat">
        {CHIPS.map((c) => (
          <button key={c} type="button" onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
