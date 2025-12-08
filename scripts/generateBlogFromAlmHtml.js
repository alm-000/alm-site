const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const SOURCE_HTML = path.join(BLOG_CONTENT_DIR, "alm-blog.html");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const CARDS_DIR = path.join(PUBLIC_DIR, "assets", "images", "cards");
const WIDESCREEN_DIR = path.join(PUBLIC_DIR, "assets", "images", "widescreen");

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    fs.mkdirSync(BLOG_CONTENT_DIR, { recursive: true });
  }
}

function loadHtml() {
  if (!fs.existsSync(SOURCE_HTML)) {
    throw new Error(`Source HTML not found at ${SOURCE_HTML}`);
  }
  return fs.readFileSync(SOURCE_HTML, "utf8");
}

function getBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (match) return match[1];
  return html;
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function estimateReadingTimeMinutes(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.round(words / 220) || 1;
  return Math.max(2, minutes);
}

function generatePublishedAtDates(count) {
  const now = new Date();
  if (count <= 1) return [now];

  const dates = [];
  for (let i = 0; i < count; i++) {
    const offsetDays = Math.round((365 * i) / (count - 1));
    const d = new Date(now);
    d.setDate(d.getDate() - offsetDays);
    const utc = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 9, 0, 0, 0),
    );
    dates.push(utc);
  }
  return dates;
}

function loadImages() {
  const cardImages = fs.existsSync(CARDS_DIR)
    ? fs
        .readdirSync(CARDS_DIR)
        .filter((f) => f.toLowerCase().endsWith(".jpg"))
        .map((f) => `/assets/images/cards/${f}`)
    : [];

  const heroImages = fs.existsSync(WIDESCREEN_DIR)
    ? fs
        .readdirSync(WIDESCREEN_DIR)
        .filter((f) => f.toLowerCase().endsWith(".jpg"))
        .map((f) => `/assets/images/widescreen/${f}`)
    : [];

  return { cardImages, heroImages };
}

function extractArticles(bodyHtml) {
  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  const headings = [];
  let match;

  while ((match = h1Regex.exec(bodyHtml)) !== null) {
    const rawHeading = match[1];
    const titleText = stripTags(rawHeading);
    const start = match.index;
    const end = h1Regex.lastIndex;
    if (!titleText) continue;
    headings.push({ title: titleText, start, end });
  }

  const articles = [];

  for (let i = 0; i < headings.length; i++) {
    const current = headings[i];
    const next = headings[i + 1];
    const contentStart = current.end;
    const contentEnd = next ? next.start : bodyHtml.length;
    const rawSegment = bodyHtml.slice(contentStart, contentEnd).trim();

    const textContent = stripTags(rawSegment);

    // Skip headings that don't really have any content
    if (!textContent || textContent.length < 80) {
      continue;
    }

    articles.push({
      title: current.title,
      html: rawSegment,
      text: textContent,
    });
  }

  return articles;
}

function main() {
  ensureBlogDir();
  const html = loadHtml();
  const bodyHtml = getBody(html);
  const { cardImages, heroImages } = loadImages();

  if (!cardImages.length || !heroImages.length) {
    console.warn("Warning: No blog card/hero images found. Posts will be created without images.");
  }

  const articles = extractArticles(bodyHtml);

  if (!articles.length) {
    console.log("No articles detected in alm-blog.html body.");
    return;
  }

  const dates = generatePublishedAtDates(articles.length);

  articles.forEach((article, index) => {
    const slug = slugify(article.title);
    const targetPath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);

    // Don't overwrite existing posts
    if (fs.existsSync(targetPath)) {
      console.log(`Skipping existing blog post for slug: ${slug}`);
      return;
    }

    const description = article.text.split(/[.!?]/)[0]?.trim() || article.title;
    const readingTimeMinutes = estimateReadingTimeMinutes(article.text);
    const publishedAt = dates[index].toISOString();

    const cardImage = cardImages.length
      ? cardImages[index % cardImages.length]
      : undefined;
    const heroImage = heroImages.length
      ? heroImages[index % heroImages.length]
      : undefined;

    const frontMatter = {
      slug,
      title: article.title,
      description,
      publishedAt,
      tags: ["blog"],
      readingTimeMinutes,
      image: heroImage || cardImage,
      cardImage,
      heroImage,
    };

    const mdxBody = article.html.trim() + "\n";
    const mdx = matter.stringify(mdxBody, frontMatter);

    fs.writeFileSync(targetPath, mdx, "utf8");
    console.log(`Created blog post: ${path.relative(process.cwd(), targetPath)}`);
  });
}

if (require.main === module) {
  main();
}
