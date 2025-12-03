import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  meta?: string;
  description?: string;
  children?: ReactNode;
};

export default function Card({
  title,
  href,
  imageSrc,
  imageAlt,
  meta,
  description,
  children,
}: CardProps) {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href
    ? { href, className: "block focus:outline-none focus-visible:ring-2 focus-visible:ring-cv-border rounded-xl" }
    : {};

  const content = (
    <article className="h-full overflow-hidden rounded-xl border border-cv-border bg-white/80">
      {imageSrc ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="p-5 space-y-2">
        <h3 className="text-base font-semibold tracking-tight text-cv-text">
          {title}
        </h3>
        {meta ? (
          <p className="text-xs font-medium text-cv-muted">{meta}</p>
        ) : null}
        {description ? (
          <p className="text-sm leading-relaxed text-cv-muted">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </article>
  );

  // @ts-expect-error - Wrapper can be Link or div
  return <Wrapper {...wrapperProps}>{content}</Wrapper>;
}


