export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTimeMinutes: number;
  image?: string;
  /**
   * Optional image for cards (blog index, homepage, etc.).
   * If not provided, fall back to `image`.
   */
  cardImage?: string;
  /**
   * Optional widescreen/hero image for the article page.
   * If not provided, fall back to `image`.
   */
  heroImage?: string;
};

/**
 * This file now only exports shared types for blog posts.
 * All blog content is stored as MDX files under `content/blog`.
 */
