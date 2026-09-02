import { useEffect, useState } from "react";
import * as THREE from "three";

// A dedicated manager that only "critical path" 3D assets report to — the
// hero Kaaba model and the lighter fleet vehicles. The two 40MB+ FBX files
// (GMC Yukon XL, Hyundai Staria) are deliberately left off this manager: they
// can take a long time to download and parse, and gating the full-screen
// boot loader on them would mean a 15-30+ second splash on every hard load.
// They keep loading in the background and fade in on their own card once
// ready, same as before — they just don't block the rest of the site.
export const criticalLoadingManager = new THREE.LoadingManager();

// drei's useProgress() only tracks THREE.DefaultLoadingManager and has no way
// to point it at a different manager instance, so this is a small hand-rolled
// equivalent for criticalLoadingManager specifically — same shape, same idea.
type ProgressState = { active: boolean; progress: number };

let state: ProgressState = { active: false, progress: 0 };
const listeners = new Set<(s: ProgressState) => void>();

function publish(next: ProgressState) {
  state = next;
  listeners.forEach((l) => l(state));
}

let lastTotalLoaded = 0;

criticalLoadingManager.onStart = (_item, loaded, total) => {
  publish({
    active: true,
    progress: ((loaded - lastTotalLoaded) / (total - lastTotalLoaded)) * 100 || 0,
  });
};
criticalLoadingManager.onProgress = (_item, loaded, total) => {
  if (loaded === total) lastTotalLoaded = total;
  publish({
    active: true,
    progress: ((loaded - lastTotalLoaded) / (total - lastTotalLoaded)) * 100 || 100,
  });
};
criticalLoadingManager.onLoad = () => {
  publish({ active: false, progress: 100 });
};

export function useCriticalProgress(): ProgressState {
  const [snapshot, setSnapshot] = useState(state);
  useEffect(() => {
    setSnapshot(state);
    listeners.add(setSnapshot);
    return () => {
      listeners.delete(setSnapshot);
    };
  }, []);
  return snapshot;
}
