import { NextRequest, NextResponse } from "next/server";

import { AppRoutes } from "@/types/enums";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const reqUrl = request.nextUrl.pathname;

  const token = request
    ? request.cookies?.get("next-auth.session-token")
    : null;

  if (
    reqUrl.startsWith("/_next") ||
    reqUrl.startsWith("/api") ||
    reqUrl.startsWith("/static") ||
    PUBLIC_FILE.test(reqUrl)
  ) {
    return NextResponse.next();
  }

  if (token && reqUrl === AppRoutes.Default) {
    const clonedUrl = request.nextUrl.clone();

    clonedUrl.pathname = AppRoutes.Home;

    return NextResponse.redirect(clonedUrl);
  }

  if (
    !token &&
    (reqUrl.startsWith(AppRoutes.SignIn) || reqUrl.startsWith(AppRoutes.SignUp))
  ) {
    return NextResponse.next();
  }

  if (
    (reqUrl.includes(AppRoutes.SignIn) || reqUrl.includes(AppRoutes.SignUp)) &&
    token
  ) {
    return NextResponse.redirect(new URL(AppRoutes.Home, request.url));
  }

  if (
    !token &&
    !(reqUrl.includes(AppRoutes.SignIn) || reqUrl.includes(AppRoutes.SignUp))
  ) {
    return NextResponse.redirect(new URL(AppRoutes.SignIn, request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/movies/:path*",
    "/serials/:path*",
    "/profile",
    "/search/:path*",
    "/auth/sign-in",
    "/auth/sign-up",
  ],
};
