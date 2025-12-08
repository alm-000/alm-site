const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function isListItemCandidate(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^[#>\-`]/.test(trimmed)) return false;
  if (trimmed.startsWith("---")) return false;
  if (trimmed.length > 80) return false;
  if (/[.!?:]/.test(trimmed)) return false;
  return true;
}

function enhanceLists(content) {
  const lines = content.split("\n");
  const out = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Try to detect a block of simple lines that should become a list
    if (line.trim() && !isListItemCandidate(line)) {
      // Look ahead for candidate block
      let j = i + 1;
      const items = [];

      while (j < lines.length) {
        const l = lines[j];
        if (!l.trim()) {
          j++;
          continue;
        }
        if (isListItemCandidate(l)) {
          items.push(l.trim());
          j++;
          continue;
        }
        break;
      }

      if (items.length >= 3) {
        // Keep current line as intro
        out.push(line);
        out.push("");
        items.forEach((item) => {
          out.push(`- ${item}`);
        });
        out.push("");
        i = j;
        continue;
      }
    }

    out.push(line);
    i++;
  }

  return out.join("\n");
}

function main() {
  const files = fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));

  files.forEach((file) => {
    const fullPath = path.join(BLOG_CONTENT_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);

    // Only touch blog-tagged posts (skip older handcrafted ones if needed)
    const tags = parsed.data && parsed.data.tags;
    if (!Array.isArray(tags) || !tags.includes("blog")) {
      return;
    }

    const enhancedBody = enhanceLists(parsed.content);
    const updated = matter.stringify(enhancedBody.trim() + "\n", parsed.data);
    fs.writeFileSync(fullPath, updated, "utf8");
    console.log(`Enhanced formatting for: ${path.relative(process.cwd(), fullPath)}`);
  });
}

if (require.main === module) {
  main();
}
