import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongoose";
import Banner from "@/models/Banner";
import { getSession } from "@/lib/session";

// POST: Add a banner slide (type = "desktop" | "mobile")
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { image, type } = body;

    if (!image) {
      return Response.json({ error: "Image path/URL is required" }, { status: 400 });
    }

    const bannerType = type === "mobile" ? "mobile" : "desktop";

    // Determine next ID within this type
    const highest = await Banner.findOne({ type: bannerType }).sort({ id: -1 });
    const nextId = highest ? highest.id + 1 : 1;

    const banner = await Banner.create({ id: nextId, type: bannerType, image });
    return Response.json({ success: true, banner });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json({ error: msg }, { status: 500 });
  }
}

// DELETE: Remove a banner slide by type + id
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (!id || !type) {
      return Response.json({ error: "id and type are required" }, { status: 400 });
    }

    const banner = await Banner.findOneAndDelete({ id: parseInt(id), type: type as "desktop" | "mobile" });
    if (!banner) {
      return Response.json({ error: "Banner not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Banner deleted successfully" });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json({ error: msg }, { status: 500 });
  }
}
