import { CtaBand } from "@/components/site/CtaBand";
import { EcosystemDiagram } from "@/components/site/EcosystemDiagram";
import { HeroVisual } from "@/components/site/HeroVisual";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building,
  Chart,
  Compass,
  Gift,
  Globe,
  Handshake,
  Heart,
  Route,
  School,
  Sparkles,
  Target,
  Users,
} from "@/components/site/icons";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, Eyebrow, FeatureCard, SectionHeading } from "@/components/site/ui";
import { company, socialLinks } from "@/lib/marketing/content";
import { JOBBIT_APP_URL } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Jobbit | AI-Powered Career Readiness for the Next Generation" },
  description: company.description,
  alternates: { canonical: "/" },
};

const paths = [
  {
    eyebrow: "I'm a School",
    title: "Bring career readiness to every student",
    text: "Career exploration, skills discovery, and workforce exposure, in one platform built for counselors and educators.",
    href: "/schools",
    cta: "Solutions for schools",
    icon: School,
    accent: "from-electric/25",
    badge: "bg-electric text-white",
  },
  {
    eyebrow: "I'm an Employer",
    title: "Meet your future workforce early",
    text: "Showcase your industry, share career pathways, and connect with motivated emerging talent.",
    href: "/employers",
    cta: "Solutions for employers",
    icon: Briefcase,
    accent: "from-violet/25",
    badge: "bg-violet text-white",
  },
  {
    eyebrow: "Explore Jobbit",
    title: "Discover careers that fit you",
    text: "Students and families: find your strengths, explore real careers, and build your plan. Free to start.",
    href: JOBBIT_APP_URL,
    cta: "Launch Jobbit",
    icon: Compass,
    accent: "from-lime/25",
    badge: "bg-lime text-ink",
  },
];

const pathways = [
  "Healthcare",
  "Skilled Trades",
  "Technology",
  "Creative Arts",
  "Business",
  "Engineering",
  "Public Service",
  "Green Energy",
  "Hospitality",
  "Advanced Manufacturing",
  "Education",
  "Transportation",
];

const audiences = [
  { icon: Users, title: "Students & Families", text: "Explore careers with confidence and a clear next step.", href: JOBBIT_APP_URL },
  { icon: School, title: "Schools & Districts", text: "Scale career-connected learning across every campus.", href: "/schools" },
  { icon: Building, title: "Employers & Industry", text: "Build early awareness and a stronger talent pipeline.", href: "/employers" },
  { icon: Handshake, title: "Workforce Organizations", text: "Connect youth to training, programs, and jobs.", href: "/partners" },
  { icon: Heart, title: "Community & Youth Orgs", text: "Extend your impact with tools young people love.", href: "/partners" },
  { icon: Gift, title: "Funders & Investors", text: "Invest in infrastructure for the future of work.", href: "/contact?type=funder&intent=partnership" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: company.shortName,
  description: company.description,
  email: company.email,
  logo: "/logo.png",
  sameAs: socialLinks.map((s) => s.href),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pb-40 pt-32 text-white sm:pt-40 lg:pb-48">
        <div className="site-grid-bg absolute inset-0" aria-hidden />
        <div className="site-glow absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-electric/60" aria-hidden />
        <div className="site-glow absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-violet/40" aria-hidden />
        <div className="site-glow absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-lime/25" aria-hidden />
        <Container className="relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
            <div className="site-fade-up">
              <Eyebrow tone="dark">AI-powered career readiness</Eyebrow>
              <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Every student deserves a <span className="site-text-gradient">clear path</span> to a great career.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 text-pretty sm:text-xl">
                Jobbit helps high school students and emerging talent discover career pathways, understand their
                skills, and prepare for the workforce, while connecting schools, employers, and workforce partners to
                the next generation of talent.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={JOBBIT_APP_URL} variant="lime" size="lg" icon="external">
                  Explore Jobbit
                </ButtonLink>
                <ButtonLink href="/contact?intent=demo" variant="white" size="lg">
                  Request a Demo
                </ButtonLink>
                <ButtonLink href="/contact?intent=partnership" variant="outline-light" size="lg">
                  Partner With Jobbit
                </ButtonLink>
              </div>
            </div>
            <div className="site-fade-up-delay">
              <HeroVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* Three conversion paths */}
      <section aria-labelledby="paths-heading" className="relative z-10 -mt-24 lg:-mt-32">
        <Container>
          <h2 id="paths-heading" className="sr-only">
            Choose your path
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {paths.map((p, i) => {
              const external = /^https?:\/\//.test(p.href);
              const Comp = external ? "a" : Link;
              return (
                <Reveal key={p.eyebrow} delay={i * 0.08}>
                  <Comp
                    href={p.href}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white bg-gradient-to-br ${p.accent} to-white to-60% p-7 shadow-[0_30px_80px_-40px_rgba(6,10,23,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_40px_90px_-40px_rgba(6,10,23,0.55)]`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${p.badge}`}>
                        <p.icon size={24} />
                      </span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-lime">
                        {p.href === JOBBIT_APP_URL ? <ArrowUpRight size={18} /> : <ArrowRight size={18} />}
                      </span>
                    </div>
                    <p className="mt-6 font-mono-ui text-xs font-medium uppercase tracking-[0.16em] text-slate-ink">{p.eyebrow}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-ink">{p.text}</p>
                    <span className="mt-6 text-sm font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">
                      {p.cta}
                    </span>
                  </Comp>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Pathways marquee */}
      <section aria-label="Career pathways on Jobbit" className="overflow-hidden py-14">
        <div className="site-marquee flex w-max gap-3">
          {[...pathways, ...pathways].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="whitespace-nowrap rounded-full border border-line bg-mist px-5 py-2.5 font-display text-sm font-medium text-ink/70"
              aria-hidden={i >= pathways.length}
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* What is Jobbit */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="What is Jobbit?"
                title="A career readiness platform built for how young people actually explore."
                description="Jobbit uses AI to turn career exploration into a personal, engaging experience, giving students a real picture of their strengths and options, and giving the adults who support them the tools to help."
              />
              <div className="mt-8">
                <ButtonLink href="/how-it-works" variant="dark">
                  See how it works
                </ButtonLink>
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: <Compass />,
                  title: "Discover career pathways",
                  text: "Explore hundreds of careers across industries, with what they pay, what they require, and what a day looks like.",
                  tone: "lime" as const,
                },
                {
                  icon: <Target />,
                  title: "Understand your skills",
                  text: "AI-guided assessments surface strengths, interests, and work styles, translated into language students understand.",
                  tone: "electric" as const,
                },
                {
                  icon: <Route />,
                  title: "Explore real opportunities",
                  text: "Connect to job shadows, apprenticeships, training programs, and employers in your community.",
                  tone: "violet" as const,
                },
                {
                  icon: <Chart />,
                  title: "Prepare for the workforce",
                  text: "Personalized action plans and milestones turn curiosity into concrete, trackable next steps.",
                  tone: "lime" as const,
                },
              ].map((f, i) => (
                <Reveal key={f.title} delay={i * 0.06}>
                  <FeatureCard icon={f.icon} title={f.title} tone={f.tone}>
                    {f.text}
                  </FeatureCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why it matters */}
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="site-grid-bg absolute inset-0" aria-hidden />
        <div className="site-glow absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-electric/50" aria-hidden />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Why it matters"
            title={
              <>
                The world of work is changing. <span className="text-lime">Career readiness has to change with it.</span>
              </>
            }
            description="Young people are being asked to make major decisions about their future, often without ever seeing what's possible."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Work is being reinvented",
                text: "AI and new technology are reshaping industries and creating careers that didn't exist a decade ago.",
              },
              {
                n: "02",
                title: "Exposure is unequal",
                text: "Too many students graduate without meaningful exposure to careers, employers, or the paths that lead to them.",
              },
              {
                n: "03",
                title: "The system is disconnected",
                text: "Schools, employers, and workforce partners all want to help, but rarely in a way students can see and act on.",
              },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                  <span className="font-mono-ui text-sm text-lime">{item.n}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-5 flex flex-col gap-6 rounded-3xl bg-lime p-7 text-ink sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div className="flex items-start gap-4">
                <Sparkles size={28} className="mt-1 shrink-0" />
                <p className="max-w-2xl font-display text-xl font-semibold leading-snug sm:text-2xl">
                  Jobbit is building the infrastructure that connects young people to the future of work.
                </p>
              </div>
              <ButtonLink href="/about" variant="dark" className="shrink-0">
                Our mission
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-mist py-20 sm:py-28">
        <div className="site-grid-bg-light absolute inset-0" aria-hidden />
        <Container className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="How Jobbit works"
              title="One platform connecting the whole career-readiness ecosystem."
              description="Students explore. Schools guide. Employers inspire. Workforce partners open doors. Jobbit brings them together."
            />
            <ButtonLink href="/how-it-works" variant="outline-dark" className="shrink-0 self-start lg:self-end">
              Explore the ecosystem
            </ButtonLink>
          </div>
          <Reveal className="mt-14">
            <EcosystemDiagram />
          </Reveal>
        </Container>
      </section>

      {/* Who it's for */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Who it's for"
            title="Built for everyone invested in the next generation."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a, i) => {
              const external = /^https?:\/\//.test(a.href);
              const Comp = external ? "a" : Link;
              return (
                <Reveal key={a.title} delay={(i % 3) * 0.06}>
                  <Comp
                    href={a.href}
                    className="group flex h-full items-start gap-4 rounded-3xl border border-line p-6 transition-all duration-300 hover:border-ink/20 hover:bg-mist"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-lime transition-transform duration-300 group-hover:scale-105">
                      <a.icon size={22} />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2 font-display text-lg font-semibold text-ink">
                        {a.title}
                        <ArrowRight
                          size={18}
                          className="text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink"
                        />
                      </span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-slate-ink">{a.text}</span>
                    </span>
                  </Comp>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* People & purpose */}
      <section className="pb-4">
        <Container>
          <Reveal>
            <div className="grid overflow-hidden rounded-[2rem] border border-line lg:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-electric via-violet to-ink p-10 text-white">
                <div className="site-grid-bg absolute inset-0" aria-hidden />
                <Globe size={120} className="absolute -bottom-6 -right-6 text-white/10" />
                <div className="relative">
                  <Eyebrow tone="dark">Our vision</Eyebrow>
                  <p className="mt-6 max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    A generation that knows where it&apos;s going, and how to get there.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center bg-white p-10">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  The people and purpose behind Jobbit
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-ink sm:text-base">
                  Jobbit was founded to give every young person the guidance, exposure, and connections that too often
                  depend on who you know. Meet the team building it.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/team" variant="dark">
                    Meet the team
                  </ButtonLink>
                  <ButtonLink href="/about" variant="outline-dark">
                    Our story
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
