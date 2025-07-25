// /app/api/ai-design-ideas/route.js

import { AIDesignIdea } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("📤 Prompt to AIDesignIdea:", prompt);

    const result = await AIDesignIdea.sendMessage(prompt);
    const rawText = await result.response.text();

    console.log("🧾 Raw response from AIDesignIdea:\n", rawText);

    // Clean up code block (```json ... ```)
    const cleanText = rawText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (jsonErr) {
      console.error("❌ JSON parse error:", jsonErr);
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 });
    }

    if (!parsed.ideas || !Array.isArray(parsed.ideas)) {
      console.error("❌ No 'ideas' array in AI response");
      return NextResponse.json({ error: "AI did not return valid ideas" }, { status: 500 });
    }

    return NextResponse.json({ ideas: parsed.ideas });
  } catch (e) {
    console.error("🔥 General error in /api/ai-design-ideas:", e);
    return NextResponse.json({ error: "AI failed to generate logo ideas" }, { status: 500 });
  }
}
