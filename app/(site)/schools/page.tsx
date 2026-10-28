import { CtaBand } from "@/components/site/CtaBand";
import { HeroPanel } from "@/components/site/HeroPanel";
import { Briefcase, Chart, Clipboard, Compass, Layers, School, Sparkles, Target, Users } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, CheckList, Container, FeatureCard, SectionHeading } from "@/components/site/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Schools & Districts",
  description:
    "Jobbit helps schools and districts support career exploration, career readiness, workforce exposure, student engagement, and career-connected learning. Request a school demo.",
  alternates: { canonical: "/schools" },
};

const DEMO_HREF = "/contact?type=school&intent=demo";

const benefits = [
  {
    icon: <Compass />,
    title: "Career exploration",
    text: "Students explore careers across every industry with personalized, AI-guided matches, not generic lists.",
    tone: "lime" as const,
  },
  {
    icon: <Target />,
    title: "Career readiness",
    text: "Skills discovery and action plans help students build the habits, credentials, and experience employers value.",
    tone: "electric" as const,
  },
  {
    icon: <Briefcase />,
    title: "Workforce exposure",
    text: "Bring employers and industries into the classroom through showcases, pathways, and real-world experiences.",
    tone: "violet" as const,
  },
  {
    icon: <Sparkles />,
    title: "Student engagement",
    text: "A modern, mobile-first experience students actually want to use, designed for how they learn and explore.",
    tone: "lime" as const,
  },
  {
    icon: <Layers />,
    title: "Career-connected learning",
    text: "Connect what students learn in class to the careers it leads to, supporting CTE, advisory, and seminar programs.",
    tone: "electric" as const,
  },
  {
    icon: <Chart />,
    title: "Insight for educators",
    text: "Understand student interests and progress so counselors can focus their time where it matters most.",
    tone: "violet" as const,
  },
];

const roles = [
  {
    who: "Counselors",
    items: ["Personalize guidance for every student", "Spend less time on logistics, more on conversations", "Track progress on career plans"],
  },
  {
    who: "CTE & classroom teachers",
    items: ["Bring industry context into lessons", "Connect coursework to real careers", "Engage students with hands-on exploration"],
  },
  {
    who: "Administrators",
    items: ["Support college & career readiness goals", "Strengthen employer and community partnerships", "Scale consistently across campuses"],
  },
];

const rollout = [
  { n: "01", title: "Discovery call", text: "We learn about your students, programs, and goals." },
  { n: "02", title: "Plan & onboard", text: "We tailor the rollout and set up your educators." },
  { n: "03", title: "Launch with students", text: "Students start exploring with in-class or advisory sessions." },
  { n: "04", title: "Measure & grow", text: "Review engagement and expand with employer partners." },
];

export default function SchoolsPage() {
  return (
    <>
      <PageHero
        eyebrow="For schools & districts"
        title={
          <>
            Career readiness for <span className="site-text-gradient">every student</span>, not just a few.
          </>
        }
        description="Jobbit gives your students a personalized way to explore careers and build a plan, and gives your educators the tools to guide them at scale."
        actions={
          <>
            <ButtonLink href={DEMO_HREF} variant="lime" size="lg">
              Request a School Demo
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="outline-light" size="lg">
              How it works
            </ButtonLink>
          </>
        }
        aside={
          <HeroPanel
            icon={<School size={22} />}
            title="What schools get with Jobbit"
            items={[
              "AI-powered career exploration for every student",
              "Skills and interest insights for counselors",
              "Personal career action plans",
              "Connections to employers and local programs",
            ]}
            footer={<p className="text-sm text-white/55">Built for middle and high school, CTE programs, and districts.</p>}
          />
        }
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why schools choose Jobbit"
            title="Everything you need to make career-connected learning real."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.06}>
                <FeatureCard icon={b.icon} title={b.title} tone={b.tone}>
                  {b.text}
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="For your whole team"
            title="Designed for the people who guide students every day."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {roles.map((r, i) => (
              <Reveal key={r.who} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-line bg-white p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-lime">
                    {i === 0 ? <Users /> : i === 1 ? <Clipboard /> : <School />}
                  </span>
                  <h3 className="mb-5 mt-6 font-display text-xl font-semibold text-ink">{r.who}</h3>
                  <CheckList items={r.items} />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow="Getting started"
              title="Up and running without the heavy lift."
              description="We partner with your team from the first conversation to launch day and beyond, so Jobbit fits into the programs you already run."
            />
            <ol className="grid gap-4 sm:grid-cols-2">
              {rollout.map((r, i) => (
                <li key={r.n}>
                  <Reveal delay={i * 0.06}>
                    <div className="h-full rounded-3xl border border-line p-6">
                      <span className="font-mono-ui text-sm text-lime-deep">{r.n}</span>
                      <p className="mt-3 font-display text-lg font-semibold text-ink">{r.title}</p>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-ink">{r.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <CtaBand
        title="See Jobbit in action at your school."
        description="Book a short demo and we'll show you how Jobbit can support career exploration and readiness for your students."
        primary={{ href: DEMO_HREF, label: "Request a School Demo" }}
        secondary={{ href: "/contact?type=school&intent=general", label: "Ask a question" }}
        showLaunch={false}
      />
    </>
  );
}
