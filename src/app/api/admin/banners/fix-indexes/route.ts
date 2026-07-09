import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongoose";
import Banner from "@/models/Banner";
import { getSession } from "@/lib/session";

/**
 * POST /api/admin/banners/fix-indexes
 *
 * One-time migration: drops the stale standalone `id_1` unique index
 * that conflicts with the correct compound `{ type: 1, id: 1 }` index.
 * Safe to call multiple times — it ignores "index not found" errors.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const collection = Banner.collection;

    // Drop the old single-field index if it exists
    try {
      await collection.dropIndex("id_1");
      console.log("[fix-indexes] Dropped stale 'id_1' index from banners collection.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      // "index not found" means it was already gone — that's fine
      if (!msg.includes("index not found")) {
        throw err;
      }
      console.log("[fix-indexes] 'id_1' index not found (already removed or never existed).");
    }

    // Re-sync indexes from the current schema (creates the compound index if missing)
    await Banner.syncIndexes();
    console.log("[fix-indexes] Banner indexes synced successfully.");

    return Response.json({
      success: true,
      message: "Stale index dropped and indexes re-synced. You can now upload mobile banners.",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json({ error: msg }, { status: 500 });
  }
}
