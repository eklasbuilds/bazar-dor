import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;
  const isProtected = pathname.startsWith("/product") || pathname.startsWith("/profile");

  if (isProtected && !sessionCookie) {
    const signIn = request.nextUrl.clone();
    signIn.pathname = "/signin";
    signIn.searchParams.set("next", pathname);
    signIn.searchParams.set("protected", "1");
    return NextResponse.redirect(signIn);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
