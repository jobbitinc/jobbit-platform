import type { QuizAnswers } from "@/lib/career/types";
import type { PromptQuizAnswers } from "@/lib/career/validation";
import { quizQuestions } from "@/lib/quiz-data";

function optionLabel(questionId: string, value: string): string {
  const question = quizQuestions.find((q) => q.id === questionId);
  const option = question?.options.find((o) => o.value === value);
  if (!option) return value;
  return `${option.label} (${option.desc})`;
}

/**
 * Maps stored quiz slugs to API prompt fields per Fatima's implementation notes.
 * income + workCategory pass raw values; other fields use readable labels for Claude.
 */
export function buildPromptQuizAnswers(answers: QuizAnswers): PromptQuizAnswers {
  return {
    workStyle: optionLabel("workStyle", answers.workStyle ?? ""),
    environment: optionLabel("environment", answers.environment ?? ""),
    strength: optionLabel("strength", answers.strength ?? ""),
    workCategory: answers.workCategory ?? "",
    income: answers.income ?? "",
    urgency: optionLabel("urgency", answers.urgency ?? ""),
    physical: optionLabel("physical", answers.physical ?? ""),
  };
}

/** Raw slugs for matching rules (urgency thresholds, etc.). */
export function getRawQuizSlugs(answers: QuizAnswers) {
  return {
    workStyle: answers.workStyle ?? "",
    environment: answers.environment ?? "",
    strength: answers.strength ?? "",
    workCategory: answers.workCategory ?? "",
    income: answers.income ?? "",
    urgency: answers.urgency ?? "",
    physical: answers.physical ?? "",
  };
}
