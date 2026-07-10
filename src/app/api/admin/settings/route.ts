import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Setting from "@/models/Setting";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const settingsList = await Setting.find({});
    
    const settings: Record<string, string> = {};
    settingsList.forEach((s: any) => {
      settings[s.key] = s.value;
    });

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch settings: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { key, value } = body as { key: string; value: string };

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const setting = await Setting.findOneAndUpdate(
      { key },
      { value, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, setting });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to save setting: " + error.message },
      { status: 500 }
    );
  }
}
