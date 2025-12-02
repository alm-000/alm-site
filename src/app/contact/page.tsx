import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about consulting, roles, or interesting product and growth problems.",
};

export default function ContactPage() {
  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-700">
          Reach out if you&apos;re working on product, growth, or automation
          problems and want help turning ideas into shipped work — as an advisor,
          collaborator, or part of your team.
        </p>
      </header>

      <section aria-labelledby="contact-details-heading" className="mb-8">
        <h2
          id="contact-details-heading"
          className="text-base font-semibold tracking-tight text-gray-900"
        >
          Email
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          The fastest way to reach me is by email:{" "}
          <a
            href="mailto:hello@alex-magee.com"
            className="font-medium text-gray-900 underline underline-offset-2"
          >
            hello@alex-magee.com
          </a>
        </p>
      </section>

      <section aria-labelledby="contact-form-heading">
        <h2
          id="contact-form-heading"
          className="text-base font-semibold tracking-tight text-gray-900"
        >
          Contact form
        </h2>
        <form className="mt-4 grid gap-4 max-w-xl">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="What are you working on and how can I help?"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black"
            >
              Send message
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}


