import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { WaitlistLeadInput } from "@/lib/waitlist/types";

function sanitizeBody(body: Partial<WaitlistLeadInput>): WaitlistLeadInput | null {
  const firstName = body.firstName?.trim();
  const email = body.email?.trim().toLowerCase();
  if (!firstName || !email || !email.includes("@")) {
    return null;
  }

  const parsedAge = body.age == null ? null : Number(body.age);
  const age = Number.isFinite(parsedAge) && parsedAge >= 14 && parsedAge <= 40 ? parsedAge : null;

  return {
    firstName,
    lastName: body.lastName?.trim() || "",
    email,
    age,
    zip: body.zip?.trim() || "",
    role: body.role?.trim() || "",
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
  const payload = sanitizeBody(body);

  if (!payload) {
    return NextResponse.json(
      { ok: false, message: "Please enter your first name and a valid email." },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("waitlist_leads").insert({
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    age: payload.age,
    zip: payload.zip,
    role: payload.role,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, message: "This email is already on the waitlist." },
        { status: 409 },
      );
    }
    return NextResponse.json({ ok: false, message: "Failed to save waitlist lead." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
