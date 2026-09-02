export default function SectionHeading({
  title,
  intro,
  align = "left",
  titleClassName = "text-ink",
  introClassName = "text-stone",
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
  titleClassName?: string;
  introClassName?: string;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <h2 className={`font-display text-3xl font-medium sm:text-4xl ${titleClassName}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed ${introClassName}`}>{intro}</p>
      )}
    </div>
  );
}
