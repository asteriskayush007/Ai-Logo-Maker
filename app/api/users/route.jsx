

import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📨 Incoming request body:", body);

    const { userEmail, userName } = body;

    if (!userEmail || !userName) {
      return NextResponse.json(
        { error: "Missing userEmail or userName" },
        { status: 400 }
      );
    }

    const userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log("✅ User found in DB");
      return NextResponse.json(userSnap.data());
    } else {
      const newUser = {
        email: userEmail,
        name: userName,
        credits: 5,
      };

      await setDoc(userRef, newUser);
      console.log("✅ New user added to DB:", newUser);

      return NextResponse.json(newUser);
    }
  } catch (error) {
    console.error("🔥 Error in /api/users route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
