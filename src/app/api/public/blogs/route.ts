import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const blog = await Blog.findOne({ slug });
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      const recommended = await Blog.find({ slug: { $ne: slug } })
        .limit(3)
        .select("slug title date image accent");
      return NextResponse.json({ blog, recommended });
    }

    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch blogs: " + error.message },
      { status: 500 }
    );
  }
}
