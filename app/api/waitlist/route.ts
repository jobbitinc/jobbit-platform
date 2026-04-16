import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { WaitlistLeadInput } from "@/lib/waitlist/types";

const US_ZIP_RE = /^\d{5}(-\d{4})?$/;

function sanitizeBody(body: Partial<WaitlistLeadInput>): { data: WaitlistLeadInput } | { error: string } {
  const firstName = body.firstName?.trim();
  const email = body.email?.trim().toLowerCase();
  if (!firstName || !email || !email.includes("@")) {
    return { error: "Please enter your first name and a valid email." };
  }

  const lastName = body.lastName?.trim() ?? "";

  let age: number | null = null;
  if (body.age != null) {
    const parsedAge = Number(body.age);
    if (!Number.isFinite(parsedAge) || parsedAge < 14 || parsedAge > 40) {
      return { error: "If you enter an age, use a whole number from 14 to 40." };
    }
    age = Math.round(parsedAge);
  }

  const zipRaw = body.zip?.trim() ?? "";
  let zip = "";
  if (zipRaw) {
    const zipDigits = zipRaw.replace(/\s/g, "");
    if (!US_ZIP_RE.test(zipDigits)) {
      return { error: "Please enter a valid U.S. ZIP code (e.g. 07030) or leave it blank." };
    }
    zip = zipDigits;
  }

  const role = body.role?.trim() ?? "";

  return {
    data: {
      firstName,
      lastName,
      email,
      age,
      zip,
      role,
    },
  };
}

export async function POST(req: Request) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Server is missing Supabase environment configuration." },
      { status: 503 },
    );
  }

  const body = (await req.json()) as Partial<WaitlistLeadInput>;
  const parsed = sanitizeBody(body);

  if ("error" in parsed) {
    return NextResponse.json({ ok: false, message: parsed.error }, { status: 400 });
  }

  const payload = parsed.data;

  const row: Record<string, string | number> = {
    first_name: payload.firstName,
    last_name: payload.lastName ?? "",
    email: payload.email,
    zip: payload.zip ?? "",
    role: payload.role ?? "",
  };
  if (payload.age != null) {
    row.age = payload.age;
  }

  const { error } = await supabase.from("waitlist_leads").insert(row);

  if (error) {
    console.error("[waitlist] Supabase insert failed:", error.code, error.message, error.details, error.hint);
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, message: "This email is already on the waitlist." },
        { status: 409 },
      );
    }
    const devHint =
      process.env.NODE_ENV === "development"
        ? ` ${error.message}${error.hint ? ` (${error.hint})` : ""}`
        : "";
    return NextResponse.json(
      { ok: false, message: `Failed to save waitlist lead.${devHint}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
