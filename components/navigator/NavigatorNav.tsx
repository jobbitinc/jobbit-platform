"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCareer } from "./CareerContext";

function NavLogoLink() {
  return (
    <Link href="/navigator" className="nav-logo" aria-label="jobbit navigator home">
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
        <Link href="/navigator" className="nav-cta">
          ← Exit
        </Link>
      </nav>
    );
  }

  return (
    <nav className="nv-nav">
      <NavLogoLink />
      {pathname === "/navigator" || pathname === "/navigator/" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button type="button" className="nav-text-link" onClick={() => openAuth("login")}>
            Sign in
          </button>
          <Link href="/navigator/quiz" className="nav-cta">
            Start Quiz →
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
            <button type="button" className="nav-text-link" onClick={() => openAuth("login")}>
              Sign in
            </button>
            <button type="button" className="nav-cta" onClick={() => openAuth("signup")}>
              Save Results
            </button>
          </div>
        )
      ) : null}
      {pathname === "/navigator/dashboard" ? (
        <button type="button" className="nav-cta" onClick={logout}>
          Sign Out
        </button>
      ) : null}
      {pathname === "/navigator/login" ? (
        <Link href="/navigator/quiz" className="nav-cta">
          Take quiz
        </Link>
      ) : null}
    </nav>
  );
}
