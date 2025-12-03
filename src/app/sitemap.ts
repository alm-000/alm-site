import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const blogPosts = await getAllPosts();

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
  }));

  return [...staticRoutes, ...blogRoutes];
}

