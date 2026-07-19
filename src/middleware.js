import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isCollection = pathname.startsWith("/collection"); // শুধুমাত্র /collection রাখলাম

  // রুটটি প্রটেক্টেড (/dashboard বা /collection) হলে কুকি চেক হবে
  if (isDashboard || isCollection) {
    const sessionToken = request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__secure-better-auth.session_token");

    // ১. ইউজার লগইন না থাকলে সরাসরি লগইন পেজে পাঠান
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // ২. ইউজার লগইন করা আছে এবং সে যদি ড্যাশবোর্ডে (Admin-only) যেতে চায়
    if (isDashboard) {
      try {
        const sessionRes = await fetch(`${origin}/api/auth/get-session`, {
          headers: {
            "Cookie": `${sessionToken.name}=${sessionToken.value}`,
          },
        });

        // যদি সেশন এপিআই রেসপন্স ওয়ান না হয়, লগইন পেজে পাঠান
        if (!sessionRes.ok) {
          return NextResponse.redirect(new URL("/login", request.url));
        }

        const session = await sessionRes.json();

        // ইউজার যদি লগইন করা থাকে কিন্তু সে 'admin' না হয়, তবে তাকে /login এ রিডাইরেক্ট করুন
        if (!session || !session.user || session.user.role !== "admin") {
          return NextResponse.redirect(new URL("/login", request.url));
        }
      } catch (err) {
        console.error("Middleware session verification error:", err);
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // ইউজার যদি শুধু /collection এ যায়, তাহলে ওপরের কুকি চেক পার হওয়াই যথেষ্ট।
    // সাধারণ ইউজাররা সরাসরি পেজে অ্যাক্সেস পাবে।
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/collection/:path*", // ম্যাচার থেকেও /my-collection বাদ দেওয়া হয়েছে
  ],
};