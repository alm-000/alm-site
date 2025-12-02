import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "A short overview of who I am and how I like to work.",
};

export default function AboutPage() {
  return (
    <main>
      <div className="cv-grid">
        <aside className="space-y-4">
          <section className="cv-panel">
            <div className="mb-3">
              <span className="cv-label">Snapshot</span>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-cv-muted">
                Senior Product Manager &amp; Founder with 10 years across
                fintech, fashion, and retail.
              </p>
              <p className="text-cv-muted">
                Work spans strategy, discovery, delivery, and growth — with a
                bias toward automation and systems that reduce operational drag.
              </p>
            </div>
          </section>

          <section className="cv-panel">
            <div className="mb-3">
              <span className="cv-label">Capabilities</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Product Strategy",
                "Discovery",
                "Experiments",
                "Automation",
                "AI & Data",
                "Systems",
                "User Research",
                "Delivery",
              ].map((tag) => (
                <span key={tag} className="cv-tag">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <section>
          <header className="mb-4">
            <h1>About</h1>
          </header>

          <section
            aria-labelledby="background-heading"
            className="mt-4 space-y-3"
          >
            <h2 id="background-heading">Background</h2>
            <p className="max-w-2xl">
              I work across product, growth, and brand building — helping teams
              ship things that matter and build systems that make shipping
              easier over time. A lot of my work sits where strategy, execution,
              and operations overlap.
            </p>
          </section>

          <section
            aria-labelledby="what-im-good-at-heading"
            className="mt-6"
          >
            <h2 id="what-im-good-at-heading">What I&apos;m good at</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Shipping fast, with clear scopes and feedback loops.</li>
              <li>
                Building growth systems and funnels that tie back to real
                business metrics.
              </li>
              <li>
                Automating operations with AI and n8n so teams can do deeper
                work.
              </li>
              <li>Translating between operators, marketers, and engineers.</li>
            </ul>
          </section>

          <section
            aria-labelledby="what-im-looking-for-heading"
            className="mt-6"
          >
            <h2 id="what-im-looking-for-heading">What I&apos;m looking for</h2>
            <p className="mt-3 max-w-2xl">
              I like working with teams that care about momentum and craft in
              equal measure. I&apos;m open to product, growth, and automation
              work — fractional, advisory, or full-time — especially where
              there&apos;s a real problem to solve and a bias toward shipping.
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}
