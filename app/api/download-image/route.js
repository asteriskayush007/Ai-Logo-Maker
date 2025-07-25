import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { imageUrl, fileFormat = "png" } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
    }

    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": `image/${fileFormat}`,
        "Content-Disposition": `attachment; filename=ai-logo.${fileFormat}`,
      },
    });
  } catch (error) {
    console.error("❌ Download failed:", error);
    return NextResponse.json({ error: "Failed to download image" }, { status: 500 });
  }
}
