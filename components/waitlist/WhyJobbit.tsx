const cards = [
  {
    icon: "🎯",
    title: "Personalized Match",
    desc: "Answer a few questions. Get matched to the exact trade and pathway that fits your life.",
  },
  {
    icon: "🗺",
    title: "Step-by-Step Guide",
    desc: "From quiz to first paycheck — Jobbit builds your personal 30-day action plan and tracks every milestone.",
  },
  {
    icon: "⚡",
    title: "Real Opportunities",
    desc: "Live data on union apprenticeships, trade schools, and certification programs — matched to your location.",
  },
  {
    icon: "💰",
    title: "Earn While You Learn",
    desc: "Union apprenticeships pay from day one. Get a paycheck that grows.",
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
