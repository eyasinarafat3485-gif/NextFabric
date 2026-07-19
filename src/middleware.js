import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isCollection = pathname.startsWith("/collection") || pathname.startsWith("/my-collection");

  // ১. যদি প্রটেক্টেড রুট হয়, তবে প্রথমে টোকেন চেক করুন
  if (isDashboard || isCollection) {
    const sessionToken = request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__secure-better-auth.session_token");

    // টোকেন না থাকলে সরাসরি লগইন পেজে পাঠান
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // ২. শুধুমাত্র ড্যাশবোর্ড (Admin-only) রুটের জন্য সেশন ভেরিফাই ও রোল চেক করুন
    if (isDashboard) {
      try {
        const sessionRes = await fetch(`${origin}/api/auth/get-session`, {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        });

        if (!sessionRes.ok) {
          return NextResponse.redirect(new URL("/login", request.url));
        }

        const session = await sessionRes.json();

        // যদি সেশন না থাকে অথবা ইউজার অ্যাডমিন না হয়
        if (!session || !session.user || session.user.role !== "admin") {
          // এখানে আপনি চাইলে /login এ না পাঠিয়ে একটি /unauthorized পেজেও পাঠাতে পারেন
          return NextResponse.redirect(new URL("/login", request.url));
        }
      } catch (err) {
        console.error("Middleware session verification error:", err);
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // /collection বা /my-collection এর জন্য সেশন টোকেন থাকাই যথেষ্ট, 
    // তাই আলাদা কোনো অ্যাডমিন চেকের প্রয়োজন নেই।
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