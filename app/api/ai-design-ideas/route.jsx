import { AIDesignIdea } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await AIDesignIdea.sendMessage(prompt);
    const responseText = await result.response.text(); // Await here!

    // Remove markdown code block if present
    const cleanedText = responseText.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleanedText); // Now safe to parse

    return NextResponse.json({ ideas: parsed.ideas });
  } catch (e) {
    console.error("AI Error:", e);
    return NextResponse.json({ error: "AI failed to generate logo ideas" }, { status: 500 });
  }
}
