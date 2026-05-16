"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

const lines = [
  "Frontend Developer with 2+ years of experience in JavaScript, React, and Angular.",
  "Proven at building responsive web apps with real-time features and complex state management across domains like healthcare, construction, and government systems.",
  "Comfortable owning frontend modules end-to-end from design systems and dynamic forms to live chat and production bug-fixing."
];

const stats = [
  ["2+", "Years Experience"],
  ["8+", "Projects Delivered"],
  ["5+", "Tech Domains"],
  ["1", "Government Project (Dubai)"]
];

export default function About() {
  const textVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <SectionWrapper id="about" eyebrow="About" title="Building interfaces that hold up in production">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="space-y-5"
        >
          {lines.map((line) => (
            <motion.p
              key={line}
              variants={lineVariants}
              transition={{ duration: 0.72, ease: "easeOut" }}
              className="text-lg leading-8 text-slate-300 md:text-xl md:leading-9"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded border border-[#1e1e2e] bg-white/[0.035] p-5 backdrop-blur"
        >
          <div className="grid grid-cols-2 gap-4">
            {stats.map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.09, duration: 0.45 }}
                className="rounded border border-white/10 bg-gradient-to-br from-[#0f0f1a] to-[#0a0a0f] p-5 transition duration-300 hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.14)]"
              >
                <p className="font-heading text-3xl font-bold gradient-text">{value}</p>
                <p className="mt-2 text-sm leading-5 text-slate-300">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
