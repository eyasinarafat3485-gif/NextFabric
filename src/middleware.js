import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isCollection = pathname.startsWith("/collection");

  // রুটটি প্রটেক্টেড (/dashboard বা /collection) হলে কুকি চেক হবে
  if (isDashboard || isCollection) {
    const sessionToken = request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__secure-better-auth.session_token");

    // ১. ইউজার লগইন না থাকলে সরাসরি লগইন পেজে পাঠান
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // ২. ইউজার লগইন করা আছে এবং সে যদি ড্যাশবোর্ডে (Admin-only) যেতে চায়
    if (isDashboard) {
      try {
        // লাইভ এবং লোকালহোস্ট দুই জায়গাতেই যেন সঠিক ডোমেইন পায় তার জন্য absolute URL নিশ্চিত করা হলো
        const productionUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
        
        const sessionRes = await fetch(`${productionUrl}/api/auth/get-session`, {
          headers: {
            "Cookie": `${sessionToken.name}=${sessionToken.value}`,
          },
        });

        // যদি সেশন এপিআই রেসপন্স ওকে না হয়, লগইন পেজে পাঠান
        if (!sessionRes.ok) {
          return NextResponse.redirect(new URL("/login", request.url));
        }

        const session = await sessionRes.json();

        // ইউজার যদি লগইন করা থাকে কিন্তু সে 'admin' না হয়, তবে তাকে /collection এ রিডাইরেক্ট করুন (শর্ত অনুযায়ী)
        if (!session || !session.user || session.user.role !== "admin") {
          return NextResponse.redirect(new URL("/collection", request.url));
        }
      } catch (err) {
        console.error("Middleware session verification error:", err);
        // লাইভে কোনো কারণে ইন্টারনাল ফেচ এরর হলে সরাসরি ব্লক না করে সেফ রিডাইরেক্ট
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // ইউজার যদি শুধু /collection এ যায়, তাহলে ওপরের কুকি চেক পার হওয়াই যথেষ্ট।
    // সাধারণ ইউজাররা সরাসরি পেজে অ্যাক্সেস পাবে।
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/collection/:path*",
  ],
};