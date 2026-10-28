import { Compass, Mail, Sparkles } from "@/components/site/icons";
import { InquiryForm } from "@/components/site/InquiryForm";
import { ButtonLink, Container, Eyebrow } from "@/components/site/ui";
import { company } from "@/lib/marketing/content";
import { isInquiryIntent, isInquiryType } from "@/lib/marketing/inquiry";
import { JOBBIT_APP_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Demo or Partnership",
  description:
    "Request a Jobbit demo or start a partnership conversation. For schools, employers, workforce and community organizations, funders, sponsors, and other partners.",
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  { title: "We review your request", text: "Our team reads every inquiry and routes it to the right person." },
  { title: "We reach out", text: "Expect a reply within two business days to find a time to talk." },
  { title: "We tailor the conversation", text: "Your demo or partnership call is built around your goals." },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[]; intent?: string | string[] }>;
}) {
  const params = await searchParams;
  const type = isInquiryType(params.type) ? params.type : undefined;
  const intent = isInquiryIntent(params.intent) ? params.intent : "demo";

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-40 pt-36 text-white sm:pt-44">
        <div className="site-grid-bg absolute inset-0" aria-hidden />
        <div className="site-glow absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-electric/50" aria-hidden />
        <div className="site-glow absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-lime/25" aria-hidden />
        <Container className="relative">
          <Eyebrow tone="dark">Request a demo · Partnership inquiry</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Let&apos;s talk about what Jobbit can do <span className="site-text-gradient">for you.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Tell us a little about yourself and your organization, and our team will follow up to schedule a demo or
            partnership conversation.
          </p>
        </Container>
      </section>

      <section className="relative z-10 -mt-24 pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_40px_100px_-50px_rgba(6,10,23,0.5)] sm:p-10">
              <InquiryForm key={`${type}-${intent}`} defaultType={type} defaultIntent={intent} />
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-line bg-mist p-7 sm:p-8">
                <p className="font-display text-lg font-semibold text-ink">What happens next</p>
                <ol className="mt-6 space-y-5">
                  {nextSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono-ui text-xs text-lime">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-ink">{s.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-slate-ink">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-[2rem] border border-line p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-electric-soft text-electric">
                    <Mail size={20} />
                  </span>
                  <p className="font-display text-lg font-semibold text-ink">Prefer email?</p>
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="text-slate-ink/70">General</dt>
                    <dd>
                      <a href={`mailto:${company.email}`} className="font-semibold text-ink hover:text-electric">
                        {company.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-ink/70">Partnerships</dt>
                    <dd>
                      <a href={`mailto:${company.partnershipsEmail}`} className="font-semibold text-ink hover:text-electric">
                        {company.partnershipsEmail}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] bg-ink p-7 text-white sm:p-8">
                <div className="site-glow absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime/40" aria-hidden />
                <div className="relative">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lime text-ink">
                    <Compass size={20} />
                  </span>
                  <p className="mt-5 font-display text-xl font-semibold">Student or parent?</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    You don&apos;t need a demo. Jump into Jobbit and start exploring careers today.
                  </p>
                  <ButtonLink href={JOBBIT_APP_URL} variant="lime" size="sm" icon="external" className="mt-5">
                    Launch Jobbit
                  </ButtonLink>
                </div>
              </div>

              <p className="flex items-center gap-2 px-2 text-xs text-slate-ink/70">
                <Sparkles size={14} className="text-lime-deep" />
                Schools, employers, workforce & community organizations, funders, and other partners welcome.
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
