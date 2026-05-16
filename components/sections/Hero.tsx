"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, Download } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.12),transparent_32rem)]" />
});

const name = "Chandan Swarnakar";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/10 via-night/25 to-night/90" />

      <div className="relative z-10 flex min-h-screen items-center px-6 pt-24">
        <div className="mx-auto w-full max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-4 font-heading text-xl text-cyan md:text-2xl"
          >
            Hi, I&apos;m
          </motion.p>

          <h1 className="max-w-5xl font-heading text-5xl font-bold tracking-normal text-white md:text-6xl lg:text-7xl">
            {name.split(" ").map((word, wordIndex) => {
              const priorLetters = name
                .split(" ")
                .slice(0, wordIndex)
                .join("").length;

              return (
                <span key={word} className="mr-4 inline-block whitespace-nowrap md:mr-6">
                  {word.split("").map((letter, letterIndex) => {
                    const index = priorLetters + wordIndex + letterIndex;
                    return (
                      <motion.span
                        key={`${letter}-${index}`}
                        initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: 0.12 + index * 0.035, duration: 0.42, ease: "easeOut" }}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
            className="mt-6"
          >
            <p className="font-heading text-2xl font-semibold text-slate-100 md:text-4xl">Frontend Developer</p>
            <p className="mt-3 text-base text-slate-300 md:text-xl">[ React · Angular · Three.js ]</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.18, duration: 0.65, ease: "easeOut" }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded bg-cyan px-6 py-3 font-semibold text-night shadow-glow transition hover:-translate-y-1 hover:bg-white"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded border border-cyan/60 px-6 py-3 font-semibold text-cyan transition hover:-translate-y-1 hover:bg-cyan/10"
            >
              <Download size={18} />
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{ opacity: { delay: 1.7 }, y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cyan"
        aria-label="Scroll to about"
      >
        <ArrowDown size={28} />
      </motion.a>
    </section>
  );
}
