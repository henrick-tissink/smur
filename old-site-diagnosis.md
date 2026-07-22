Found it. The old box is still alive and serving a complete copy of the site — that's what she's landing on.

*Root cause*

63.230.200.2 (a CenturyLink/legacy-Qwest host — the old cPanel/shared hosting) is still online and serving smur-world.com over HTTPS with its own valid Let's Encrypt cert:

https://63.230.200.2  (Host: smur-world.com)  →  HTTP 200, <title>smur-world.com</title>
cert: CN=smur-world.com, issuer=Let's Encrypt  ← valid, so no browser warning

Your apex and www are proxied through Cloudflare to the new Coolify box (46.225.140.174), so anyone resolving DNS fresh gets the new site. The "sometimes old version" happens because of stale DNS bypassing Cloudflare entirely:

- Before the migration, smur-world.com resolved directly to 63.230.200.2 (that host's own records — that's why the cPanel subdomains still point there).
- Any device / router / ISP resolver that cached that old A record keeps connecting straight to 63.230.200.2, skipping Cloudflare completely. Because the old box is still up and has a valid cert, she sees a fully working old site with no error — so it's invisible until you notice the content is stale.
- It's intermittent ("sometimes") because it depends on whose cache is stale and which network she's on.

So it's not random Cloudflare behavior and it's not the two-IP thing from before — it's the old origin refusing to die.
