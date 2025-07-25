"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function GenerateLogo() {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("png");

  const searchParams = useSearchParams();
  const modelType = searchParams.get("type");

  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  const handleGenerate = async () => {
    if (!formData) return;
    setLoading(true);

    const PROMPT = `Generate a text prompt to create Logo for Logo Title/Brand name: ${formData.title}, with description: ${formData.desc}, with Color combination of ${formData.palette}, also include the ${formData.design?.title} and include ${formData.idea} design idea and Referring to this Logo Prompt: ${formData.design?.prompt}. Give me result in JSON format with prompt field only`;

    try {
      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        email: userDetail?.email,
        title: formData.title,
        desc: formData.desc,
        type: modelType,
      });

      setLogoImage(result?.data?.image);
    } catch (err) {
      console.error("❌ Logo generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!logoImage) return alert("⚠️ No image to download");

    try {
      const response = await fetch("/api/download-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: logoImage,
          fileFormat: selectedFormat,
        }),
      });

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `logo.${selectedFormat}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
          🎨 AI Logo Generator
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`px-6 py-3 rounded text-white font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "⏳ Generating..." : "⚡ Generate Logo"}
          </button>

          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>

          <button
            onClick={handleDownload}
            disabled={!logoImage}
            className={`px-6 py-3 rounded font-semibold text-white transition duration-300 ${
              logoImage
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            ⬇️ Download Logo
          </button>
        </div>

        <div className="flex justify-center mt-8">
          {logoImage && !loading ? (
            <div className="p-4 border rounded-lg shadow-md bg-white max-w-sm w-full">
              <Image
                src={logoImage}
                alt="Generated Logo"
                width={400}
                height={400}
                className="rounded object-contain"
                unoptimized
              />
            </div>
          ) : !logoImage && !loading ? (
            <p className="text-center text-gray-500">No logo generated yet.</p>
          ) : (
            <p className="text-center text-blue-600 font-medium">
              ⏳ Generating Logo...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateLogo;
