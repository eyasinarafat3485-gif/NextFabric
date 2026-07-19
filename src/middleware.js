import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isCollection = pathname.startsWith("/collection"); // শুধুমাত্র /collection রাখলাম

  // রুটটি প্রটেক্টেড (/dashboard বা /collection) হলে কুকি চেক হবে
  if (isDashboard || isCollection) {
    const sessionToken = request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__secure-better-auth.session_token");

    // 1. Not Logged In: Block from /dashboard & /collection -> Redirect to /login
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const sessionRes = await fetch(`${origin}/api/auth/get-session`, {
        headers: {
          "Cookie": `${sessionToken.name}=${sessionToken.value}`,
        },
      });

      if (!sessionRes.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const session = await sessionRes.json();

      if (!session || !session.user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // 2. Logged In (Regular User): Allowed ONLY in /collection. If trying to access /dashboard -> Redirect to /collection
      if (isDashboard && session.user.role !== "admin") {
        return NextResponse.redirect(new URL("/collection", request.url));
      }
      
      // 3. Logged In (Admin): Allowed in both /dashboard and /collection (proceed automatically)
    } catch (err) {
      console.error("Middleware session verification error:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/collection/:path*", // ম্যাচার থেকেও /my-collection বাদ দেওয়া হয়েছে
  ],
};