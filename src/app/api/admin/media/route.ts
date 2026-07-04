import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongoose";
import Media from "@/models/Media";
import { getSession } from "@/lib/session";

// POST: Add a video link
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { id, title, category } = body;

    if (!id || !title || !category) {
      return Response.json({ error: "id (YouTube Video ID), title, and category are required" }, { status: 400 });
    }

    const existingVideo = await Media.findOne({ id });
    if (existingVideo) {
      return Response.json({ error: "Video link already exists" }, { status: 400 });
    }

    const video = await Media.create({ id, title, category });
    return Response.json({ success: true, video });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a video link
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
      return Response.json({ error: "Video ID is required" }, { status: 400 });
    }

    const video = await Media.findOneAndDelete({ id });
    if (!video) {
      return Response.json({ error: "Video not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Video link deleted successfully" });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
