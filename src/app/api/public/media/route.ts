import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Media from "@/models/Media";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const media = await Media.find({}).sort({ createdAt: -1 });
    return NextResponse.json(media);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch media: " + error.message },
      { status: 500 }
    );
  }
}
