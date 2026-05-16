"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionWrapperProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionWrapper({
  id,
  eyebrow,
  title,
  children,
  className = ""
}: SectionWrapperProps) {
  return (
    <section id={id} className={`section-shell scroll-mt-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {title ? (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mb-10 md:mb-12"
          >
            {eyebrow ? (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan/80">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="font-heading text-3xl font-bold tracking-normal text-white md:text-5xl">
              {title}
            </h2>
          </motion.div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
