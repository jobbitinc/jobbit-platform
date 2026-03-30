"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCareer } from "./CareerContext";

export function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/navigator/dashboard";
  const { login, signup, user, showToast } = useCareer();
  const [mode, setMode] = useState<"signup" | "login">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      const dest = next.startsWith("/") ? next : "/navigator/dashboard";
      router.replace(dest);
    }
  }, [user, next, router]);

  const submit = () => {
    if (!email.trim() || !password) return;
    if (mode === "signup" && !name.trim()) {
      showToast("Please enter your name.");
      return;
    }
    if (mode === "signup") {
      signup(email.trim(), name.trim(), password);
    } else {
      login(email.trim(), password);
    }
  };

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
      <div className="section" style={{ maxWidth: 440, paddingTop: 48 }}>
        <div className="modal-logo">
          Job<span>bit</span>
        </div>
        <h2 className="section-title" style={{ marginTop: 16 }}>
          {mode === "signup" ? "Create your free account" : "Welcome back"}
        </h2>
        <p className="section-sub" style={{ marginBottom: 28 }}>
          {mode === "signup"
            ? "Save your quiz results, unlock full action plans, and track every step."
            : "Sign in to access your dashboard and saved career plan."}
        </p>
        <div className="modal-field">
          <label htmlFor="login-email">Email</label>
          <input id="login-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {mode === "signup" ? (
          <div className="modal-field">
            <label htmlFor="login-name">First name</label>
            <input id="login-name" type="text" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        ) : null}
        <div className="modal-field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="modal-submit" onClick={submit}>
          {mode === "signup" ? "Create account" : "Sign in"}
        </button>
        <p className="modal-switch">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button type="button" className="nv-inline-link" onClick={() => setMode("login")}>
                Sign in
              </button>
            </>
          ) : (
            <>
              New here?{" "}
              <button type="button" className="nv-inline-link" onClick={() => setMode("signup")}>
                Create account
              </button>
            </>
          )}
        </p>
        <p style={{ marginTop: 24, textAlign: "center", fontSize: 14, color: "var(--text-3)" }}>
          <Link href="/navigator/quiz">Take the career quiz</Link>
          {" · "}
          <Link href="/">Waitlist home</Link>
        </p>
      </div>
    </div>
  );
}
