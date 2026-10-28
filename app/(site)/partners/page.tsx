import { CtaBand } from "@/components/site/CtaBand";
import { HeroPanel } from "@/components/site/HeroPanel";
import { Chart, Gift, Globe, Handshake, Heart, Layers, Lightbulb, Route, Users } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, FeatureCard, SectionHeading } from "@/components/site/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Workforce & Community Partners",
  description:
    "Workforce development organizations, nonprofits, community organizations, foundations, and youth-serving partners: collaborate with Jobbit to expand opportunity for young people.",
  alternates: { canonical: "/partners" },
};

const PARTNER_HREF = "/contact?type=workforce&intent=partnership";

const partnerTypes = [
  { icon: Chart, title: "Workforce development organizations", text: "Workforce boards, training providers, and apprenticeship programs." },
  { icon: Heart, title: "Nonprofits & youth-serving organizations", text: "Mentoring, after-school, and youth development programs." },
  { icon: Users, title: "Community organizations", text: "Local groups, libraries, and community centers serving young people." },
  { icon: Gift, title: "Foundations & funders", text: "Philanthropic and corporate partners investing in youth opportunity." },
];

const collaborations = [
  {
    icon: <Route />,
    title: "Program integration",
    text: "Feature your training programs, services, and opportunities as next steps on students' career pathways.",
    tone: "lime" as const,
  },
  {
    icon: <Handshake />,
    title: "Referral pathways",
    text: "Connect students who match your programs directly to your team, and close the gap between interest and enrollment.",
    tone: "electric" as const,
  },
  {
    icon: <Lightbulb />,
    title: "Co-designed initiatives",
    text: "Build regional career-readiness initiatives together with schools, employers, and Jobbit.",
    tone: "violet" as const,
  },
  {
    icon: <Layers />,
    title: "Sponsorship & funding",
    text: "Sponsor Jobbit access for schools and communities that need it most, and track the impact of your investment.",
    tone: "lime" as const,
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="For workforce & community partners"
        accent="lime"
        title={
          <>
            Expand youth opportunity, <span className="site-text-gradient">together.</span>
          </>
        }
        description="Jobbit works alongside workforce organizations, nonprofits, community groups, and funders to connect more young people with the guidance, programs, and opportunities they need."
        actions={
          <>
            <ButtonLink href={PARTNER_HREF} variant="lime" size="lg">
              Partner With Jobbit
            </ButtonLink>
            <ButtonLink href="/contact?type=funder&intent=partnership" variant="outline-light" size="lg">
              Funders & sponsors
            </ButtonLink>
          </>
        }
        aside={
          <HeroPanel
            icon={<Globe size={22} />}
            title="Partnering with Jobbit means"
            items={[
              "Reaching more young people where they already are",
              "Connecting your programs to motivated students",
              "Shared data on interests and career pathways",
              "A modern platform without building one yourself",
            ]}
          />
        }
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Who we partner with" title="Built for organizations that serve young people." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-line p-6 transition-colors hover:bg-mist">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-lime">
                    <p.icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-ink">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Ways to collaborate"
            title="Many ways to work together, one shared goal."
            description="Every partnership is designed around your mission, your community, and the young people you serve."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {collaborations.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.06}>
                <FeatureCard icon={c.icon} title={c.title} tone={c.tone}>
                  {c.text}
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-electric via-violet to-ink p-8 text-white sm:p-14">
              <div className="site-grid-bg absolute inset-0" aria-hidden />
              <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <p className="font-mono-ui text-xs uppercase tracking-[0.16em] text-lime">For funders, sponsors & investors</p>
                  <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    Invest in the infrastructure of career readiness.
                  </h2>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base">
                    Whether you&apos;re funding access for under-resourced schools, sponsoring a regional initiative, or
                    exploring strategic investment, we&apos;d love to share our vision and roadmap.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:items-end">
                  <ButtonLink href="/contact?type=funder&intent=partnership" variant="lime" size="lg">
                    Start a conversation
                  </ButtonLink>
                  <ButtonLink href="/about" variant="outline-light" size="lg">
                    Read our mission
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Let's open more doors for young people."
        description="Tell us about your organization and the communities you serve. We'll follow up to explore how we can work together."
        primary={{ href: PARTNER_HREF, label: "Partner With Jobbit" }}
        secondary={{ href: "/contact?type=community&intent=general", label: "Ask a question" }}
        showLaunch={false}
      />
    </>
  );
}
