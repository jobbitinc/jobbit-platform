"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNavLinks, solutionLinks } from "@/lib/marketing/content";
import { JOBBIT_APP_URL } from "@/lib/site";
import { ChevronDown, Close, Menu } from "./icons";
import { ButtonLink, cn } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href;
  const solutionsActive = solutionLinks.some((l) => isActive(l.href));
  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "bg-ink/85 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" onClick={close} className="flex items-center" aria-label="Jobbit home">
          <Image src="/logo.png" alt="Jobbit" width={240} height={48} priority className="h-8 w-auto sm:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <div className="group relative">
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                solutionsActive ? "text-lime" : "text-white/80 hover:text-white",
              )}
              aria-haspopup="true"
            >
              Solutions
              <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-white/10 bg-ink-2/95 p-2 shadow-2xl backdrop-blur-xl">
                {solutionLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 transition-colors hover:bg-white/5",
                      isActive(l.href) && "bg-white/5",
                    )}
                  >
                    <span className="block text-[15px] font-semibold text-white">{l.label}</span>
                    <span className="mt-0.5 block text-[13px] text-white/55">{l.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {primaryNavLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                isActive(l.href) ? "text-lime" : "text-white/80 hover:text-white",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/contact?intent=demo" variant="outline-light" size="sm" icon="none">
            Request a Demo
          </ButtonLink>
          <ButtonLink href={JOBBIT_APP_URL} variant="lime" size="sm" icon="external">
            Launch Jobbit
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      <div
        id="site-mobile-menu"
        className={cn(
          "overflow-y-auto border-t border-white/10 bg-ink lg:hidden",
          open ? "block h-[calc(100dvh-72px)]" : "hidden",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 py-6">
          <p className="px-3 pb-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-white/40">Solutions</p>
          {solutionLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className={cn(
                "rounded-xl px-3 py-3 text-lg font-semibold",
                isActive(l.href) ? "bg-white/5 text-lime" : "text-white",
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="my-3 h-px bg-white/10" />
          {primaryNavLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className={cn(
                "rounded-xl px-3 py-3 text-lg font-semibold",
                isActive(l.href) ? "bg-white/5 text-lime" : "text-white",
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3" onClick={close}>
            <ButtonLink href="/contact?intent=demo" variant="outline-light" size="lg" icon="none">
              Request a Demo
            </ButtonLink>
            <ButtonLink href={JOBBIT_APP_URL} variant="lime" size="lg" icon="external">
              Launch Jobbit
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
