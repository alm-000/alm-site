const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const WORK_DIR = path.join(process.cwd(), "content", "work");
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getWorkFiles() {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .sort();
}

function estimateReadingTimeMinutes(content) {
  // Strip code blocks and markdown syntax for a rough word count
  const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, " ");
  const plain = withoutCodeBlocks.replace(/[>#*_`-]/g, " ");
  const words = plain.split(/\s+/).filter(Boolean).length;
  const minutes = Math.round(words / 220) || 1;
  return Math.max(2, minutes);
}

function generatePublishedAtDates(count) {
  const now = new Date();
  const dates = [];

  if (count <= 1) {
    dates.push(now);
    return dates;
  }

  for (let i = 0; i < count; i++) {
    const offsetDays = Math.round((365 * i) / (count - 1));
    const d = new Date(now);
    d.setDate(d.getDate() - offsetDays);
    // Normalise to 09:00 UTC
    const utc = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 9, 0, 0, 0),
    );
    dates.push(utc);
  }

  return dates;
}

function main() {
  ensureDir(BLOG_DIR);

  const files = getWorkFiles();
  if (!files.length) {
    console.log("No work MDX files found.");
    return;
  }

  const dates = generatePublishedAtDates(files.length);

  files.forEach((file, index) => {
    const workPath = path.join(WORK_DIR, file);
    const raw = fs.readFileSync(workPath, "utf8");
    const { data, content } = matter(raw);

    const slug = data.slug || path.basename(file, ".mdx");
    const blogPath = path.join(BLOG_DIR, `${slug}.mdx`);

    // Don't overwrite existing blog posts
    if (fs.existsSync(blogPath)) {
      console.log(`Skipping existing blog post for slug: ${slug}`);
      return;
    }

    const title = data.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const descriptionFromBullets = Array.isArray(data.bullets) && data.bullets.length > 0
      ? String(data.bullets[0])
      : "";

    let description = descriptionFromBullets.trim();
    if (!description) {
      const firstSentence = content
        .split(/\n+/)
        .join(" ")
        .split(".")
        .map((s) => s.trim())
        .filter(Boolean)[0];
      description = firstSentence || title;
    }

    const tags = Array.isArray(data.skills) && data.skills.length
      ? data.skills.map((s) => String(s))
      : ["projects"];

    const readingTimeMinutes = estimateReadingTimeMinutes(content);
    const publishedAt = dates[index].toISOString();

    const frontMatter = {
      slug,
      title,
      description,
      publishedAt,
      tags,
      readingTimeMinutes,
    };

    const blogMdx = matter.stringify(content.trimStart(), frontMatter);

    fs.writeFileSync(blogPath, blogMdx, "utf8");
    console.log(`Created blog post: ${path.relative(process.cwd(), blogPath)}`);
  });
}

if (require.main === module) {
  main();
}
