import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import { getAllSlugs, getProjectBySlug } from "@/lib/work";

type WorkProjectPageParams = {
  slug: string;
};

type WorkProjectPageProps = {
  params: Promise<Record<string, string>>;
};

export function generateStaticParams(): WorkProjectPageParams[] {
  return getAllSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: WorkProjectPageProps,
): Promise<Metadata> {
  const resolvedParams = (await params) as WorkProjectPageParams;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Work | Alex Magee",
      description:
        "A selection of projects across product, growth, and automation.",
    };
  }

  return {
    title: `${project.name} | Alex Magee`,
    description: project.bullets[0],
  };
}

export default async function WorkProjectPage({
  params,
}: WorkProjectPageProps) {
  const resolvedParams = (await params) as WorkProjectPageParams;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <PageLayout className="py-12 space-y-10">
        <SectionHeader
          as="h1"
          title={project.name}
          description={project.bullets[0]}
        />

        <section className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
          <div className="space-y-5">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
              Role
            </p>
            <p className="text-sm text-cv-text">{project.role}</p>

            <div className="space-y-2 mt-4">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
                Highlights
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-cv-muted">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>

            {project.contentHtml.trim() ? (
              <div className="space-y-2 mt-6">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
                  Details
                </p>
                <div
                  className="prose prose-neutral max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: project.contentHtml }}
                />
              </div>
            ) : null}
          </div>

          {project.image ? (
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-neutral-200">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </section>
      </PageLayout>
    </main>
  );
}


