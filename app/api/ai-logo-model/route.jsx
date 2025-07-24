import { AILogoPrompt } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    // Step 1: Get AI Response
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    const rawText = await AiPromptResult.response.text();
    console.log("✅ Raw AI Response Text:", rawText);

    // Step 2: Remove triple backticks and extract only JSON
    const cleanText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Step 3: Parse it safely
    const AiLogoPrompt = JSON.parse(cleanText);

    // Step 4: Return response
    return NextResponse.json({
      success: true,
      data: AiLogoPrompt,
    });
  } catch (e) {
    console.error("❌ Backend error in /api/ai-logo-model:", e);
    return NextResponse.json({
      success: false,
      error: e.message || "Unknown error",
    }, { status: 500 });
  }
}
