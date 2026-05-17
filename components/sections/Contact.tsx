"use client";

import { Github, Linkedin, Mail, MapPin, Send, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  useEffect(() => {
    if (sessionStorage.getItem("msgSent") === "true") {
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Remember to add NEXT_PUBLIC_FORMSPREE_ENDPOINT
      // to Vercel project environment variables before deploying
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        sessionStorage.setItem("msgSent", "true");
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
          onSubmit={handleSubmit}
          className="rounded border border-[#1e1e2e] bg-white/[0.04] p-6 backdrop-blur"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            >
              <svg className="mb-6 h-20 w-20 text-cyan" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <motion.path
                  d="M20 33.5L28 41.5L45 24.5"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, delay: 0.35, ease: "easeInOut" }}
                />
              </svg>
              <h3 className="font-heading text-3xl font-bold text-white">Message Sent!</h3>
              <p className="mt-4 max-w-md text-base leading-7 text-[#888888]">
                Thanks for reaching out. I&apos;ve received your message
                <br />
                and will get back to you as soon as possible.
              </p>
              <p className="mt-6 text-lg italic text-cyan">- Chandan</p>
            </motion.div>
          ) : (
            <>
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
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded border border-[#1e1e2e] bg-[#0f0f1a] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan focus:shadow-[0_0_18px_rgba(0,212,255,0.16)]"
                        placeholder="Tell me about the frontend experience you want to build"
                        required
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={field.label === "Name" ? name : email}
                        onChange={(e) => {
                          if (field.label === "Name") {
                            setName(e.target.value);
                          } else {
                            setEmail(e.target.value);
                          }
                        }}
                        className="w-full rounded border border-[#1e1e2e] bg-[#0f0f1a] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan focus:shadow-[0_0_18px_rgba(0,212,255,0.16)]"
                        placeholder={field.label}
                        required
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
                type="submit"
                disabled={loading}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-cyan px-5 py-3 font-semibold text-night transition duration-300 hover:scale-[1.02] hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-night/30 border-t-night" />
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    SEND MESSAGE
                  </>
                )}
              </motion.button>

              {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
            </>
          )}
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
