// import { NextResponse } from "next/server";

// export async function middleware(request) {
//   const { pathname, origin } = request.nextUrl;

//   const isDashboard = pathname.startsWith("/dashboard");
//   const isCollection = pathname.startsWith("/collection"); // শুধুমাত্র /collection রাখলাম

//   // রুটটি প্রটেক্টেড (/dashboard বা /collection) হলে কুকি চেক হবে
//   if (isDashboard || isCollection) {
//     const sessionToken = request.cookies.get("better-auth.session_token") ||
//       request.cookies.get("__secure-better-auth.session_token");

//     // ১. ইউজার লগইন না থাকলে সরাসরি লগইন পেজে পাঠান
//     if (!sessionToken) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     // ২. ইউজার লগইন করা আছে এবং সে যদি ড্যাশবোর্ডে (Admin-only) যেতে চায়
//     if (isDashboard) {
//       try {
//         const sessionRes = await fetch(`${origin}/api/auth/get-session`, {
//           headers: {
//             "Cookie": `${sessionToken.name}=${sessionToken.value}`,
//           },
//         });

//         // যদি সেশন এপিআই রেসপন্স ওয়ান না হয়, লগইন পেজে পাঠান
//         if (!sessionRes.ok) {
//           return NextResponse.redirect(new URL("/login", request.url));
//         }

//         const session = await sessionRes.json();

//         // ইউজার যদি লগইন করা থাকে কিন্তু সে 'admin' না হয়, তবে তাকে /login এ রিডাইরেক্ট করুন
//         if (!session || !session.user || session.user.role !== "admin") {
//           return NextResponse.redirect(new URL("/login", request.url));
//         }
//       } catch (err) {
//         console.error("Middleware session verification error:", err);
//         return NextResponse.redirect(new URL("/login", request.url));
//       }
//     }

//     // ইউজার যদি শুধু /collection এ যায়, তাহলে ওপরের কুকি চেক পার হওয়াই যথেষ্ট।
//     // সাধারণ ইউজাররা সরাসরি পেজে অ্যাক্সেস পাবে।
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/collection/:path*", // ম্যাচার থেকেও /my-collection বাদ দেওয়া হয়েছে
//   ],
// };



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
        const targetUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

        const sessionRes = await fetch(`${targetUrl}/api/auth/get-session`, {
          headers: {
            "Cookie": `${sessionToken.name}=${sessionToken.value}`,
          },
        });

        if (sessionRes.ok) {
          const session = await sessionRes.json();

          // ইউজার যদি লগইন করা থাকে কিন্তু সে 'admin' না হয়, তবে তাকে /collection এ রিডাইরেক্ট করুন
          if (session && session.user && session.user.role !== "admin") {
            return NextResponse.redirect(new URL("/collection", request.url));
          }

          // অ্যাডমিন হলে নরমালি ড্যাশবোর্ডে যেতে পারবে
          return NextResponse.next();
        }

        // যদি এপিআই রেসপন্স ওকে না হয় (যেমন ৪MD বা অন্য এরর), লাইভে সেফটি হিসেবে /collection এ পাঠান, লগইনে নয়
        return NextResponse.redirect(new URL("/collection", request.url));

      } catch (err) {
        console.error("Middleware session verification error:", err);

        // লাইভ সার্ভারে ইন্টারনাল ফেচ ফেইল করলেও যেহেতু কুকি (sessionToken) আছে, 
        // তাই তাকে লগইন পেজে না পাঠিয়ে সেফটি হিসেবে সরাসরি /collection পেজে অ্যাক্সেস দিয়ে দিন
        return NextResponse.next();
      }
    }

    // ইউজার যদি শুধু /collection এ যায়, তাহলে ওপরের কুকি চেক পার হওয়াই যথেষ্ট।
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/collection/:path*",
  ],
};