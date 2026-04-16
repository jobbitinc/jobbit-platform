"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPublicSiteUrl } from "@/lib/site";
import type { WaitlistLeadInput } from "@/lib/waitlist/types";

const ROLES = [
  { label: "🎓 Student", value: "Student / Job Seeker" },
  { label: "👨‍👩‍👧 Parent", value: "Parent / Guardian" },
  { label: "🏗 Employer", value: "Employer / Union" },
  { label: "📋 Counselor", value: "School / Counselor" },
  { label: "💼 Investor", value: "Investor / Partner" },
  { label: "✦ Other", value: "Other" },
] as const;

function RequiredStar() {
  return (
    <span className="field-required-star" aria-hidden="true">
      *
    </span>
  );
}

function validateWaitlistFields(firstName: string, email: string): string | null {
  if (!firstName.trim()) return "Please enter your first name.";
  const e = email.trim().toLowerCase();
  if (!e || !e.includes("@")) return "Please enter a valid email address.";
  return null;
}

function getInitialCount(): number {
  const raw = process.env.NEXT_PUBLIC_WAITLIST_INITIAL_COUNT;
  if (raw) {
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n)) return n;
  }
  return 247;
}

const easeSmooth = [0.22, 1, 0.36, 1] as const;

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.18 },
  },
};

const headlineLine = {
  hidden: { opacity: 0, y: "0.12em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: easeSmooth },
  },
};

export function WaitlistHero() {
  const initial = useRef(getInitialCount());
  const [, setDisplayCount] = useState(initial.current);

  return (
    <section className="hero">
      <motion.div
        className="counter-badge"
        aria-live="polite"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.52, ease: easeSmooth }}
      >
        <span className="counter-dot" />
        <span className="counter-text">Waitlist Open</span>
      </motion.div>

      <motion.div
        className="hero-eyebrow"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06, ease: easeSmooth }}
      >
        Get Early Access
      </motion.div>

      <motion.h1 variants={headlineContainer} initial="hidden" animate="visible">
        <motion.span className="hero-headline-line" variants={headlineLine}>
          YOUR NEXT
        </motion.span>
        <motion.span className="hero-headline-line line-green" variants={headlineLine}>
          CAREER STARTS
        </motion.span>
        <motion.span className="hero-headline-line" variants={headlineLine}>
          HERE
        </motion.span>
      </motion.h1>

      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, delay: 0.62, ease: easeSmooth }}
      >
        Jobbit is the AI Navigator that makes career opportunities easier to find
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.78, ease: easeSmooth }}
      >
        <WaitlistFormBlock initialTotalRef={initial} setDisplayCount={setDisplayCount} />
      </motion.div>
    </section>
  );
}

function WaitlistFormBlock({
  initialTotalRef,
  setDisplayCount,
}: {
  initialTotalRef: { current: number };
  setDisplayCount: (n: number) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [zip, setZip] = useState("");
  const [role, setRole] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = useCallback(async () => {
    const msg = validateWaitlistFields(firstName, email);
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const zipDigits = zip.trim().replace(/\s/g, "");
      const payload: WaitlistLeadInput = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        age: age.trim() === "" ? null : Math.round(Number(age)),
        zip: zipDigits,
        role,
      };

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) {
        setError(data.message ?? "Could not join waitlist right now. Please try again.");
        return;
      }

      const next = initialTotalRef.current + 1;
      initialTotalRef.current = next;
      setDisplayCount(next);
      setSuccess(true);
    } catch {
      setError("Could not join waitlist right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [age, email, firstName, initialTotalRef, lastName, role, setDisplayCount, zip]);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Enter" && !success) onSubmit();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [success, onSubmit]);

  const siteUrl = typeof window !== "undefined" ? getPublicSiteUrl() : "https://jobbit.vercel.app";
  const tweet = encodeURIComponent(
    `Just joined the Jobbit waitlist — an AI that matches you with trade careers & apprenticeships. Real $100K careers. #Jobbit`,
  );
  const twitterHref = `https://twitter.com/intent/tweet?text=${tweet}&url=${encodeURIComponent(siteUrl)}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;

  if (success) {
    return (
      <motion.div
        className="success-state"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48, ease: easeSmooth }}
      >
        <motion.div
          className="success-icon"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.42, delay: 0.06, ease: easeSmooth }}
        >
          {"\u2713"}
        </motion.div>
        <div className="success-headline">You&apos;re on the list.</div>
        <p className="success-sub">We will be in touch soon.</p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: easeSmooth }}
        >
          <ShareRow twitterHref={twitterHref} linkedInHref={linkedInHref} siteUrl={siteUrl} />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="waitlist-form">
      <div className="form-row">
        <div>
          <label className="field-label" htmlFor="wl-first">
            First Name
            <RequiredStar />
          </label>
          <input
            id="wl-first"
            className="form-input"
            type="text"
            placeholder="Jordan"
            autoComplete="given-name"
            required
            aria-required="true"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="wl-last">
            Last Name
          </label>
          <input
            id="wl-last"
            className="form-input"
            type="text"
            placeholder="Smith"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="form-full">
        <label className="field-label" htmlFor="wl-email">
          Email Address
          <RequiredStar />
        </label>
        <input
          id="wl-email"
          className="form-input"
          type="email"
          placeholder="jordan@email.com"
          autoComplete="email"
          required
          aria-required="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div>
          <label className="field-label" htmlFor="wl-age">
            Age
          </label>
          <input
            id="wl-age"
            className="form-input"
            type="number"
            placeholder="e.g. 19"
            min={14}
            max={40}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="wl-zip">
            ZIP Code
          </label>
          <input
            id="wl-zip"
            className="form-input"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 07030"
            maxLength={10}
            autoComplete="postal-code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
      </div>

      <div className="form-full">
        <span className="role-label" id="wl-role-label">
          I am a...
        </span>
        <div className="role-grid" role="group" aria-labelledby="wl-role-label">
          {ROLES.map((r) => (
            <button
              key={r.value}
              type="button"
              className={`role-btn${role === r.value ? " active" : ""}`}
              onClick={() => setRole(r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="submit-btn" disabled={submitting} onClick={onSubmit}>
        <span>{submitting ? "Saving your spot..." : "Secure My Spot on the Waitlist →"}</span>
      </button>
      {error ? <div className="form-error">{error}</div> : null}
    </div>
  );
}

function ShareRow({
  twitterHref,
  linkedInHref,
  siteUrl,
}: {
  twitterHref: string;
  linkedInHref: string;
  siteUrl: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="share-row">
      <a className="share-btn" href={twitterHref} target="_blank" rel="noopener noreferrer">
        Share on X
      </a>
      <a className="share-btn" href={linkedInHref} target="_blank" rel="noopener noreferrer">
        Share on LinkedIn
      </a>
      <button
        type="button"
        className="share-btn"
        onClick={() => {
          void navigator.clipboard.writeText(siteUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
          });
        }}
        style={copied ? { borderColor: "var(--green)", color: "var(--green)" } : undefined}
      >
        {copied ? "✓ Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
