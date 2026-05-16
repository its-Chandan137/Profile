"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { skillGroups } from "@/data/skills";
import SectionWrapper from "@/components/ui/SectionWrapper";

const SkillOrbs = dynamic(() => import("@/components/three/SkillOrbs"), { ssr: false });

export default function Skills() {
  return (
    <SectionWrapper id="skills" eyebrow="Skills" title="Tools I reach for" className="skills-section">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <SkillOrbs />
      </div>
      <div className="relative z-10 space-y-4">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, x: index % 2 ? 52 : -52 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.62, ease: "easeOut" }}
            className="rounded border border-white/10 border-l-transparent bg-white/[0.045] p-5 backdrop-blur transition duration-300 hover:border-l-2 hover:border-l-cyan"
          >
            <h3 className="mb-4 font-heading text-xl font-semibold text-white">{group.category}</h3>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-night/65 px-4 py-2 text-sm text-slate-200 transition duration-300 hover:scale-105 hover:border-cyan hover:text-cyan hover:shadow-[0_0_18px_rgba(0,212,255,0.18)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
