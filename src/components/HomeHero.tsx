import Image from "next/image";
import { homeCopy } from "../lib/siteContent";

const SKILLS: string[] = [
  "PRODUCT STRATEGY",
  "VISION",
  "DISCOVERY",
  "AUTOMATION",
  "AI & DATA",
  "SYSTEMS",
  "DELIVERY",
];

export default function HomeHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="relative flex flex-col gap-12 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] md:items-end md:gap-10 lg:gap-16">
          <div className="relative z-10 space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.28em] text-cv-text">
              <span>{homeCopy.heroName}</span>
              <span className="hidden sm:inline">
                {homeCopy.heroTitleLine.toUpperCase()}
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="font-[family-name:var(--font-display)] text-[40px] leading-[0.82] tracking-[-0.08em] uppercase text-cv-text sm:text-[64px] md:text-[96px] lg:text-[112px]">
                {homeCopy.heroName.toUpperCase()}
              </h1>

              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.38em] text-cv-text">
                {"PRODUCT | GROWTH | AUTOMATION"}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
              <p className="max-w-md text-sm leading-relaxed text-cv-text">
                {homeCopy.heroDescription}
              </p>

              <ul className="space-y-1 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-cv-text">
                {SKILLS.map((skill) => (
                  <li key={skill} className="flex gap-2">
                    <span className="select-none">/</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative md:-mt-24 lg:-mt-28">
            <div className="relative ml-auto w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[4/5] bg-white overflow-hidden">
              <Image
                src="/assets/images/alm_image_1.JPG"
                alt={`Portrait of ${homeCopy.heroName}`}
                fill
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 40vw, 100vw"
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.28em] text-cv-text">
          <span>PRODUCT · GROWTH · AUTOMATION</span>
          <span className="max-w-xs">
            Brands, systems, and workflows that actually ship.
          </span>
        </div>
      </div>
    </section>
  );
}


