import { NextResponse } from "next/server";
import type { MatchResultSet, QuizAnswers } from "@/lib/career/types";
import { validateMatchResultSet, validatePromptQuizAnswers } from "@/lib/career/validation";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

type NavigatorPayload = {
  answers: QuizAnswers;
  matches: MatchResultSet;
  completedSteps: Record<string, boolean>;
};

class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function readBearerToken(req: Request): string | null {
  const header = req.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length).trim();
}

async function getAuthedUserId(req: Request): Promise<string> {
  const token = readBearerToken(req);
  if (!token) {
    throw new HttpError(401, "Missing bearer token");
  }
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    throw new HttpError(503, "Server is missing Supabase environment configuration.");
  }
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    throw new HttpError(401, "Invalid auth session");
  }
  return data.user.id;
}

function validateStateBody(raw: unknown): NavigatorPayload {
  if (typeof raw !== "object" || raw == null) {
    throw new Error("Payload must be an object");
  }
  const candidate = raw as {
    answers?: unknown;
    matches?: unknown;
    completedSteps?: unknown;
  };
  const answers = validatePromptQuizAnswers(candidate.answers);
  const matches = validateMatchResultSet(candidate.matches, answers);
  if (
    typeof candidate.completedSteps !== "object" ||
    candidate.completedSteps == null ||
    Array.isArray(candidate.completedSteps)
  ) {
    throw new Error("completedSteps must be an object");
  }
  const completedSteps = Object.fromEntries(
    Object.entries(candidate.completedSteps).map(([k, v]) => [k, Boolean(v)]),
  );
  return { answers, matches, completedSteps };
}

export async function GET(req: Request) {
  try {
    const userId = await getAuthedUserId(req);
    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { ok: false, message: "Server is missing Supabase environment configuration." },
        { status: 503 },
      );
    }
    const { data, error } = await supabase
      .from("navigator_profiles")
      .select("answers,matches,completed_steps")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      return NextResponse.json({ ok: true, data: null });
    }
    const answers = validatePromptQuizAnswers(data.answers);
    const matches = validateMatchResultSet(data.matches, answers);
    const completedSteps =
      typeof data.completed_steps === "object" && data.completed_steps && !Array.isArray(data.completed_steps)
        ? Object.fromEntries(
            Object.entries(data.completed_steps as Record<string, unknown>).map(([k, v]) => [k, Boolean(v)]),
          )
        : {};
    return NextResponse.json({ ok: true, data: { answers, matches, completedSteps } });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await getAuthedUserId(req);
    const payload = validateStateBody(await req.json());
    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { ok: false, message: "Server is missing Supabase environment configuration." },
        { status: 503 },
      );
    }
    const { error } = await supabase.from("navigator_profiles").upsert(
      {
        user_id: userId,
        answers: payload.answers,
        matches: payload.matches,
        completed_steps: payload.completedSteps,
      },
      { onConflict: "user_id" },
    );
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
