import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogData";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// Pre-generate all blog routes
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Per-page <head> metadata
export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Blog | Alex Magee",
      description: "Articles on product, growth, automation, and experiments.",
    };
  }

  return {
    title: `${post.title} | Alex Magee`,
    description: post.description,
  };
}

// Page component
export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
          Article
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {post.title}
        </h1>
        <p className="text-sm text-neutral-500">
          {post.publishedAt} · {post.readingTimeMinutes} min read
        </p>
      </header>

      <p className="text-base leading-relaxed text-neutral-700">
        {post.description}
      </p>

      {/* TODO: replace with real rich content later */}
      <section className="prose prose-neutral max-w-none text-[15px]">
        <p>
          This is a placeholder body for “{post.title}”. Replace this with a
          richer article layout once the structure of the site is locked.
        </p>
      </section>
    </main>
  );
}