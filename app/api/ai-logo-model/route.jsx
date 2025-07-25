import axios from "axios";
import { AILogoPrompt } from "@/config/AiModel";
import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export async function POST(req) {
  try {
    const { prompt, email, title, desc, type } = await req.json();
    console.log("📨 Received Request:", { prompt, email, title, desc, type });

    // 1. Get AI Prompt
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    const responseText = await AiPromptResult.response.text();

    const cleanedText = responseText.replace(/```json|```/g, "").trim();
    const AiPrompt = JSON.parse(cleanedText).prompt;
    console.log("🧠 Cleaned AI Response:", AiPrompt);

    // 2. Generate Image
    let imageURL = null;
    if (type === "Free") {
      const BASE_URL = "https://aigurulab.tech";

      const result = await axios.post(
        `${BASE_URL}/api/generate-image`,
        {
          width: 1024,
          height: 1024,
          input: AiPrompt,
          model: "sdxl",
          aspectRatio: "1:1",
        },
        {
          headers: {
            "x-api-key": process.env.API_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      imageURL = result?.data?.image;
      console.log("🖼️ Generated Image URL:", imageURL);
    }

    // 3. Save to Firestore
    if (email && title && desc && imageURL) {
      const timestamp = Date.now().toString();

      // Step 1: Create/merge user document
      const userRef = doc(db, "users", email);
      await setDoc(userRef, { email }, { merge: true }); // <-- Important step

      // Step 2: Add logo under subcollection
      const logoRef = doc(db, "users", email, "logos", timestamp);
      await setDoc(logoRef, {
        title,
        desc,
        image: imageURL,
        prompt: AiPrompt,
        createdAt: new Date().toISOString(),
      });

      console.log("✅ User and logo saved to Firestore");
    } else {
      console.warn("⚠️ Missing required fields, logo not saved");
    }

    return NextResponse.json({ image: imageURL });
  } catch (error) {
    console.error("❌ Error in ai-logo-model route:", error.message);
    return NextResponse.json(
      { error: "Failed to generate logo", details: error.message },
      { status: 500 }
    );
  }
}
