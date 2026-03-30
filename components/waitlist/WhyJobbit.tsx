const cards = [
  {
    icon: "🎯",
    title: "Personalized Match",
    desc: "Answer a few questions. Get matched to the exact trade and pathway that fits your life — not a generic list.",
  },
  {
    icon: "🗺",
    title: "Step-by-Step Guide",
    desc: "From quiz to first paycheck — Jobbit builds your personal 30-day action plan and tracks every milestone.",
  },
  {
    icon: "📄",
    title: "Application on Autopilot",
    desc: "Jobbit generates your resume, writes your outreach, and prepares you for union interviews. You just show up.",
  },
  {
    icon: "⚡",
    title: "Real Opportunities",
    desc: "Live data on union apprenticeships, trade schools, and certification programs — matched to your location.",
  },
  {
    icon: "💰",
    title: "Earn While You Learn",
    desc: "Union apprenticeships pay from day one. No tuition. No debt. Just a paycheck that grows every year.",
  },
  {
    icon: "🏆",
    title: "Always Free for Students",
    desc: "Jobbit is 100% free for every student. Employers and training providers fund the platform — not you.",
  },
] as const;

export function WhyJobbit() {
  return (
    <div className="why-section">
      <div className="section-eyebrow">Why Jobbit</div>
      <div className="why-grid">
        {cards.map((c) => (
          <div className="why-card" key={c.title}>
            <span className="why-icon">{c.icon}</span>
            <div className="why-title">{c.title}</div>
            <div className="why-desc">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
