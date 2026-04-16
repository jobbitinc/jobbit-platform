import type { MatchResultSet, QuizAnswers, StoredUser } from "@/lib/career/types";

const KEY_USERS = "jobbit_users_v1";
const KEY_PENDING = "jobbit_pending_career_v1";
const KEY_SESSION = "jobbit_session_email_v1";
const KEY_PENDING_BY_EMAIL = "jobbit_pending_career_by_email_v1";

type CareerBundle = {
  answers: QuizAnswers;
  matches: MatchResultSet;
  completedSteps: Record<string, boolean>;
};

type UsersDb = Record<string, StoredUser & CareerBundle>;

function readUsers(): UsersDb {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY_USERS);
    if (!raw) return {};
    return JSON.parse(raw) as UsersDb;
  } catch {
    return {};
  }
}

function writeUsers(db: UsersDb) {
  localStorage.setItem(KEY_USERS, JSON.stringify(db));
}

export function readPendingCareer(): CareerBundle | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY_PENDING);
    if (!raw) return null;
    return JSON.parse(raw) as CareerBundle;
  } catch {
    return null;
  }
}

export function writePendingCareer(bundle: CareerBundle) {
  sessionStorage.setItem(KEY_PENDING, JSON.stringify(bundle));
}

export function clearPendingCareer() {
  sessionStorage.removeItem(KEY_PENDING);
}

export function writePendingCareerForEmail(email: string, bundle: CareerBundle) {
  if (typeof window === "undefined") return;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return;
  try {
    const raw = localStorage.getItem(KEY_PENDING_BY_EMAIL);
    const map = raw ? (JSON.parse(raw) as Record<string, CareerBundle>) : {};
    map[normalized] = bundle;
    localStorage.setItem(KEY_PENDING_BY_EMAIL, JSON.stringify(map));
  } catch {
    // noop
  }
}

export function readPendingCareerForEmail(email: string): CareerBundle | null {
  if (typeof window === "undefined") return null;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;
  try {
    const raw = localStorage.getItem(KEY_PENDING_BY_EMAIL);
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, CareerBundle>;
    return map[normalized] ?? null;
  } catch {
    return null;
  }
}

export function clearPendingCareerForEmail(email: string) {
  if (typeof window === "undefined") return;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return;
  try {
    const raw = localStorage.getItem(KEY_PENDING_BY_EMAIL);
    if (!raw) return;
    const map = JSON.parse(raw) as Record<string, CareerBundle>;
    delete map[normalized];
    localStorage.setItem(KEY_PENDING_BY_EMAIL, JSON.stringify(map));
  } catch {
    // noop
  }
}

export function getSessionEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY_SESSION);
}

export function setSessionEmail(email: string | null) {
  if (!email) localStorage.removeItem(KEY_SESSION);
  else localStorage.setItem(KEY_SESSION, email);
}

export function registerUser(
  user: StoredUser,
  career: CareerBundle,
): { ok: true } | { ok: false; error: string } {
  const db = readUsers();
  if (db[user.email]) {
    return { ok: false, error: "An account with this email already exists." };
  }
  db[user.email] = {
    ...user,
    answers: career.answers,
    matches: career.matches,
    completedSteps: career.completedSteps ?? {},
  };
  writeUsers(db);
  setSessionEmail(user.email);
  clearPendingCareer();
  return { ok: true };
}

export function getStoredUserProfile(email: string): { name: string; email: string } | null {
  const db = readUsers();
  const row = db[email];
  if (!row) return null;
  return { email: row.email, name: row.name };
}

export function loginUser(email: string, password: string): { ok: true; user: StoredUser } | { ok: false; error: string } {
  const db = readUsers();
  const row = db[email];
  if (!row || row.password !== password) {
    return { ok: false, error: "Invalid email or password." };
  }
  setSessionEmail(email);
  return { ok: true, user: { email: row.email, name: row.name, password: row.password } };
}

export function logoutUser() {
  setSessionEmail(null);
}

export function loadCareerForEmail(email: string): CareerBundle | null {
  const db = readUsers();
  const row = db[email];
  if (!row) return null;
  return {
    answers: row.answers,
    matches: row.matches,
    completedSteps: row.completedSteps ?? {},
  };
}

export function saveCareerForSessionEmail(bundle: CareerBundle) {
  const email = getSessionEmail();
  if (!email) return;
  const db = readUsers();
  const row = db[email];
  if (!row) return;
  db[email] = {
    ...row,
    ...bundle,
  };
  writeUsers(db);
}
