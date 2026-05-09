import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Routes that require authentication (matched WITHIN the [locale] segment)
const PROTECTED_PATTERNS: RegExp[] = [
  /^\/dashboard(\/.*)?$/,
  /^\/messages(\/.*)?$/,
  /^\/cv\/(builder|my)(\/.*)?$/,
  /^\/ads\/(new|edit|manage)(\/.*)?$/,
  /^\/jobs\/(post|applications|manage)(\/.*)?$/,
];

const ADMIN_PATTERNS: RegExp[] = [/^\/admin(\/.*)?$/];

const SESSION_COOKIE_NAME = "__session";

function stripLocale(pathname: string): string {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

function isProtected(pathname: string): boolean {
  return PROTECTED_PATTERNS.some((re) => re.test(pathname));
}

function isAdmin(pathname: string): boolean {
  return ADMIN_PATTERNS.some((re) => re.test(pathname));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Run i18n routing first — it normalises locale prefixes.
  const intlResponse = intlMiddleware(request);

  // 2) Auth gate: detect protected/admin routes regardless of locale prefix.
  const localeStripped = stripLocale(pathname);
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAuthed = Boolean(sessionCookie); // Full Firebase Admin verification is performed in API route handlers / server actions.

  if (isProtected(localeStripped) || isAdmin(localeStripped)) {
    if (!isAuthed) {
      const loginUrl = request.nextUrl.clone();
      const detectedLocale =
        routing.locales.find(
          (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
        ) ?? routing.defaultLocale;
      loginUrl.pathname = `/${detectedLocale}/login`;
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3) Forward security context headers, then return the i18n response.
  intlResponse.headers.set("x-pathname", pathname);
  intlResponse.headers.set("x-locale-stripped-pathname", localeStripped);
  return intlResponse;
}

export const config = {
  // Skip Next.js internals, API routes, and static assets.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|otf|map)).*)",
  ],
};
