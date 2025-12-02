export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-4 py-6 text-xs text-gray-500 sm:px-6 sm:py-8 sm:flex-row sm:justify-between lg:px-8">
        <p className="text-center sm:text-left">
          © {year} Alex Magee. All rights reserved.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-4">
          <a
            href="/privacy"
            className="hover:text-gray-700 transition-colors"
          >
            Privacy
          </a>
          <a
            href="https://linkedin.com/in/placeholder"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/alm-000"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}


