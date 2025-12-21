import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

// export { auth as middleware } from "@/auth";
export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  const isHomePage = pathname === "/";
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!session && isHomePage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/sign-in", "/sign-up"],
};
