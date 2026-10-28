import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./icons";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono-ui text-[11px] font-medium uppercase tracking-[0.14em]",
        tone === "dark"
          ? "border-white/15 bg-white/5 text-lime"
          : "border-ink/10 bg-white text-lime-deep shadow-sm",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "mt-5 font-display text-3xl font-bold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-pretty sm:text-lg",
            tone === "dark" ? "text-white/70" : "text-slate-ink",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "lime" | "dark" | "outline-light" | "outline-dark" | "white";

const buttonVariants: Record<ButtonVariant, string> = {
  lime: "bg-lime text-ink hover:bg-[#a9ee2c] shadow-[0_10px_30px_-10px_rgba(151,224,26,0.7)]",
  dark: "bg-ink text-white hover:bg-ink-3",
  white: "bg-white text-ink hover:bg-lime-soft",
  "outline-light": "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  "outline-dark": "border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
};

export function ButtonLink({
  href,
  children,
  variant = "lime",
  size = "md",
  icon = "arrow",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  icon?: "arrow" | "external" | "none";
  className?: string;
}) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-5 py-3 text-[15px]",
    size === "lg" && "px-7 py-4 text-base",
    buttonVariants[variant],
    className,
  );
  const iconEl =
    icon === "arrow" ? (
      <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    ) : icon === "external" ? (
      <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    ) : null;

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={classes}>
        {children}
        {iconEl}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {iconEl}
    </Link>
  );
}

export function IconBadge({
  children,
  tone = "lime",
}: {
  children: React.ReactNode;
  tone?: "lime" | "electric" | "violet" | "dark";
}) {
  const tones = {
    lime: "bg-lime-soft text-lime-deep",
    electric: "bg-electric-soft text-electric",
    violet: "bg-violet-soft text-violet",
    dark: "bg-white/10 text-lime",
  };
  return (
    <span className={cn("inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", tones[tone])}>
      {children}
    </span>
  );
}

export function FeatureCard({
  icon,
  title,
  children,
  tone = "lime",
  className,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  tone?: "lime" | "electric" | "violet";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group h-full rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_24px_60px_-30px_rgba(6,10,23,0.35)]",
        className,
      )}
    >
      <IconBadge tone={tone}>{icon}</IconBadge>
      <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">{title}</h3>
      <div className="mt-3 text-[15px] leading-relaxed text-slate-ink">{children}</div>
    </div>
  );
}

export function CheckList({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" | "lime" }) {
  const badge = { light: "bg-lime-soft text-lime-deep", dark: "bg-lime/15 text-lime", lime: "bg-ink text-lime" }[tone];
  const text = { light: "text-slate-ink", dark: "text-white/80", lime: "font-medium text-ink" }[tone];
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className={cn("mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full", badge)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden>
              <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={cn("text-[15px] leading-relaxed", text)}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
