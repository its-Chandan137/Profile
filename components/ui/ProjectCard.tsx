"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex min-h-[24rem] flex-col overflow-hidden rounded border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 transition duration-300 hover:-translate-y-[6px] hover:border-cyan/70 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
    >
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan to-violet" />
      <div className="mb-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
          {project.domain}
        </p>
        <h3 className="font-heading text-2xl font-bold text-white">{project.name}</h3>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#1a1a2e] px-2.5 py-1 text-[0.7rem] font-medium text-cyan">
            {tag}
          </span>
        ))}
      </div>
      <ul className="mt-auto space-y-3 text-sm leading-6 text-slate-400 transition group-hover:text-slate-200">
        {project.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan shadow-[0_0_12px_rgba(0,212,255,0.9)]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
