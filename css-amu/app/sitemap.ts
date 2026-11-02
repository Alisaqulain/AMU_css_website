import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteUrl } from "@/lib/site-seo";

const publicPaths = [
  "/",
  "/about",
  "/events",
  "/team",
  "/contact",
  "/membershipForm",
  "/certificate",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  return publicPaths.map((path) => ({
    url: path === "/" ? base : absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" || path === "/events" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/membershipForm" ? 0.9 : 0.7,
  }));
}
