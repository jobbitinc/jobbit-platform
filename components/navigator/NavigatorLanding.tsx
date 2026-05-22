"use client";

import Link from "next/link";
import { useCareer } from "./CareerContext";

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
      <div className="hero-zone">
        <div className="cityscape-towers" aria-hidden>
          <span style={{ height: "45%" }} />
          <span style={{ height: "72%" }} />
          <span style={{ height: "58%" }} />
          <span style={{ height: "88%" }} />
          <span style={{ height: "65%" }} />
          <span style={{ height: "95%" }} />
          <span style={{ height: "70%" }} />
          <span style={{ height: "82%" }} />
          <span style={{ height: "55%" }} />
          <span style={{ height: "78%" }} />
          <span style={{ height: "48%" }} />
        </div>
        <div className="hero">
        <div className="hero-content">
          <div className="hero-tag">AI Career Navigator</div>
          <h1>
            FIND YOUR CAREER
            <span className="hero-line-lime">IN THE SKILLED TRADES</span>
          </h1>
          <p className="hero-sub">
            Answer 7 quick questions in under 3 minutes.
            <br />
            Get matched to your top 3 trade careers — with salaries and your action plan.
            <br />
            $0 — free always for students.
          </p>
          <div className="hero-actions">
            <Link href="/navigator/quiz" className="btn-primary">
              Find My Match →
            </Link>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            >
              How It Works
            </button>
          </div>
        </div>
        <div className="hero-visual phone-mockup">
          <div className="hv-header">
            <div className="hv-dot" style={{ background: "#FF5F57" }} />
            <div className="hv-dot" style={{ background: "#FFBD2E" }} />
            <div className="hv-dot" style={{ background: "#28CA41" }} />
            <span className="hv-header-title">jobbitapp.com</span>
          </div>
          <div className="hv-body">
            <div className="hv-dash-greeting" style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
              Hey Alex 👋
            </div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 14 }}>Ready to build your future?</div>
            <div style={{ fontSize: 10, color: "var(--lime)", fontFamily: "var(--font-dm-mono)", marginBottom: 6, letterSpacing: 1 }}>
              RECOMMENDED FOR YOU
            </div>
            <div className="hv-match">
              <div className="hv-match-top">
                <span className="hv-match-name">⚡ Electrician</span>
                <span className="hv-match-score">92% MATCH</span>
              </div>
              <div className="hv-match-salary">High demand · Great pay · $75K – $120K</div>
              <div className="hv-bar">
                <div className="hv-bar-fill" style={{ width: "18%" }} />
              </div>
              <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 6 }}>Your Path · 18% complete</div>
            </div>
            <div style={{ fontSize: 10, color: "var(--text-3)", margin: "14px 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>
              Top 3 Career Matches
            </div>
            <div className="hv-action-item">
              <span>1. ⚡ Electrician</span>
              <span style={{ color: "var(--lime)" }}>›</span>
            </div>
            <div className="hv-action-item">
              <span>2. 🔧 Pipefitter</span>
              <span style={{ color: "var(--text-3)" }}>›</span>
            </div>
            <div className="hv-action-item">
              <span>3. ❄️ HVAC Tech</span>
              <span style={{ color: "var(--text-3)" }}>›</span>
            </div>
          </div>
        </div>
      </div>

        <div className="hero-ready-panel">
          <h3>Ready to take the next step?</h3>
          <Link href="/navigator/quiz" className="btn-primary">
            Find My Match →
          </Link>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stats-inner">
          <div>
            <span className="stat-num">
              <span>7</span>
            </span>
            <div className="stat-label">Questions · under 3 minutes</div>
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
            <div className="stat-label">Cost to students</div>
          </div>
          <div>
            <span className="stat-num">
              <span>17</span>
            </span>
            <div className="stat-label">Trades in the matching engine</div>
          </div>
        </div>
      </div>

      <section className="section" id="how-it-works">
        <div className="section-tag">How it works</div>
        <h2 className="section-title">From quiz to career in minutes</h2>
        <p className="section-sub">
          No resume, no experience, no idea where to start? no worries- Jobbit was created for you.
        </p>
        <div className="steps-grid">
          {[
            { num: "01", icon: "🎯", title: "Take the Quiz", desc: "7 questions about your work style, environment, strengths, and goals." },
            { num: "02", icon: "⚡", title: "Get Matched", desc: "AI matches you to your top 3 trades with salaries and personalized why-match text." },
            { num: "03", icon: "🗺️", title: "Follow Your Plan", desc: "Every match comes with a step-by-step action plan built for you." },
            { num: "04", icon: "📊", title: "Track Progress", desc: "Save results, check off milestones, and come back anytime. Your career journey, organized." },
            { num: "05", icon: "🤝", title: "Connect & Apply", desc: "Paths to apprenticeships, unions, and training providers near you." },
            { num: "06", icon: "💰", title: "Start Earning", desc: "Apprentices earn while they learn. A $60K–$120K career starts here." },
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

      <div className="bg-surface trades-section">
        <div className="section">
          <div className="section-tag">Your Pathway to Skilled Trades</div>
          <h2 className="section-title">Seventeen careers. Zero college debt.</h2>
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
        <h2>Your Future Starts with Seven Questions</h2>
        <p>Join Jobbit — find your trade</p>
        <div className="cta-band-actions">
          <Link href="/navigator/quiz" className="btn-primary">
            Find My Match →
          </Link>
          <button type="button" className="cta-band-account" onClick={() => openAuth("signup")}>
            Create free account
          </button>
        </div>
      </div>

      <footer className="nv-footer">
        © 2025 jobbit Inc. · AI Career Navigator for the Skilled Trades · Free for students. ·{" "}
        <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline" }}>
          Join the waitlist
        </Link>
      </footer>
    </div>
  );
}
