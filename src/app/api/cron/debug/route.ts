import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    cronSecretSet: !!process.env.CRON_SECRET,
    groqKeySet: !!process.env.GROQ_API_KEY,
    cronSecretLength: process.env.CRON_SECRET?.length || 0,
  });
}
