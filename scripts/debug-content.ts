import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env"), "utf-8");
let apiKey = "";
for (const line of envContent.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (trimmed.startsWith("ANTHROPIC_API_KEY=")) {
    apiKey = trimmed.slice("ANTHROPIC_API_KEY=".length).trim();
  }
}

const client = new Anthropic({ apiKey });

async function run() {
  const res = await client.messages.create({
    model: "claude-haiku-5-5",
    max_tokens: 100,
    messages: [{ role: "user", content: "Say hello and return JSON: {\"hello\": \"world\"}" }],
  });
  console.log("Full res.content:", JSON.stringify(res.content, null, 2));
}

run();
