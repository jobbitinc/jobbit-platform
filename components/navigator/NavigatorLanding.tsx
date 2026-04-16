"use client";

import Link from "next/link";
import { getFeaturedJobs } from "@/lib/job-dummy-data";
import { useCareer } from "./CareerContext";
import { SampleJobsBlock } from "./SampleJobsBlock";

const tradePills = [
  ["⚡", "Electrician", "$75K–$120K"],
  ["🔧", "Plumber", "$65K–$105K"],
  ["❄️", "HVAC Tech", "$60K–$95K"],
  ["🔥", "Welder", "$55K–$90K"],
  ["🪚", "Carpenter", "$55K–$90K"],
  ["👷", "Construction Mgr", "$80K–$130K"],
  ["🚜", "Heavy Equipment", "$60K–$95K"],
  ["🔩", "Pipefitter", "$70K–$110K"],
  ["🏗️", "Ironworker", "$70K–$115K"],
  ["🔨", "Sheet Metal Worker", "$65K–$100K"],
  ["🛗", "Elevator Mechanic", "$85K–$130K"],
  ["⚙️", "Boilermaker", "$75K–$120K"],
  ["☀️", "Solar Installer", "$50K–$80K"],
  ["💨", "Wind Turbine Tech", "$55K–$85K"],
  ["🛠️", "Industrial Mechanic", "$65K–$100K"],
  ["🧱", "Brick/Stonemason", "$55K–$90K"],
  ["✂️", "Cosmetologist", "$35K–$75K"],
] as const;

export function NavigatorLanding() {
  const { openAuth } = useCareer();

  return (
    <div className="nav-landing nv-animate-in">
      <div className="hero">
        <div className="hero-content">
          <div className="hero-tag">AI Career Navigator</div>
          <h1>
            Find your <em>career</em> in the skilled trades.
          </h1>
          <p className="hero-sub">
            Answer 8 quick questions. Get matched to your top 3 trade careers — with salaries, action plans, and everything you need to get started. Free, always.
          </p>
          <div className="hero-actions">
            <Link href="/navigator/quiz" className="btn-primary">
              Take the Career Quiz →
            </Link>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            >
              How it works
            </button>
          </div>
          <div className="hero-social">
            <div className="hero-avatars">
              <span>👩🏾</span>
              <span>👨🏻</span>
              <span>👩🏽</span>
              <span>👦🏿</span>
            </div>
            <span>247+ young people on the waitlist</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hv-header">
            <div className="hv-dot" style={{ background: "#FF5F57" }} />
            <div className="hv-dot" style={{ background: "#FFBD2E" }} />
            <div className="hv-dot" style={{ background: "#28CA41" }} />
            <span className="hv-header-title">jobbit.com — your results</span>
          </div>
          <div className="hv-body">
            <div
              style={{
                fontSize: 11,
                color: "var(--text-3)",
                fontFamily: "var(--font-dm-mono), monospace",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Your Top Matches
            </div>
            <div className="hv-match">
              <div className="hv-match-top">
                <span className="hv-match-name">⚡ Electrician</span>
                <span className="hv-match-score">91% match</span>
              </div>
              <div className="hv-match-salary">$75K – $120K/yr · Union pathway</div>
              <div className="hv-bar">
                <div className="hv-bar-fill" style={{ width: "91%" }} />
              </div>
            </div>
            <div className="hv-match">
              <div className="hv-match-top">
                <span className="hv-match-name">🔧 Pipefitter</span>
                <span className="hv-match-score">84% match</span>
              </div>
              <div className="hv-match-salary">$70K – $110K/yr · Apprenticeship</div>
              <div className="hv-bar">
                <div className="hv-bar-fill" style={{ width: "84%" }} />
              </div>
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-3)",
                fontFamily: "var(--font-dm-mono), monospace",
                margin: "14px 0 8px",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Action Plan
            </div>
            <div className="hv-action-item">
              <div className="hv-check">
                <svg viewBox="0 0 12 10">
                  <polyline points="1,5 4,8 11,1" />
                </svg>
              </div>
              <span>Register for OSHA-10 certification</span>
            </div>
            <div className="hv-action-item">
              <div className="hv-check">
                <svg viewBox="0 0 12 10">
                  <polyline points="1,5 4,8 11,1" />
                </svg>
              </div>
              <span>Find IBEW apprenticeship near you</span>
            </div>
            <div className="hv-action-item">
              <div className="hv-pending" />
              <span>Prepare application documents</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stats-inner">
          <div>
            <span className="stat-num">
              <span>3.8</span>M
            </span>
            <div className="stat-label">Trade jobs unfilled by 2032</div>
          </div>
          <div>
            <span className="stat-num">
              $<span>90</span>K+
            </span>
            <div className="stat-label">Avg union electrician salary</div>
          </div>
          <div>
            <span className="stat-num">
              $<span>0</span>
            </span>
            <div className="stat-label">Cost to students, always</div>
          </div>
          <div>
            <span className="stat-num">
              <span>17</span>
            </span>
            <div className="stat-label">Trades in the matching engine</div>
          </div>
        </div>
      </div>

      <div className="bg-surface">
        <div className="section">
          <div className="section-tag">Sample paths</div>
          <h2 className="section-title">Example openings (demo)</h2>
          <p className="section-sub">
            Illustrative union, contractor, and apprenticeship-style listings — your real matches will include similar paths after the quiz.
          </p>
          <SampleJobsBlock jobs={getFeaturedJobs()} />
        </div>
      </div>

      <section className="section" id="how-it-works">
        <div className="section-tag">How it works</div>
        <h2 className="section-title">From quiz to career in minutes.</h2>
        <p className="section-sub">
          No resume, no experience, no idea where to start? That&apos;s exactly who jobbit is built for.
        </p>
        <div className="steps-grid">
          {[
            { num: "01", icon: "🎯", title: "Take the Quiz", desc: "8 questions about your work style, environment, strengths, and goals. No wrong answers — just honest ones." },
            { num: "02", icon: "⚡", title: "Get Matched", desc: "Our AI matches you to your top 3 trades, shows you why, your readiness score, and what skills to build." },
            { num: "03", icon: "🗺️", title: "Follow Your Plan", desc: "Every match comes with a step-by-step action plan. Certs, timelines, costs — specific to you." },
            { num: "04", icon: "📊", title: "Track Progress", desc: "Save your results, check off milestones, and come back anytime. Your career journey, organised." },
            { num: "05", icon: "🤝", title: "Connect & Apply", desc: "We connect you directly to apprenticeship programs, unions, and training providers near you." },
            { num: "06", icon: "💰", title: "Start Earning", desc: "Apprentices earn while they learn. No student debt. A $60K–$120K career starts here." },
          ].map((s) => (
            <div className="step-card" key={s.title}>
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-surface">
        <div className="section">
          <div className="section-tag">Trades we cover</div>
          <h2 className="section-title">Seventeen careers. Zero college debt.</h2>
          <p className="section-sub">High pay, high demand, and a real future — without a four-year degree.</p>
          <div className="trades-grid">
            {tradePills.map(([icon, name, salary]) => (
              <div className="trade-pill" key={name}>
                <div className="trade-pill-icon">{icon}</div>
                <div className="trade-pill-name">{name}</div>
                <div className="trade-pill-salary">{salary}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-band">
        <h2>Your $90K career starts with 8 questions.</h2>
        <p>17 trades. Free forever for job seekers. No experience required.</p>
        <div className="cta-band-actions">
          <Link href="/navigator/quiz" className="btn-primary">
            Start the Career Quiz →
          </Link>
          <button type="button" className="cta-band-account" onClick={() => openAuth("signup")}>
            Create free account
          </button>
        </div>
      </div>

      <footer className="nv-footer">
        © 2025 jobbit Inc. · AI Career Navigator for the Skilled Trades · Free for students, always. ·{" "}
        <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline" }}>
          Join the waitlist
        </Link>
      </footer>
    </div>
  );
}
