"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCriticalProgress } from "@/lib/criticalLoadingManager";

// Plain module state — resets on a real hard reload (fresh JS context) but
// survives client-side <Link> navigation, since the root layout that renders
// this provider isn't remounted between routes. That's exactly the signal we
// want: show the splash once per hard load, never on in-app navigation —
// models/images already fetched stay in the browser cache either way.
let shownThisLoad = false;

const MIN_VISIBLE_MS = 500;
const SETTLE_DEBOUNCE_MS = 400;
const SAFETY_TIMEOUT_MS = 15000;
const FADE_MS = 600;

export default function GlobalLoaderProvider({ children }: { children: React.ReactNode }) {
  const [visible] = useState(() => !shownThisLoad);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(!visible);

  return (
    <>
      {children}
      {!hidden && (
        <SplashScreen
          fading={fading}
          onDone={() => setHidden(true)}
          startFade={() => setFading(true)}
        />
      )}
    </>
  );
}

// Three's DefaultLoadingManager (which every loader in this app reports to —
// STLLoader, GLTFLoader, FBXLoader, OBJLoader/MTLLoader — unless given a
// custom manager) tracks all in-flight fetches, so drei's useProgress gives a
// live, page-wide view of every model currently loading. Combined with the
// window `load` event (which covers regular images/fonts/CSS that loaders
// don't touch), that's a real "everything's ready" signal.
function SplashScreen({
  fading,
  startFade,
  onDone,
}: {
  fading: boolean;
  startFade: () => void;
  onDone: () => void;
}) {
  const { active, progress } = useCriticalProgress();
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [displayPercent, setDisplayPercent] = useState(8);
  const maxPercentRef = useRef(8);
  const mountedAt = useRef(Date.now());
  const settleTimer = useRef<ReturnType<typeof setTimeout>>();

  const finish = useCallback(() => {
    setDisplayPercent(100);
    startFade();
    setTimeout(onDone, FADE_MS);
  }, [startFade, onDone]);

  useEffect(() => {
    shownThisLoad = true;

    const onLoad = () => setWindowLoaded(true);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);

    const safety = setTimeout(finish, SAFETY_TIMEOUT_MS);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(safety);
      clearTimeout(settleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Blend window-load progress (half the bar) with model-loading progress
  // (the other half), and never let the displayed number regress.
  useEffect(() => {
    const windowFraction = windowLoaded ? 1 : 0;
    const modelFraction = progress / 100;
    const raw = Math.round(((windowFraction + modelFraction) / 2) * 100);
    const clamped = Math.max(raw, maxPercentRef.current);
    maxPercentRef.current = clamped;
    setDisplayPercent(Math.min(clamped, 96));
  }, [windowLoaded, progress]);

  useEffect(() => {
    clearTimeout(settleTimer.current);
    if (!windowLoaded || active) return;
    settleTimer.current = setTimeout(() => {
      const elapsed = Date.now() - mountedAt.current;
      setTimeout(finish, Math.max(0, MIN_VISIBLE_MS - elapsed));
    }, SETTLE_DEBOUNCE_MS);
    return () => clearTimeout(settleTimer.current);
  }, [windowLoaded, active, finish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-[600ms] ease-out ${
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
        <svg viewBox="0 0 100 100" className="h-10 w-10 animate-pulse-slow" aria-hidden>
          <polygon points="50,8 92,30 92,70 50,92 8,70 8,30" fill="none" stroke="#E7CE8C" strokeWidth="2" />
          <polygon points="50,8 92,30 50,52 8,30" fill="#C6992E" fillOpacity="0.35" />
          <line x1="50" y1="52" x2="50" y2="92" stroke="#E7CE8C" strokeWidth="1.2" />
          <line x1="8" y1="30" x2="8" y2="70" stroke="#E7CE8C" strokeWidth="1.2" />
          <line x1="92" y1="30" x2="92" y2="70" stroke="#E7CE8C" strokeWidth="1.2" />
        </svg>
      </div>

      <p className="mt-7 font-display text-xl font-medium tracking-wide text-white">VIP Umrah Taxi</p>
      <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-goldsoft/80">Preparing your journey</p>

      <div className="mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-300 ease-out"
          style={{ width: `${displayPercent}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] tabular-nums text-white/40">{displayPercent}%</p>
    </div>
  );
}
