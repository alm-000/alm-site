export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cv-panel border-t border-cv-border">
      <div className="cv-shell flex flex-col items-start justify-between gap-2 py-4 text-xs text-cv-muted md:flex-row md:items-center">
        <p className="text-xs text-cv-muted">
          © {year} Alex Magee. All rights reserved.
        </p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-4 text-[11px] font-semibold uppercase tracking-cvwide"
        >
          <a
            href="#"
            className="transition-colors hover:text-cv-text"
          >
            Privacy
          </a>
          <a
            href="https://linkedin.com/in/placeholder"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-cv-text"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/alm-000"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-cv-text"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}


