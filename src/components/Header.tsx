import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="bg-cv-panel border-b border-cv-border">
      <div className="cv-shell flex items-center justify-between gap-4 py-3">
        <div>
          <Link
            href="/"
            className="text-sm font-extrabold tracking-cvtight uppercase"
          >
            Alex Magee
          </Link>
        </div>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] font-semibold uppercase tracking-cvwide text-cv-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-cv-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav
          aria-label="Primary"
          className="md:hidden text-[11px] font-semibold uppercase tracking-cvwide text-cv-muted"
        >
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-cv-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
