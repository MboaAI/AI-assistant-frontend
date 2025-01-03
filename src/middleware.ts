// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const supportedLocales = ["en", "fr"];
  const defaultLocale = "fr";

  const pathname = request.nextUrl.pathname;
  const locale = pathname.split("/")[1];

  if (!supportedLocales.includes(locale)) {
    const url = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
