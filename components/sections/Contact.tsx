"use client";

import { Github, Linkedin, Mail, MapPin, Send, Globe } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

const contacts = [
  { icon: Mail, label: "chandanswarnakar13@gmail.com", href: "mailto:chandanswarnakar13@gmail.com" },
  { icon: MapPin, label: "Hyderabad, Telangana, India", href: null },
  { icon: Github, label: "github.com/its-Chandan137", href: "https://github.com/its-Chandan137" },
  { icon: Linkedin, label: "linkedin.com/in/chandanswarnakar", href: "https://linkedin.com/in/chandanswarnakar" },
  { icon: Globe, label: "myportfolio137.netlify.app", href: "https://myportfolio137.netlify.app" }
];

const fields = [
  { label: "Name", type: "text" },
  { label: "Email", type: "email" },
  { label: "Message", type: "textarea" }
];

export default function Contact() {
  const formVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <SectionWrapper id="contact" eyebrow="Contact" title="Let's Work Together">
      <div className="grid items-start gap-10 lg:grid-cols-[40%_60%]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="rounded border border-[#1e1e2e] bg-white/[0.025]"
        >
          {contacts.map((item) => {
            const Icon = item.icon;
            const content = (
              <span className="flex items-center gap-4 border-b border-[#1e1e2e] p-4 text-[#e0e0e0] transition duration-300 last:border-b-0 hover:translate-x-1">
                <Icon size={20} className="shrink-0 text-cyan" />
                <span className="break-all">{item.label}</span>
              </span>
            );

            return item.href ? (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </motion.div>

        <motion.form
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="rounded border border-[#1e1e2e] bg-white/[0.04] p-6 backdrop-blur"
        >
          <div className="space-y-5">
            {fields.map((field) => (
              <motion.label
                key={field.label}
                variants={fieldVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="block"
              >
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea
                    rows={5}
                    className="w-full rounded border border-[#1e1e2e] bg-[#0f0f1a] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan focus:shadow-[0_0_18px_rgba(0,212,255,0.16)]"
                    placeholder="Tell me about the frontend experience you want to build"
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full rounded border border-[#1e1e2e] bg-[#0f0f1a] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan focus:shadow-[0_0_18px_rgba(0,212,255,0.16)]"
                    placeholder={field.label}
                  />
                )}
              </motion.label>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.36, duration: 0.5 }}
            type="button"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-cyan px-5 py-3 font-semibold text-night transition duration-300 hover:scale-[1.02] hover:shadow-glow"
          >
            <Send size={18} />
            Submit
          </motion.button>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
