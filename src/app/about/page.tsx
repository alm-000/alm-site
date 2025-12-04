import type { Metadata } from "next";
import { aboutContent } from "@/lib/siteContent";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: aboutContent.metadata.title,
  description: aboutContent.metadata.description,
};

export default function AboutPage() {
  return (
    <main>
      <PageLayout className="py-16 space-y-12">
        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight uppercase">
            I build product, growth, and automation systems that keep teams
            shipping.
          </h1>
        </header>

        <div className="mt-4 flex flex-wrap gap-2">
          {aboutContent.capabilities.tags.map((tag) => (
            <span key={tag} className="cv-tag">
              {tag}
            </span>
          ))}
        </div>

        <section className="mt-8 space-y-8">
          <section className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.24em] text-cv-muted">
              {aboutContent.snapshot.label}
            </h2>
            <div className="space-y-2 text-sm leading-relaxed text-cv-muted max-w-2xl">
              {aboutContent.snapshot.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

            <section
              aria-labelledby={aboutContent.sections.background.id}
              className="space-y-3"
            >
              <h2
                id={aboutContent.sections.background.id}
                className="text-sm uppercase tracking-[0.24em] text-cv-muted"
              >
                {aboutContent.sections.background.heading}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-cv-muted">
                {aboutContent.sections.background.body}
              </p>
            </section>

            <section
              aria-labelledby={aboutContent.sections.whatImGoodAt.id}
              className="space-y-3"
            >
              <h2
                id={aboutContent.sections.whatImGoodAt.id}
                className="text-sm uppercase tracking-[0.24em] text-cv-muted"
              >
                {aboutContent.sections.whatImGoodAt.heading}
              </h2>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-cv-muted">
                {aboutContent.sections.whatImGoodAt.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby={aboutContent.sections.whatImLookingFor.id}
              className="space-y-3"
            >
              <h2
                id={aboutContent.sections.whatImLookingFor.id}
                className="text-sm uppercase tracking-[0.24em] text-cv-muted"
              >
                {aboutContent.sections.whatImLookingFor.heading}
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-cv-muted">
                {aboutContent.sections.whatImLookingFor.body}
              </p>
            </section>
        </section>
      </PageLayout>
    </main>
  );
}
