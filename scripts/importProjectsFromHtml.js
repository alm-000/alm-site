// Quick one-off script to convert the alm_projects.html export
// into individual MDX work project files under content/work.
//
// Usage (from project root):
//   node scripts/importProjectsFromHtml.js
//
// This is intentionally dependency-free and uses simple string parsing
// based on the consistent "Overview / What I Delivered / Impact / Skills used"
// pattern in the HTML file.

/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const HTML_PATH = path.join(ROOT_DIR, "content", "blog", "alm_projects.html");
const OUTPUT_DIR = path.join(ROOT_DIR, "content", "work");

function stripTags(html) {
  const withoutTags = html.replace(/<[^>]+>/g, "");
  return decodeEntities(withoutTags).trim();
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function escapeYamlString(value) {
  return value.replace(/"/g, '\\"');
}

function main() {
  if (!fs.existsSync(HTML_PATH)) {
    console.error(`HTML file not found at ${HTML_PATH}`);
    process.exit(1);
  }

  const html = fs.readFileSync(HTML_PATH, "utf8");

  const bodyMatch = html.match(
    /<div class="page-body">([\s\S]*?)<\/div>\s*<\/article>/,
  );
  const bodyHtml = bodyMatch ? bodyMatch[1] : html;

  const divRegex =
    /<div style="display:contents"[^>]*>([\s\S]*?)<\/div>/g;

  /** @type {{ type: 'h1' | 'h3' | 'p' | 'hr'; text?: string }[]} */
  const nodes = [];
  let match;

  while ((match = divRegex.exec(bodyHtml))) {
    const inner = match[1].trim();
    if (!inner) continue;

    if (inner.startsWith("<h1")) {
      nodes.push({ type: "h1", text: stripTags(inner) });
    } else if (inner.startsWith("<h3")) {
      nodes.push({ type: "h3", text: stripTags(inner) });
    } else if (inner.startsWith("<p")) {
      nodes.push({ type: "p", text: stripTags(inner) });
    } else if (inner.startsWith("<hr")) {
      nodes.push({ type: "hr" });
    }
  }

  /** Org name -> role label for front matter */
  const orgRoles = {
    DANSU: "Founder / Head of Growth & Ops, Dansu",
    LACED: "Product & Growth, Laced",
    EXINITY: "Product Lead, Exinity",
    "SALARY FINANCE": "Product Manager, Salary Finance",
    "BE GROUP": "Product & CX Consultant, BE Group",
    CHILLIMINT: "Product & CX Consultant, Chillimint",
    EVERYNITE: "Founder, Everynite",
    "PERSONAL PROJECTS": "Founder / Builder, Personal projects",
  };

  /** @type {Array<{
   * slug: string;
   * title: string;
   * org: string;
   * role: string;
   * overview: string;
   * delivered: string;
   * impact: string;
   * skills: string[];
   * bullets: string[];
   * }>} */
  const projects = [];

  let currentOrg = "";

  const isOrgHeading = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    const upper = trimmed.toUpperCase();
    if (upper !== trimmed) return false;
    if (!/[A-Z]/.test(trimmed)) return false;
    if (trimmed.includes("MASTER PROJECT LIST")) return false;
    return true;
  };

  const findNextParagraphText = (startIndex) => {
    for (let i = startIndex; i < nodes.length; i++) {
      if (nodes[i].type === "p" && nodes[i].text) {
        return nodes[i].text.trim();
      }
    }
    return "";
  };

  const findIndexByPrefix = (startIndex, prefix) => {
    for (let i = startIndex; i < nodes.length; i++) {
      if (nodes[i].type === "p" && nodes[i].text) {
        const t = nodes[i].text.trim();
        if (t.startsWith(prefix)) {
          return i;
        }
      }
    }
    return -1;
  };

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if ((node.type === "h1" || node.type === "h3") && node.text) {
      const text = node.text.trim();
      if (isOrgHeading(text)) {
        currentOrg = text;
        continue;
      }
    }

    if (
      node.type === "p" &&
      node.text &&
      node.text.trim().startsWith("Overview")
    ) {
      const titleNode = nodes[i - 1];
      if (
        !titleNode ||
        (titleNode.type !== "h1" && titleNode.type !== "h3") ||
        !titleNode.text
      ) {
        continue;
      }

      const title = titleNode.text.trim();

      const overview = findNextParagraphText(i + 1);

      const deliveredIndex = findIndexByPrefix(i + 1, "What I Delivered");
      const delivered =
        deliveredIndex !== -1
          ? findNextParagraphText(deliveredIndex + 1)
          : "";

      const impactIndex = findIndexByPrefix(i + 1, "Impact");
      const impact =
        impactIndex !== -1
          ? findNextParagraphText(impactIndex + 1)
          : "";

      const skillsIndex = findIndexByPrefix(i + 1, "Skills used");
      let skills = [];
      if (skillsIndex !== -1 && nodes[skillsIndex].text) {
        const skillsText = nodes[skillsIndex].text.trim();
        const m = skillsText.match(/Skills used\s*:\s*(.*)/i);
        if (m && m[1]) {
          skills = m[1]
            .replace(/\.$/, "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }

      const bullets = [overview, delivered, impact].filter(Boolean);

      const org = currentOrg || "OTHER";
      const role = orgRoles[org] || org;

      let baseSlug = slugify(title);
      if (!baseSlug) {
        baseSlug = slugify(`${org}-${projects.length + 1}`);
      }

      let slug = baseSlug;
      let counter = 2;
      while (projects.some((p) => p.slug === slug)) {
        slug = `${baseSlug}-${counter++}`;
      }

      projects.push({
        slug,
        title,
        org,
        role,
        overview,
        delivered,
        impact,
        skills,
        bullets,
      });
    }
  }

  if (!projects.length) {
    console.error("No projects parsed from HTML – script did not find any.");
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let written = 0;
  let skipped = 0;

  for (const project of projects) {
    const frontMatterLines = [];
    frontMatterLines.push("---");
    frontMatterLines.push(`slug: ${project.slug}`);
    frontMatterLines.push(`name: "${escapeYamlString(project.title)}"`);
    frontMatterLines.push(`role: "${escapeYamlString(project.role)}"`);
    frontMatterLines.push("bullets:");
    for (const bullet of project.bullets) {
      frontMatterLines.push(
        `  - "${escapeYamlString(bullet)}"`,
      );
    }
    if (project.skills && project.skills.length > 0) {
      frontMatterLines.push("skills:");
      for (const skill of project.skills) {
        frontMatterLines.push(
          `  - "${escapeYamlString(skill)}"`,
        );
      }
    } else {
      frontMatterLines.push("skills: []");
    }
    frontMatterLines.push("---");

    const bodyLines = [];
    if (project.overview) {
      bodyLines.push("");
      bodyLines.push("## Overview");
      bodyLines.push("");
      bodyLines.push(project.overview);
    }
    if (project.delivered) {
      bodyLines.push("");
      bodyLines.push("## What I Delivered");
      bodyLines.push("");
      bodyLines.push(project.delivered);
    }
    if (project.impact) {
      bodyLines.push("");
      bodyLines.push("## Impact");
      bodyLines.push("");
      bodyLines.push(project.impact);
    }
    bodyLines.push("");

    const mdxContent = `${frontMatterLines.join("\n")}\n${bodyLines.join(
      "\n",
    )}`;

    const outPath = path.join(OUTPUT_DIR, `${project.slug}.mdx`);
    if (fs.existsSync(outPath)) {
      console.log(`Skipping existing file: ${outPath}`);
      skipped++;
      continue;
    }

    fs.writeFileSync(outPath, mdxContent, "utf8");
    written++;
  }

  console.log(
    `Done. Parsed ${projects.length} projects, wrote ${written}, skipped ${skipped} (already existed).`,
  );
}

main();


