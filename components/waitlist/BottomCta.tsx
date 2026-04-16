"use client";

import { motion } from "framer-motion";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

export function BottomCta() {
  return (
    <motion.section
      className="bottom-cta"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{ duration: 0.58, ease: easeSmooth }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.06, ease: easeSmooth }}
      >
        DON&apos;T WAIT—<span className="bottom-cta-accent">SIGN UP NOW</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.48, delay: 0.12, ease: easeSmooth }}
      >
        Early waitlist members get priority access, exclusive career insights, and first pick of apprenticeship matches in their area.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: 0.18, ease: easeSmooth }}
      >
        <button
          type="button"
          className="bottom-btn"
          onClick={() => {
            document.querySelector(".hero")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Join the Waitlist →
        </button>
      </motion.div>
    </motion.section>
  );
}
