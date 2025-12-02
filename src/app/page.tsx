import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "../lib/blogData";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Product, growth, and automation for brands and systems that actually ship.",
};

export default function Home() {
  const latestPosts = [...blogPosts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  return (
    <main>
      <section className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Alex Magee
        </h1>
        <p className="mt-4 max-w-xl text-base text-gray-700">
          Product, growth, and automation for brands and systems that actually
          ship.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="what-i-do-heading">
        <h2
          id="what-i-do-heading"
          className="text-xl font-semibold tracking-tight"
        >
          What I do
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-gray-700">
          I work with brands, operators, and founders to ship product, grow
          revenue, and automate the boring parts so more energy goes into the
          work that matters.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Product &amp; growth strategy for DTC, SaaS, and e-commerce.</li>
          <li>Automation, AI, and n8n workflows that remove manual ops.</li>
          <li>Systems for operations, reporting, and continuous experimentation.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="featured-work-heading">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id="featured-work-heading"
            className="text-xl font-semibold tracking-tight"
          >
            Featured Work
          </h2>
          <Link
            href="/work"
            className="text-xs font-medium text-gray-600 hover:text-gray-900"
          >
            View all work
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Dansu – towel brand growth & automation",
              description:
                "Scaled a modern towel brand with automated fulfillment, reporting, and lifecycle flows.",
            },
            {
              title: "Ops control center for a DTC brand",
              description:
                "Centralized dashboards and alerts so leadership could see each channel and cohort at a glance.",
            },
            {
              title: "n8n automation for recurring workflows",
              description:
                "Designed and shipped automations that removed hours of weekly manual work across ops and CX.",
            },
            {
              title: "Experiment engine for paid & lifecycle",
              description:
                "Built a simple system for testing offers, funnels, and retention flows without blocking on engineering.",
            },
          ].map((project) => (
            <article
              key={project.title}
              className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white px-4 py-4"
            >
              <div>
                <h3 className="text-sm font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs text-gray-700">
                  {project.description}
                </p>
              </div>
              <div className="mt-3">
                <Link
                  href="/work"
                  className="text-xs font-medium text-gray-700 hover:text-gray-900"
                >
                  View more in Work →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="latest-articles-heading">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id="latest-articles-heading"
            className="text-xl font-semibold tracking-tight"
          >
            Latest Articles
          </h2>
          <Link
            href="/blog"
            className="text-xs font-medium text-gray-600 hover:text-gray-900"
          >
            View all articles
          </Link>
        </div>
        {latestPosts.length === 0 ? (
          <p className="mt-4 text-sm text-gray-600">
            Articles are coming soon.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-lg border border-gray-200 bg-white px-4 py-4"
              >
                <h3 className="text-sm font-semibold tracking-tight">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-gray-900"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · {post.readingTimeMinutes} min read
                </p>
                <p className="mt-2 text-xs text-gray-700">
                  {post.description}
                </p>
                <div className="mt-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-medium text-gray-700 hover:text-gray-900"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
