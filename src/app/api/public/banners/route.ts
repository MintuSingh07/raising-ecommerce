import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Banner from "@/models/Banner";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const [desktop, mobile] = await Promise.all([
      Banner.find({ type: "desktop" }).sort({ id: 1 }).lean(),
      Banner.find({ type: "mobile" }).sort({ id: 1 }).lean(),
    ]);
    return NextResponse.json({ desktop, mobile });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
