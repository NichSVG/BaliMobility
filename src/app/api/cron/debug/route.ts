import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    cronSecretSet: !!process.env.CRON_SECRET,
    groqKeySet: !!process.env.GROQ_API_KEY,
    cronSecretLength: process.env.CRON_SECRET?.length || 0,
    groqModel: process.env.GROQ_MODEL || null,
    maxAttemptsPerModel: Math.max(
      1,
      parseInt(process.env.GROQ_MAX_ATTEMPTS || "3", 10) || 3
    ),
    defaultModels: process.env.GROQ_MODEL
      ? [process.env.GROQ_MODEL]
      : ["openai/gpt-oss-120b", "openai/gpt-oss-20b"],
  });
}
