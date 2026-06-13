import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /studio route
  if (pathname.startsWith("/studio")) {
    // Disable studio in production unless explicitly enabled
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_ENABLE_STUDIO !== "true"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Basic auth check via cookie
    const studioAuth = request.cookies.get("studio-auth")?.value;
    const studioPassword = process.env.STUDIO_PASSWORD || "balimob2026";

    // If no auth cookie, redirect to login
    if (!studioAuth || studioAuth !== studioPassword) {
      // Allow the studio login page itself
      if (pathname === "/studio/login") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/studio/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
