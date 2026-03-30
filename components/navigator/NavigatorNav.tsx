"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCareer } from "./CareerContext";

export function NavigatorNav() {
  const pathname = usePathname();
  const { user, openAuth, logout } = useCareer();

  if (pathname?.startsWith("/navigator/quiz")) {
    return (
      <nav className="nv-nav">
        <Link href="/navigator" className="nav-logo">
          Job<span>bit</span>
        </Link>
        <Link href="/navigator" className="nav-cta">
          ← Exit
        </Link>
      </nav>
    );
  }

  return (
    <nav className="nv-nav">
      <Link href="/navigator" className="nav-logo">
        Job<span>bit</span>
      </Link>
      {pathname === "/navigator" || pathname === "/navigator/" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link href="/navigator/login" style={{ fontSize: 14, color: "var(--text-2)" }}>
            Sign in
          </Link>
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
          <button type="button" className="nav-cta" onClick={() => openAuth("signup")}>
            Save Results
          </button>
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
