import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Setting from "@/models/Setting";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const settingsList = await Setting.find({});
    
    // Transform array of settings into a key-value object
    const settings: Record<string, string> = {};
    settingsList.forEach((s: any) => {
      settings[s.key] = s.value;
    });

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch public settings: " + error.message },
      { status: 500 }
    );
  }
}
