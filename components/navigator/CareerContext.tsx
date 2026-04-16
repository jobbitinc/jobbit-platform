"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { MatchResultSet, QuizAnswers, StoredUser } from "@/lib/career/types";
import {
  clearPendingCareer,
  getSessionEmail,
  getStoredUserProfile,
  loadCareerForEmail,
  loginUser as storageLogin,
  logoutUser as storageLogout,
  readPendingCareer,
  registerUser as storageRegister,
  saveCareerForSessionEmail,
  writePendingCareer,
} from "@/lib/career-storage";
import { generateFallbackResults } from "@/lib/match-fallback";

export type SessionUser = { email: string; name: string };

type CareerContextValue = {
  user: SessionUser | null;
  answers: QuizAnswers;
  matches: MatchResultSet | null;
  completedSteps: Record<string, boolean>;
  bootstrapped: boolean;
  activeTradeTab: number;
  setActiveTradeTab: (n: number) => void;
  isMatching: boolean;
  authOpen: boolean;
  authMode: "signup" | "login";
  openAuth: (mode?: "signup" | "login", redirectAfter?: string | null) => void;
  closeAuth: () => void;
  setAuthMode: (m: "signup" | "login") => void;
  toast: string | null;
  showToast: (msg: string) => void;
  completeQuiz: (answers: QuizAnswers) => Promise<void>;
  login: (email: string, password: string) => void;
  signup: (email: string, name: string, password: string) => void;
  logout: () => void;
  toggleStep: (key: string) => void;
  hydrateFromStorage: () => void;
};

const CareerContext = createContext<CareerContextValue | null>(null);

export function CareerProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [matches, setMatches] = useState<MatchResultSet | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [bootstrapped, setBootstrapped] = useState(false);
  const [activeTradeTab, setActiveTradeTab] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [toast, setToast] = useState<string | null>(null);
  const authRedirectRef = useRef<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const hydrateFromStorage = useCallback(() => {
    const email = getSessionEmail();
    if (!email) {
      setUser(null);
      return;
    }
    const profile = getStoredUserProfile(email);
    const career = loadCareerForEmail(email);
    if (profile && career) {
      setUser({ email: profile.email, name: profile.name });
      setAnswers(career.answers);
      setMatches(career.matches);
      setCompletedSteps(career.completedSteps ?? {});
    }
  }, []);

  useEffect(() => {
    const email = getSessionEmail();
    if (email) {
      hydrateFromStorage();
    } else {
      const pending = readPendingCareer();
      if (pending) {
        setAnswers(pending.answers);
        setMatches(pending.matches);
        setCompletedSteps(pending.completedSteps ?? {});
      }
    }
    setBootstrapped(true);
  }, [hydrateFromStorage]);

  const persistBundle = useCallback(
    (next: { answers: QuizAnswers; matches: MatchResultSet; completedSteps: Record<string, boolean> }) => {
      if (getSessionEmail()) {
        saveCareerForSessionEmail(next);
      } else {
        writePendingCareer(next);
      }
    },
    [],
  );

  const completeQuiz = useCallback(
    async (quizAnswers: QuizAnswers) => {
      setIsMatching(true);
      setAnswers(quizAnswers);
      await new Promise((r) => setTimeout(r, 900));
      const result = generateFallbackResults(quizAnswers);
      setMatches(result);
      setCompletedSteps({});
      setActiveTradeTab(0);
      persistBundle({
        answers: quizAnswers,
        matches: result,
        completedSteps: {},
      });
      setIsMatching(false);
      router.push("/navigator/results");
    },
    [persistBundle, router],
  );

  const login = useCallback(
    (email: string, password: string) => {
      const res = storageLogin(email, password);
      if (!res.ok) {
        showToast(res.error);
        return;
      }
      setUser({ email: res.user.email, name: res.user.name });
      const career = loadCareerForEmail(email);
      if (career) {
        setAnswers(career.answers);
        setMatches(career.matches);
        setCompletedSteps(career.completedSteps ?? {});
      }
      setAuthOpen(false);
      showToast(`Welcome back, ${res.user.name}!`);
      const dest = authRedirectRef.current;
      authRedirectRef.current = null;
      router.push(dest && dest.startsWith("/") ? dest : "/navigator/dashboard");
    },
    [router, showToast],
  );

  const signup = useCallback(
    (email: string, name: string, password: string) => {
      let m = matches;
      let a = answers;
      let c = completedSteps;
      if (!m) {
        const pending = readPendingCareer();
        if (pending) {
          m = pending.matches;
          a = pending.answers;
          c = pending.completedSteps ?? {};
          setMatches(m);
          setAnswers(a);
          setCompletedSteps(c);
        }
      }
      if (!m) {
        showToast("No quiz results to save. Take the quiz first.");
        return;
      }
      const u: StoredUser = { email: email.trim(), name: name.trim(), password };
      const res = storageRegister(u, {
        answers: a,
        matches: m,
        completedSteps: c,
      });
      if (!res.ok) {
        showToast(res.error);
        return;
      }
      setUser({ email: u.email, name: u.name });
      setAuthOpen(false);
      showToast(`Welcome, ${u.name}!`);
      const dest = authRedirectRef.current;
      authRedirectRef.current = null;
      router.push(dest && dest.startsWith("/") ? dest : "/navigator/dashboard");
    },
    [answers, completedSteps, matches, router, showToast],
  );

  const logout = useCallback(() => {
    storageLogout();
    setUser(null);
    clearPendingCareer();
    setAnswers({});
    setMatches(null);
    setCompletedSteps({});
    showToast("Signed out successfully");
    router.push("/navigator");
  }, [router, showToast]);

  const toggleStep = useCallback(
    (key: string) => {
      setCompletedSteps((prev) => {
        const next = { ...prev, [key]: !prev[key] };
        if (matches) {
          persistBundle({ answers, matches, completedSteps: next });
        }
        return next;
      });
    },
    [answers, matches, persistBundle],
  );

  const openAuth = useCallback((mode: "signup" | "login" = "signup", redirectAfter?: string | null) => {
    setAuthMode(mode);
    const safe =
      redirectAfter && redirectAfter.trim().length > 0 && redirectAfter.startsWith("/") ? redirectAfter : null;
    authRedirectRef.current = safe;
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    authRedirectRef.current = null;
    setAuthOpen(false);
  }, []);

  const value = useMemo<CareerContextValue>(
    () => ({
      user,
      answers,
      matches,
      completedSteps,
      bootstrapped,
      activeTradeTab,
      setActiveTradeTab,
      isMatching,
      authOpen,
      authMode,
      openAuth,
      closeAuth,
      setAuthMode,
      toast,
      showToast,
      completeQuiz,
      login,
      signup,
      logout,
      toggleStep,
      hydrateFromStorage,
    }),
    [
      user,
      answers,
      matches,
      completedSteps,
      bootstrapped,
      activeTradeTab,
      isMatching,
      authOpen,
      authMode,
      openAuth,
      closeAuth,
      setAuthMode,
      toast,
      showToast,
      completeQuiz,
      login,
      signup,
      logout,
      toggleStep,
      hydrateFromStorage,
    ],
  );

  return <CareerContext.Provider value={value}>{children}</CareerContext.Provider>;
}

export function useCareer() {
  const ctx = useContext(CareerContext);
  if (!ctx) throw new Error("useCareer must be used within CareerProvider");
  return ctx;
}
