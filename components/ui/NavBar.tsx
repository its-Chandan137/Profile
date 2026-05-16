"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#hero", label: "Hero" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const current = links
        .map((link) => link.href.replace("#", ""))
        .findLast((id) => {
          const section = document.getElementById(id);
          return section ? section.offsetTop - 120 <= window.scrollY : false;
        });

      if (current) {
        setActiveSection(current);
      }
    };

    const handlePointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "border-[#1a1a2e] bg-night/82 py-3 shadow-glow" : "border-transparent bg-night/45 py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        <a href="#hero" className="font-heading text-3xl font-bold gradient-text" aria-label="Chandan Swarnakar home">
          CS
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative pb-2 text-sm font-medium transition-colors duration-300 hover:text-cyan ${
                activeSection === link.href.slice(1) ? "text-cyan" : "text-slate-300"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-cyan transition-opacity duration-300 ${
                  activeSection === link.href.slice(1) ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded border border-white/10 text-white transition hover:border-cyan/60 hover:text-cyan md:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="mx-4 mt-3 rounded border border-white/10 bg-night/95 p-3 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block rounded px-3 py-3 text-sm transition hover:bg-white/5 hover:text-cyan ${
                activeSection === link.href.slice(1) ? "text-cyan" : "text-slate-200"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
