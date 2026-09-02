"use client";

import { useEffect, useRef, useState } from "react";
import { StarRatingInput } from "./StarRating";
import Avatar from "./Avatar";
import { submitReview } from "@/lib/reviews";
import { useToast } from "./Toast";
import type { Review } from "@/lib/data";

export default function ReviewModal({
  open,
  onClose,
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  onSubmitted: (review: Review) => void;
}) {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function resetForm() {
    setName("");
    setEmail("");
    setRating(0);
    setReview("");
    setAvatarFile(null);
    setAvatarPreview(null);
    setError(null);
  }

  function handleClose() {
    if (submitting) return;
    resetForm();
    onClose();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setAvatarFile(file);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const created = await submitReview({ name, email, rating, review, avatarFile });
      onSubmitted(created);
      showToast({
        kind: "success",
        title: "Thank you for your feedback!",
        description: "Your review has been posted.",
      });
      resetForm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-sandline bg-white p-6 shadow-xl sm:p-8"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-stone/60 hover:text-ink"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <h2 id="review-modal-title" className="font-display text-2xl text-ink">
          Share your experience
        </h2>
        <p className="mt-1.5 text-sm text-stone">
          Tell other pilgrims about your journey with us.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar name={name || "?"} imageUrl={avatarPreview} size={56} />
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-semibold text-ink hover:text-gold"
              >
                {avatarFile ? "Change photo" : "Upload a photo (optional)"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {avatarFile && (
                <button
                  type="button"
                  onClick={() => {
                    setAvatarFile(null);
                    setAvatarPreview(null);
                  }}
                  className="ml-3 text-sm text-stone hover:text-ink"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <Field label="Your name">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Full name"
            />
          </Field>

          <Field label="Email">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
            />
          </Field>

          <Field label="Your rating">
            <StarRatingInput value={rating} onChange={setRating} />
          </Field>

          <Field label="Your review">
            <textarea
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="input min-h-28 resize-y"
              placeholder="Tell us about your trip..."
              maxLength={600}
            />
          </Field>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit review"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
        {label}
      </span>
      {children}
    </label>
  );
}
