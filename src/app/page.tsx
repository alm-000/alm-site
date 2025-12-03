import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "../components/PageLayout";
import SectionHeader from "../components/SectionHeader";
import Card from "../components/Card";
import HomeHero from "../components/HomeHero";
import { getAllPosts } from "../lib/blog";
import { getAllProjects } from "../lib/work";
import { homeCopy } from "../lib/siteContent";

export const metadata: Metadata = {
  title: homeCopy.metadata.title,
  description: homeCopy.metadata.description,
};

export default async function Home() {
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 3);

  const allProjects = await getAllProjects();
  const featuredProjects = allProjects.slice(0, 4);

  return (
    <main>
      <HomeHero />

      <PageLayout className="py-16 space-y-16">
        <section
          className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]"
          aria-labelledby="what-i-do-heading"
        >
          <div>
            <SectionHeader
              as="h2"
              title={homeCopy.whatIDoTitle}
              description={homeCopy.whatIDoDescription}
            />
            <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-cv-muted">
              {homeCopy.whatIDoBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <SectionHeader as="h2" title={homeCopy.latestArticlesTitle} />
            {latestPosts.length === 0 ? (
              <p className="text-sm text-cv-muted">
                {homeCopy.articlesComingSoonMessage}
              </p>
            ) : (
              <div className="space-y-4">
                {latestPosts.map((post) => {
                  const dateLabel = new Date(
                    post.publishedAt,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
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
              </div>
            )}
            <div>
              <Link
                href="/blog"
                className="text-xs font-medium tracking-wide text-cv-muted hover:text-cv-text"
              >
                {homeCopy.viewAllArticlesLabel}
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="featured-work-heading">
          <div className="flex items-baseline justify-between gap-4">
            <SectionHeader as="h2" title={homeCopy.featuredWorkTitle} />
            <Link
              href="/work"
              className="text-xs font-medium tracking-wide text-cv-muted hover:text-cv-text"
            >
              {homeCopy.viewAllWorkLabel}
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card
                key={project.slug}
                title={project.name}
                href={`/work/${project.slug}`}
                imageSrc={project.image}
                meta={project.role}
                description={project.bullets[0]}
              />
            ))}
          </div>
        </section>
      </PageLayout>
    </main>
  );
}
