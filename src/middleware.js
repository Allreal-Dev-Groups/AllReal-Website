import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const passwordCookie = req.cookies.get("page_unlocked_admin")?.value;

  // Allow access if not the protected page
  if (!pathname.startsWith("/admin") || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // If user hasn't unlocked it yet, redirect to auth
  if (passwordCookie !== "true") {
    const redirectUrl = new URL("/auth?from=admin", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Protect only /secret and its subpaths
};
