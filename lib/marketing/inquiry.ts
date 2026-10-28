import { inquiryIntents, inquiryTypes, type InquiryIntent, type InquiryType } from "./content";

export type InquiryInput = {
  type: InquiryType;
  intent: InquiryIntent;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  jobTitle: string;
  phone: string;
  state: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isInquiryType(value: unknown): value is InquiryType {
  return inquiryTypes.some((t) => t.value === value);
}

export function isInquiryIntent(value: unknown): value is InquiryIntent {
  return inquiryIntents.some((t) => t.value === value);
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validateInquiry(body: Record<string, unknown>): { data: InquiryInput } | { error: string } {
  if (!isInquiryType(body.type)) return { error: "Please tell us which type of organization you represent." };
  const intent = isInquiryIntent(body.intent) ? body.intent : "general";

  const firstName = clean(body.firstName, 80);
  const lastName = clean(body.lastName, 80);
  const email = clean(body.email, 200).toLowerCase();
  const organization = clean(body.organization, 160);

  if (!firstName || !lastName) return { error: "Please enter your first and last name." };
  if (!EMAIL_RE.test(email)) return { error: "Please enter a valid email address." };
  if (!organization) return { error: "Please enter your organization name." };

  return {
    data: {
      type: body.type,
      intent,
      firstName,
      lastName,
      email,
      organization,
      jobTitle: clean(body.jobTitle, 120),
      phone: clean(body.phone, 40),
      state: clean(body.state, 60),
      message: clean(body.message, 2000),
    },
  };
}
