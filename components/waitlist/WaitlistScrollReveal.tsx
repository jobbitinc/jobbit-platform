"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const viewport = { once: true, margin: "-48px" as const, amount: 0.15 as const };

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function WaitlistScrollReveal({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
