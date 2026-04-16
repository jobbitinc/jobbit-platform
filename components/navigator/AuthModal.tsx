"use client";

import Image from "next/image";
import { useState } from "react";
import { useCareer } from "./CareerContext";

export function AuthModal() {
  const { authOpen, closeAuth, authMode, setAuthMode, login, signup } = useCareer();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (!authOpen) return null;

  const submit = () => {
    if (!email.trim() || !password) return;
    if (authMode === "signup") {
      signup(email.trim(), name.trim(), password);
    } else {
      login(email.trim(), password);
    }
  };

  return (
    <div
      className="modal-overlay open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuth();
      }}
    >
      <div className="modal" style={{ position: "relative" }}>
        <button type="button" className="modal-close" onClick={closeAuth} aria-label="Close">
          ✕
        </button>
        <div className="modal-header-brand">
          <Image src="/logo.png" alt="jobbit" width={240} height={48} className="modal-logo-img" />
        </div>
        <div className="modal-body">
        <h3 id="auth-modal-title">
          {authMode === "signup" ? "Save your results" : "Welcome back"}
        </h3>
        <p className="modal-sub">
          {authMode === "signup"
            ? "Create a free account to unlock your full action plan and track your progress."
            : "Sign in to access your saved results and action plan."}
        </p>
        <div className="modal-field">
          <label htmlFor="auth-email">Email address</label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {authMode === "signup" ? (
          <div className="modal-field">
            <label htmlFor="auth-name">First name</label>
            <input
              id="auth-name"
              type="text"
              autoComplete="given-name"
              placeholder="Your first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        ) : null}
        <div className="modal-field">
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            autoComplete={authMode === "signup" ? "new-password" : "current-password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="modal-submit" onClick={submit}>
          {authMode === "signup" ? "Create free account" : "Sign in"}
        </button>
        <p className="modal-switch">
          {authMode === "signup" ? (
            <>
              Already have an account?{" "}
              <button type="button" className="nv-inline-link" onClick={() => setAuthMode("login")}>
                Sign in
              </button>
            </>
          ) : (
            <>
              New to jobbit?{" "}
              <button type="button" className="nv-inline-link" onClick={() => setAuthMode("signup")}>
                Create account
              </button>
            </>
          )}
        </p>
        </div>
      </div>
    </div>
  );
}
