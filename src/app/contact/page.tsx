import type { Metadata } from "next";
import { contactPageContent } from "@/lib/siteContent";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: contactPageContent.metadata.title,
  description: contactPageContent.metadata.description,
};

export default function ContactPage() {
  return (
    <main>
      <PageLayout className="py-16 space-y-12">
        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-cv-muted">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-cvtight uppercase font-[family-name:var(--font-display)]">
            Let&apos;s talk about what you&apos;re building.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-cv-muted">
            {contactPageContent.header.description}
          </p>
        </header>

        <section className="cv-grid gap-10" aria-labelledby="contact-details-heading">
          <div className="space-y-4">
            <h2
              id="contact-details-heading"
              className="text-sm uppercase tracking-[0.24em] text-cv-muted"
            >
              {contactPageContent.emailSection.heading}
            </h2>
            <p className="text-sm leading-relaxed text-cv-muted">
              {contactPageContent.emailSection.descriptionPrefix}
              <a
                href={contactPageContent.emailSection.emailHref}
                className="font-medium text-cv-text underline underline-offset-2"
              >
                {contactPageContent.emailSection.emailLabel}
              </a>
            </p>
          </div>

          <section
            aria-labelledby="contact-form-heading"
            className="max-w-xl space-y-4"
          >
            <h2
              id="contact-form-heading"
              className="text-sm uppercase tracking-[0.24em] text-cv-muted"
            >
              {contactPageContent.formSection.heading}
            </h2>
            <form className="grid gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-cv-muted"
                >
                  {contactPageContent.formSection.fields.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="mt-1 block w-full border border-cv-border bg-white px-3 py-2 text-sm text-cv-text shadow-sm focus:border-cv-text focus:outline-none focus:ring-1 focus:ring-cv-text"
                  placeholder={
                    contactPageContent.formSection.fields.namePlaceholder
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-cv-muted"
                >
                  {contactPageContent.formSection.fields.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 block w-full border border-cv-border bg-white px-3 py-2 text-sm text-cv-text shadow-sm focus:border-cv-text focus:outline-none focus:ring-1 focus:ring-cv-text"
                  placeholder={
                    contactPageContent.formSection.fields.emailPlaceholder
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-cv-muted"
                >
                  {contactPageContent.formSection.fields.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full border border-cv-border bg-white px-3 py-2 text-sm text-cv-text shadow-sm focus:border-cv-text focus:outline-none focus:ring-1 focus:ring-cv-text"
                  placeholder={
                    contactPageContent.formSection.fields.messagePlaceholder
                  }
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-cv-text px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-black"
                >
                  {contactPageContent.formSection.submitLabel}
                </button>
              </div>
            </form>
          </section>
        </section>
      </PageLayout>
    </main>
  );
}


