import { Container, Eyebrow, cn } from "./ui";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  accent = "electric",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  accent?: "electric" | "violet" | "lime";
}) {
  const glow = { electric: "bg-electric/50", violet: "bg-violet/50", lime: "bg-lime/30" }[accent];

  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-24 sm:pt-44">
      <div className="site-grid-bg absolute inset-0" aria-hidden />
      <div className={cn("site-glow absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full", glow)} aria-hidden />
      <div className="site-glow absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-lime/20" aria-hidden />
      <Container className="relative">
        <div className={cn("grid items-center gap-14", aside != null && "lg:grid-cols-[1.15fr_1fr]")}>
          <div className="site-fade-up">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 text-pretty">{description}</p>
            {actions ? <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
          </div>
          {aside ? <div className="site-fade-up-delay hidden lg:block">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
