import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "../../../lib/blogData";

type Params = {
  slug: string;
};

type PageProps = {
  params: Params;
};

export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Article not found",
    };
  }

  const title = post.title;

  return {
    title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    url: `https://alex-magee.com/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Alex Magee",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="prose prose-sm max-w-none prose-p:text-gray-700 prose-headings:text-gray-900">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <p className="mt-2 text-xs text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            · {post.readingTimeMinutes} min read
          </p>
          {post.tags.length > 0 && (
            <p className="mt-2 text-[11px] uppercase tracking-wide text-gray-500">
              {post.tags.join(" · ")}
            </p>
          )}
        </header>

        <section className="space-y-4">
          <p>
            This is a placeholder for the full article. For now, it sketches the
            kind of work and thinking behind the headline: practical, focused
            on operators, and grounded in shipped work instead of theory.
          </p>
          <p>
            Over time, this space will expand into specific playbooks, examples,
            and templates you can adapt to your own product, brand, or team.
          </p>
          <p>
            If you&apos;d like to talk through how this applies to your
            situation, you can always reach out via{" "}
            <a
              href="mailto:hello@alex-magee.com"
              className="font-medium text-gray-900 underline underline-offset-2"
            >
              email
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  );
}


