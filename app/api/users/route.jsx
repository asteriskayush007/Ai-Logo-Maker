import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Incoming body:", body); // ✅ Log the request body

    if (!body.userEmail || !body.userName) {
      return NextResponse.json(
        { error: "Missing userEmail or userName" },
        { status: 400 }
      );
    }

    const { userEmail, userName } = body;

    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      const data = {
        email: userEmail,
        name: userName,
        credits: 5,
      };

      await setDoc(docRef, data);
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("🔥 Backend Error in /api/users:", error); // ✅ Log backend error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
