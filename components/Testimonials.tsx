"use client";

import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { StarRatingDisplay } from "./StarRating";
import ReviewModal from "./ReviewModal";
import { fetchReviews } from "@/lib/reviews";
import { testimonials as seedReviews, type Review } from "@/lib/data";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return dateFormatter.format(date);
}

// Matches Tailwind's default sm (640px) / lg (1024px) breakpoints, since the
// card width classes below are keyed to the same ones.
function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    function update() {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return visibleCount;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [startIndex, setStartIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const visibleCount = useVisibleCount();

  useEffect(() => {
    let cancelled = false;
    fetchReviews().then((data) => {
      if (!cancelled) setReviews(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const maxStart = Math.max(0, reviews.length - visibleCount);

  useEffect(() => {
    setStartIndex((i) => Math.min(i, maxStart));
  }, [maxStart]);

  function go(delta: number) {
    setStartIndex((i) => Math.max(0, Math.min(i + delta, maxStart)));
  }

  function handleSubmitted(newReview: Review) {
    setReviews((prev) => [newReview, ...prev]);
    setStartIndex(0);
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-inkdeep"
        >
          Give your feedback
        </button>
      </div>

      <div className="relative mt-6">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${(startIndex * 100) / visibleCount}%)` }}
          >
            {reviews.map((r) => (
              <div
                key={r.id}
                className="shrink-0 px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <figure className="flex h-full flex-col border border-sandline bg-white p-6">
                  <StarRatingDisplay rating={r.rating} />
                  <blockquote className="mt-3 flex-1 font-display text-lg leading-snug text-ink">
                    “{r.review}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <Avatar name={r.name} imageUrl={r.avatarUrl} size={40} />
                    <div>
                      <p className="text-sm font-medium text-charcoal">{r.name}</p>
                      <p className="text-xs text-stone">{formatDate(r.createdAt)}</p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => go(-1)}
          disabled={startIndex === 0}
          className="absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sandline bg-white text-ink shadow-md transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous review"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => go(1)}
          disabled={startIndex >= maxStart}
          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-sandline bg-white text-ink shadow-md transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Next review"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <ReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitted={handleSubmitted}
      />
    </div>
  );
}
