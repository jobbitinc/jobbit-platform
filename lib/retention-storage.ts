const KEY = "jobbit_retention_v1";

export type RetentionRecord = {
  firstVisitAt: string;
  lastVisitAt: string;
  visitDays: string[];
  celebrated50: boolean;
  celebrated100: boolean;
  lastReturnPromptDay: number | null;
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function readAll(): Record<string, RetentionRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, RetentionRecord>) : {};
  } catch {
    return {};
  }
}

function writeAll(db: Record<string, RetentionRecord>) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

export function recordVisit(userKey: string): RetentionRecord {
  const db = readAll();
  const now = new Date().toISOString();
  const day = todayKey();
  const prev = db[userKey];
  const visitDays = prev ? [...new Set([...prev.visitDays, day])].sort() : [day];
  const next: RetentionRecord = {
    firstVisitAt: prev?.firstVisitAt ?? now,
    lastVisitAt: now,
    visitDays,
    celebrated50: prev?.celebrated50 ?? false,
    celebrated100: prev?.celebrated100 ?? false,
    lastReturnPromptDay: prev?.lastReturnPromptDay ?? null,
  };
  db[userKey] = next;
  writeAll(db);
  return next;
}

export function getRetention(userKey: string): RetentionRecord | null {
  return readAll()[userKey] ?? null;
}

export function daysSinceFirstVisit(record: RetentionRecord): number {
  const start = new Date(record.firstVisitAt).getTime();
  const now = Date.now();
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

export function computeStreak(visitDays: string[]): number {
  if (!visitDays.length) return 0;
  const sorted = [...visitDays].sort().reverse();
  let streak = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = new Date(sorted[i]).getTime();
    const b = new Date(sorted[i + 1]).getTime();
    const diff = (a - b) / (1000 * 60 * 60 * 24);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export function markCelebrated(userKey: string, milestone: 50 | 100) {
  const db = readAll();
  const prev = db[userKey];
  if (!prev) return;
  db[userKey] = {
    ...prev,
    celebrated50: milestone === 50 ? true : prev.celebrated50,
    celebrated100: milestone === 100 ? true : prev.celebrated100,
  };
  writeAll(db);
}

export function markReturnPromptShown(userKey: string, day: number) {
  const db = readAll();
  const prev = db[userKey];
  if (!prev) return;
  db[userKey] = { ...prev, lastReturnPromptDay: day };
  writeAll(db);
}

export function shouldShowReturnPrompt(
  record: RetentionRecord,
  topTrade?: string,
): { show: boolean; day: number; message: string } | null {
  const days = daysSinceFirstVisit(record);
  if (record.lastReturnPromptDay === days) return null;
  if (days === 3) {
    const trade = topTrade?.trim() || "career";
    return {
      show: true,
      day: 3,
      message: `Your ${trade} roadmap is waiting. Step 2 is ready for you.`,
    };
  }
  if (days === 7) {
    return {
      show: true,
      day: 7,
      message: "One week in — keep your momentum going on your action plan.",
    };
  }
  return null;
}
