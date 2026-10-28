"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  inquiryIntents,
  inquiryTypes,
  type InquiryIntent,
  type InquiryType,
} from "@/lib/marketing/content";
import { ArrowRight, Check } from "./icons";
import { cn } from "./ui";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate-ink/40 transition-colors focus:border-ink focus:outline-none focus:ring-4 focus:ring-lime/30";

function Field({
  label,
  name,
  required,
  optional,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; optional?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-lime-deep"> *</span> : null}
        {optional ? <span className="font-normal text-slate-ink/60"> (optional)</span> : null}
      </span>
      <input name={name} required={required} className={inputClass} {...rest} />
    </label>
  );
}

export function InquiryForm({
  defaultType,
  defaultIntent,
}: {
  defaultType?: InquiryType;
  defaultIntent: InquiryIntent;
}) {
  const [type, setType] = useState<InquiryType | undefined>(defaultType);
  const [intent, setIntent] = useState<InquiryIntent>(defaultIntent);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!type) {
      setStatus("error");
      setError("Please tell us which type of organization you represent.");
      return;
    }
    const form = new FormData(e.currentTarget);
    const payload = { ...Object.fromEntries(form.entries()), type, intent };

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.message ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      trackEvent("generate_lead", { inquiry_type: type, intent });
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-12 text-center" role="status">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-lime text-ink">
          <Check size={32} />
        </span>
        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink">Thanks! We&apos;ll be in touch.</h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-ink">
          Your request is with our team. Expect a reply within two business days to schedule a time that works for you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <fieldset>
        <legend className="text-sm font-semibold text-ink">
          I represent a… <span className="text-lime-deep">*</span>
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {inquiryTypes.map((t) => (
            <label
              key={t.value}
              className={cn(
                "cursor-pointer rounded-xl border px-3 py-3 text-center text-sm font-medium transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-lime/40",
                type === t.value
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink hover:border-ink/40",
              )}
            >
              <input
                type="radio"
                name="type"
                value={t.value}
                checked={type === t.value}
                onChange={() => setType(t.value)}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-ink">I&apos;d like to…</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {inquiryIntents.map((t) => (
            <label
              key={t.value}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-lime/40",
                intent === t.value
                  ? "border-lime bg-lime text-ink"
                  : "border-line bg-white text-ink hover:border-ink/40",
              )}
            >
              <input
                type="radio"
                name="intent"
                value={t.value}
                checked={intent === t.value}
                onChange={() => setIntent(t.value)}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Last name" name="lastName" required autoComplete="family-name" />
        <Field label="Work email" name="email" type="email" required autoComplete="email" />
        <Field label="Organization" name="organization" required autoComplete="organization" />
        <Field label="Title / role" name="jobTitle" optional autoComplete="organization-title" />
        <Field label="Phone" name="phone" type="tel" optional autoComplete="tel" />
        <Field label="State" name="state" optional autoComplete="address-level1" placeholder="e.g. New Jersey" />
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-ink">
          How can we help? <span className="font-normal text-slate-ink/60">(optional)</span>
        </span>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          className={cn(inputClass, "resize-y")}
          placeholder="Tell us about your students, goals, or the partnership you have in mind."
        />
      </label>

      <div className="hidden" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && error ? (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-slate-ink/70">
          We&apos;ll only use your information to respond to your inquiry.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white transition-colors hover:bg-ink-3 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : intent === "demo" ? "Request a Demo" : "Send Inquiry"}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
