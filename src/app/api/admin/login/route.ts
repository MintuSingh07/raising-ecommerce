import { NextRequest } from "next/server";
import { findUserByEmail, verifyPassword } from "@/lib/db";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simple validation
    if (!email || !email.trim()) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    if (!password) {
      return Response.json({ error: "Password is required" }, { status: 400 });
    }

    // Find user
    const user = await findUserByEmail(email.trim());
    if (!user) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Create session (sets the cookie automatically on server response)
    await createSession(user.id);

    return Response.json({
      success: true,
      message: "Welcome back! Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return Response.json(
      { error: "Something went wrong during login" },
      { status: 500 }
    );
  }
}
