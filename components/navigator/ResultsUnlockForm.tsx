"use client";

import { useState } from "react";
import { useCareer } from "./CareerContext";

export function ResultsUnlockForm() {
  const { signup, openAuth, showToast } = useCareer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!name.trim()) {
      showToast("Please enter your first name.", "error");
      return;
    }
    if (!email.trim()) {
      showToast("Enter your email to unlock your plan.", "error");
      return;
    }
    void signup(email.trim(), name.trim());
  };

  return (
    <div className="results-unlock-form">
      <div className="modal-field">
        <label htmlFor="results-name">First name</label>
        <input
          id="results-name"
          type="text"
          autoComplete="given-name"
          placeholder="Your first name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="modal-field">
        <label htmlFor="results-email">Email address</label>
        <input
          id="results-email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="button" className="btn-primary results-unlock-submit" onClick={submit}>
        Unlock My Plan →
      </button>
      <p className="results-unlock-signin">
        Already have an account?{" "}
        <button type="button" className="nv-inline-link" onClick={() => openAuth("login")}>
          Sign in
        </button>
      </p>
    </div>
  );
}
