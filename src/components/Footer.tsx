import PageLayout from "./PageLayout";
import { footerContent } from "@/lib/siteContent";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cv-border text-xs text-cv-muted">
      <PageLayout className="py-6 flex flex-col items-center justify-between gap-2 text-center md:flex-row md:items-center md:text-left">
        <p>
          © {year} {footerContent.copyrightName}. All rights reserved.
        </p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium tracking-wide"
        >
          {footerContent.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="transition-colors hover:text-cv-text"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </PageLayout>
    </footer>
  );
}

