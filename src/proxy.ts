import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all routes starting with /admin (excluding /admin/login)
  const isProtectedRoute = path.startsWith("/admin") && path !== "/admin/login";

  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get("admin_session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session || !session.userId) {
      const loginUrl = new URL("/admin/login", request.nextUrl);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Config matcher to only run proxy on admin pages for performance
export const config = {
  matcher: ["/admin/:path*"],
};
