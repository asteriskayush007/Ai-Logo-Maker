"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import axios from "axios";

function GenerateLogo() {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState(null);
  const [finalPrompt, setFinalPrompt] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        console.log("✅ formData loaded:", parsedData);
      } catch (e) {
        console.error("❌ Error parsing formData:", e);
      }
    } else {
      console.log("⚠️ No formData found in localStorage");
    }
  }, []);

  const handleGenerate = async () => {
    setError("");

    if (!formData) {
      console.log("⏳ formData is not ready yet");
      return;
    }

    const prompt = `Generate a text prompt to create Logo for Logo Title/Brand name: ${formData.title}, with description: ${formData.desc}, with Color combination of ${formData.palette}, also include the ${formData.design?.title} and include ${formData.idea} design idea and Referring to this Logo Prompt: ${formData.design?.prompt}. Give me result in JSON format with prompt field only`;

    setFinalPrompt(prompt);
    console.log("✅ Final Prompt Generated:\n", prompt);

    try {
      const result = await axios.post("/api/ai-logo-model", { prompt });
      console.log("✅ Response:", result.data);
    } catch (err) {
      console.error("❌ AxiosError:", err);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🖌️ Logo Prompt Generator</h2>

      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        🔁 Regenerate Prompt
      </button>

      {error && (
        <div className="text-red-600 mt-4">
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {finalPrompt && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h3 className="font-semibold text-lg mb-2">🎨 Generated Prompt:</h3>
          <pre className="whitespace-pre-wrap">{finalPrompt}</pre>
        </div>
      )}
    </div>
  );
}

export default GenerateLogo;
