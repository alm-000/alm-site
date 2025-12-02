import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "A selection of projects across product, growth, and automation.",
};

const projects = [
  {
    name: "Dansu – towel brand growth & automation",
    role: "Founder / Head of Growth & Ops",
    bullets: [
      "Designed growth systems across paid, lifecycle, and onsite.",
      "Automated fulfillment, reporting, and inventory checks.",
      "Built simple operating rhythms so the team could ship weekly.",
    ],
  },
  {
    name: "Ops control center for a modern e-commerce brand",
    role: "Product & Operations Partner",
    bullets: [
      "Centralized KPIs across marketing, CX, and operations.",
      "Gave leadership a single weekly view of performance and risk.",
      "Reduced time spent in disconnected dashboards and exports.",
    ],
  },
  {
    name: "n8n workflow library for a DTC team",
    role: "Automation & Systems",
    bullets: [
      "Mapped recurring workflows across CX, finance, and ops.",
      "Built n8n automations to remove manual, repetitive work.",
      "Documented flows so non-technical teammates could own changes.",
    ],
  },
  {
    name: "Experiment engine for paid & lifecycle",
    role: "Growth Strategy",
    bullets: [
      "Set up a simple framework for testing offers and funnels.",
      "Connected experiments to cohort-level retention and LTV.",
      "Helped the team prioritize signal over channels and tactics.",
    ],
  },
];

export default function WorkPage() {
  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Work</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-700">
          A selection of projects across product, growth, and automation.
          Names, numbers, and details are simplified and anonymized where
          needed, but the shape of the work is real.
        </p>
      </header>

      <section aria-label="Projects" className="space-y-5">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-lg border border-gray-200 bg-white px-4 py-4"
          >
            <h2 className="text-sm font-semibold tracking-tight">
              {project.name}
            </h2>
            <p className="mt-1 text-xs font-medium text-gray-600">
              {project.role}
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-gray-700">
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <div className="mt-3">
              <a
                href="#"
                className="text-xs font-medium text-gray-700 hover:text-gray-900"
              >
                Read more →
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}


