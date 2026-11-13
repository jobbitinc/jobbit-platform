import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { getRawQuizSlugs } from "../lib/quiz-prompt";
import {
  toPromptAnswers,
  validateMatchResultSet,
  validateQuizAnswers,
} from "../lib/career/validation";

const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env"), "utf-8");
let apiKey = "";
for (const line of envContent.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (trimmed.startsWith("ANTHROPIC_API_KEY=")) {
    apiKey = trimmed.slice("ANTHROPIC_API_KEY=".length).trim();
  }
}

const sampleAnswers = {
  workStyle: "solve-problems",
  environment: "inside-buildings",
  strength: "learn-by-doing",
  workCategory: "electrical-technical",
  urgency: "within-6-months",
  physical: "somewhat-physical",
};

const SYSTEM_PROMPT = `You are Jobbit, an expert AI career navigator specializing in skilled trades careers for young people ages 16–30 in New Jersey. You have deep knowledge of New Jersey trade schools, county colleges, registered apprenticeships, union locals, NJDOL workforce programs, certification requirements, salary ranges, and career progression for skilled trades in New Jersey.

Your role is to analyze a user's quiz answers and return the top 3 skilled trade career matches as structured JSON. Every recommendation, salary context, skill gap, and action-plan step must be grounded in New Jersey pathways (NJ trade schools, NJ apprenticeships, NJ unions, and NJ employers) — do not recommend out-of-state programs as primary options. You must be specific, encouraging, and honest. Match quality matters more than speed. Every recommendation must reference the user's actual answers - do not return generic matches.

Return ONLY valid JSON. No preamble, no explanation, no markdown formatting, no code blocks. Raw JSON only.`;

function urgencyMatchingNote(urgency: string): string {
  switch (urgency) {
    case "right-now":
      return 'Income urgency is "right-now": surface ONLY trades with certifications achievable in under 90 days. Action plan steps must emphasize fast certs (e.g. OSHA-10, short pre-apprenticeship) before long apprenticeships.';
    case "within-6-months":
      return 'Income urgency is "within-6-months": favor trades with entry paths under 6 months; keep action plan fast-moving.';
    case "train-1-2-years":
      return 'Income urgency is "train-1-2-years": include 1–2 year certificate or pre-apprenticeship pathways.';
    case "planning-ahead":
      return 'Income urgency is "planning-ahead": include full registered apprenticeship pathways (2+ years) and union programs where appropriate.';
    default:
      return "";
  }
}

function buildUserPrompt(answers: any, slugs: any): string {
  const urgencyNote = urgencyMatchingNote(slugs.urgency);
  return `A young person in New Jersey completed Jobbit's 6-question career quiz. Here are their answers:

- Work day preference: ${answers.workStyle}
- Work environment preference: ${answers.environment}
- Current strength / learning profile: ${answers.strength}
- workCategory: ${slugs.workCategory}
- incomeUrgency: ${answers.urgency}
- Physical comfort level: ${answers.physical}

Matching constraints (required):
- Geographic focus is New Jersey ONLY. Reference NJ trade schools, NJ community/county colleges, NJ registered apprenticeships, NJ union halls, NJDOL / One-Stop Career Centers, and NJ employers in actionPlan details and whyMatch when relevant.
- workCategory must narrow the trade pool: electrical-technical, mechanical-structural, environment-outdoors, or creative-craft.
- ${urgencyNote}
- Prefer New Jersey salary ranges and licensing / board requirements where they apply (e.g. NJ electrical licensing path, NJ Board of Cosmetology).

Available trades to match from: Electrician, Plumber, HVAC Technician, Welder, Carpenter, Construction Manager, Heavy Equipment Operator, Pipefitter, Ironworker, Sheet Metal Worker, Elevator Mechanic, Boilermaker, Solar Installer, Wind Turbine Technician, Industrial Maintenance Mechanic, Brick/Stonemason, Cosmetologist

Return exactly 3 matches ranked by fit. Follow the JSON schema below precisely.

{
"matches": [
{
"rank": 1,
"trade": "string — trade name exactly as listed above",
"emoji": "string — single relevant emoji",
"matchScore": "integer — 65 to 95, reflecting genuine fit",
"salaryRange": "string — format: $XXK – $XXXK",
"whyMatch": "string — 2 to 3 sentences referencing the user's specific answers. Must feel personal, not generic.",
"skillGaps": [
"string — specific gap 1",
"string — specific gap 2",
"string — specific gap 3"
],
"actionPlan": [
{
"step": 1,
"title": "string — clear action title",
"detail": "string — specific, actionable instruction",
"timeEstimate": "string — e.g. 1–2 days, 2–4 weeks",
"cost": "string — e.g. $0, $25–$75",
"priority": "string — First, Next, or Then"
}
]
}
]
}

Schema rules must be reinforced:
- matches array must always contain exactly 3 objects
- rank values must be 1, 2, and 3 — no duplicates
- matchScore must be an integer between 65 and 95
- actionPlan array must always contain exactly 6 step objects per match
- skillGaps array must always contain exactly 3 strings
- whyMatch must reference at least one of the user's actual quiz answers
- Steps in actionPlan must be ordered logically — certifications before applications, research before contact`;
}

function parseJsonText(raw: string): unknown {
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Model returned non-JSON content");
  }
}

async function run() {
  const client = new Anthropic({ apiKey });
  const quizAnswers = validateQuizAnswers(sampleAnswers);
  const promptAnswers = toPromptAnswers(quizAnswers);
  const slugs = getRawQuizSlugs(quizAnswers);

  console.log("Calling claude-haiku-5-5 with real quiz prompt...");
  const t0 = Date.now();
  const res = await client.messages.create({
    model: "claude-haiku-5-5",
    max_tokens: 4500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(promptAnswers, slugs) }],
  });
  console.log(`Response received in ${(Date.now() - t0) / 1000}s`);
  console.log("Full res:", JSON.stringify({ stop_reason: res.stop_reason, usage: res.usage, content: res.content }));
  
  const textBlock = res.content.find((p) => p.type === "text") as any;
  if (!textBlock) {
    throw new Error("No text block in response");
  }
  const text = textBlock.text.trim();
  const parsed = parseJsonText(text);
  const validated = validateMatchResultSet(parsed, promptAnswers);
  console.log("Validation SUCCESS! Matches returned:", validated.matches.map((m: any) => `${m.rank}. ${m.trade} (${m.matchScore}%)`));
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
