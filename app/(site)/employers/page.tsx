import { CtaBand } from "@/components/site/CtaBand";
import { HeroPanel } from "@/components/site/HeroPanel";
import { Briefcase, Building, Chart, Route, Sparkles, Spark, Target, Users } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, CheckList, Container, FeatureCard, SectionHeading } from "@/components/site/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Employers & Industry Partners",
  description:
    "Partner with Jobbit to introduce young people to your industry, showcase career pathways, strengthen your future talent pipeline, and connect with emerging talent.",
  alternates: { canonical: "/employers" },
};

const PARTNER_HREF = "/contact?type=employer&intent=partnership";

const benefits = [
  {
    icon: <Users />,
    title: "Introduce young people to careers",
    text: "Reach students while they're deciding what's next, and show them what a career in your industry really looks like.",
    tone: "violet" as const,
  },
  {
    icon: <Chart />,
    title: "Strengthen your talent pipeline",
    text: "Build awareness and interest years before hiring, so the talent you need is ready when you need it.",
    tone: "lime" as const,
  },
  {
    icon: <Route />,
    title: "Showcase industries & pathways",
    text: "Highlight the roles, skills, training, and certifications that lead into your organization.",
    tone: "electric" as const,
  },
  {
    icon: <Target />,
    title: "Connect with emerging talent",
    text: "Meet motivated students who've matched with your pathways through job shadows, internships, and apprenticeships.",
    tone: "violet" as const,
  },
];

const tiers = [
  {
    name: "Career Showcase",
    icon: Sparkles,
    text: "Feature your company, roles, and career stories inside the Jobbit experience.",
    items: ["Company & career profiles", "Day-in-the-life content", "Pathway highlights"],
  },
  {
    name: "Pathway Partner",
    icon: Route,
    text: "Sponsor a career pathway and help students understand how to get there.",
    items: ["Branded pathway", "Skills & training guidance", "School engagement opportunities"],
    featured: true,
  },
  {
    name: "Experience Partner",
    icon: Briefcase,
    text: "Offer real-world experiences that turn interest into action.",
    items: ["Job shadows & site visits", "Internships & apprenticeships", "Early-talent connections"],
  },
];

export default function EmployersPage() {
  return (
    <>
      <PageHero
        eyebrow="For employers & industry"
        accent="violet"
        title={
          <>
            Meet your <span className="site-text-gradient">future workforce</span> before anyone else does.
          </>
        }
        description="Jobbit puts your industry in front of the next generation at the moment they're choosing a direction, and connects you with emerging talent ready to learn."
        actions={
          <>
            <ButtonLink href={PARTNER_HREF} variant="lime" size="lg">
              Become a Jobbit Employer Partner
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="outline-light" size="lg">
              How it works
            </ButtonLink>
          </>
        }
        aside={
          <HeroPanel
            icon={<Building size={22} />}
            title="Why employers partner with Jobbit"
            items={[
              "Early access to motivated emerging talent",
              "Brand awareness with students and schools",
              "A stronger, more diverse talent pipeline",
              "Measurable community impact",
            ]}
          />
        }
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Partner benefits"
            title="Invest in talent where it starts."
            description="The best time to inspire a future electrician, nurse, engineer, or designer is long before they apply."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.06}>
                <FeatureCard icon={b.icon} title={b.title} tone={b.tone}>
                  {b.text}
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="site-grid-bg absolute inset-0" aria-hidden />
        <div className="site-glow absolute -right-20 top-0 h-96 w-96 rounded-full bg-violet/50" aria-hidden />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Ways to partner"
            title="Choose the level of involvement that fits your goals."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div
                  className={`relative h-full rounded-3xl p-8 ${
                    t.featured ? "bg-lime text-ink" : "border border-white/10 bg-white/[0.04]"
                  }`}
                >
                  {t.featured ? (
                    <span className="absolute right-6 top-6 rounded-full bg-ink px-3 py-1 font-mono-ui text-[10px] uppercase tracking-wider text-lime">
                      Most popular
                    </span>
                  ) : null}
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                      t.featured ? "bg-ink text-lime" : "bg-white/10 text-lime"
                    }`}
                  >
                    <t.icon size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{t.name}</h3>
                  <p className={`mt-2 text-[15px] leading-relaxed ${t.featured ? "text-ink/75" : "text-white/65"}`}>
                    {t.text}
                  </p>
                  <div className="mt-6">
                    <CheckList items={t.items} tone={t.featured ? "lime" : "dark"} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-white/55">
            Every partnership is tailored. Tell us your goals and we&apos;ll recommend the right fit.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="grid gap-10 rounded-[2rem] border border-line bg-mist p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex items-start gap-5">
                <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-lime sm:inline-flex">
                  <Spark size={26} />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    Hiring for skilled trades, healthcare, tech, or advanced manufacturing?
                  </h2>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-ink sm:text-base">
                    Industries with growing talent gaps see the biggest impact from early engagement. Let&apos;s talk
                    about how Jobbit can help you build interest in your field.
                  </p>
                </div>
              </div>
              <ButtonLink href={PARTNER_HREF} variant="dark" size="lg" className="shrink-0">
                Talk to partnerships
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Help shape the next generation of talent."
        description="Join the employers using Jobbit to inspire young people and build the workforce of tomorrow."
        primary={{ href: PARTNER_HREF, label: "Become a Jobbit Employer Partner" }}
        secondary={{ href: "/contact?type=employer&intent=demo", label: "Request a Demo" }}
        showLaunch={false}
      />
    </>
  );
}
