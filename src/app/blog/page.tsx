import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "../../lib/blogData";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on product, growth, automation, and building systems that actually ship.",
};

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-700">
          Notes on product, growth, and automation — aimed at operators and
          teams who care more about shipping than buzzwords.
        </p>
      </header>

      <section aria-label="Articles" className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-gray-200 bg-white px-4 py-4"
          >
            <h2 className="text-sm font-semibold tracking-tight">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-gray-900"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              · {post.readingTimeMinutes} min read
            </p>
            <p className="mt-2 text-xs text-gray-700">{post.description}</p>
            {post.tags.length > 0 && (
              <p className="mt-2 text-[11px] uppercase tracking-wide text-gray-500">
                {post.tags.join(" · ")}
              </p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}


