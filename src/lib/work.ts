import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { WorkProject } from "./workData";

const WORK_CONTENT_DIR = path.join(process.cwd(), "content", "work");

export type WorkProjectWithContent = WorkProject & {
  /**
   * The compiled HTML content for the project body.
   */
  contentHtml: string;
};

type WorkProjectFrontMatter = WorkProject;

async function parseMarkdownFile(filePath: string): Promise<WorkProjectWithContent> {
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const frontMatter = data as WorkProjectFrontMatter;

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    ...frontMatter,
    contentHtml,
  };
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(WORK_CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(WORK_CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(WORK_CONTENT_DIR, file));
}

export async function getAllProjects(): Promise<WorkProjectWithContent[]> {
  const files = getMarkdownFiles();

  const projects = await Promise.all(files.map((file) => parseMarkdownFile(file)));

  return projects;
}

export async function getProjectBySlug(
  slug: string,
): Promise<WorkProjectWithContent | null> {
  const filePath = path.join(WORK_CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseMarkdownFile(filePath);
}

export function getAllSlugs(): string[] {
  const files = getMarkdownFiles();

  return files.map((filePath) => path.basename(filePath, ".mdx"));
}



