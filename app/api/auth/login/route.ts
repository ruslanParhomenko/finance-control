import { NextResponse } from "next/server";
import { authAdmin } from "@/lib/firebase";
import { signIn } from "next-auth/react";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token missing" },
        { status: 400 }
      );
    }

    const decoded = await authAdmin.verifyIdToken(token);

    const res = await signIn("credentials", {
      email: decoded.email,
      uid: decoded.uid,
      redirect: false,
    });

    if (res?.error) {
      return NextResponse.json(
        { message: "NextAuth login failed" },
        { status: 401 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("LOGIN API ERROR:", err);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
