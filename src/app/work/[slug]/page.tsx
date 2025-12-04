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
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeader
            as="h1"
            align="center"
            title={project.name}
          />

          {project.image ? (
            <div className="relative w-full max-w-3xl aspect-[4/3] overflow-hidden rounded-xl bg-neutral-200">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>

        <section className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
              Overview
            </p>
            <p className="text-base md:text-lg text-cv-text">
              {project.bullets[0]}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
              Role
            </p>
            <p className="text-base md:text-lg text-cv-text">{project.role}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
              Highlights
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-base md:text-lg text-cv-muted">
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          {project.bullets[1] ? (
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
                What I Delivered
              </p>
              <p className="text-base md:text-lg text-cv-text">
                {project.bullets[1]}
              </p>
            </div>
          ) : null}

          {project.bullets[2] ? (
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
                Impact
              </p>
              <p className="text-base md:text-lg text-cv-text">
                {project.bullets[2]}
              </p>
            </div>
          ) : null}
        </section>
      </PageLayout>
    </main>
  );
}


