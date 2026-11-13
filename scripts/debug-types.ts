import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { getRawQuizSlugs } from "../lib/quiz-prompt";
import {
  toPromptAnswers,
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

const SYSTEM_PROMPT = `You are Jobbit, an expert AI career navigator specializing in skilled trades careers for young people ages 16–30 in New Jersey. Return ONLY valid JSON. Raw JSON only.`;

async function run() {
  const client = new Anthropic({ apiKey });
  const quizAnswers = validateQuizAnswers(sampleAnswers);
  const promptAnswers = toPromptAnswers(quizAnswers);
  const slugs = getRawQuizSlugs(quizAnswers);

  const res = await client.messages.create({
    model: "claude-haiku-5-5",
    max_tokens: 4500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: "Return JSON: {\"matches\": []}" }],
  });
  console.log("res.content types:", res.content.map(c => ({ type: c.type, hasText: 'text' in c })));
}

run();
