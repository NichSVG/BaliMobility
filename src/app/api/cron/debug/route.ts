import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    cronSecretSet: !!process.env.CRON_SECRET,
    geminiKeySet: !!process.env.GEMINI_API_KEY,
    cronSecretLength: process.env.CRON_SECRET?.length || 0,
  });
}
