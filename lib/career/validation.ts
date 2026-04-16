import type { ActionPlanStep, MatchResultSet, QuizAnswers, TradeMatch } from "./types";

const ALLOWED_TRADES = new Set([
  "Electrician",
  "Plumber",
  "HVAC Technician",
  "Welder",
  "Carpenter",
  "Construction Manager",
  "Heavy Equipment Operator",
  "Pipefitter",
  "Ironworker",
  "Sheet Metal Worker",
  "Elevator Mechanic",
  "Boilermaker",
  "Solar Installer",
  "Wind Turbine Technician",
  "Industrial Maintenance Mechanic",
  "Brick/Stonemason",
  "Cosmetologist",
]);

const ALLOWED_PRIORITIES = new Set(["First", "Next", "Then"]);

export const QUIZ_PROMPT_KEYS = [
  "workStyle",
  "environment",
  "strength",
  "urgency",
  "physical",
  "income",
] as const;

export type PromptQuizAnswers = Record<(typeof QUIZ_PROMPT_KEYS)[number], string>;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function asInt(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) ? value : null;
}

function validateActionPlanStep(raw: unknown, expectedStep: number): ActionPlanStep {
  if (!isObject(raw)) {
    throw new Error(`actionPlan[${expectedStep - 1}] must be an object`);
  }
  const step = asInt(raw.step);
  if (step !== expectedStep) {
    throw new Error(`actionPlan step must be ${expectedStep}`);
  }
  if (!isNonEmptyString(raw.title)) throw new Error("actionPlan title is required");
  if (!isNonEmptyString(raw.detail)) throw new Error("actionPlan detail is required");
  if (!isNonEmptyString(raw.timeEstimate)) throw new Error("actionPlan timeEstimate is required");
  if (!isNonEmptyString(raw.cost)) throw new Error("actionPlan cost is required");
  if (!isNonEmptyString(raw.priority) || !ALLOWED_PRIORITIES.has(raw.priority)) {
    throw new Error("actionPlan priority must be First, Next, or Then");
  }
  return {
    step,
    title: raw.title,
    detail: raw.detail,
    timeEstimate: raw.timeEstimate,
    cost: raw.cost,
    priority: raw.priority,
  };
}

function validateTradeMatch(raw: unknown, expectedRank: number, answers: PromptQuizAnswers): TradeMatch {
  if (!isObject(raw)) throw new Error(`matches[${expectedRank - 1}] must be an object`);
  const rank = asInt(raw.rank);
  if (rank !== expectedRank) throw new Error(`rank must be ${expectedRank}`);
  if (!isNonEmptyString(raw.trade) || !ALLOWED_TRADES.has(raw.trade)) {
    throw new Error("trade must be one of the supported trade names");
  }
  if (!isNonEmptyString(raw.emoji)) throw new Error("emoji is required");
  const matchScore = asInt(raw.matchScore);
  if (matchScore == null || matchScore < 65 || matchScore > 95) {
    throw new Error("matchScore must be an integer between 65 and 95");
  }
  if (!isNonEmptyString(raw.salaryRange)) throw new Error("salaryRange is required");
  if (!isNonEmptyString(raw.whyMatch)) throw new Error("whyMatch is required");
  const whyLower = raw.whyMatch.toLowerCase();
  const mentionsAnswer = Object.values(answers).some((answer) => whyLower.includes(answer.toLowerCase()));
  if (!mentionsAnswer) {
    throw new Error("whyMatch must reference at least one quiz answer");
  }
  if (!Array.isArray(raw.skillGaps) || raw.skillGaps.length !== 3 || !raw.skillGaps.every(isNonEmptyString)) {
    throw new Error("skillGaps must contain exactly 3 strings");
  }
  if (!Array.isArray(raw.actionPlan) || raw.actionPlan.length !== 6) {
    throw new Error("actionPlan must contain exactly 6 step objects");
  }
  const actionPlan = raw.actionPlan.map((step, idx) => validateActionPlanStep(step, idx + 1));
  return {
    rank,
    trade: raw.trade,
    emoji: raw.emoji,
    matchScore,
    salaryRange: raw.salaryRange,
    whyMatch: raw.whyMatch,
    skillGaps: raw.skillGaps,
    actionPlan,
  };
}

export function validatePromptQuizAnswers(raw: unknown): PromptQuizAnswers {
  if (!isObject(raw)) {
    throw new Error("Quiz answers payload must be an object");
  }
  const out: Partial<PromptQuizAnswers> = {};
  for (const key of QUIZ_PROMPT_KEYS) {
    const value = raw[key];
    if (!isNonEmptyString(value)) {
      throw new Error(`Missing required answer: ${key}`);
    }
    out[key] = value;
  }
  return out as PromptQuizAnswers;
}

export function validateMatchResultSet(raw: unknown, answers: PromptQuizAnswers): MatchResultSet {
  if (!isObject(raw)) throw new Error("Match response must be an object");
  if (!Array.isArray(raw.matches) || raw.matches.length !== 3) {
    throw new Error("matches must contain exactly 3 objects");
  }
  return {
    matches: raw.matches.map((match, idx) => validateTradeMatch(match, idx + 1, answers)),
  };
}

export function toPromptAnswers(answers: QuizAnswers): PromptQuizAnswers {
  const mapped: PromptQuizAnswers = {
    workStyle: answers.workStyle ?? "",
    environment: answers.environment ?? "",
    strength: answers.strength ?? "",
    urgency: answers.urgency ?? "",
    physical: answers.physical ?? "",
    income: answers.income ?? "",
  };
  return validatePromptQuizAnswers(mapped);
}
