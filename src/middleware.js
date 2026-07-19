import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isCollection = pathname.startsWith("/collection") || pathname.startsWith("/my-collection");

  // শর্ত ১: সুরক্ষিত রুট হলে প্রথমে ব্রাউজারে সেশন টোকেন আছে কিনা চেক করুন
  if (isDashboard || isCollection) {
    const sessionToken = request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__secure-better-auth.session_token");

    // টোকেন না থাকলে (লগইন করা না থাকলে) সরাসরি লগইন পেজে রিডাইরেক্ট
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // শর্ত ২: ইউজার লগইন করা আছে, কিন্তু সে যদি ড্যাশবোর্ডে (Admin-only) যেতে চায়
    if (isDashboard) {
      try {
        // Better-Auth সেশন ডেটা চেক করার জন্য রিকোয়েস্ট
        const sessionRes = await fetch(`${origin}/api/auth/get-session`, {
          headers: {
            // টোকেনটি সরাসরি Authorization হেডার বা কুকি হিসেবে পাস করা নিশ্চিত করা
            "Cookie": `${sessionToken.name}=${sessionToken.value}`,
          },
        });

        if (!sessionRes.ok) {
          return NextResponse.redirect(new URL("/login", request.url));
        }

        const session = await sessionRes.json();

        // ইউজার যদি লগইন করা থাকে কিন্তু সে 'admin' না হয়, তবে তাকে আটকে দিন
        if (!session || !session.user || session.user.role !== "admin") {
          // ড্যাশবোর্ডে অ্যাক্সেস নেই তাই তাকে হোমপেজে বা অন্য কোথাও পাঠানোই ভালো, 
          // তবে আপনার রিকোয়ারমেন্ট অনুযায়ী এখানে /login এ পাঠানো হলো।
          return NextResponse.redirect(new URL("/login", request.url));
        }
      } catch (err) {
        console.error("Middleware session verification error:", err);
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // ইউজার যদি ড্যাশবোর্ডে না গিয়ে শুধু /collection এ যায়, 
    // তাহলে টোকেন থাকাই যথেষ্ট। সে সরাসরি পেজে ঢুকে যাবে।
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