import Image from "next/image";
import Link from "next/link";
import { company, primaryNavLinks, socialLinks, solutionLinks } from "@/lib/marketing/content";
import { JOBBIT_APP_URL } from "@/lib/site";
import { SocialIcon } from "./icons";
import { Container } from "./ui";

const getStartedLinks = [
  { href: "/contact?intent=demo", label: "Request a Demo" },
  { href: "/contact?intent=partnership", label: "Partner With Jobbit" },
  { href: "/contact?type=school&intent=demo", label: "School Demo" },
  { href: "/contact?type=employer&intent=partnership", label: "Employer Partnership" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="site-glow absolute -left-40 -top-40 h-96 w-96 rounded-full bg-electric/40" aria-hidden />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Jobbit home" className="inline-block">
              <Image src="/logo.png" alt="Jobbit" width={240} height={48} className="h-9 w-auto" />
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-white/60">{company.tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Jobbit on social media">
              {socialLinks.map((s) => (
                <li key={s.network}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-lime hover:text-lime"
                  >
                    <SocialIcon network={s.network} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Solutions" links={solutionLinks} />
          <FooterColumn
            title="Company"
            links={[...primaryNavLinks, { href: "/contact", label: "Contact" }]}
          />
          <FooterColumn title="Get Started" links={getStartedLinks} />
        </div>

        <div className="mt-14 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-xl font-semibold">Are you a student?</p>
            <p className="mt-1 text-[15px] text-white/60">Discover careers that fit you and build your action plan.</p>
          </div>
          <a
            href={JOBBIT_APP_URL}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 font-semibold text-ink transition-colors hover:bg-[#a9ee2c]"
          >
            Launch Jobbit ↗
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name} All rights reserved.
          </p>
          <a href={`mailto:${company.email}`} className="hover:text-white">
            {company.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-white/40">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] text-white/75 transition-colors hover:text-lime">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
