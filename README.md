## Overview

This repo powers the personal site for **Alex Magee** – a small, statically‑generated site built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Content is split between:

- **Structured TypeScript config** in `src/lib` (navigation, home/about/work/contact copy, and work projects).
- **Markdown/MDX blog posts** in `content/blog`, parsed at build time.
- A local‑only **admin UI** at `/admin` that helps you edit content and generate JSON, but does **not** write to disk.

All pages are rendered statically and use standard Next.js features like route segments, `generateStaticParams`, and `generateMetadata`.

---

## Tech stack

- **Framework**: Next.js `15.1.6` (App Router, `src/app` directory, static generation).
- **Language**: TypeScript (`^5`).
- **React**: React `^19.0.0`, React DOM `^19.0.0`.
- **Styling**:
  - Tailwind CSS `^3.4.1` (configured in `tailwind.config.ts`).
  - Global styles in `src/app/globals.css`.
  - Custom CSS utility classes like `cv-shell`, `cv-tag`, and `bg-cv-*` for layout and brand styling.
- **Fonts**:
  - `Anton` from Google Fonts for display (`--font-display`).
  - Local `CothamSans.otf` in `public/assets/fonts` for body text (`--font-body`).
- **Content pipeline**:
  - `gray-matter` for reading front matter from MDX files.
  - `remark` + `remark-html` for compiling markdown content to HTML for rendering.
- **Tooling**:
  - ESLint `^9` + `eslint-config-next` for linting.
  - Tailwind + PostCSS for CSS processing.

---

## Important directories and files

- **App entry & layout**
  - `src/app/layout.tsx`: Root layout, global `<Header />` and `<Footer />`, metadata (Open Graph, Twitter), and font wiring.
  - `src/app/page.tsx`: Home page. Uses `homeCopy` and `workProjects` to render the brutalist hero, latest blog posts, and featured work.
  - `src/app/globals.css`: Global styles + Tailwind base layers.

- **Content & configuration**
  - `src/lib/siteContent.ts`: All site‑wide copy and structure, including:
    - `headerContent` (nav items, logo alt text).
    - `footerContent` (footer links).
    - `homeCopy` (hero copy, “What I do” bullets, labels, SEO metadata).
    - `aboutContent`, `workPageContent`, `contactPageContent`.
  - `src/lib/workData.ts`: Shared `WorkProject` TypeScript type; all work project content lives in `content/work`.
  - `src/lib/blogData.ts`: Shared `BlogPostMeta` TypeScript type and documentation; all real blog content lives in `content/blog`.
  - `src/components/HomeHero.tsx`: Dedicated homepage hero built in a brutalist, high‑contrast style. Pulls `heroName`, `heroTitleLine`, and `heroDescription` from `homeCopy`, and renders a tall portrait (from `/public/assets/images/alm_image_1.JPG`) alongside an ultra‑large name heading, a “PRODUCT | GROWTH | AUTOMATION” subheading, and a vertical `/ SKILL` list.

- **Blog**
  - `content/blog/*.mdx`: Source of truth for all blog posts. Each file is one article.
  - `src/lib/blog.ts`: File‑system based blog loader:
    - Reads MDX from `content/blog`.
    - Parses front matter into `BlogPostMeta`.
    - Compiles markdown body to `contentHtml` with Remark.
  - `src/app/blog/page.tsx`: Blog index page listing all posts.
  - `src/app/blog/[slug]/page.tsx`: Individual blog post page with `generateStaticParams` and `generateMetadata`.

- **Work**
  - `content/work/*.mdx`: Source of truth for all work projects. Each file is one project.
  - `src/lib/work.ts`: File‑system based work loader:
    - Reads MDX from `content/work`.
    - Parses front matter into `WorkProject`.
    - Compiles markdown body to `contentHtml` with Remark.
  - `src/app/work/page.tsx`: Work index page listing all projects.
  - `src/app/work/[slug]/page.tsx`: Individual work project page with `generateStaticParams` and `generateMetadata`.

- **Admin**
  - `src/app/admin/page.tsx`: Client‑side admin UI to experiment with content (home copy, blog posts, work projects). Uses `localStorage` for persistence and provides "Copy JSON" actions (both per‑item and for whole lists, for blog posts and work projects).

- **Other pages**
  - `src/app/about/page.tsx`, `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/app/contact/page.tsx` (and others): Use data from `siteContent.ts` and `workData.ts` to render static content.
  - `src/app/robots.ts`, `src/app/sitemap.ts`: Robots and sitemap configuration for SEO.

---

## How the blog works

### 1. Where blog content lives

- **Folder**: `content/blog`
- **Files**: One `.mdx` file per article, e.g.:
  - `shipping-faster-with-smaller-bets.mdx`
  - `ops-control-centers-for-founders.mdx`
  - `building-growth-systems-for-dtc-brands.mdx`

Each MDX file has two parts:

1. **Front matter** (YAML/gray‑matter) at the top.
2. **Markdown/MDX body** below it.

The front matter must match the `BlogPostMeta` shape from `src/lib/blogData.ts`:

- `slug: string`
- `title: string`
- `description: string`
- `publishedAt: string` (ISO date, e.g. `"2024-11-01T00:00:00.000Z"`)
- `updatedAt?: string` (optional ISO date)
- `tags: string[]`
- `readingTimeMinutes: number`
- `image?: string`
- `cardImage?: string`
- `heroImage?: string`

**Example MDX file** (simplified):

```mdx
---
slug: shipping-faster-with-smaller-bets
title: "Shipping faster with smaller bets"
description: "Why smaller scoped projects ship more often and with less drama."
publishedAt: "2024-11-01T00:00:00.000Z"
tags:
  - product
  - experiments
readingTimeMinutes: 7
image: "/assets/images/blog/smaller-bets.jpg"
cardImage: "/assets/images/blog/smaller-bets-card.jpg"
heroImage: "/assets/images/blog/smaller-bets-hero.jpg"
---

Your markdown or MDX content starts here. You can use headings, lists,
bold/italic text, and basic MDX components if you wire them up.
```

### 2. Build‑time blog pipeline

All blog pages are generated at build time using `src/lib/blog.ts`:

- **Content root**:
  - `BLOG_CONTENT_DIR = process.cwd() + "/content/blog"` (see `src/lib/blog.ts`).
- **File discovery**:
  - `getMarkdownFiles()` finds all `.mdx` files in `content/blog`.
- **Parsing each file** (`parseMarkdownFile` in `src/lib/blog.ts`):
  - Reads the file from disk with `fs.promises.readFile`.
  - Uses `gray-matter` to split **front matter** and **body**.
  - Casts front matter to `BlogPostFrontMatter` (which is `BlogPostMeta`).
  - Uses `remark().use(html)` to compile the body markdown to an HTML string.
  - Returns a `BlogPost` object: `{ ...frontMatter, contentHtml }`.

The exported helpers:

- `getAllPosts()`: Returns all posts, sorted by `publishedAt` descending.
- `getPostBySlug(slug)`: Loads one post by `slug` (returns `null` if missing).
- `getAllSlugs()`: Returns a list of all slugs for static route generation.

### 3. Routing and rendering

- **Blog index** – `src/app/blog/page.tsx`:
  - Calls `getAllPosts()` to get all posts.
  - Renders each post as a `Card` with:
    - `href: "/blog/" + post.slug`
    - `imageSrc: post.cardImage ?? post.image`
    - `meta`: formatted `publishedAt` + `readingTimeMinutes`.

- **Individual blog post** – `src/app/blog/[slug]/page.tsx`:
  - `generateStaticParams()` uses `getAllSlugs()` so Next.js can pre‑generate each route.
  - `generateMetadata()` uses `getPostBySlug(slug)` to set `<title>` and `<meta description>` based on the article.
  - The main component:
    - Calls `getPostBySlug(slug)`.
    - If no post is found, calls `notFound()` (404).
    - Formats the `publishedAt` date and reading time.
    - Shows `heroImage` (or falls back to `image`) using `next/image`.
    - Shows the `description` as the intro paragraph.
    - Renders the compiled article body with:

      ```tsx
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      ```

### 4. How images work

- **Paths in front matter** (`image`, `cardImage`, `heroImage`) are simple string paths.
- You typically point them at files under `public/assets/images/...`, for example:
  - `/assets/images/blog/ops-control.jpg`
  - `/assets/images/cards/ops-control-card.jpg`
- The `Home` page and `Card` component pick appropriate images:
  - On the home page and blog index, `imageSrc={post.cardImage ?? post.image}`.
  - On the article page, `heroImage ?? image` is used for the hero banner.

---

## How the admin page works (and its relationship to the blog)

### 1. Admin location and authentication

- Route: `/admin` → `src/app/admin/page.tsx`.
- It is a **client‑side React page** (`"use client"` on line 1).
- Auth is a **simple in‑memory check**, for local/dev use only:
  - Username: `alm`
  - Password: `Product101!`
- When login succeeds, it:
  - Sets `isAuthenticated` to `true`.
  - Stores `"alm-admin-authenticated" = "true"` in `localStorage` so you stay signed in.

> **Important**: This is not production‑grade auth. It is explicitly labeled as such in the UI. For a public production deployment, use proper authentication instead.

### 2. Storage model

The admin UI never writes to files or the repository. Instead, it:

- Uses **React state** to manage:
  - `homeCopy` (initialised from `src/lib/siteContent.ts`).
  - `blogPosts` (starts empty, or from `localStorage`).
  - `workProjects` (initialised from `src/lib/workData.ts`).
- Persists changes **only** to `localStorage` under the keys in `STORAGE_KEYS`:
  - `alm-admin-authenticated`
  - `alm-admin-blog-posts`
  - `alm-admin-work-projects`
  - `alm-admin-home-copy`
- Provides **“Save”** and **“Copy JSON”** buttons so you can:
  - Keep tweaks in your browser while iterating.
  - Copy ready‑to‑go JSON back into the `src/lib` files (or into MDX).

### 3. Tabs in the admin UI

The admin page has three tabs, controlled by `activeTab: "home" | "blog" | "work"`:

- **Home tab**
  - Lets you edit:
    - `homeCopy.heroName`, `heroTitleLine`, `heroDescription`, `heroTags`.
    - "What I do" section (title, description, bullets).
    - Section headings like `latestArticlesTitle`, `featuredWorkTitle`.
  - **Save actions**:
    - **Save home copy**: Writes JSON to `localStorage` under `alm-admin-home-copy`.
    - **Copy home JSON**: Uses the Clipboard API to copy the current `homeCopy` JSON.
  - To make changes permanent, paste the copied JSON into `src/lib/siteContent.ts` to update the exported `homeCopy` object.

- **Blog tab**
  - Maintains a list of `blogPosts` in local state that mirrors `BlogPostMeta` plus an optional `content` field.
  - **Add post**:
    - Appends a new object with default values, including:
      - `slug: "new-post"`
      - `publishedAt: new Date().toISOString()`
      - `readingTimeMinutes: 5`
  - For each post, you can edit:
    - Slug, title, description.
    - Published date (as ISO string) and reading time (minutes).
    - Tags (comma‑separated, turned into a `string[]`).
    - `image`, `cardImage`, `heroImage` paths.
    - A free‑form `content` field in a `<textarea>`, where you can draft HTML/markdown‑like article content.
  - **Save actions**:
    - **Save article**: Saves the `blogPosts` array to `localStorage` and updates the status message for that article.
    - **Copy article JSON**: Copies just that single article as formatted JSON to your clipboard. This is the easiest way to work **one article at a time** when converting to MDX.
    - **Save all blog posts**: Writes the full `blogPosts` array to `localStorage`.
    - **Copy blog JSON**: Copies the full `blogPosts` array as formatted JSON to the clipboard.
  - **How this relates to MDX**:
    - The code explicitly notes that blog posts are now managed as markdown files in `content/blog`.
    - The admin `blog` tab is a helper to:
      - Design post metadata (`slug`, `title`, `tags`, image paths, reading time).
      - Rough‑draft article body content.
      - Then you copy the JSON and manually translate it into MDX front matter + body in `content/blog/<slug>.mdx`.

- **Work tab**
  - Edits `workProjects` (slug, name, role, bullets, image path) in local state that mirrors the `WorkProject` type.
  - **Save actions**:
    - **Save project / Save all projects**: Persist to `localStorage`.
    - **Copy project JSON**: Copies just that single project as formatted JSON to your clipboard, for one‑project‑at‑a‑time editing.
    - **Copy work JSON**: Copies the full `workProjects` array to the clipboard.
  - Use this JSON as a reference when creating or updating MDX files in `content/work` instead of editing `src/lib/workData.ts` directly.

### 4. Typical workflow to create a new blog post using the admin

1. **Sign in** at `/admin` with the local credentials.
2. Switch to the **Blog** tab.
3. Click **“Add post”**.
4. Fill in:
   - Slug (e.g. `shipping-faster-with-smaller-bets`).
   - Title and description.
   - Published date (ISO string) and reading time (minutes).
   - Tags.
   - Optional `image`, `cardImage`, `heroImage` paths (pointing to `public/assets/images/...`).
   - Optionally draft the article body in the big textarea.
5. Click **“Save all blog posts”** (or **“Save article”** for one post) to save to `localStorage`.
6. Click **“Copy blog JSON”**.
7. In your editor, create a new file `content/blog/<slug>.mdx` and:
   - Convert the JSON object for that post into YAML front matter.
   - Paste or adapt your drafted article body under the `---` front matter block as markdown/MDX.
8. Run `npm run dev` and visit `/blog/<slug>` to verify the article renders correctly.

> **Note**: The admin page does **not** interact with the file system or MDX directly – you always finalize posts by editing files in `content/blog`.

---

## How the home page uses blog and work content

- **File**: `src/app/page.tsx`.
- **Hero**:
  - Implemented as a standalone `HomeHero` component (`src/components/HomeHero.tsx`) rendered above the main `PageLayout` content.
  - Uses `homeCopy.heroName`, `heroTitleLine`, and `heroDescription` for copy, and displays a tall portrait image with ultra‑large “ALEX MAGEE” typography, a `PRODUCT | GROWTH | AUTOMATION` subheading, and a vertical list of slash‑prefixed skills (e.g. `/ PRODUCT STRATEGY`, `/ AI & DATA`).
  - Layout is a two‑column, high‑contrast black‑and‑white hero: text on the left, image on the right, with generous whitespace and no rounded corners or pill tags.
- **Rest of the home content**:
  - "What I do" section title, description, and bullets.
  - Section headings and labels for "Latest articles" and "Featured work".
- **Blog on home**:
  - Calls `getAllPosts()`, then `latestPosts = allPosts.slice(0, 3)`.
  - If there are posts, renders three `Card`s linking to `/blog/[slug]`.
  - If there are no posts, shows `homeCopy.articlesComingSoonMessage`.
- **Work on home**:
  - Takes `workProjects.slice(0, 4)` for the featured grid.
  - Each `Card` links to `/work/[slug]` for a project detail page.

This means updates to MDX files in `content/blog` or to `workProjects` in `src/lib/workData.ts` will automatically flow through to the homepage.

---

## Running the project locally

From the project root (`/Users/alm/dev/alm-site`):

```bash
npm install
npm run dev
```

- The dev server will start (by default on `http://localhost:3000`).
- Visit:
  - `/` – Home page.
  - `/blog` – Blog index.
  - `/blog/<slug>` – Individual article.
  - `/work` and `/work/<slug>` – Work listing and detail pages.
  - `/about`, `/contact` – Static pages.
  - `/admin` – Local admin UI for content experimentation.

To build and run the production bundle:

```bash
npm run build
npm start
```

---

## How to add or update content

### 1. Update navigation, footer, and static page copy

- **File**: `src/lib/siteContent.ts`
- Edit:
  - `headerContent.navItems` to change nav links.
  - `headerContent.logoAlt` for logo alt text.
  - `footerContent.links` to change footer links.
  - `homeCopy` for all homepage copy and labels.
  - `aboutContent`, `workPageContent`, `contactPageContent` for the respective pages.

Optionally, use the **Admin → Home** tab to prototype changes, then copy JSON back into `homeCopy` in this file.

### 2. Add a new blog post

1. Create a new file under `content/blog` with a `.mdx` extension, named after the slug you want:
   - Example: `content/blog/ops-control-centers-for-founders.mdx`.
2. Add front matter matching `BlogPostMeta` plus your markdown content.
3. Optionally, use the **Admin → Blog** tab to help you design the metadata and draft content, then convert that JSON into MDX.
4. Restart the dev server if needed so Next.js picks up new files.
5. Check:
   - `/blog` – your post should appear in the index.
   - `/blog/<slug>` – your post should render with the hero image and body.

### 3. Add or edit work projects

- **Source of truth**: `src/lib/workData.ts`.
- Each project looks like:

```ts
{
  slug: "dansu-growth-automation",
  name: "Dansu – towel brand growth & automation",
  role: "Founder / Head of Growth & Ops",
  bullets: [...],
  image: "/assets/images/work/dansu.jpg",
}
```

- Update existing projects or add new ones to the `workProjects` array.
- Optionally, use the **Admin → Work** tab to experiment, then copy the JSON back into `workData.ts`.

---

## Notes and limitations

- **Admin UI is local‑only**:
  - It does not store anything on the server, in a database, or in MDX automatically.
  - It only uses `localStorage` in your browser, so changes stay on the machine where you made them.
- **Auth is not secure**:
  - The `/admin` credentials are hard‑coded and not suitable for public production.
- **Blog body rendering**:
  - The blog pipeline compiles markdown to an HTML string and renders it with `dangerouslySetInnerHTML`.
  - This is fine for trusted content in this personal site, but be cautious if you ever accept untrusted user input.

---

## Keeping this README up to date

Any time code, routes, or the content model change (especially anything in `src/app`, `src/lib`, or `content/blog`), this README should be updated to reflect:

- New or renamed routes.
- Changes to how blog content, work projects, or home/about/contact copy are structured.
- Any changes to the admin UI workflow or storage model.

When I (the AI assistant) help you modify this project, I will also update this README to keep it in sync with the latest implementation.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
