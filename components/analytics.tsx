import Script from "next/script";

/*
  Google Analytics 4 loader.

  Dormant until a Measurement ID is configured (env NEXT_PUBLIC_GA_ID, or the
  constant is filled in), so it ships safely with nothing set — renders null.

  GDPR: uses Consent Mode v2 defaulting to "denied", so GA runs in cookieless
  (modeled) mode and drops NO cookies until a consent banner grants it via
  gtag('consent','update',{ analytics_storage:'granted' }). IP anonymised.
  This keeps it compliant for the EU (DE/RO) audience before the banner lands.
*/

// Falls back to the env var; a literal ID can be pasted here instead.
const GA_MEASUREMENT_ID = "";

export function resolveGaId(): string {
  return GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID || "";
}

/** The inline gtag bootstrap: Consent Mode v2 default-denied (cookieless
 *  until granted) + IP anonymisation, then config. Pure/string so it's
 *  unit-testable without next/script's async injection. */
export function gaInitScript(gaId: string): string {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());
gtag('config','${gaId}',{anonymize_ip:true});`;
}

export function Analytics() {
  const gaId = resolveGaId();
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {gaInitScript(gaId)}
      </Script>
    </>
  );
}
