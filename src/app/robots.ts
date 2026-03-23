import type { MetadataRoute } from "next";

const DEFAULT_SITE_URL = "https://doctorfamily.by";
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXTAUTH_URL ??
  DEFAULT_SITE_URL;

const { origin: SITE_ORIGIN, host: SITE_HOST } = (() => {
  try {
    const parsed = new URL(RAW_SITE_URL);
    return {
      origin: parsed.origin.replace(/\/+$/, ""),
      host: parsed.host,
    };
  } catch {
    const fallback = new URL(DEFAULT_SITE_URL);
    return {
      origin: fallback.origin,
      host: fallback.host,
    };
  }
})();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    host: SITE_HOST,
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
