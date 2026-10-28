import type { MetadataRoute } from "next";
import { APP_HOME_PATH } from "@/lib/site";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000").replace(/\/+$/, "");

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/schools", priority: 0.9 },
  { path: "/employers", priority: 0.9 },
  { path: "/partners", priority: 0.8 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/team", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: APP_HOME_PATH, priority: 0.7 },
  { path: "/waitlist", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${siteUrl}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
