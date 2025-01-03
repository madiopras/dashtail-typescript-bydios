import { NextResponse } from "next/server";

let defaultLocale = "id";
let locales = ["id", "en"];

// Get the preferred locale (defaulted to "id" always)
function getLocale(request: Request) {
  // Abaikan header Accept-Language, selalu kembalikan defaultLocale
  return defaultLocale;
}

export function middleware(request: any) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request); // Selalu "id"

    // Redirect ke URL dengan default locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    "/((?!api|assets|docs|.*\\..*|_next).*)",
  ],
};
