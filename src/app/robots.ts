import type { MetadataRoute } from "next";

const SITE_URL = (process.env.SITE_URL || "https://doctorfamily.by").replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin", "/account", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
