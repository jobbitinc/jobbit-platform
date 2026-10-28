import { Fragment } from "react";
import { Briefcase, Handshake, School, Sparkles, Users } from "./icons";
import { cn } from "./ui";

const nodes = [
  {
    key: "students",
    label: "Students",
    icon: Users,
    text: "Discover careers, understand their strengths, and build a personal action plan.",
    accent: "bg-lime text-ink",
  },
  {
    key: "schools",
    label: "Schools",
    icon: School,
    text: "Guide every student with career-connected learning and real engagement insights.",
    accent: "bg-electric text-white",
  },
  {
    key: "employers",
    label: "Employers",
    icon: Briefcase,
    text: "Showcase industries and connect with emerging talent years before hiring.",
    accent: "bg-violet text-white",
  },
  {
    key: "partners",
    label: "Workforce Partners",
    icon: Handshake,
    text: "Extend training, programs, and opportunities to more young people.",
    accent: "bg-[#ff8a3d] text-white",
  },
];

const coreCapabilities = ["Skills insights", "Career matching", "Pathway data", "Opportunity network"];

const gridCols = "lg:grid-cols-[1fr_2.5rem_1fr_2.5rem_1fr_2.5rem_1fr]";

export function EcosystemDiagram({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";

  return (
    <div role="figure" aria-label="The Jobbit ecosystem: Students, Schools, Employers, and Workforce Partners connected by the Jobbit AI platform">
      <div className={cn("grid grid-cols-1 items-stretch", gridCols)}>
        {nodes.map((node, i) => (
          <Fragment key={node.key}>
            <div
              className={cn(
                "relative rounded-3xl border p-6 transition-transform duration-300 hover:-translate-y-1",
                dark ? "border-white/10 bg-white/[0.04]" : "border-line bg-white shadow-[0_20px_50px_-35px_rgba(6,10,23,0.4)]",
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-2xl", node.accent)}>
                  <node.icon size={22} />
                </span>
                <span className={cn("font-mono-ui text-xs", dark ? "text-white/40" : "text-slate-ink/60")}>
                  0{i + 1}
                </span>
              </div>
              <h3 className={cn("mt-5 font-display text-xl font-semibold", dark ? "text-white" : "text-ink")}>
                {node.label}
              </h3>
              <p className={cn("mt-2 text-[15px] leading-relaxed", dark ? "text-white/65" : "text-slate-ink")}>
                {node.text}
              </p>
            </div>
            {i < nodes.length - 1 ? (
              <div className="flex items-center justify-center py-2 lg:py-0" aria-hidden>
                <span className="site-flow-line-v block h-8 w-0.5 lg:hidden" />
                <span className="site-flow-line hidden h-0.5 w-full lg:block" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>

      <div className={cn("hidden lg:grid", gridCols)} aria-hidden>
        {nodes.map((node, i) => (
          <Fragment key={node.key}>
            <div className="flex justify-center">
              <span className="site-flow-line-v block h-10 w-0.5" />
            </div>
            {i < nodes.length - 1 ? <div /> : null}
          </Fragment>
        ))}
      </div>

      <div className="mt-6 lg:mt-0">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-8">
          <div className="site-glow absolute -right-10 -top-10 h-48 w-48 rounded-full bg-lime/40" aria-hidden />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lime text-ink">
                <Sparkles size={24} />
              </span>
              <div>
                <p className="font-display text-xl font-semibold">Jobbit AI Platform</p>
                <p className="text-sm text-white/60">The connective layer between talent and opportunity</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2">
              {coreCapabilities.map((c) => (
                <li key={c} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
