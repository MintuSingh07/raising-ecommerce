import { deleteSession } from "@/lib/session";

export async function POST() {
  try {
    await deleteSession();
    return Response.json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    console.error("Logout error:", error);
    return Response.json(
      { error: "Something went wrong during logout" },
      { status: 500 }
    );
  }
}
