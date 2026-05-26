type SectionHeadingProps = {
  prefix: string;
  emphasis: string;
};

export function SectionHeading({ prefix, emphasis }: SectionHeadingProps) {
  return (
    <h2 className="mb-14 text-center text-4xl font-semibold tracking-tight text-text sm:text-5xl">
      {prefix} <span className="text-accent">{emphasis}</span>
    </h2>
  );
}