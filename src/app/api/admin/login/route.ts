import { NextResponse } from "next/server";
import { signSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = (body.username || "").trim();
    const password = (body.password || "").trim();

    const expectedUser = (process.env.ADMIN_USERNAME || "admin").trim();
    const expectedPass = (process.env.ADMIN_PASSWORD || "admin").trim();

    const isUserValid = username.toLowerCase() === expectedUser.toLowerCase();
    const isPassValid = password === expectedPass;

    if (!isUserValid || !isPassValid) {
      // Clean, secure, generic error with NO credentials exposed
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = await signSession(username);

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
