import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { BlogPostMeta } from "./blogData";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = BlogPostMeta & {
  /**
   * The compiled HTML content for the post body.
   */
  contentHtml: string;
};

type BlogPostFrontMatter = BlogPostMeta;

async function parseMarkdownFile(filePath: string): Promise<BlogPost> {
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const frontMatter = data as BlogPostFrontMatter;

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    ...frontMatter,
    contentHtml,
  };
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(BLOG_CONTENT_DIR, file));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = getMarkdownFiles();

  const posts = await Promise.all(files.map((file) => parseMarkdownFile(file)));

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseMarkdownFile(filePath);
}

export function getAllSlugs(): string[] {
  const files = getMarkdownFiles();

  return files.map((filePath) => path.basename(filePath, ".mdx"));
}


