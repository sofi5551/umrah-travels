"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[calc(100vh-6.5rem)] items-center justify-center bg-ink px-4 py-16 text-center text-white sm:px-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">
          Something went wrong
        </p>
        <h1 className="mt-3 font-display text-2xl font-medium sm:text-3xl">
          We hit an unexpected error
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/75">
          Please try again, or head back to the homepage. If this keeps happening, let us know.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
