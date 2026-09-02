// A curated palette (not the full color wheel) so every fallback avatar
// still feels like it belongs to the site's gold/ink aesthetic.
const PALETTE = [
  "#0B3D33", // ink
  "#C6992E", // gold
  "#7A4A2B", // warm brown
  "#3F6259", // muted teal
  "#8C5E3C", // clay
  "#5C574C", // stone
  "#2F5D50", // deep green
  "#A9762F", // amber
];

function colorForName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export default function Avatar({
  name,
  imageUrl,
  size = 44,
}: {
  name: string;
  imageUrl?: string | null;
  size?: number;
}) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-display font-medium text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: colorForName(name),
        fontSize: size * 0.42,
      }}
      aria-hidden
    >
      {initial}
    </div>
  );
}
