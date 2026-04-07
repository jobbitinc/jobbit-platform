"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
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

function getInitialCount(): number {
  const raw = process.env.NEXT_PUBLIC_WAITLIST_INITIAL_COUNT;
  if (raw) {
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n)) return n;
  }
  return 247;
}

export function WaitlistHero() {
  const initial = useRef(getInitialCount());
  const [displayCount, setDisplayCount] = useState(initial.current - 12);

  useEffect(() => {
    const target = initial.current;
    let current = target - 12;
    const step = () => {
      if (current < target) {
        current++;
        setDisplayCount(current);
        setTimeout(step, 80);
      }
    };
    const t = setTimeout(step, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero">
      <div className="counter-badge" aria-live="polite">
        <span className="counter-dot" />
        <span className="counter-text">Waitlist open —</span>
        <span className="counter-num">{displayCount}</span>
        <span className="counter-text">people ahead of you</span>
      </div>

      <div className="hero-eyebrow">Early Access · Limited Spots</div>

      <h1>
        YOUR NEXT
        <br />
        <span className="line-green">CAREER STARTS</span>
        <br />
        HERE.
      </h1>

      <p className="hero-sub">
        Jobbit is the AI navigator that matches young people with high-paying trade careers and union apprenticeships — then walks them all the way to their first paycheck.
      </p>

      <WaitlistFormBlock initialTotalRef={initial} setDisplayCount={setDisplayCount} />
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
  const [position, setPosition] = useState(0);

  const onSubmit = useCallback(async () => {
    const f = firstName.trim();
    const e = email.trim();
    if (!f || !e || !e.includes("@")) {
      setError("Please enter your first name and a valid email.");
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const payload: WaitlistLeadInput = {
        firstName: f,
        lastName: lastName.trim(),
        email: e,
        age: age ? Number(age) : null,
        zip: zip.trim(),
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
      setPosition(next);
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
    `Just joined the Jobbit waitlist — an AI that matches you with trade careers & apprenticeships. No college debt. Real $100K careers. #Jobbit`,
  );
  const twitterHref = `https://twitter.com/intent/tweet?text=${tweet}&url=${encodeURIComponent(siteUrl)}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;

  if (success) {
    return (
      <div className="success-state">
        <div className="success-icon">✓</div>
        <div className="success-headline">
          YOU&apos;RE IN.
          <br />
          <span>YOU&apos;RE ON THE LIST.</span>
        </div>
        <div className="success-pos">
          <span className="success-pos-num">#{position}</span>
          <span className="success-pos-label">Your Waitlist Position</span>
        </div>
        <p className="success-sub">
          We&apos;ll notify you the moment early access opens.
          <br />
          In the meantime — spread the word.
        </p>
        <div style={{ marginBottom: 14 }}>
          <Link href="/navigator/quiz" className="submit-btn" style={{ display: "inline-flex", textDecoration: "none" }}>
            Try Career Quiz Now →
          </Link>
        </div>
        <ShareRow twitterHref={twitterHref} linkedInHref={linkedInHref} siteUrl={siteUrl} />
      </div>
    );
  }

  return (
    <div className="waitlist-form">
      <div className="form-row">
        <div>
          <label className="field-label" htmlFor="wl-first">
            First Name
          </label>
          <input
            id="wl-first"
            className="form-input"
            type="text"
            placeholder="Jordan"
            autoComplete="given-name"
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
        </label>
        <input
          id="wl-email"
          className="form-input"
          type="email"
          placeholder="jordan@email.com"
          autoComplete="email"
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
            placeholder="e.g. 07030"
            maxLength={10}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
      </div>

      <div className="form-full">
        <span className="role-label">I am a...</span>
        <div className="role-grid">
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
      <p className="form-privacy">🔒 Zero spam. Zero selling your data. We&apos;ll email you when it&apos;s your turn.</p>
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
