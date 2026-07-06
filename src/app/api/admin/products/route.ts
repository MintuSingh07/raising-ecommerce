import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import { getSession } from "@/lib/session";

// All top-level product fields extracted from the request body
function extractFields(body: any) {
  const {
    id,
    name,
    subtitle,
    category,
    categories,
    badge,
    featured,
    rating,
    reviewCount,
    image,
    gallery,
    datasheetUrl,
    description,
    highlights,
    productFeatures,
    specs,
    colors,
    applications,
    inBox,
  } = body;

  return {
    id,
    name,
    subtitle: subtitle || "",
    category,
    categories: categories || (category ? [category] : []),
    badge: badge || "",
    featured: !!featured,
    rating: Number(rating) || 0,
    reviewCount: Number(reviewCount) || 0,
    image: image || "",
    gallery: gallery || [],
    datasheetUrl: datasheetUrl || "",
    description: description || "",
    highlights: highlights || [],
    productFeatures: productFeatures || [],
    specs: specs || [],
    colors: colors || [],
    applications: applications || [],
    inBox: inBox || [],
  };
}

// POST: Add a product
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const fields = extractFields(body);

    if (!fields.id || !fields.name || !fields.category) {
      return Response.json(
        { error: "id, name, and category are required" },
        { status: 400 }
      );
    }

    const existing = await Product.findOne({ id: fields.id });
    if (existing) {
      return Response.json(
        { error: "A product with this SKU/ID already exists" },
        { status: 400 }
      );
    }

    const product = await Product.create(fields);
    return Response.json({ success: true, product });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Edit a product
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const fields = extractFields(body);

    if (!fields.id) {
      return Response.json(
        { error: "Product ID is required for editing" },
        { status: 400 }
      );
    }

    // Remove `id` from the update payload — it's the key, not an updatable field
    const { id, ...updatePayload } = fields;

    const product = await Product.findOneAndUpdate({ id }, updatePayload, {
      new: true,
    });

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ success: true, product });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a product
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
      return Response.json({ error: "Product ID is required" }, { status: 400 });
    }

    const product = await Product.findOneAndDelete({ id });
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
