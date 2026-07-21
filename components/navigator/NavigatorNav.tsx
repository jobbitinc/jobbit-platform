"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCareer } from "./CareerContext";

function NavLogoLink() {
  return (
    <Link href="/" className="nav-logo" aria-label="jobbit home">
      <Image
        src="/logo.png"
        alt=""
        width={240}
        height={48}
        className="nav-logo-img"
        priority
      />
    </Link>
  );
}

export function NavigatorNav() {
  const pathname = usePathname();
  const { user, openAuth, logout } = useCareer();

  if (pathname?.startsWith("/navigator/quiz")) {
    return (
      <nav className="nv-nav">
        <NavLogoLink />
        <Link href="/" className="nav-cta">
          ← Exit
        </Link>
      </nav>
    );
  }

  return (
    <nav className="nv-nav">
      <NavLogoLink />
      {pathname === "/" || pathname === "/navigator" || pathname === "/navigator/" ? (
        <div className="nav-cta-group cta-pair">
          <button
            type="button"
            className="btn-secondary btn-cta-how nav-btn-how"
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          >
            How It Works
          </button>
          <Link href="/navigator/quiz" className="btn-primary btn-cta-match nav-btn-match">
            Find My Match →
          </Link>
        </div>
      ) : null}
      {pathname === "/navigator/results" ? (
        user ? (
          <Link href="/navigator/dashboard" className="nav-cta">
            Dashboard →
          </Link>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button type="button" className="nav-text-link" onClick={() => openAuth("login", "/navigator/dashboard")}>
              Sign in
            </button>
            <button type="button" className="nav-cta" onClick={() => openAuth("signup", "/navigator/dashboard")}>
              Save Results
            </button>
          </div>
        )
      ) : null}
      {pathname === "/navigator/dashboard" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/navigator/quiz" className="nav-text-link">
            Retake quiz
          </Link>
          <button type="button" className="nav-cta" onClick={() => void logout()}>
            Sign Out
          </button>
        </div>
      ) : null}
      {pathname === "/navigator/login" ? (
        <Link href="/navigator/quiz" className="btn-primary btn-cta-match nav-btn-match">
          Find My Match →
        </Link>
      ) : null}
    </nav>
  );
}
