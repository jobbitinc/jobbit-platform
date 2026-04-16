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
import type { MatchResultSet, QuizAnswers } from "@/lib/career/types";
import {
  clearPendingCareer,
  readPendingCareer,
  writePendingCareer,
} from "@/lib/career-storage";
import { toPromptAnswers, validateMatchResultSet } from "@/lib/career/validation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export type SessionUser = { id: string; email: string; name: string };

type PersistedNavigatorState = {
  answers: QuizAnswers;
  matches: MatchResultSet;
  completedSteps: Record<string, boolean>;
};

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
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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

  const readServerState = useCallback(async (): Promise<PersistedNavigatorState | null> => {
    const supabase = getSupabaseBrowserClient();
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) return null;
    const response = await fetch("/api/navigator/state", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = (await response.json()) as {
      ok?: boolean;
      message?: string;
      data?: unknown;
    };
    if (!response.ok || !body.ok) {
      throw new Error(body.message ?? "Failed to read navigator state.");
    }
    if (!body.data) return null;
    const payload = body.data as PersistedNavigatorState;
    const promptAnswers = toPromptAnswers(payload.answers);
    const matches = validateMatchResultSet(payload.matches, promptAnswers);
    return {
      answers: payload.answers,
      matches,
      completedSteps: payload.completedSteps ?? {},
    };
  }, []);

  const writeServerState = useCallback(async (payload: PersistedNavigatorState) => {
    const supabase = getSupabaseBrowserClient();
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) throw new Error("No active auth session.");
    const response = await fetch("/api/navigator/state", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const body = (await response.json()) as { ok?: boolean; message?: string };
    if (!response.ok || !body.ok) {
      throw new Error(body.message ?? "Failed to save navigator state.");
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const hydrateFromStorage = useCallback(() => {
    const pending = readPendingCareer();
    if (pending) {
      setAnswers(pending.answers);
      setMatches(pending.matches);
      setCompletedSteps(pending.completedSteps ?? {});
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          setUser(null);
          hydrateFromStorage();
          setBootstrapped(true);
          return;
        }
        const nextUser = {
          id: data.user.id,
          email: data.user.email ?? "",
          name: ((data.user.user_metadata?.name as string | undefined) ?? "Friend").trim() || "Friend",
        };
        setUser(nextUser);
        const state = await readServerState();
        if (state) {
          setAnswers(state.answers);
          setMatches(state.matches);
          setCompletedSteps(state.completedSteps);
        } else {
          const pending = readPendingCareer();
          if (pending) {
            setAnswers(pending.answers);
            setMatches(pending.matches);
            setCompletedSteps(pending.completedSteps ?? {});
            await writeServerState({
              answers: pending.answers,
              matches: pending.matches,
              completedSteps: pending.completedSteps ?? {},
            });
            clearPendingCareer();
          }
        }
      } catch {
        showToast("Could not load your saved navigator data.");
      } finally {
        setBootstrapped(true);
      }
    };
    void run();
  }, [hydrateFromStorage, readServerState, showToast, writeServerState]);

  const persistBundle = useCallback(
    async (next: PersistedNavigatorState) => {
      if (!user) {
        writePendingCareer(next);
        return;
      }
      await writeServerState(next);
    },
    [user, writeServerState],
  );

  const completeQuiz = useCallback(
    async (quizAnswers: QuizAnswers) => {
      setIsMatching(true);
      setAnswers(quizAnswers);
      try {
        const promptAnswers = toPromptAnswers(quizAnswers);
        const response = await fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: promptAnswers }),
        });
        const body = (await response.json()) as {
          ok?: boolean;
          message?: string;
          data?: unknown;
        };
        if (!response.ok || !body.ok || !body.data) {
          throw new Error(body.message ?? "Could not generate matches right now.");
        }
        const result = validateMatchResultSet(body.data, promptAnswers);
        setMatches(result);
        setCompletedSteps({});
        setActiveTradeTab(0);
        await persistBundle({
          answers: quizAnswers,
          matches: result,
          completedSteps: {},
        });
        router.push("/navigator/results");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not generate matches right now.";
        showToast(message);
      } finally {
        setIsMatching(false);
      }
    },
    [persistBundle, router, showToast],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error || !data.user) {
        showToast(error?.message ?? "Invalid email or password.");
        return;
      }
      setUser({
        id: data.user.id,
        email: data.user.email ?? email.trim(),
        name: ((data.user.user_metadata?.name as string | undefined) ?? "Friend").trim() || "Friend",
      });
      const state = await readServerState();
      if (state) {
        setAnswers(state.answers);
        setMatches(state.matches);
        setCompletedSteps(state.completedSteps);
      }
      setAuthOpen(false);
      showToast(`Welcome back, ${((data.user.user_metadata?.name as string | undefined) ?? "Friend").trim() || "Friend"}!`);
      const dest = authRedirectRef.current;
      authRedirectRef.current = null;
      router.push(dest && dest.startsWith("/") ? dest : "/navigator/dashboard");
    },
    [readServerState, router, showToast],
  );

  const signup = useCallback(
    async (email: string, name: string, password: string) => {
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
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { name: name.trim() },
        },
      });
      if (error) {
        showToast(error.message);
        return;
      }
      if (!data.session || !data.user) {
        showToast("Account created. Please verify your email, then sign in.");
        setAuthOpen(false);
        return;
      }
      setUser({ id: data.user.id, email: data.user.email ?? email.trim(), name: name.trim() || "Friend" });
      await writeServerState({
        answers: a,
        matches: m,
        completedSteps: c,
      });
      clearPendingCareer();
      setAuthOpen(false);
      showToast(`Welcome, ${name.trim() || "Friend"}!`);
      const dest = authRedirectRef.current;
      authRedirectRef.current = null;
      router.push(dest && dest.startsWith("/") ? dest : "/navigator/dashboard");
    },
    [answers, completedSteps, matches, router, showToast, writeServerState],
  );

  const logout = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
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
          void persistBundle({ answers, matches, completedSteps: next });
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
