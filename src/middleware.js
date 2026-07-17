import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isCollection = pathname.startsWith("/collection") || pathname.startsWith("/my-collection");

  // Check if target is a protected route
  if (isDashboard || isCollection) {
    const sessionToken = request.cookies.get("better-auth.session_token") || 
                         request.cookies.get("__secure-better-auth.session_token");

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // For admin-only routes, verify user role from Better Auth session
    if (isDashboard) {
      try {
        const sessionRes = await fetch(`${origin}/api/auth/get-session`, {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        });

        if (sessionRes.ok) {
          const session = await sessionRes.json();
          // If no session exists or user role is not admin, redirect to login
          if (!session || !session.user || session.user.role !== "admin") {
            return NextResponse.redirect(new URL("/login", request.url));
          }
        } else {
          return NextResponse.redirect(new URL("/login", request.url));
        }
      } catch (err) {
        console.error("Middleware session verification error:", err);
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/collection/:path*",
    "/my-collection/:path*"
  ],
};
