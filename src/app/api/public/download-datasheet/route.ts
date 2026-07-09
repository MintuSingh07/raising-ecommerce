import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    let fetchUrl = url;
    if (url.includes("res.cloudinary.com")) {
      const matches = url.match(/res\.cloudinary\.com\/[^/]+\/(image|raw)\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z0-9]+)?$/i);
      if (matches) {
        const resourceType = matches[1];
        const publicId = matches[2];
        
        // Generate a signed URL using Cloudinary SDK to authorize access
        fetchUrl = cloudinary.url(publicId, {
          resource_type: resourceType,
          sign_url: true,
          secure: true,
        });
      }
    }

    // Fetch the file
    const res = await fetch(fetchUrl);
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch file from source: ${res.status} ${res.statusText}` },
        { status: res.status }
      );
    }

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract filename from URL or default to datasheet
    const urlParts = url.split("/");
    const originalFilename = urlParts[urlParts.length - 1] || "datasheet";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${originalFilename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to download datasheet: " + errorMessage },
      { status: 500 }
    );
  }
}
