import { NextRequest, NextResponse } from "next/server";

import { AppRoutes } from "@/types/enums";

export function middleware(request: NextRequest) {
  const reqUrl = request.nextUrl.pathname;

  const token = request
    ? request.cookies?.get("next-auth.session-token")
    : null;

  if (reqUrl === AppRoutes.Default) {
    const clonedUrl = request.nextUrl.clone();

    clonedUrl.pathname = AppRoutes.Movies;

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
    return NextResponse.redirect(new URL(AppRoutes.Movies, request.url));
  }

  if (
    !token &&
    !(reqUrl.includes(AppRoutes.SignIn) || reqUrl.includes(AppRoutes.SignUp))
  ) {
    return NextResponse.redirect(new URL(AppRoutes.SignIn, request.url));
  }
}

export const config = {
  matcher: ["/", "/((?!_next|api/auth).*)(.+)"],
};
