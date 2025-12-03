import type { Metadata } from "next";
import { aboutContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: aboutContent.metadata.title,
  description: aboutContent.metadata.description,
};

export default function AboutPage() {
  return (
    <main>
      <div className="cv-grid">
        <aside className="space-y-4">
          <section className="cv-panel">
            <div className="mb-3">
              <span className="cv-label">{aboutContent.snapshot.label}</span>
            </div>
            <div className="space-y-2 text-sm">
              {aboutContent.snapshot.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-cv-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="cv-panel">
            <div className="mb-3">
              <span className="cv-label">{aboutContent.capabilities.label}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {aboutContent.capabilities.tags.map((tag) => (
                <span key={tag} className="cv-tag">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <section>
          <header className="mb-4">
            <h1>{aboutContent.metadata.title}</h1>
          </header>

          <section
            aria-labelledby={aboutContent.sections.background.id}
            className="mt-4 space-y-3"
          >
            <h2 id={aboutContent.sections.background.id}>
              {aboutContent.sections.background.heading}
            </h2>
            <p className="max-w-2xl">
              {aboutContent.sections.background.body}
            </p>
          </section>

          <section
            aria-labelledby={aboutContent.sections.whatImGoodAt.id}
            className="mt-6"
          >
            <h2 id={aboutContent.sections.whatImGoodAt.id}>
              {aboutContent.sections.whatImGoodAt.heading}
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {aboutContent.sections.whatImGoodAt.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby={aboutContent.sections.whatImLookingFor.id}
            className="mt-6"
          >
            <h2 id={aboutContent.sections.whatImLookingFor.id}>
              {aboutContent.sections.whatImLookingFor.heading}
            </h2>
            <p className="mt-3 max-w-2xl">
              {aboutContent.sections.whatImLookingFor.body}
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}
