import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Banner from "@/models/Banner";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const banners = await Banner.find({}).sort({ id: 1 });
    return NextResponse.json(banners);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch banners: " + error.message },
      { status: 500 }
    );
  }
}
