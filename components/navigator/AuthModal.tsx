"use client";

import Image from "next/image";
import { useState } from "react";
import { useCareer } from "./CareerContext";

export function AuthModal() {
  const { authOpen, authLoading, closeAuth, authMode, setAuthMode, login, requestLoginLink, signup, showToast } =
    useCareer();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [usePassword, setUsePassword] = useState(false);

  if (!authOpen) return null;

  const submit = () => {
    if (authLoading) return;
    if (!email.trim()) {
      showToast("Enter your email to continue.", "error");
      return;
    }
    if (authMode === "signup") {
      if (!name.trim()) {
        showToast("Please enter your first name.", "error");
        return;
      }
      void signup(email.trim(), name.trim());
      return;
    }
    if (usePassword) {
      if (!password) {
        showToast("Enter your password to sign in.", "error");
        return;
      }
      void login(email.trim(), password);
    } else {
      void requestLoginLink(email.trim());
    }
  };

  const submitLabel =
    authMode === "signup"
      ? authLoading
        ? "Sending link…"
        : "Unlock My Plan →"
      : usePassword
        ? authLoading
          ? "Signing in…"
          : "Sign in"
        : authLoading
          ? "Sending link…"
          : "Send sign-in link";

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
        <button type="button" className="modal-close" onClick={closeAuth} aria-label="Close" disabled={authLoading}>
          ✕
        </button>
        <div className="modal-header-brand">
          <Image src="/logo.png" alt="jobbit" width={240} height={48} className="modal-logo-img" />
        </div>
        <form
          className="modal-body"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <h3 id="auth-modal-title">
            {authMode === "signup" ? "Unlock your action plan" : "Welcome back"}
          </h3>
          <p className="modal-sub">
            {authMode === "signup"
              ? "Enter your first name and email. We will send a verification link — no password needed now."
              : usePassword
                ? "Sign in with your email and password."
                : "We will email you a one-click sign-in link."}
          </p>
          <div className="modal-field">
            <label htmlFor="auth-email">Email address</label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              disabled={authLoading}
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
                disabled={authLoading}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          ) : null}
          {authMode === "login" && usePassword ? (
            <div className="modal-field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                disabled={authLoading}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ) : null}
          <button type="submit" className="modal-submit" disabled={authLoading}>
            {submitLabel}
          </button>
          {authMode === "login" ? (
            <p className="modal-switch">
              <button
                type="button"
                className="nv-inline-link"
                disabled={authLoading}
                onClick={() => setUsePassword((p) => !p)}
              >
                {usePassword ? "Use email link instead" : "Sign in with password instead"}
              </button>
            </p>
          ) : null}
          <p className="modal-switch">
            {authMode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="nv-inline-link"
                  disabled={authLoading}
                  onClick={() => setAuthMode("login")}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                New to jobbit?{" "}
                <button
                  type="button"
                  className="nv-inline-link"
                  disabled={authLoading}
                  onClick={() => setAuthMode("signup")}
                >
                  Create account
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
