/**
 * Run: npx --yes tsx scripts/flow-check.ts
 * Validates quiz → prompt → match → navigator state without hitting external APIs.
 */
import { generateFallbackResults } from "../lib/match-fallback";
import type { QuizAnswers } from "../lib/career/types";
import {
  toPromptAnswers,
  validateMatchResultSet,
  validateNavigatorState,
  validateQuizAnswers,
} from "../lib/career/validation";

const sampleAnswers: QuizAnswers = {
  workStyle: "solve-problems",
  environment: "inside-buildings",
  strength: "learn-by-doing",
  workCategory: "electrical-technical",
  income: "$60K–$80K",
  urgency: "within-6-months",
  physical: "somewhat-physical",
};

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

function run() {
  const validated = validateQuizAnswers(sampleAnswers);
  assert(validated.workCategory === "electrical-technical", "workCategory slug");

  const prompt = toPromptAnswers(validated);
  assert(prompt.income === "$60K–$80K", "incomeGoal dollar pair");
  assert(prompt.workCategory === "electrical-technical", "workCategory in prompt");

  const fallback = generateFallbackResults(validated);
  const matches = validateMatchResultSet(fallback, prompt);
  assert(matches.matches.length === 3, "three fallback matches");

  const state = validateNavigatorState({
    answers: validated,
    matches,
    completedSteps: { "0-1": true },
  });
  assert(state.completedSteps["0-1"] === true, "completedSteps preserved");

  const rightNow = validateQuizAnswers({ ...sampleAnswers, urgency: "right-now" });
  const fast = generateFallbackResults(rightNow);
  validateMatchResultSet(fast, toPromptAnswers(rightNow));

  console.log("flow-check: all scenarios passed");
}

run();
