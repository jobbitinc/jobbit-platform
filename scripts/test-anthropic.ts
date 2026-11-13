import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

// Simple .env parser
const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env"), "utf-8");
let apiKey = "";
for (const line of envContent.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (trimmed.startsWith("ANTHROPIC_API_KEY=")) {
    apiKey = trimmed.slice("ANTHROPIC_API_KEY=".length).trim();
  }
}

console.log("API Key present:", !!apiKey, "Length:", apiKey.length, "Suffix:", apiKey.slice(-6));

const client = new Anthropic({ apiKey });

async function test(model: string) {
  try {
    const res = await client.messages.create({
      model,
      max_tokens: 15,
      messages: [{ role: "user", content: "hello" }],
    });
    console.log(`[${model}] SUCCESS:`, (res.content[0] as any)?.text?.trim());
    return true;
  } catch (err: any) {
    console.log(`[${model}] ERROR:`, err.status, err.error?.type || err.message);
    return false;
  }
}

async function main() {
  await test("claude-haiku-5-5");
  await test("claude-haiku-4-5-20251001");
  await test("claude-3-5-haiku-20241022");
  await test("claude-3-5-haiku-latest");
}

main();
