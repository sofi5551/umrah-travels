/**
 * Renders admin-entered text (from a <textarea>, where each Enter press is a
 * paragraph break) as separate <p> elements instead of collapsing the line
 * breaks the way a single <p> would.
 */
export default function MultilineText({
  text,
  className = "",
  paragraphClassName = "",
}: {
  text: string;
  className?: string;
  paragraphClassName?: string;
}) {
  const paragraphs = text
    .split(/\r\n|\r|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i} className={paragraphClassName}>
          {p}
        </p>
      ))}
    </div>
  );
}
