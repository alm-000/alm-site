import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { WorkProject } from "./workData";

const WORK_CONTENT_DIR = path.join(process.cwd(), "content", "work");

const CARD_IMAGES_DIR = path.join(
  process.cwd(),
  "public",
  "assets",
  "images",
  "cards",
);

const cardImages: string[] = fs.existsSync(CARD_IMAGES_DIR)
  ? fs
      .readdirSync(CARD_IMAGES_DIR)
      .filter(
        (file) =>
          file.endsWith(".jpg") ||
          file.endsWith(".jpeg") ||
          file.endsWith(".png"),
      )
      .sort()
      .map((file) => `/assets/images/cards/${file}`)
  : [];

function getImageForProject(slug: string, existingImage?: string) {
  if (existingImage) {
    const relative = existingImage.startsWith("/")
      ? existingImage.slice(1)
      : existingImage;
    const existingPath = path.join(process.cwd(), "public", relative);

    if (fs.existsSync(existingPath)) {
      return existingImage;
    }
  }
  if (cardImages.length === 0) {
    return undefined;
  }

  const hash = Array.from(slug).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );

  const index = hash % cardImages.length;
  return cardImages[index];
}

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
  const image = getImageForProject(frontMatter.slug, frontMatter.image);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    ...frontMatter,
    image,
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

function getOrgOrder(project: WorkProject): number {
  const role = project.role.toLowerCase();
  const slug = project.slug.toLowerCase();

  if (role.includes("dansu") || slug.includes("dansu")) {
    return 1; // Dansu
  }
  if (role.includes("laced")) {
    return 2; // Laced
  }
  if (role.includes("personal projects")) {
    return 3; // Client / personal projects
  }
  if (role.includes("everynite")) {
    return 4; // Everynite
  }
  if (role.includes("exinity")) {
    return 5; // Exinity
  }
  if (role.includes("salary finance")) {
    return 6; // Salary Finance
  }
  if (role.includes("be group")) {
    return 7; // BE Group
  }
  if (role.includes("chillimint")) {
    return 8; // Chillimint
  }

  return 9; // Everything else at the end
}

export async function getAllProjects(): Promise<WorkProjectWithContent[]> {
  const files = getMarkdownFiles();

  const projects = await Promise.all(files.map((file) => parseMarkdownFile(file)));

  return projects.sort((a, b) => {
    const orderA = getOrgOrder(a);
    const orderB = getOrgOrder(b);

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.name.localeCompare(b.name);
  });
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



