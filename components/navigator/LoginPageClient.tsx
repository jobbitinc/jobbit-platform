"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCareer } from "./CareerContext";

export function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const { user, openAuth, authOpen } = useCareer();
  const prevAuthOpen = useRef(false);

  useEffect(() => {
    if (user) {
      const dest = next && next.startsWith("/") ? next : "/navigator/dashboard";
      router.replace(dest);
    }
  }, [user, next, router]);

  useEffect(() => {
    const dest = next && next.startsWith("/") ? next : null;
    openAuth(mode, dest);
  }, [mode, next, openAuth]);

  useEffect(() => {
    if (prevAuthOpen.current && !authOpen && !user) {
      router.replace("/navigator");
    }
    prevAuthOpen.current = authOpen;
  }, [authOpen, user, router]);

  if (user) {
    return (
      <div className="nav-landing nv-animate-in">
        <div className="section" style={{ maxWidth: 440, paddingTop: 48, textAlign: "center" }}>
          Redirecting…
        </div>
      </div>
    );
  }

  return (
    <div className="nav-landing nv-animate-in">
      <div className="section" style={{ maxWidth: 440, paddingTop: 120, textAlign: "center" }}>
        <p className="section-sub" style={{ marginBottom: 16 }}>
          Use the dialog above to sign in or create a free account.
        </p>
        <p style={{ fontSize: 14, color: "var(--text-3)" }}>
          <Link href="/navigator/quiz">Take the career quiz</Link>
          {" · "}
          <Link href="/">Waitlist home</Link>
        </p>
      </div>
    </div>
  );
}
