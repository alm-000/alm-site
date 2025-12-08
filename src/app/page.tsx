import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "../components/PageLayout";
import SectionHeader from "../components/SectionHeader";
import Card from "../components/Card";
import HomeHero from "../components/HomeHero";
import { getAllPosts } from "../lib/blog";
import { getAllProjects } from "../lib/work";
import {
  aboutContent,
  contactPageContent,
  homeCopy,
} from "../lib/siteContent";

const ABOUT_HEADLINE =
  "I build product, growth, and automation systems that keep teams shipping.";

export const metadata: Metadata = {
  title: homeCopy.metadata.title,
  description: homeCopy.metadata.description,
};

export default async function Home() {
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 4);

  const allProjects = await getAllProjects();
  const featuredOrder = [
    "dtc-brand-build",
    "full-automation-stack-n8n-supabase",
    "creator-discovery-engine-rocketapi",
    "unified-pricing-system",
    "seller-verification-failed-order-reduction",
    "meta-ads-system-creative-funnels",
  ];

  const featuredProjects = featuredOrder
    .map((slug) => allProjects.find((project) => project.slug === slug))
    .filter(
      (project): project is (typeof allProjects)[number] => Boolean(project),
    )
    .slice(0, 4);

  return (
    <main>
      {/* 1. Hero */}
      <HomeHero />

      {/* 2. About me – full-width black band */}
      <section
        id="about"
        className="border-t border-cv-border bg-black text-white"
        aria-labelledby="about-heading"
      >
        <PageLayout className="py-20 space-y-12">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-400">
              About me
            </p>
            <h2
              id="about-heading"
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight uppercase font-[family-name:var(--font-display)] max-w-5xl"
            >
              {ABOUT_HEADLINE}
            </h2>
          </div>

          <div className="cv-grid gap-10">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-400">
                {aboutContent.sections.background.heading}
              </p>
              <p className="text-sm leading-relaxed text-neutral-200">
                {aboutContent.sections.background.body}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-400">
                {aboutContent.sections.whatImGoodAt.heading}
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-neutral-200">
                {aboutContent.sections.whatImGoodAt.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </PageLayout>
      </section>

      {/* 3. Work – neutral band inside layout */}
      <PageLayout className="py-20">
        <section
          id="work"
          className="space-y-6 border-t border-cv-border pt-12 md:pt-16"
          aria-labelledby="featured-work-heading"
        >
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

      {/* 4. How I work – full-width mint band */}
      <section
        id="how-i-work"
        className="border-t border-cv-border bg-emerald-100"
        aria-labelledby="how-i-work-heading"
      >
        <PageLayout className="py-20 space-y-12">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
              How I work
            </p>
            <h2
              id="how-i-work-heading"
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight uppercase font-[family-name:var(--font-display)] max-w-5xl"
            >
              A practical, systems-first way of shipping product.
            </h2>
          </div>

          <div className="cv-grid gap-10">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
                How this shows up in the work
              </p>
              <p className="text-sm leading-relaxed text-cv-muted">
                {homeCopy.whatIDoDescription}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
                What this looks like in practice
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-cv-muted">
                {homeCopy.whatIDoBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </PageLayout>
      </section>

      {/* 5–6. Blog, contact – neutral background */}
      <PageLayout className="py-20 space-y-24">
        {/* 5. Blog preview */}
        <section
          id="blog"
          className="space-y-6 border-t border-cv-border pt-12 md:pt-16"
          aria-labelledby="blog-heading"
        >
          <div className="flex items-baseline justify-between gap-4">
            <SectionHeader as="h2" title={homeCopy.latestArticlesTitle} />
            <Link
              href="/blog"
              className="text-xs font-medium tracking-wide text-cv-muted hover:text-cv-text"
            >
              {homeCopy.viewAllArticlesLabel}
            </Link>
          </div>
          {latestPosts.length === 0 ? (
            <p className="text-sm text-cv-muted">
              {homeCopy.articlesComingSoonMessage}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
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
        </section>

        {/* 6. Contact */}
      </PageLayout>

      {/* 6. Contact – full-width light blue band */}
      <section
        id="contact"
        className="border-t border-b border-cv-border bg-sky-100"
        aria-labelledby="contact-home-heading"
      >
        <PageLayout className="py-16">
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
              Contact
            </p>
            <h2
              id="contact-home-heading"
              className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight uppercase font-[family-name:var(--font-display)] max-w-3xl"
            >
              Let&apos;s talk about what you&apos;re building.
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-cv-muted">
              {contactPageContent.header.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={contactPageContent.emailSection.emailHref}
                className="inline-flex items-center rounded-full bg-cv-text px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-cv-text/90"
              >
                {homeCopy.getInTouchLabel}
              </a>
              <span className="text-xs font-medium tracking-wide text-cv-muted">
                {contactPageContent.emailSection.emailLabel}
              </span>
            </div>
          </div>
        </PageLayout>
      </section>
    </main>
  );
}
