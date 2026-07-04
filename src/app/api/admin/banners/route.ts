import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongoose";
import Banner from "@/models/Banner";
import { getSession } from "@/lib/session";

// POST: Add a banner slide
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { image } = body;

    if (!image) {
      return Response.json({ error: "image path/URL is required" }, { status: 400 });
    }

    // Determine the next slide ID
    const highestBanner = await Banner.findOne({}).sort({ id: -1 });
    const nextId = highestBanner ? highestBanner.id + 1 : 1;

    const banner = await Banner.create({ id: nextId, image });
    return Response.json({ success: true, banner });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a banner slide
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Banner ID is required" }, { status: 400 });
    }

    const banner = await Banner.findOneAndDelete({ id: parseInt(id) });
    if (!banner) {
      return Response.json({ error: "Banner not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Banner slide deleted successfully" });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
