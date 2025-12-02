import type { MetadataRoute } from "next";
import { blogPosts } from "../lib/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://alex-magee.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/work",
    "/about",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
  }));

  return [...staticRoutes, ...blogRoutes];
}


