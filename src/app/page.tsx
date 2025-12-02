import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../lib/blogData";
import portraitImg from "../../assets/images/alm_image_1.JPG";

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
    <main className="space-y-16">
      <section className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] md:items-center">
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full max-w-md aspect-[3/4] bg-cv-panel border border-cv-border overflow-hidden">
            <Image
              src={portraitImg}
              alt="Portrait of Alex Magee"
              fill
              priority
              className="object-cover grayscale"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1>Alex Magee</h1>
            <p className="mt-3 text-base text-cv-text">
              Product · Growth · Automation
            </p>
          </div>
          <p className="max-w-xl">
            Senior Product Manager &amp; Founder with 10 years building, launching,
            and growing products across fintech, fashion, and retail. I work end
            to end from strategy and discovery through delivery and growth,
            turning messy problems into simple automated solutions that scale
            revenue.
          </p>
          <div className="space-y-3">
            <div>
              <span className="cv-label">Focus</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Product Strategy",
                "Growth",
                "Automation",
                "AI & Data",
                "E-commerce",
              ].map((tag) => (
                <span key={tag} className="cv-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {["Shipping Fast", "Experiments", "Systems Thinking", "Ops"].map(
                (tag) => (
                  <span key={tag} className="cv-tag">
                    {tag}
                  </span>
                ),
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-[11px] font-semibold uppercase tracking-cvwide">
              <Link
                href="/work"
                className="underline underline-offset-4 decoration-[1.5px] hover:text-cv-text"
              >
                View work
              </Link>
              <Link
                href="/contact"
                className="hover:text-cv-text text-cv-muted"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]"
        aria-labelledby="what-i-do-heading"
      >
        <div>
          <h2 id="what-i-do-heading">What I do</h2>
          <p className="mt-3 max-w-xl">
            I work with brands, operators, and founders to ship product, grow
            revenue, and automate the boring parts so more energy goes into the
            work that matters.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Product &amp; growth strategy for DTC, SaaS, and e-commerce.</li>
            <li>Automation, AI, and n8n workflows that remove manual ops.</li>
            <li>
              Systems for operations, reporting, and continuous experimentation.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="h2 mt-0">Latest Articles</h2>
          {latestPosts.length === 0 ? (
            <p>Articles are coming soon.</p>
          ) : (
            <div className="space-y-4">
              {latestPosts.map((post) => (
                <article key={post.slug} className="cv-panel">
                  <h3 className="h3 mt-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-cv-text"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs text-cv-muted">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    · {post.readingTimeMinutes} min read
                  </p>
                  <p className="mt-2 text-sm">{post.description}</p>
                </article>
              ))}
            </div>
          )}
          <div>
            <Link
              href="/blog"
              className="text-[11px] font-semibold uppercase tracking-cvwide text-cv-muted hover:text-cv-text"
            >
              View all articles →
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="featured-work-heading">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="featured-work-heading">Featured Work</h2>
          <Link
            href="/work"
            className="text-[11px] font-semibold uppercase tracking-cvwide text-cv-muted hover:text-cv-text"
          >
            View all work
          </Link>
        </div>
        <div className="mt-2 grid gap-4 md:grid-cols-2">
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
            <article key={project.title} className="cv-panel">
              <h3 className="h3 mt-0">{project.title}</h3>
              <p className="mt-2 text-sm">{project.description}</p>
              <div className="mt-3">
                <Link
                  href="/work"
                  className="text-[11px] font-semibold uppercase tracking-cvwide text-cv-muted hover:text-cv-text"
                >
                  View more in Work →
                </Link>
              </div>
            </article>
          ))}
    </div>
      </section>
    </main>
  );
}
