import { CtaBand } from "@/components/site/CtaBand";
import { EcosystemDiagram } from "@/components/site/EcosystemDiagram";
import { Briefcase, ChevronDown, Compass, Handshake, Rocket, Route, School, Target } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, SectionHeading } from "@/components/site/ui";
import { JOBBIT_APP_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Jobbit Works",
  description:
    "See how Jobbit connects students, schools, employers, and workforce partners in one AI-powered career readiness ecosystem. No technical background required.",
  alternates: { canonical: "/how-it-works" },
};

const studentJourney = [
  {
    icon: Compass,
    step: "Explore",
    title: "Students start exploring",
    text: "A short, engaging experience asks about interests, strengths, and how they like to work. No resume or experience needed.",
  },
  {
    icon: Target,
    step: "Discover",
    title: "AI surfaces their best-fit paths",
    text: "Jobbit matches each student to career pathways, explains why they fit, and shows pay, training, and outlook.",
  },
  {
    icon: Route,
    step: "Plan",
    title: "A personal action plan",
    text: "Every pathway comes with concrete next steps: classes, certifications, programs, and experiences to pursue.",
  },
  {
    icon: Rocket,
    step: "Launch",
    title: "Connect to real opportunity",
    text: "Students connect to job shadows, apprenticeships, training, and employers through the Jobbit network.",
  },
];

const roles = [
  {
    icon: School,
    who: "Schools",
    color: "bg-electric text-white",
    does: "Roll out Jobbit to students and guide them with counselor and educator tools.",
    gets: "Engaged students, career-connected learning, and insight into student interests and readiness.",
  },
  {
    icon: Briefcase,
    who: "Employers",
    color: "bg-violet text-white",
    does: "Showcase careers, share pathways, and offer experiences like job shadows and apprenticeships.",
    gets: "Early brand awareness and a stronger, more diverse future talent pipeline.",
  },
  {
    icon: Handshake,
    who: "Workforce & community partners",
    color: "bg-[#ff8a3d] text-white",
    does: "Connect programs, training, and support services to the students who need them.",
    gets: "Better reach, referrals, and a shared platform for youth workforce initiatives.",
  },
];

const faqs = [
  {
    q: "Do students need any experience or a resume to use Jobbit?",
    a: "No. Jobbit is built for high school students and emerging talent, many of whom are exploring careers for the first time. Students start by answering simple questions about themselves.",
  },
  {
    q: "What does the AI actually do?",
    a: "Jobbit's AI translates a student's interests, strengths, and preferences into personalized career matches, explains why each one fits, and builds a step-by-step plan. It supports educators and counselors; it doesn't replace them.",
  },
  {
    q: "How do schools get started?",
    a: "We start with a short demo and planning conversation, then help your team onboard, launch with students, and measure engagement. Request a school demo to begin.",
  },
  {
    q: "How do employers participate?",
    a: "Employers can showcase their industry and career pathways, sponsor programs, and offer real-world experiences. Our partnerships team will help you find the right level of involvement.",
  },
  {
    q: "How is student information protected?",
    a: "Jobbit is designed with student privacy in mind. We work with each school and district partner to meet their data and privacy requirements.",
  },
  {
    q: "Is the Jobbit corporate website the same as the Jobbit app?",
    a: "No. This site introduces the company and our partners. Students use the Jobbit app directly; select “Launch Jobbit” at the top of any page.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How Jobbit works"
        accent="violet"
        title={
          <>
            One platform. <span className="site-text-gradient">The whole ecosystem.</span>
          </>
        }
        description="Jobbit connects students, schools, employers, and workforce partners so that career exploration leads to real opportunity. Here's how it all fits together, no technical background required."
        actions={
          <>
            <ButtonLink href="/contact?intent=demo" variant="lime" size="lg">
              Request a Demo
            </ButtonLink>
            <ButtonLink href={JOBBIT_APP_URL} variant="outline-light" size="lg" icon="external">
              Explore Jobbit
            </ButtonLink>
          </>
        }
      />

      <section className="relative overflow-hidden bg-mist py-20 sm:py-28">
        <div className="site-grid-bg-light absolute inset-0" aria-hidden />
        <Container className="relative">
          <SectionHeading
            align="center"
            eyebrow="The Jobbit ecosystem"
            title="Students → Schools → Employers → Workforce Partners"
            description="Each group plays a different role. Jobbit's AI platform sits underneath, connecting skills to pathways and pathways to people."
          />
          <Reveal className="mt-16">
            <EcosystemDiagram />
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The student journey"
            title="From “I have no idea” to “here's my plan.”"
            description="Every part of the ecosystem serves one goal: helping students move from curiosity to confident next steps."
          />
          <div className="relative mt-16">
            <span className="site-flow-line absolute left-0 right-1/4 top-7 hidden h-0.5 lg:block" aria-hidden />
            <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {studentJourney.map((s, i) => (
                <li key={s.step}>
                  <Reveal delay={i * 0.08}>
                    <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-lime ring-8 ring-white">
                      <s.icon size={24} />
                    </span>
                    <p className="mt-6 font-mono-ui text-xs uppercase tracking-[0.16em] text-lime-deep">
                      Step {i + 1} · {s.step}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-ink">{s.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="site-grid-bg absolute inset-0" aria-hidden />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Everyone has a role"
            title="What partners contribute, and what they get back."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {roles.map((r, i) => (
              <Reveal key={r.who} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${r.color}`}>
                    <r.icon size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold">{r.who}</h3>
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-white/45">Their role</dt>
                      <dd className="mt-1 text-[15px] leading-relaxed text-white/75">{r.does}</dd>
                    </div>
                    <div>
                      <dt className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-lime">What they gain</dt>
                      <dd className="mt-1 text-[15px] leading-relaxed text-white/75">{r.gets}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered."
              description="Can't find what you're looking for? Reach out and our team will get back to you."
            />
            <div className="divide-y divide-line rounded-3xl border border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-ink">
                    {f.q}
                    <ChevronDown size={20} className="shrink-0 text-slate-ink transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-ink">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
