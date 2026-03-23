import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin", "/admin/", "/account", "/account/", "/api/"],
      },
    ],
    sitemap: "https://doctorfamily.by/sitemap.xml",
  };
}
