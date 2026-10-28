/** In-app route of the Jobbit career navigator (the student-facing product). */
export const APP_HOME_PATH = "/jobbit";

/**
 * Public URL of the Jobbit application, used by "Launch Jobbit" links on the corporate site.
 * Set NEXT_PUBLIC_JOBBIT_APP_URL when the app moves to its own domain.
 */
export const JOBBIT_APP_URL = process.env.NEXT_PUBLIC_JOBBIT_APP_URL?.trim() || APP_HOME_PATH;

export function getPublicSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://jobbit.vercel.app";
}

const LOCAL_ORIGIN_RE = /localhost|127\.0\.0\.1/i;

/**
 * Origin for Supabase `emailRedirectTo`. Uses NEXT_PUBLIC_APP_URL or NEXT_PUBLIC_SITE_URL
 * when set to a non-local URL; otherwise uses the current browser origin so a mis-set
 * localhost env on production cannot force verification links to localhost.
 */
export function getAuthEmailRedirectOrigin(): string {
  const strip = (s: string) => s.replace(/\/+$/, "");
  const fromEnv =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "";

  if (typeof window !== "undefined") {
    const here = strip(window.location.origin);
    if (fromEnv && !LOCAL_ORIGIN_RE.test(fromEnv)) return strip(fromEnv);
    return here;
  }

  return strip(fromEnv || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
}
