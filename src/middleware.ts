import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("admin_session")?.value;
  const isAuthenticated = await verifySession(sessionToken);

  // If user is accessing the login page:
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      // Already logged in, redirect to admin dashboard
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Protect administrative API actions (creation, approvals, deletes)
  if (
    request.method !== "GET" &&
    (pathname.startsWith("/api/casinos") || pathname.includes("/approve"))
  ) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/casinos/:path*", "/api/reviews/:id/approve"],
};
