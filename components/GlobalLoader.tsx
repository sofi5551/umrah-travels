"use client";

import { useEffect, useState } from "react";

// Plain module state — resets on a real hard reload (fresh JS context) but
// survives client-side <Link> navigation, since the root layout that renders
// this provider isn't remounted between routes. That's exactly the signal we
// want: show the splash once per hard load, never on in-app navigation.
let shownThisLoad = false;

// A short, fixed-duration branded splash — just enough to cover the initial
// paint, not a "wait for everything to finish loading" screen. It used to
// wait on window `load` (every image/video on the page) plus a 3D model's
// own progress, which meant a heavy page made the splash itself feel slow.
const SPLASH_MS = 700;
const FADE_MS = 500;

export default function GlobalLoaderProvider({
  faviconUrl,
  children,
}: {
  faviconUrl: string;
  children: React.ReactNode;
}) {
  const [visible] = useState(() => !shownThisLoad);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(!visible);

  useEffect(() => {
    if (!visible) return;
    shownThisLoad = true;
    const fadeTimer = setTimeout(() => setFading(true), SPLASH_MS);
    const hideTimer = setTimeout(() => setHidden(true), SPLASH_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  return (
    <>
      {children}
      {!hidden && <SplashScreen faviconUrl={faviconUrl} fading={fading} />}
    </>
  );
}

function SplashScreen({ faviconUrl, fading }: { faviconUrl: string; fading: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-500 ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg className="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="44" fill="none" stroke="#C6992E" strokeWidth="1.5" strokeOpacity="0.25" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#C6992E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="60 216"
          />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={faviconUrl}
          alt=""
          className="h-12 w-12 animate-pulse-slow object-contain"
          aria-hidden
        />
      </div>

      <p className="mt-7 font-display text-xl font-medium tracking-wide text-white">Haramain Ways</p>
      <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-goldsoft/80">Preparing your journey</p>
    </div>
  );
}
