import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/*
  Next 16 renamed Middleware → Proxy (same functionality). next-intl's locale
  proxy: detects the locale, rewrites the default (English) locale to the root,
  and redirects prefixed locales (/ro, /de).
*/
export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals, and files with an extension (assets).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
