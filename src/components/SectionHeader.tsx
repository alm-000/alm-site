type SectionHeaderProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
};

export default function SectionHeader({
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeaderProps) {
  const Heading = as;
  const alignment =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  const headingClasses =
    as === "h1"
      ? "text-4xl md:text-5xl font-semibold tracking-tight"
      : "text-xl md:text-2xl font-semibold tracking-tight";

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      <Heading className={headingClasses}>{title}</Heading>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-cv-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}


