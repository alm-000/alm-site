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
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-4 px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="text-lg font-semibold tracking-tight">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Alex Magee
          </Link>
        </div>
        <nav aria-label="Primary" className="w-full md:w-auto">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-gray-700 md:flex-nowrap md:justify-end">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded-full px-2.5 py-1.5 hover:bg-gray-100 transition-colors"
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


