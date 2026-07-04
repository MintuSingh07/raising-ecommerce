import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongoose";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { getSession } from "@/lib/session";

// POST: Add a new category
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { id, label, desc } = body;

    if (!id || !label) {
      return Response.json(
        { error: "id (slug) and label are required" },
        { status: 400 }
      );
    }

    const slug = id.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
    if (!slug) {
      return Response.json(
        { error: "Invalid category slug ID" },
        { status: 400 }
      );
    }

    const existing = await Category.findOne({ id: slug });
    if (existing) {
      return Response.json(
        { error: "A category with this ID already exists" },
        { status: 400 }
      );
    }

    const category = await Category.create({
      id: slug,
      label: label.trim(),
      desc: (desc || "").trim(),
    });

    return Response.json({ success: true, category });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a category
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
      return Response.json({ error: "Category ID is required" }, { status: 400 });
    }

    // Check if any product is currently using this category
    const productCount = await Product.countDocuments({ category: id });
    if (productCount > 0) {
      return Response.json(
        { error: `Cannot delete category. ${productCount} product(s) are currently assigned to it.` },
        { status: 400 }
      );
    }

    const category = await Category.findOneAndDelete({ id });
    if (!category) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
