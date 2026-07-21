"use client";

import Link from "next/link";
import { useCareer } from "./CareerContext";

const tradePills = [
  ["⚡", "Electrician", "$75K–$120K", "Install and maintain electrical systems in homes, commercial buildings, and industrial sites."],
  ["🔧", "Plumber", "$65K–$105K", "Install and repair pipes, fixtures, and water systems for residential and commercial clients."],
  ["❄️", "HVAC Tech", "$60K–$95K", "Service heating, ventilation, and air conditioning systems so buildings stay comfortable year-round."],
  ["🔥", "Welder", "$55K–$90K", "Join metal parts with heat and precision for construction, manufacturing, and fabrication work."],
  ["🪚", "Carpenter", "$55K–$90K", "Build and repair structures, frames, and finishes using wood and related materials."],
  ["👷", "Construction Mgr", "$80K–$130K", "Plan, coordinate, and oversee job sites so projects finish on time and on budget."],
  ["🚜", "Heavy Equipment", "$60K–$95K", "Operate excavators, loaders, and other machines that move earth and materials on site."],
  ["🔩", "Pipefitter", "$70K–$110K", "Assemble and maintain high-pressure piping systems used in industrial and commercial settings."],
  ["🏗️", "Ironworker", "$70K–$115K", "Erect structural steel and reinforce concrete frameworks for bridges, towers, and buildings."],
  ["🔨", "Sheet Metal Worker", "$65K–$100K", "Fabricate and install ductwork and metal components for HVAC and construction projects."],
  ["🛗", "Elevator Mechanic", "$85K–$130K", "Install, modernize, and repair elevators, escalators, and related vertical-transport systems."],
  ["⚙️", "Boilermaker", "$75K–$120K", "Build and maintain boilers, tanks, and large pressure vessels for industrial facilities."],
  ["☀️", "Solar Installer", "$50K–$80K", "Mount and wire solar panels so homes and businesses can generate clean energy."],
  ["💨", "Wind Turbine Tech", "$55K–$85K", "Climb, inspect, and repair wind turbines that produce renewable electricity."],
  ["🛠️", "Industrial Mechanic", "$65K–$100K", "Keep factory equipment running by diagnosing, repairing, and maintaining machinery."],
  ["🧱", "Brick/Stonemason", "$55K–$90K", "Lay brick, stone, and block to build walls, facades, and durable outdoor structures."],
  ["✂️", "Cosmetologist", "$35K–$75K", "Provide hair, skin, and beauty services in salons and related client-facing settings."],
] as const;

function CtaPair({ size = "default" }: { size?: "default" | "nav" }) {
  const howClass = size === "nav" ? "btn-secondary btn-cta-how nav-btn-how" : "btn-secondary btn-cta-how";
  const matchClass = size === "nav" ? "btn-primary btn-cta-match nav-btn-match" : "btn-primary btn-cta-match";
  return (
    <>
      <button
        type="button"
        className={howClass}
        onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
      >
        How It Works
      </button>
      <Link href="/navigator/quiz" className={matchClass}>
        Find My Match →
      </Link>
    </>
  );
}

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
          <div className="hero-tag">AI Career Navigator · New Jersey</div>
          <h1>
            FIND YOUR CAREER
            <span className="hero-line-lime">IN THE SKILLED TRADES</span>
          </h1>
          <p className="hero-sub">
            Answer 6 Questions.
            <br />
            Get matched to your top 3 trade careers, with salaries and your action plan.
          </p>
          <div className="hero-actions cta-pair">
            <CtaPair />
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
          <div className="hero-ready-copy">
            <h3>Ready to take the next step?</h3>
            <p className="hero-ready-sub">Answer 6 Questions to get started.</p>
          </div>
          <div className="cta-pair hero-ready-actions">
            <CtaPair />
          </div>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stats-inner">
          <div>
            <span className="stat-num">
              <span>6</span>
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
              <span>3</span>
            </span>
            <div className="stat-label">Personalized trade matches</div>
          </div>
          <div>
            <span className="stat-num">
              <span>17</span>
            </span>
            <div className="stat-label">Trades in the matching engine</div>
          </div>
        </div>
      </div>

      <section className="section nj-launch-section" id="nj-launch">
        <div className="section-tag">Rollout</div>
        <h2 className="section-title">Launching First in New Jersey</h2>
        <p className="section-sub nj-launch-sub">
          We&apos;re helping New Jersey students discover careers, build skills, and connect with employers. More states
          are on the way.
        </p>
        <ul className="nj-launch-status" aria-label="Launch status">
          <li className="nj-launch-row live">
            <span className="nj-status-dot" aria-hidden>
              🟢
            </span>
            <span>
              <strong>New Jersey</strong> — Live
            </span>
          </li>
          <li className="nj-launch-row soon">
            <span className="nj-status-dot" aria-hidden>
              ⚪
            </span>
            <span>
              <strong>More States</strong> — Coming Soon
            </span>
          </li>
        </ul>
        <div className="nj-launch-waitlist">
          <p className="nj-waitlist-q">Not in New Jersey?</p>
          <p className="nj-waitlist-copy">
            Join our waitlist and be the first to know when Jobbit launches in your state.
          </p>
          <Link href="/waitlist" className="btn-primary btn-cta-match">
            Join the waitlist →
          </Link>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="section-tag">How it works</div>
        <h2 className="section-title">From quiz to career in minutes</h2>
        <p className="section-sub">
          No resume, no experience, no idea where to start? no worries- Jobbit was created for you.
        </p>
        <div className="steps-grid">
          {[
            { num: "01", icon: "🎯", title: "Take the Quiz", desc: "6 questions about your work style, environment, strengths, and goals." },
            { num: "02", icon: "⚡", title: "Get Matched", desc: "AI matches you to your top 3 trades with salaries and personalized why-match text." },
            { num: "03", icon: "🗺️", title: "Follow Your Plan", desc: "Every match comes with a step-by-step action plan built for you." },
            { num: "04", icon: "📊", title: "Track Progress", desc: "Save results, check off milestones, and come back anytime. Your career journey, organized." },
            { num: "05", icon: "🤝", title: "Connect & Apply", desc: "Paths to New Jersey apprenticeships, unions, and trade schools near you." },
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
          <h2 className="section-title">Find Your Trade. Build Your Future</h2>
          <div className="trades-grid">
            {tradePills.map(([icon, name, salary, blurb]) => (
              <div className="trade-pill" key={name} tabIndex={0}>
                <div className="trade-pill-icon">{icon}</div>
                <div className="trade-pill-name">{name}</div>
                <div className="trade-pill-salary">{salary}</div>
                <div className="trade-pill-tooltip" role="tooltip">
                  {blurb}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-band">
        <h2>Your Future Starts with 6 Questions</h2>
        <p>Join Jobbit — find your trade</p>
        <div className="cta-band-actions cta-pair">
          <CtaPair />
          <button type="button" className="btn-secondary btn-cta-how" onClick={() => openAuth("signup")}>
            Create account
          </button>
        </div>
      </div>

      <footer className="nv-footer">
        © 2025 jobbit Inc. · AI Career Navigator for the Skilled Trades ·{" "}
        <Link href="/waitlist" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline" }}>
          Join the waitlist
        </Link>
      </footer>
    </div>
  );
}
