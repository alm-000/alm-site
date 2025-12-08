import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

type BlogPostPageParams = {
  slug: string;
};

type BlogPostPageProps = {
  params: Promise<Record<string, string>>;
};

// Pre-generate all blog routes
export function generateStaticParams(): BlogPostPageParams[] {
  return getAllSlugs().map((slug) => ({
    slug,
  }));
}

// Per-page <head> metadata
export async function generateMetadata(
  { params }: BlogPostPageProps,
): Promise<Metadata> {
  const resolvedParams = (await params) as BlogPostPageParams;
  const post = await getPostBySlug(resolvedParams.slug);

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
export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const resolvedParams = (await params) as BlogPostPageParams;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const dateLabel = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <article className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
            Article
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <p className="text-sm text-neutral-500">
            {dateLabel} · {post.readingTimeMinutes} min read
          </p>
        </header>

        {post.heroImage ?? post.image ? (
          <div className="relative mt-2 aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-200">
            <Image
              src={post.heroImage ?? post.image ?? ""}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        <p className="text-base leading-relaxed text-neutral-700">
          {post.description}
        </p>

        <section className="blog-prose">
          <div
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </section>
      </article>
    </main>
  );
}