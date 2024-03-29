import { NextRequest, NextResponse } from "next/server";

import { AppRoutes } from "@/types/enums";

export function middleware(request: NextRequest) {
  const reqUrl = request.nextUrl.pathname;

  const token = request
    ? request.cookies?.get("next-auth.session-token")
    : null;

  if (reqUrl.startsWith("/_next")) return NextResponse.next();

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
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico|api/auth).*)"],
};
