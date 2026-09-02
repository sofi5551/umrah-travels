export default function RouteMotif() {
  const stops = [
    { name: "Jeddah", x: 40, y: 210 },
    { name: "Makkah", x: 150, y: 150 },
    { name: "Taif", x: 130, y: 260 },
    { name: "Madinah", x: 260, y: 60 },
    { name: "Riyadh", x: 420, y: 130 },
  ];

  return (
    <svg
      viewBox="0 0 480 300"
      className="h-full w-full"
      role="img"
      aria-label="Map of taxi routes connecting Jeddah, Makkah, Taif, Madinah and Riyadh"
    >
      <path
        d="M40 210 L150 150 L260 60 M150 150 L130 260 M150 150 L420 130"
        stroke="#C6992E"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        fill="none"
        opacity="0.7"
      />
      {stops.map((s) => (
        <g key={s.name}>
          <circle cx={s.x} cy={s.y} r={5} fill="#C6992E" />
          <circle cx={s.x} cy={s.y} r={9} stroke="#C6992E" strokeWidth="1" fill="none" opacity="0.5" />
          <text
            x={s.x}
            y={s.y - 14}
            textAnchor="middle"
            fill="#F1EAD9"
            fontSize="13"
            fontFamily="var(--font-manrope)"
          >
            {s.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
