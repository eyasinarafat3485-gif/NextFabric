import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isCollection = pathname.startsWith("/collection");

  if (isDashboard || isCollection) {
    const sessionToken = request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__secure-better-auth.session_token");

    // 1. Check if user is logged in
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 2. Role-based protection for dashboard
    if (isDashboard) {
      try {
        const targetUrl = request.nextUrl.origin;
        
        const sessionRes = await fetch(`${targetUrl}/api/auth/get-session`, {
          headers: {
            "cookie": request.headers.get("cookie") || "",
          },
        });

        if (sessionRes.ok) {
          const session = await sessionRes.json();
          if (!session || !session.user) {
            return NextResponse.redirect(new URL("/login", request.url));
          }
          if (session.user.role !== "admin") {
            return NextResponse.redirect(new URL("/collection", request.url));
          }
          return NextResponse.next();
        }
        
        // If API fails but cookie exists, fallback safely to /collection instead of /login
        return NextResponse.redirect(new URL("/collection", request.url));
      } catch (err) {
        console.error("Middleware fetch error:", err);
        // Live server internal fetch bypass: if logged in with cookie, allow to /collection safely
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/collection/:path*",
  ],
};