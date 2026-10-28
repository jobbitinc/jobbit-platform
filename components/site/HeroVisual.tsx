import { Briefcase, School, Sparkles } from "./icons";

const skills = [
  { label: "Problem solving", value: 86, color: "bg-lime" },
  { label: "Teamwork", value: 74, color: "bg-electric" },
  { label: "Hands-on building", value: 91, color: "bg-violet" },
];

const matches = [
  { name: "Electrical Technician", match: 94 },
  { name: "UX Designer", match: 88 },
  { name: "Healthcare Tech", match: 81 },
];

/** Stylized product preview for the homepage hero. Decorative only. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[600px] sm:p-12" aria-hidden>
      <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-5 shadow-[0_40px_120px_-40px_rgba(47,107,255,0.6)] backdrop-blur-xl sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-lime to-electric font-display text-sm font-bold text-ink">
              MA
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Maya, Grade 11</p>
              <p className="text-xs text-white/50">Career profile · 72% complete</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/15 px-2.5 py-1 font-mono-ui text-[10px] uppercase tracking-wider text-lime">
            <span className="site-pulse-dot h-1.5 w-1.5 rounded-full bg-lime" />
            AI insights
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-ink/60 p-4">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-white/40">Top strengths</p>
          <div className="mt-3 space-y-3">
            {skills.map((s, i) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs text-white/75">
                  <span>{s.label}</span>
                  <span className="font-mono-ui">{s.value}</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
                  <div
                    className={`site-bar-grow h-full rounded-full ${s.color}`}
                    style={{ width: `${s.value}%`, animationDelay: `${0.3 + i * 0.15}s` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-white/40">Career pathways for you</p>
          {matches.map((m, i) => (
            <div
              key={m.name}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                i === 0 ? "border-lime/40 bg-lime/10" : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <span className="text-sm font-medium text-white">{m.name}</span>
              <span className={`font-mono-ui text-xs ${i === 0 ? "text-lime" : "text-white/55"}`}>{m.match}% match</span>
            </div>
          ))}
        </div>
      </div>

      <div className="site-float absolute left-0 top-0 hidden rounded-2xl border border-white/10 bg-ink-2/90 p-3.5 shadow-2xl backdrop-blur-xl sm:block">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric text-white">
            <School size={18} />
          </span>
          <div>
            <p className="text-xs font-semibold text-white">Lincoln High School</p>
            <p className="text-[11px] text-white/50">Career week · 240 students</p>
          </div>
        </div>
      </div>

      <div className="site-float-delay absolute bottom-0 right-0 hidden rounded-2xl border border-white/10 bg-ink-2/90 p-3.5 shadow-2xl backdrop-blur-xl sm:block">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet text-white">
            <Briefcase size={18} />
          </span>
          <div>
            <p className="text-xs font-semibold text-white">Employer spotlight</p>
            <p className="text-[11px] text-white/50">Apprenticeships open</p>
          </div>
        </div>
      </div>

      <div className="site-float absolute bottom-3 left-4 hidden items-center gap-2 rounded-full border border-lime/30 bg-ink-2/95 px-4 py-2 shadow-2xl sm:flex">
        <Sparkles size={16} className="text-lime" />
        <span className="text-xs font-medium text-white">Next step: Job shadow day</span>
      </div>
    </div>
  );
}
