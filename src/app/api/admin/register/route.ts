import { NextRequest } from "next/server";
import { findUserByEmail, createUser } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Simple validation
    if (!name || !name.trim()) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    if (!email || !email.trim()) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return Response.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return Response.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Create user
    await createUser(name.trim(), email.trim().toLowerCase(), password);

    return Response.json({
      success: true,
      message: "Admin registered successfully. You can now log in.",
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return Response.json(
      { error: "Something went wrong during registration" },
      { status: 500 }
    );
  }
}
