"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { headerContent } from "@/lib/siteContent";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-cv-panel border-b border-cv-border">
      <div className="cv-shell flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-extrabold tracking-cvtight uppercase"
            onClick={closeMenu}
          >
            <span className="relative h-8 w-8">
              <Image
                src="/assets/images/alm_logo.png"
                alt={headerContent.logoAlt}
                fill
                sizes="42px"
                className="object-contain"
                priority
              />
            </span>
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] font-semibold uppercase tracking-cvwide text-cv-muted">
            {headerContent.navItems.map((item) => (
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

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md border border-cv-border bg-white/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-cvwide text-cv-muted shadow-sm transition-colors hover:text-cv-text"
            aria-label={headerContent.mobileToggleAriaLabel}
            aria-expanded={isOpen}
          >
            <span className="sr-only">Toggle main navigation</span>
            <span className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={`h-[1.5px] w-full bg-current transition-transform duration-200 ${
                  isOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-full bg-current transition-opacity duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-[1.5px] w-full bg-current transition-transform duration-200 ${
                  isOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          aria-label="Primary mobile"
          className="border-t border-cv-border bg-cv-panel md:hidden"
        >
          <div className="cv-shell py-3">
            <ul className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-cvwide text-cv-muted">
              {headerContent.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-1 transition-colors hover:text-cv-text"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
