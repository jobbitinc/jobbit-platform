import { CtaBand } from "@/components/site/CtaBand";
import { Heart, Layers, Lightbulb, Rocket, Shield, Sparkles, Target, Users } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, FeatureCard, SectionHeading } from "@/components/site/ui";
import { founder } from "@/lib/marketing/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jobbit",
  description:
    "Jobbit's mission is to help prepare the next generation for the changing world of work. Learn about our vision, our story, and the workforce challenge we're solving.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: <Users />,
    title: "Students first",
    text: "Every decision starts with what helps a young person see, believe in, and reach their future.",
    tone: "lime" as const,
  },
  {
    icon: <Shield />,
    title: "Trust by design",
    text: "We build responsibly, with privacy, transparency, and the expectations of schools and families in mind.",
    tone: "electric" as const,
  },
  {
    icon: <Layers />,
    title: "Better together",
    text: "Career readiness works when schools, employers, and communities pull in the same direction.",
    tone: "violet" as const,
  },
  {
    icon: <Rocket />,
    title: "Built for what's next",
    text: "We design for the careers of tomorrow, not just the job titles of today.",
    tone: "lime" as const,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Jobbit"
        title={
          <>
            Preparing the next generation for the <span className="site-text-gradient">changing world of work.</span>
          </>
        }
        description="Jobbit is an AI-powered career readiness company. We help young people discover who they can become, and we help the schools, employers, and communities around them make it happen."
        actions={
          <>
            <ButtonLink href="/contact?intent=partnership" variant="lime" size="lg">
              Partner With Jobbit
            </ButtonLink>
            <ButtonLink href="/team" variant="outline-light" size="lg">
              Meet the team
            </ButtonLink>
          </>
        }
      />

      {/* Mission & vision */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[2rem] bg-lime p-9 sm:p-12">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-lime">
                  <Target />
                </span>
                <p className="mt-8 font-mono-ui text-xs uppercase tracking-[0.16em] text-ink/60">Our mission</p>
                <p className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
                  To give every young person the clarity, skills, and connections to build a meaningful career.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative h-full overflow-hidden rounded-[2rem] bg-ink p-9 text-white sm:p-12">
                <div className="site-glow absolute -right-10 -top-10 h-56 w-56 rounded-full bg-electric/60" aria-hidden />
                <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lime">
                  <Lightbulb />
                </span>
                <p className="relative mt-8 font-mono-ui text-xs uppercase tracking-[0.16em] text-white/50">Our vision</p>
                <p className="relative mt-3 font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                  A world where every student graduates knowing where they&apos;re headed, and how to get there.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The challenge */}
      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="The challenge"
                title="Talent is everywhere. Opportunity and guidance are not."
                description="The path from classroom to career has never been more important, or more confusing. Students face a fast-changing job market with limited exposure to what's out there, while employers struggle to reach the talent they'll need next."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {[
                  {
                    title: "Students lack visibility",
                    text: "Many young people only know the careers they see around them, and miss the ones that fit them best.",
                  },
                  {
                    title: "Educators are stretched thin",
                    text: "Counselors and teachers want to personalize career guidance but don't have the time or tools to do it at scale.",
                  },
                  {
                    title: "Employers are disconnected",
                    text: "Industries facing talent gaps have few meaningful ways to reach students before graduation.",
                  },
                  {
                    title: "AI is changing the rules",
                    text: "New technology is reshaping what jobs exist and which skills matter, making guidance more urgent.",
                  },
                ].map((c) => (
                  <li key={c.title} className="rounded-2xl border border-line bg-white p-6">
                    <p className="font-display text-lg font-semibold text-ink">{c.title}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-ink">{c.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeading eyebrow="Our story" title="Why we started Jobbit" />
              <blockquote className="mt-10 border-l-4 border-lime pl-6">
                <p className="font-display text-xl font-medium leading-snug text-ink">&ldquo;{founder.quote}&rdquo;</p>
                <footer className="mt-3 text-sm text-slate-ink">
                  {founder.name}, {founder.role}
                </footer>
              </blockquote>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 text-lg leading-relaxed text-slate-ink">
                {founder.story.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/team" variant="dark">
                  Meet the founder & team
                </ButtonLink>
                <ButtonLink href="/how-it-works" variant="outline-dark">
                  How Jobbit works
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading align="center" eyebrow="What we believe" title="The principles behind everything we build." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <FeatureCard icon={v.icon} title={v.title} tone={v.tone}>
                  {v.text}
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Looking ahead */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-lime">
                <Sparkles size={26} />
              </span>
              <p className="mt-8 font-display text-3xl font-bold leading-tight tracking-tight text-ink text-balance sm:text-5xl">
                We&apos;re building the infrastructure for the future of career readiness and workforce development.
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-ink">
                Starting with high school students and growing alongside them, Jobbit aims to become the place where the
                next generation discovers, prepares for, and launches into the world of work.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-ink">
                <Heart size={16} className="text-lime-deep" /> Proudly building in New Jersey and beyond
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
