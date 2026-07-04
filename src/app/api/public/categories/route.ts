import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ createdAt: 1 });
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch categories: " + error.message },
      { status: 500 }
    );
  }
}
