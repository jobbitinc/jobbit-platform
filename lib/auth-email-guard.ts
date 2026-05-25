/** Prevents duplicate magic-link / OTP emails from rapid clicks or re-renders. */

const STORAGE_KEY = "jobbit_auth_email_sent_v1";
const COOLDOWN_MS = 60_000;

type SentRecord = {
  email: string;
  sentAt: number;
};

function readRecord(): SentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SentRecord;
  } catch {
    return null;
  }
}

export function canSendAuthEmail(email: string): { ok: true } | { ok: false; retryInSec: number } {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return { ok: true };

  const record = readRecord();
  if (!record || record.email !== normalized) return { ok: true };

  const elapsed = Date.now() - record.sentAt;
  if (elapsed >= COOLDOWN_MS) return { ok: true };

  const retryInSec = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
  return { ok: false, retryInSec };
}

export function markAuthEmailSent(email: string) {
  if (typeof window === "undefined") return;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return;
  const payload: SentRecord = { email: normalized, sentAt: Date.now() };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function formatAuthError(message: string): string {
  if (/rate limit|too many requests|email.*limit/i.test(message)) {
    return "Too many sign-in emails were sent. Wait about a minute, then try again — or use the link already in your inbox.";
  }
  return message;
}
