import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongoose";
import Blog from "@/models/Blog";
import { getSession } from "@/lib/session";

// POST: Add a blog post
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    let { slug, title, category, date, readTime, excerpt, image, accent, htmlContent, content, author, authorRole, tags } = body;

    if (!title || !category) {
      return Response.json({ error: "Title and category are required" }, { status: 400 });
    }

    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return Response.json({ error: "Blog with this slug already exists" }, { status: 400 });
    }

    // Resolve htmlContent vs legacy content
    let finalHtml = htmlContent || "";
    let finalIntro = "";
    let finalSections: any[] = [];
    if (content && typeof content === "object") {
      finalIntro = content.intro || "";
      finalSections = content.sections || [];
    } else if (content && typeof content === "string") {
      finalHtml = content;
    }

    if (!readTime && finalHtml) {
      const words = finalHtml.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
      readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
    }
    if (!excerpt && finalHtml) {
      const plain = finalHtml.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      excerpt = plain.substring(0, 155) + (plain.length > 155 ? "..." : "");
    }

    const blog = await Blog.create({
      slug,
      title,
      category,
      date: date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: readTime || "3 min read",
      excerpt: excerpt || "",
      image: image || "",
      accent: accent || "from-blue-600/30 to-blue-900/60",
      intro: finalIntro,
      sections: finalSections,
      htmlContent: finalHtml,
      author: author || "RISING Admin",
      authorRole: authorRole || "Technical Team",
      tags: tags || [],
    });

    return Response.json({ success: true, blog });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Edit a blog post
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    let { slug, title, category, date, readTime, excerpt, image, accent, htmlContent, content, author, authorRole, tags } = body;

    if (!slug) {
      return Response.json({ error: "Blog slug is required for editing" }, { status: 400 });
    }

    // Resolve htmlContent vs legacy content
    let finalHtml = htmlContent || "";
    let finalIntro = "";
    let finalSections: any[] = [];
    if (content && typeof content === "object") {
      finalIntro = content.intro || "";
      finalSections = content.sections || [];
    } else if (content && typeof content === "string") {
      finalHtml = content;
    }

    if (!readTime && finalHtml) {
      const words = finalHtml.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
      readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
    }
    if (!excerpt && finalHtml) {
      const plain = finalHtml.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      excerpt = plain.substring(0, 155) + (plain.length > 155 ? "..." : "");
    }

    const updateFields: any = {
      title,
      category,
      date: date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: readTime || "3 min read",
      excerpt: excerpt || "",
      image,
      accent,
      htmlContent: finalHtml,
      author,
      authorRole,
      tags,
    };

    if (finalIntro) updateFields.intro = finalIntro;
    if (finalSections && finalSections.length > 0) updateFields.sections = finalSections;

    const blog = await Blog.findOneAndUpdate(
      { slug },
      updateFields,
      { new: true }
    );

    if (!blog) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    return Response.json({ success: true, blog });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a blog post
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return Response.json({ error: "Blog slug is required" }, { status: 400 });
    }

    const blog = await Blog.findOneAndDelete({ slug });
    if (!blog) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
