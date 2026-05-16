"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Experience() {
  return (
    <SectionWrapper id="experience" eyebrow="Experience" title="Where I've shipped">
      <div className="grid gap-8 lg:grid-cols-[35%_65%] lg:items-start">
        <div className="relative hidden min-h-[25rem] lg:block">
          <div className="pointer-events-none font-heading text-[11rem] font-bold leading-none text-white/[0.06]">
            DEV
          </div>
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.95, ease: "easeInOut" }}
            className="absolute left-8 top-32 h-[15rem] w-px origin-top bg-cyan"
          />
          <span className="absolute left-[1.56rem] top-40 size-4 rounded-full bg-cyan shadow-[0_0_22px_rgba(0,212,255,0.85)]" />
        </div>

        <div className="space-y-8">
          {experiences.map((item, index) => (
            <div key={item.company} className="relative pl-9 lg:pl-0">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.95, ease: "easeInOut" }}
                className="absolute left-0 top-0 h-full w-px origin-top bg-cyan lg:hidden"
              />
              <span className="absolute -left-[0.45rem] top-7 size-4 rounded-full bg-cyan shadow-[0_0_22px_rgba(0,212,255,0.85)] lg:hidden" />
              <motion.article
                initial={{ opacity: 0, x: 58 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.12, duration: 0.7, ease: "easeOut" }}
                className="rounded border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/20"
              >
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">{item.company}</h3>
                    <p className="mt-1 font-semibold text-cyan">{item.role}</p>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">{item.period}</p>
                </div>
                <ul className="space-y-3 text-sm leading-6 text-slate-300 md:text-base md:leading-7">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-violet" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
