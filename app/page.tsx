import Rail from "@/components/Rail";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certs from "@/components/Certs";
import BotDemo from "@/components/BotDemo";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <>
      <Rail />
      <main className="shell">
        <Hero />
        <Ticker />
        <About />
        <Experience />
        <Skills />
        <Certs />
        <BotDemo />
        <Contact />
        <footer>
          <div className="wrap">
            <span>
              <b>nopezi.my.id</b> — dibuat tangan dengan Next.js, tanpa template.
            </span>
            <span>view-source: semuanya terbuka</span>
            <span>© 2026 nopezi saputra pratama</span>
          </div>
        </footer>
      </main>
    </>
  );
}
