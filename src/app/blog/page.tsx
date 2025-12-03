import type { Metadata } from "next";
import PageLayout from "../../components/PageLayout";
import SectionHeader from "../../components/SectionHeader";
import Card from "../../components/Card";
import { getAllPosts } from "../../lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on product, growth, automation, and building systems that actually ship.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main>
      <PageLayout className="py-12 space-y-10">
        <SectionHeader
          as="h1"
          title="Blog"
          description="Notes on product, growth, and automation — aimed at operators and teams who care more about shipping than buzzwords."
        />

        <section
          aria-label="Articles"
          className="grid gap-6 md:grid-cols-2 md:gap-8"
        >
          {posts.map((post) => {
            const dateLabel = new Date(post.publishedAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            );
            const meta = `${dateLabel} · ${post.readingTimeMinutes} min read`;

            return (
              <Card
                key={post.slug}
                title={post.title}
                href={`/blog/${post.slug}`}
                imageSrc={post.cardImage ?? post.image}
                meta={meta}
                description={post.description}
              />
            );
          })}
        </section>
      </PageLayout>
    </main>
  );
}

