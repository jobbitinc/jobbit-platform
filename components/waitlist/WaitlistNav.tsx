"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

export function WaitlistNav() {
  return (
    <motion.nav
      className="wl-nav"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeSmooth }}
    >
      <a href="/" className="wl-logo-link" aria-label="jobbit home">
        <Image
          src="/logo.png"
          alt="jobbit"
          width={240}
          height={48}
          className="wl-logo-img"
          priority
        />
      </a>
      <p className="wl-nav-tagline footer-copy">AI Career Navigator for the Skilled Trades</p>
    </motion.nav>
  );
}
