"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "@/lib/data";

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="37" rx="9" fill="var(--panel)" stroke="var(--line2)" strokeWidth="1.5" />
      <path d="M11 15 L18 20 L11 25" stroke="var(--acc)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="21" y1="25" x2="28" y2="25" stroke="var(--acc)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function InIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.1 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9z" />
    </svg>
  );
}

function ExtIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function useWIB() {
  const [s, setS] = useState("--:--:--");
  useEffect(() => {
    const f = () =>
      setS(
        new Intl.DateTimeFormat("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    f();
    const t = setInterval(f, 1000);
    return () => clearInterval(t);
  }, []);
  return s;
}

export default function Rail() {
  const [active, setActive] = useState("terminal");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [hired, setHired] = useState(false);
  const wib = useWIB();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let tick = false;
    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        tick = false;
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? h.scrollTop / max : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const fn = () => {
      setHired(true);
      window.setTimeout(() => setHired(false), 5000);
    };
    window.addEventListener("nz:hire", fn);
    return () => window.removeEventListener("nz:hire", fn);
  }, []);

  const toggleTheme = () => {
    const t = theme === "dark" ? "light" : "dark";
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("nz-theme", t);
    } catch {
      /* private mode */
    }
  };

  const today = new Date().toLocaleDateString("id-ID", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <div className="progress" aria-hidden="true">
        <i ref={barRef} />
      </div>

      <aside className="rail">
        <a className="rail-brand" href="#terminal" aria-label="Kembali ke atas">
          <LogoMark />
          <span>
            <span className="bn">Nopezi</span>
            <br />
            <span className="bs">saputra pratama</span>
          </span>
        </a>

        <nav aria-label="Navigasi utama">
          <ul className="rail-nav">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={active === n.id ? "active" : ""}>
                  <span className="n">{n.num}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rail-foot">
          <span className="pill" aria-live="polite">
            <span className="dot" />
            {hired ? "siap diajak ngoding" : "software engineer"}
          </span>
          <p className="clock">
            <b>{wib}</b> <span className="tz">wib</span>
            <br />
            {today}
          </p>
          <div className="rail-icons">
            <button className="icon-btn" onClick={toggleTheme} aria-label="Ganti tema gelap/terang">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <a className="icon-btn" href={profile.linkedin} target="_blank" rel="me noopener" aria-label="LinkedIn Nopezi">
              <InIcon />
            </a>
            <a className="icon-btn" href={profile.site} target="_blank" rel="me noopener" aria-label="Website lama nopezi.github.io">
              <ExtIcon />
            </a>
          </div>
        </div>
      </aside>

      <header className="topbar">
        <a className="tb-brand" href="#terminal">
          <LogoMark size={26} />
          nopezi
        </a>
        <div className="tb-right">
          <span className="clock" style={{ border: 0, padding: 0 }}>
            {wib} <span className="tz">wib</span>
          </span>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Ganti tema gelap/terang">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className={`burger${open ? " open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Buka menu"
            aria-expanded={open}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </header>

      <div className={`menu-overlay${open ? " open" : ""}`} aria-hidden={!open}>
        {navItems.map((n, i) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: `${open ? 80 + i * 45 : 0}ms` }}
          >
            <span className="n">{n.num}</span>
            {n.label}
          </a>
        ))}
      </div>
    </>
  );
}
