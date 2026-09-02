"use client";

import { useState } from "react";

export default function Faq({
  items,
  variant = "light",
}: {
  items: { q: string; a: string }[];
  variant?: "light" | "dark";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (variant === "dark") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div
              key={item.q}
              className="h-fit border border-white/15 bg-white/5 backdrop-blur-sm transition-colors hover:border-gold/50"
            >
              <button
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
              >
                <span className="font-display text-base text-white">{item.q}</span>
                <span className="shrink-0 text-xl text-gold">{open ? "−" : "+"}</span>
              </button>
              {open && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-white/70">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="divide-y divide-sandline border-y border-sandline">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q}>
            <button
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
            >
              <span className="font-display text-lg text-ink">{item.q}</span>
              <span className="shrink-0 text-xl text-gold">{open ? "−" : "+"}</span>
            </button>
            {open && (
              <p className="pb-5 text-sm leading-relaxed text-stone">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
