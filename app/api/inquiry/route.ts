import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/marketing/inquiry";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = validateInquiry(body);
  if ("error" in parsed) {
    return NextResponse.json({ ok: false, message: parsed.error }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Server is missing Supabase environment configuration." },
      { status: 503 },
    );
  }

  const d = parsed.data;
  const { error } = await supabase.from("partner_inquiries").insert({
    inquiry_type: d.type,
    intent: d.intent,
    first_name: d.firstName,
    last_name: d.lastName,
    email: d.email,
    organization: d.organization,
    job_title: d.jobTitle,
    phone: d.phone,
    state: d.state,
    message: d.message,
  });

  if (error) {
    console.error("[inquiry] Supabase insert failed:", error.code, error.message, error.details, error.hint);
    const devHint =
      process.env.NODE_ENV === "development" ? ` ${error.message}${error.hint ? ` (${error.hint})` : ""}` : "";
    return NextResponse.json(
      { ok: false, message: `We couldn't send your request. Please try again or email us.${devHint}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
