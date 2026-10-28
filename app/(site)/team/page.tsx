import { CtaBand } from "@/components/site/CtaBand";
import { SocialIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, SectionHeading, cn } from "@/components/site/ui";
import { advisors, founder, leadershipTeam, type TeamMember } from "@/lib/marketing/content";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Founder & Team",
  description:
    "Meet the founder, leadership team, and advisors behind Jobbit, and the purpose driving our work to prepare the next generation for the world of work.",
  alternates: { canonical: "/team" },
};

const avatarGradients = [
  "from-lime to-electric",
  "from-electric to-violet",
  "from-violet to-[#ff8a3d]",
  "from-[#ff8a3d] to-lime",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ member, index, className }: { member: TeamMember; index: number; className?: string }) {
  if (member.photo) {
    return (
      <div className={cn("relative overflow-hidden bg-mist", className)}>
        <Image src={member.photo} alt={member.name} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br font-display font-bold text-ink/80",
        avatarGradients[index % avatarGradients.length],
        className,
      )}
      aria-hidden
    >
      {initials(member.name)}
    </div>
  );
}

function MemberCard({ member, index, compact = false }: { member: TeamMember; index: number; compact?: boolean }) {
  return (
    <div className="group h-full overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(6,10,23,0.35)]">
      <Avatar member={member} index={index} className={cn("w-full", compact ? "aspect-[4/3] text-4xl" : "aspect-square text-5xl")} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">{member.name}</h3>
            <p className="text-sm font-medium text-lime-deep">{member.role}</p>
          </div>
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="text-slate-ink/60 hover:text-electric"
            >
              <SocialIcon network="linkedin" />
            </a>
          ) : null}
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-ink">{member.bio}</p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Founder & team"
        title={
          <>
            The people building the <span className="site-text-gradient">future of career readiness.</span>
          </>
        }
        description="We're educators, technologists, and workforce builders united by one belief: every young person deserves a clear path to a meaningful career."
      />

      {/* Founder */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <div className="relative mx-auto max-w-md lg:mx-0">
                <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-lime" aria-hidden />
                <Avatar member={founder} index={0} className="relative aspect-[4/5] w-full rounded-[2rem] text-7xl" />
                <div className="absolute -bottom-6 -right-4 rounded-2xl bg-ink px-5 py-4 text-white shadow-2xl sm:-right-8">
                  <p className="font-display text-lg font-semibold">{founder.name}</p>
                  <p className="text-sm text-lime">{founder.role}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading eyebrow="Meet the founder" title="A founder's story" />
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-ink">
                {founder.story.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-slate-ink">{founder.bio}</p>
              <blockquote className="mt-8 rounded-2xl bg-mist p-6">
                <p className="font-display text-xl font-medium leading-snug text-ink">&ldquo;{founder.quote}&rdquo;</p>
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Leadership" title="Our team" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipTeam.map((m, i) => (
              <Reveal key={`${m.role}-${i}`} delay={i * 0.06}>
                <MemberCard member={m} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Advisors */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Advisors"
            title="Guided by experts in education, workforce, and technology."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((m, i) => (
              <Reveal key={`${m.role}-${i}`} delay={(i % 4) * 0.06}>
                <MemberCard member={m} index={i + 2} compact />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Join */}
      <section className="pb-4">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 rounded-[2rem] border border-line bg-mist p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Want to help build Jobbit?
                </h2>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-ink">
                  We&apos;re always looking to connect with mission-driven people, advisors, and partners.
                </p>
              </div>
              <ButtonLink href="/contact?type=other&intent=general" variant="dark" size="lg" className="shrink-0">
                Get in touch
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
