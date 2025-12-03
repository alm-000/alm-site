import type { Metadata } from "next";
import PageLayout from "../../components/PageLayout";
import SectionHeader from "../../components/SectionHeader";
import Card from "../../components/Card";
import { getAllProjects } from "../../lib/work";
import { workPageContent } from "../../lib/siteContent";

export const metadata: Metadata = {
  title: workPageContent.metadata.title,
  description: workPageContent.metadata.description,
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <main>
      <PageLayout className="py-12 space-y-10">
        <SectionHeader
          as="h1"
          title={workPageContent.header.title}
          description={workPageContent.header.description}
        />

        <section
          aria-label={workPageContent.projectsSectionAriaLabel}
          className="grid gap-6 md:grid-cols-2 md:gap-8"
        >
          {projects.map((project) => (
            <Card
              key={project.slug}
              title={project.name}
              href={`/work/${project.slug}`}
              imageSrc={project.image}
              meta={project.role}
              description={project.bullets[0]}
            >
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-cv-muted">
                {project.bullets.slice(1).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="mt-3">
                <span className="text-xs font-medium tracking-wide text-cv-muted hover:text-cv-text">
                  {workPageContent.readMoreLabel}
                </span>
              </div>
            </Card>
          ))}
        </section>
      </PageLayout>
    </main>
  );
}



