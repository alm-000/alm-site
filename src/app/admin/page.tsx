"use client";

import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import SectionHeader from "../../components/SectionHeader";
import type { BlogPostMeta } from "../../lib/blogData";
import type { WorkProject } from "../../lib/workData";
import { homeCopy as initialHomeCopy, type HomeCopy } from "../../lib/siteContent";

type AdminBlogPost = BlogPostMeta & {
  /**
   * Optional HTML or markdown-like content for the article body.
   * This is only used locally in the admin UI and is not persisted
   * to the markdown files.
   */
  content?: string;
};

type AdminTab = "home" | "blog" | "work";

const STORAGE_KEYS = {
  auth: "alm-admin-authenticated",
  blog: "alm-admin-blog-posts",
  work: "alm-admin-work-projects",
  home: "alm-admin-home-copy",
} as const;

function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function formatTags(tags: string[]): string {
  return tags.join(", ");
}

function parseBullets(value: string): string[] {
  return value
    .split("\n")
    .map((bullet) => bullet.trim())
    .filter(Boolean);
}

function formatBullets(bullets: string[]): string {
  return bullets.join("\n");
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const [homeCopy, setHomeCopy] = useState<HomeCopy>({ ...initialHomeCopy });
  const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>(() => []);
  const [workProjects, setWorkProjects] = useState<WorkProject[]>(() => []);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const authed = window.localStorage.getItem(STORAGE_KEYS.auth);
      if (authed === "true") {
        setIsAuthenticated(true);
      }

      const storedHome = window.localStorage.getItem(STORAGE_KEYS.home);
      if (storedHome) {
        setHomeCopy(JSON.parse(storedHome));
      }

      const storedBlog = window.localStorage.getItem(STORAGE_KEYS.blog);
      if (storedBlog) {
        setBlogPosts(JSON.parse(storedBlog));
      }

      const storedWork = window.localStorage.getItem(STORAGE_KEYS.work);
      if (storedWork) {
        setWorkProjects(JSON.parse(storedWork));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  function handleLogout() {
    setIsAuthenticated(false);
    setAuthUsername("");
    setAuthPassword("");
    setAuthError(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEYS.auth);
    }
  }

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    if (authUsername === "alm" && authPassword === "Product101!") {
      setIsAuthenticated(true);
      setAuthError(null);
      setAuthPassword("");
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEYS.auth, "true");
      }
      setStatusMessage("Signed in to admin.");
    } else {
      setAuthError("Invalid credentials.");
    }
  }

  function saveHomeCopy() {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEYS.home, JSON.stringify(homeCopy));
      setStatusMessage("Home copy saved locally.");
    } catch {
      setStatusMessage("Unable to save home copy. Check storage settings.");
    }
  }

  function saveBlogPosts() {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEYS.blog, JSON.stringify(blogPosts));
      setStatusMessage("Blog posts saved locally.");
    } catch {
      setStatusMessage("Unable to save blog posts. Check storage settings.");
    }
  }

  function saveWorkProjects() {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.work,
        JSON.stringify(workProjects),
      );
      setStatusMessage("Work projects saved locally.");
    } catch {
      setStatusMessage("Unable to save work projects. Check storage settings.");
    }
  }

  async function copyBlogJson() {
    const data = JSON.stringify(blogPosts, null, 2);
    try {
      await navigator.clipboard.writeText(data);
      setStatusMessage("Blog JSON copied to clipboard.");
    } catch {
      setStatusMessage("Unable to copy blog JSON. Please select and copy manually.");
    }
  }

  async function copyWorkJson() {
    const data = JSON.stringify(workProjects, null, 2);
    try {
      await navigator.clipboard.writeText(data);
      setStatusMessage("Work JSON copied to clipboard.");
    } catch {
      setStatusMessage("Unable to copy work JSON. Please select and copy manually.");
    }
  }

  if (!isAuthenticated) {
    return (
      <main>
        <PageLayout className="py-16 flex justify-center">
          <div className="w-full max-w-sm space-y-6 rounded-xl border border-cv-border bg-cv-panel p-6">
            <SectionHeader
              as="h1"
              title="Admin sign in"
              description="Enter your admin credentials to manage site content."
            />
            <form className="space-y-4" onSubmit={handleLogin}>
              <label className="space-y-1 block">
                <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                  Username
                </span>
                <input
                  type="text"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                />
              </label>
              <label className="space-y-1 block">
                <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                  Password
                </span>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                />
              </label>
              {authError ? (
                <p className="text-[11px] text-red-600">{authError}</p>
              ) : null}
              <button
                type="submit"
                className="w-full rounded-md border border-cv-border bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-cv-text hover:bg-cv-panel"
              >
                Sign in
              </button>
            </form>
            <p className="text-[11px] text-cv-muted">
              For production deployments, use a proper authentication solution
              instead of this simple in-app check.
            </p>
          </div>
        </PageLayout>
      </main>
    );
  }

  return (
    <main>
      <PageLayout className="py-12 space-y-10">
        <div className="flex items-center justify-between gap-4">
          <SectionHeader
            as="h1"
            title="Admin"
            description="Edit the content used across the site. Changes are saved locally in your browser; copy JSON into src/lib files to make them permanent."
          />
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-cv-border bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-cv-text hover:bg-cv-panel"
          >
            Sign out
          </button>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-cv-border pb-1 text-xs font-medium tracking-wide text-cv-muted">
          {[
            { id: "home" as AdminTab, label: "Home" },
            { id: "blog" as AdminTab, label: "Blog" },
            { id: "work" as AdminTab, label: "Work" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-t-md border-b-2 px-3 py-1 ${
                activeTab === tab.id
                  ? "border-cv-text text-cv-text"
                  : "border-transparent hover:border-cv-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {statusMessage ? (
          <div className="rounded-md border border-cv-border bg-cv-panel px-4 py-3 text-xs text-cv-muted">
            {statusMessage}
          </div>
        ) : null}

        {activeTab === "home" && (
          <section aria-labelledby="home-admin-heading" className="space-y-4">
            <SectionHeader
              as="h2"
              title="Home page copy"
              description="Edit the main copy used on the home page hero and sections."
            />

            <div className="space-y-4 rounded-md border border-cv-border bg-cv-panel p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                    Name
                  </span>
                  <input
                    type="text"
                    value={homeCopy.heroName}
                    onChange={(e) =>
                      setHomeCopy((prev) => ({
                        ...prev,
                        heroName: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                    Title line
                  </span>
                  <input
                    type="text"
                    value={homeCopy.heroTitleLine}
                    onChange={(e) =>
                      setHomeCopy((prev) => ({
                        ...prev,
                        heroTitleLine: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                  />
                </label>
              </div>

              <label className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                  Hero description
                </span>
                <textarea
                  value={homeCopy.heroDescription}
                  onChange={(e) =>
                    setHomeCopy((prev) => ({
                      ...prev,
                      heroDescription: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                />
              </label>

              <label className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                  Hero tags (comma-separated)
                </span>
                <input
                  type="text"
                  value={homeCopy.heroTags.join(", ")}
                  onChange={(e) =>
                    setHomeCopy((prev) => ({
                      ...prev,
                      heroTags: parseTags(e.target.value),
                    }))
                  }
                  className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                />
              </label>
            </div>

            <div className="space-y-4 rounded-md border border-cv-border bg-cv-panel p-4">
              <SectionHeader as="h3" title="What I do section" />

              <label className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                  Section title
                </span>
                <input
                  type="text"
                  value={homeCopy.whatIDoTitle}
                  onChange={(e) =>
                    setHomeCopy((prev) => ({
                      ...prev,
                      whatIDoTitle: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                />
              </label>

              <label className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                  Section description
                </span>
                <textarea
                  value={homeCopy.whatIDoDescription}
                  onChange={(e) =>
                    setHomeCopy((prev) => ({
                      ...prev,
                      whatIDoDescription: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                />
              </label>

              <label className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                  Bullets (one per line)
                </span>
                <textarea
                  value={formatBullets(homeCopy.whatIDoBullets)}
                  onChange={(e) =>
                    setHomeCopy((prev) => ({
                      ...prev,
                      whatIDoBullets: parseBullets(e.target.value),
                    }))
                  }
                  rows={4}
                  className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                />
              </label>
            </div>

            <div className="space-y-4 rounded-md border border-cv-border bg-cv-panel p-4">
              <SectionHeader as="h3" title="Section headings" />

              <label className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                  Latest articles heading
                </span>
                <input
                  type="text"
                  value={homeCopy.latestArticlesTitle}
                  onChange={(e) =>
                    setHomeCopy((prev) => ({
                      ...prev,
                      latestArticlesTitle: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                />
              </label>

              <label className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                  Featured work heading
                </span>
                <input
                  type="text"
                  value={homeCopy.featuredWorkTitle}
                  onChange={(e) =>
                    setHomeCopy((prev) => ({
                      ...prev,
                      featuredWorkTitle: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={saveHomeCopy}
                className="rounded-md border border-cv-border bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-cv-text hover:bg-cv-panel"
              >
                Save home copy
              </button>
              <button
                type="button"
                onClick={async () => {
                  const data = JSON.stringify(homeCopy, null, 2);
                  try {
                    await navigator.clipboard.writeText(data);
                    setStatusMessage("Home copy JSON copied to clipboard.");
                  } catch {
                    setStatusMessage(
                      "Unable to copy home JSON. Please select and copy manually.",
                    );
                  }
                }}
                className="rounded-md border border-cv-border bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-cv-text hover:bg-cv-panel"
              >
                Copy home JSON
              </button>
              <div className="text-[11px] text-cv-muted">
                Paste into <code>src/lib/siteContent.ts</code> to update the
                source of truth.
              </div>
            </div>
          </section>
        )}

        {activeTab === "blog" && (
          <section aria-labelledby="blog-admin-heading" className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <SectionHeader
                as="h2"
                title="Blog posts"
                description="Manage the posts shown on the blog and homepage."
              />
              <button
                type="button"
                onClick={() =>
                  setBlogPosts((prev) => [
                    ...prev,
                    {
                      slug: "new-post",
                      title: "New post",
                      description: "",
                      publishedAt: new Date().toISOString(),
                      tags: [],
                      readingTimeMinutes: 5,
                      image: "",
                      cardImage: "",
                      heroImage: "",
                      content: "",
                    },
                  ])
                }
                className="rounded-md border border-cv-border bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-cv-text hover:bg-cv-panel"
              >
                Add post
              </button>
            </div>

            <div className="space-y-4">
              {blogPosts.map((post, index) => (
                <div
                  key={post.slug || index}
                  className="space-y-3 rounded-md border border-cv-border bg-cv-panel p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-cv-muted">
                      Post {index + 1}
                    </h3>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          saveBlogPosts();
                          setStatusMessage(
                            `Saved article “${post.title || post.slug}” locally.`,
                          );
                        }}
                        className="text-[11px] font-medium text-cv-text hover:underline"
                      >
                        Save article
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const data = JSON.stringify(post, null, 2);
                            await navigator.clipboard.writeText(data);
                            setStatusMessage(
                              `Copied JSON for “${post.title || post.slug}” to your clipboard.`,
                            );
                          } catch {
                            setStatusMessage(
                              "Unable to copy this article's JSON. Please select and copy manually.",
                            );
                          }
                        }}
                        className="text-[11px] font-medium text-cv-text hover:underline"
                      >
                        Copy article JSON
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setBlogPosts((prev) => prev.filter((_, i) => i !== index))
                        }
                        className="text-[11px] font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="space-y-1">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                        Slug
                      </span>
                      <input
                        type="text"
                        value={post.slug}
                        onChange={(e) =>
                          setBlogPosts((prev) => {
                            const next = [...prev];
                            next[index] = { ...next[index], slug: e.target.value };
                            return next;
                          })
                        }
                        className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                      />
                    </label>

                    <label className="space-y-1">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                        Title
                      </span>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) =>
                          setBlogPosts((prev) => {
                            const next = [...prev];
                            next[index] = { ...next[index], title: e.target.value };
                            return next;
                          })
                        }
                        className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                      />
                    </label>
                  </div>

                  <label className="space-y-1">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                      Description
                    </span>
                    <textarea
                      value={post.description}
                      onChange={(e) =>
                        setBlogPosts((prev) => {
                          const next = [...prev];
                          next[index] = { ...next[index], description: e.target.value };
                          return next;
                        })
                      }
                      rows={3}
                      className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                    />
                  </label>

                  <div className="grid gap-3 md:grid-cols-3">
                    <label className="space-y-1">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                        Published at (ISO date)
                      </span>
                      <input
                        type="text"
                        value={post.publishedAt}
                        onChange={(e) =>
                          setBlogPosts((prev) => {
                            const next = [...prev];
                            next[index] = {
                              ...next[index],
                              publishedAt: e.target.value,
                            };
                            return next;
                          })
                        }
                        className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                      />
                    </label>

                    <label className="space-y-1">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                        Reading time (minutes)
                      </span>
                      <input
                        type="number"
                        min={1}
                        value={post.readingTimeMinutes}
                        onChange={(e) =>
                          setBlogPosts((prev) => {
                            const next = [...prev];
                            next[index] = {
                              ...next[index],
                              readingTimeMinutes: Number(e.target.value) || 1,
                            };
                            return next;
                          })
                        }
                        className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                      />
                    </label>

                    <label className="space-y-1">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                        Tags (comma-separated)
                      </span>
                      <input
                        type="text"
                        value={formatTags(post.tags)}
                        onChange={(e) =>
                          setBlogPosts((prev) => {
                            const next = [...prev];
                            next[index] = {
                              ...next[index],
                              tags: parseTags(e.target.value),
                            };
                            return next;
                          })
                        }
                        className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                      />
                    </label>
                  </div>

                  <label className="space-y-1">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                      Image path (optional)
                    </span>
                    <input
                      type="text"
                      value={post.image ?? ""}
                      onChange={(e) =>
                        setBlogPosts((prev) => {
                          const next = [...prev];
                          next[index] = { ...next[index], image: e.target.value };
                          return next;
                        })
                      }
                      placeholder="/assets/images/blog/your-image.jpg"
                      className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                    />
                  </label>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="space-y-1">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                        Card image path (optional)
                      </span>
                      <input
                        type="text"
                        value={post.cardImage ?? ""}
                        onChange={(e) =>
                          setBlogPosts((prev) => {
                            const next = [...prev];
                            next[index] = {
                              ...next[index],
                              cardImage: e.target.value,
                            };
                            return next;
                          })
                        }
                        placeholder="/assets/images/cards/your-card-image.jpg"
                        className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                      />
                    </label>

                    <label className="space-y-1">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                        Hero image path (optional)
                      </span>
                      <input
                        type="text"
                        value={post.heroImage ?? ""}
                        onChange={(e) =>
                          setBlogPosts((prev) => {
                            const next = [...prev];
                            next[index] = {
                              ...next[index],
                              heroImage: e.target.value,
                            };
                            return next;
                          })
                        }
                        placeholder="/assets/images/widescreen/your-hero-image.jpg"
                        className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                      />
                    </label>
                  </div>

                  <label className="space-y-1">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                      Article body (HTML / code, optional)
                    </span>
                    <textarea
                      value={post.content ?? ""}
                      onChange={(e) =>
                        setBlogPosts((prev) => {
                          const next = [...prev];
                          next[index] = {
                            ...next[index],
                            content: e.target.value,
                          };
                          return next;
                        })
                      }
                      rows={8}
                      className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text font-mono"
                      placeholder="<p>Write your article body here using HTML for full control over structure.</p>"
                    />
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={saveBlogPosts}
                className="rounded-md border border-cv-border bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-cv-text hover:bg-cv-panel"
              >
                Save all blog posts
              </button>
              <button
                type="button"
                onClick={copyBlogJson}
                className="rounded-md border border-cv-border bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-cv-text hover:bg-cv-panel"
              >
                Copy blog JSON
              </button>
              <div className="text-[11px] text-cv-muted">
                Blog posts are now managed as markdown files in{" "}
                <code>content/blog</code>. Use this JSON as a reference when
                creating or updating MDX files.
              </div>
            </div>
          </section>
        )}

        {activeTab === "work" && (
          <section aria-labelledby="work-admin-heading" className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <SectionHeader
                as="h2"
                title="Work projects"
                description="Manage the projects shown on the work page and homepage."
              />
              <button
                type="button"
                onClick={() =>
                  setWorkProjects((prev) => [
                    ...prev,
                    {
                      slug: "new-project",
                      name: "New project",
                      role: "",
                      bullets: [],
                      image: "",
                    },
                  ])
                }
                className="rounded-md border border-cv-border bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-cv-text hover:bg-cv-panel"
              >
                Add project
              </button>
            </div>

            <div className="space-y-4">
              {workProjects.map((project, index) => (
                <div
                  key={project.slug || index}
                  className="space-y-3 rounded-md border border-cv-border bg-cv-panel p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-cv-muted">
                      Project {index + 1}
                    </h3>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          saveWorkProjects();
                          setStatusMessage(
                            `Saved project “${project.name || project.slug}” locally.`,
                          );
                        }}
                        className="text-[11px] font-medium text-cv-text hover:underline"
                      >
                        Save project
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const data = JSON.stringify(project, null, 2);
                            await navigator.clipboard.writeText(data);
                            setStatusMessage(
                              `Copied JSON for “${project.name || project.slug}” to your clipboard.`,
                            );
                          } catch {
                            setStatusMessage(
                              "Unable to copy this project's JSON. Please select and copy manually.",
                            );
                          }
                        }}
                        className="text-[11px] font-medium text-cv-text hover:underline"
                      >
                        Copy project JSON
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setWorkProjects((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        className="text-[11px] font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="space-y-1">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                        Slug
                      </span>
                      <input
                        type="text"
                        value={project.slug}
                        onChange={(e) =>
                          setWorkProjects((prev) => {
                            const next = [...prev];
                            next[index] = { ...next[index], slug: e.target.value };
                            return next;
                          })
                        }
                        className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                      />
                    </label>

                    <label className="space-y-1">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                        Name
                      </span>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                          setWorkProjects((prev) => {
                            const next = [...prev];
                            next[index] = { ...next[index], name: e.target.value };
                            return next;
                          })
                        }
                        className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                      />
                    </label>
                  </div>

                  <label className="space-y-1">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                      Role
                    </span>
                    <input
                      type="text"
                      value={project.role}
                      onChange={(e) =>
                        setWorkProjects((prev) => {
                          const next = [...prev];
                          next[index] = { ...next[index], role: e.target.value };
                          return next;
                        })
                      }
                      className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                      Bullets (one per line)
                    </span>
                    <textarea
                      value={formatBullets(project.bullets)}
                      onChange={(e) =>
                        setWorkProjects((prev) => {
                          const next = [...prev];
                          next[index] = {
                            ...next[index],
                            bullets: parseBullets(e.target.value),
                          };
                          return next;
                        })
                      }
                      rows={4}
                      className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-cv-muted">
                      Image path (optional)
                    </span>
                    <input
                      type="text"
                      value={project.image ?? ""}
                      onChange={(e) =>
                        setWorkProjects((prev) => {
                          const next = [...prev];
                          next[index] = { ...next[index], image: e.target.value };
                          return next;
                        })
                      }
                      placeholder="/assets/images/work/your-image.jpg"
                      className="w-full rounded-md border border-cv-border bg-white px-2 py-1.5 text-xs text-cv-text"
                    />
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={saveWorkProjects}
                className="rounded-md border border-cv-border bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-cv-text hover:bg-cv-panel"
              >
                Save all projects
              </button>
              <button
                type="button"
                onClick={copyWorkJson}
                className="rounded-md border border-cv-border bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-cv-text hover:bg-cv-panel"
              >
                Copy work JSON
              </button>
              <div className="text-[11px] text-cv-muted">
                Work projects are now managed as markdown files in{" "}
                <code>content/work</code>. Use this JSON as a reference when
                creating or updating MDX files.
              </div>
            </div>
          </section>
        )}
      </PageLayout>
    </main>
  );
}


