import type { Metadata } from "next";
import { contactPageContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: contactPageContent.metadata.title,
  description: contactPageContent.metadata.description,
};

export default function ContactPage() {
  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {contactPageContent.header.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-700">
          {contactPageContent.header.description}
        </p>
      </header>

      <section aria-labelledby="contact-details-heading" className="mb-8">
        <h2
          id="contact-details-heading"
          className="text-base font-semibold tracking-tight text-gray-900"
        >
          {contactPageContent.emailSection.heading}
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          {contactPageContent.emailSection.descriptionPrefix}
          <a
            href={contactPageContent.emailSection.emailHref}
            className="font-medium text-gray-900 underline underline-offset-2"
          >
            {contactPageContent.emailSection.emailLabel}
          </a>
        </p>
      </section>

      <section aria-labelledby="contact-form-heading">
        <h2
          id="contact-form-heading"
          className="text-base font-semibold tracking-tight text-gray-900"
        >
          {contactPageContent.formSection.heading}
        </h2>
        <form className="mt-4 grid gap-4 max-w-xl">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-700"
            >
              {contactPageContent.formSection.fields.nameLabel}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder={
                contactPageContent.formSection.fields.namePlaceholder
              }
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700"
            >
              {contactPageContent.formSection.fields.emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder={
                contactPageContent.formSection.fields.emailPlaceholder
              }
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-gray-700"
            >
              {contactPageContent.formSection.fields.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder={
                contactPageContent.formSection.fields.messagePlaceholder
              }
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black"
            >
              {contactPageContent.formSection.submitLabel}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}


