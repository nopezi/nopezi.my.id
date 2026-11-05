import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nopezi Saputra Pratama — Software Engineer",
  description:
    "Portfolio Nopezi Saputra Pratama: software engineer 6+ tahun — backend, fullstack, dan chatbot developer. Java, TypeScript, Node.js, PHP, Golang, MongoDB, REST API, bot Telegram/WhatsApp.",
  keywords: ["Nopezi", "software engineer", "backend", "fullstack", "chatbot", "Jakarta"],
  openGraph: {
    title: "Nopezi Saputra Pratama — Software Engineer",
    description:
      "Backend, fullstack, dan chatbot developer. Java, TypeScript, Node.js, PHP, Golang, MongoDB, REST API, bot Telegram/WhatsApp.",
    type: "website",
  },
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
};

const themeInit = `(function(){try{var q=new URLSearchParams(location.search);var t=q.get("theme");if(t!=="light"&&t!=="dark"){t=localStorage.getItem("nz-theme")||(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark")}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a className="skip" href="#profil">
          Lewati ke konten
        </a>
        {children}
      </body>
    </html>
  );
}
