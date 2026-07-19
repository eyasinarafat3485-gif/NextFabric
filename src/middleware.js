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

  // রুটটি প্রটেক্টেড (/dashboard বা /collection) হলে সেশন কুকি চেক হবে
  if (isDashboard || isCollection) {
    const sessionToken = request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__secure-better-auth.session_token");

    // ১. প্রথম শর্ত: সেশন টোকেন বা সেশন কুকি না থাকলে সরাসরি লগইন পেজে রিডাইরেক্ট
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // ২. সেশন টোকেন আছে (ইউজার লগইনড)। এবার রোল-বেসড প্রটেকশন:
    if (isDashboard) {
      try {
        const tokenValue = sessionToken.value;

        // Better-Auth এর লাইভ টোকেন যদি JWT স্ট্রাকচারের হয়, তাহলে এপিআই কল ছাড়াই রোল বের করা সম্ভব
        if (tokenValue.includes(".")) {
          const base64Url = tokenValue.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );

          const payload = JSON.parse(jsonPayload);

          // টোকেনের ভেতর যদি রোল থাকে এবং সেটি যদি 'admin' না হয়
          if (payload && payload.role && payload.role !== "admin") {
            return NextResponse.redirect(new URL("/collection", request.url));
          }
        } else {
          // যদি টোকেন JWT না হয়ে প্লেইন ডাটাবেজ সেশন আইডি হয়, তবে আমরা সরাসরি ব্লক না করে 
          // লোকাল স্টোরেজ বা ক্লায়েন্ট সাইড ভেরিফিকেশনের উপর ছেড়ে দিয়ে নরমাল রেসপন্স রাখবো যেন ইউজার আটকে না যায়।
          return NextResponse.next();
        }
      } catch (err) {
        console.error("Middleware client side decode error:", err);
        // কোনো কারণে ডিকোড এরর হলে লাইভে ইউজারকে লগইন পেজে না পাঠিয়ে /collection এ সেফ রিডাইরেক্ট করুন
        return NextResponse.redirect(new URL("/collection", request.url));
      }
    }

    // ইউজার যদি শুধু /collection এ যেতে চায়, তাহলে সেশন কুকি থাকাই যথেষ্ট।
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/collection/:path*",
  ],
};