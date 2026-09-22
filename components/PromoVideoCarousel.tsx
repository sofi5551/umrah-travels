"use client";

import { useEffect, useRef, useState } from "react";
import type { PromoVideo } from "@/lib/promoVideos";

export default function PromoVideoCarousel({ videos }: { videos: PromoVideo[] }) {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Only the active slide should ever be downloading/playing — the others
  // sit at preload="none" until swiped to, instead of every video in the
  // carousel autoplaying at once on page load.
  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === index) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [index]);

  if (videos.length === 0) return null;

  function go(delta: number) {
    setIndex((i) => (i + delta + videos.length) % videos.length);
  }

  return (
    <div>
      <div className="flex items-center gap-3 sm:gap-4">
        {videos.length > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sandline bg-white text-ink shadow-md transition-colors hover:border-gold hover:text-gold"
            aria-label="Previous video"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {videos.map((v, i) => (
              <div key={v.id} className="w-full shrink-0">
                <div className="overflow-hidden border border-sandline bg-ink shadow-lg">
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={v.videoUrl}
                    muted
                    loop
                    playsInline
                    controls
                    preload={i === index ? "auto" : "none"}
                    className="aspect-video w-full object-cover"
                  />
                </div>
                {v.title && (
                  <p className="mt-4 text-center font-display text-lg text-ink">{v.title}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {videos.length > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sandline bg-white text-ink shadow-md transition-colors hover:border-gold hover:text-gold"
            aria-label="Next video"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {videos.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {videos.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to video ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-gold" : "bg-sandline hover:bg-stone"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
