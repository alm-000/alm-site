import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "A short overview of who I am and how I like to work.",
};

export default function AboutPage() {
  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      </header>

      <section
        aria-labelledby="background-heading"
        className="mb-8 space-y-3 text-sm text-gray-700"
      >
        <h2
          id="background-heading"
          className="text-base font-semibold tracking-tight text-gray-900"
        >
          Background
        </h2>
        <p className="max-w-2xl">
          I work across product, growth, and brand building — helping teams ship
          things that matter and build systems that make shipping easier over
          time. A lot of my work sits where strategy, execution, and operations
          overlap.
        </p>
      </section>

      <section
        aria-labelledby="what-im-good-at-heading"
        className="mb-8 text-sm text-gray-700"
      >
        <h2
          id="what-im-good-at-heading"
          className="text-base font-semibold tracking-tight text-gray-900"
        >
          What I&apos;m good at
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Shipping fast, with clear scopes and feedback loops.</li>
          <li>
            Building growth systems and funnels that tie back to real business
            metrics.
          </li>
          <li>Automating operations with AI and n8n so teams can do deeper work.</li>
          <li>Translating between operators, marketers, and engineers.</li>
        </ul>
      </section>

      <section
        aria-labelledby="what-im-looking-for-heading"
        className="text-sm text-gray-700"
      >
        <h2
          id="what-im-looking-for-heading"
          className="text-base font-semibold tracking-tight text-gray-900"
        >
          What I&apos;m looking for
        </h2>
        <p className="mt-3 max-w-2xl">
          I like working with teams that care about momentum and craft in equal
          measure. I&apos;m open to product, growth, and automation work —
          fractional, advisory, or full-time — especially where there&apos;s a
          real problem to solve and a bias toward shipping.
        </p>
      </section>
    </main>
  );
}


