import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n-config';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    const locales = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    const defaultLocale = i18n.defaultLocale;
    return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|images|favicon.ico|logo.png).*)",
    ],
}; 