import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import NavBar from "@/components/ui/NavBar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.15),transparent_32rem),radial-gradient(circle_at_85%_20%,rgba(124,58,237,0.16),transparent_30rem),#0a0a0f]">
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 md:flex-row md:justify-between">
          <p>Chandan Swarnakar © 2025</p>
          <p className="text-slate-500">Built with Next.js + Three.js</p>
          <div className="flex gap-4">
            <a className="transition hover:text-cyan" href="https://github.com/its-Chandan137" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="transition hover:text-cyan" href="https://linkedin.com/in/chandanswarnakar" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
