import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth/session";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

export const config = {
  matcher: ["/dashboard/:path*", "/weeks/:path*", "/admin/:path*", "/login"],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const claims = token ? await verifySessionToken(token) : null;
  const { pathname } = req.nextUrl;

  const isLoginRoute = pathname === "/login";
  const isAdminRoute = pathname.startsWith("/admin");

  if (!claims && !isLoginRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (claims && isLoginRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (claims && isAdminRoute && claims.role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
