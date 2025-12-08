const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function toMarkdown(html) {
  let t = html;

  // Normalise common wrappers
  t = t.replace(/<hr[^>]*>/gi, "\n\n---\n\n");

  // h2 / h3 headings with strong
  t = t.replace(/<h2[^>]*><strong>([\s\S]*?)<\/strong><\/h2>/gi, "\n\n## $1\n\n");
  t = t.replace(/<h3[^>]*><strong>([\s\S]*?)<\/strong><\/h3>/gi, "\n\n### $1\n\n");

  // h2 / h3 without strong
  t = t.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n\n");
  t = t.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n\n");

  // Paragraphs
  t = t.replace(/<p[^>]*>/gi, "\n\n");
  t = t.replace(/<\/p>/gi, "\n\n");

  // Strong/emphasis
  t = t.replace(/<strong>/gi, "**");
  t = t.replace(/<\/strong>/gi, "**");
  t = t.replace(/<em>/gi, "*");
  t = t.replace(/<\/em>/gi, "*");

  // Strip div and span wrappers completely
  t = t.replace(/<div[^>]*>/gi, "\n\n");
  t = t.replace(/<\/div>/gi, "\n\n");
  t = t.replace(/<span[^>]*>/gi, "");
  t = t.replace(/<\/span>/gi, "");

  // HTML entities
  t = t.replace(/&nbsp;/gi, " ");

  // Drop any remaining tags
  t = t.replace(/<[^>]+>/g, "");

  // Collapse excessive whitespace
  t = t.replace(/\r/g, "");
  t = t.replace(/\n{3,}/g, "\n\n");
  t = t.replace(/[ \t]{2,}/g, " ");

  return t.trim() + "\n";
}

function main() {
  const files = fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));

  files.forEach((file) => {
    const fullPath = path.join(BLOG_CONTENT_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);

    // Only touch files that clearly contain the Notion export HTML structure
    if (!/display:contents/.test(parsed.content) && !/<h2[^>]*>/.test(parsed.content)) {
      return;
    }

    const markdownBody = toMarkdown(parsed.content);
    const updated = matter.stringify(markdownBody, parsed.data);

    fs.writeFileSync(fullPath, updated, "utf8");
    console.log(`Normalised markdown for: ${path.relative(process.cwd(), fullPath)}`);
  });
}

if (require.main === module) {
  main();
}
