import { JOBBIT_APP_URL } from "@/lib/site";
import { Reveal } from "./Reveal";
import { ButtonLink, Container } from "./ui";

export function CtaBand({
  title = "Let's build the future of career readiness together.",
  description = "Whether you're a school, an employer, or a community partner, there's a place for you in the Jobbit ecosystem.",
  primary = { href: "/contact?intent=demo", label: "Request a Demo" },
  secondary = { href: "/contact?intent=partnership", label: "Partner With Jobbit" },
  showLaunch = true,
}: {
  title?: string;
  description?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  showLaunch?: boolean;
}) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-20">
            <div className="site-grid-bg absolute inset-0" aria-hidden />
            <div className="site-glow absolute -left-20 top-0 h-72 w-72 rounded-full bg-electric/60" aria-hidden />
            <div className="site-glow absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-lime/40" aria-hidden />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{description}</p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={primary.href} variant="lime" size="lg">
                  {primary.label}
                </ButtonLink>
                <ButtonLink href={secondary.href} variant="outline-light" size="lg">
                  {secondary.label}
                </ButtonLink>
                {showLaunch ? (
                  <ButtonLink href={JOBBIT_APP_URL} variant="outline-light" size="lg" icon="external">
                    Explore Jobbit
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
