import { useEffect, useState } from "react";

// FPS watchdog: decides once per session whether this machine is struggling
// to hold frame rate. Samples rAF frame times shortly after first mount; a
// choppy median flips the deck into low-power mode. Nothing is removed —
// consumers lower the WebGL render resolution (DPR cap 1.25 → 0.75) on the
// ambient layers (Hyperspeed, PrismaticBurst), so the same visuals
// render ~64% fewer fragments. The verdict is sticky for the browser session.

const STORAGE_KEY = "owlsurf-low-power";
const SAMPLE_DELAY_MS = 1500; // let load/entrance work settle first
const SAMPLE_DURATION_MS = 3500;
const LOW_POWER_MEDIAN_MS = 28; // median frame slower than ~35fps = struggling

let decided: boolean | null = null;
let sampling = false;
const listeners = new Set<(value: boolean) => void>();

function readStored(): boolean | null {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value === null ? null : value === "1";
  } catch {
    return null;
  }
}

function decide(value: boolean) {
  decided = value;
  try {
    sessionStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  } catch {
    // sessionStorage unavailable: the in-memory verdict still holds
  }
  listeners.forEach((listener) => listener(value));
}

function startSampling() {
  if (sampling || decided !== null) return;
  sampling = true;
  window.setTimeout(() => {
    const frameTimes: number[] = [];
    let last = performance.now();
    const start = last;
    const tick = (now: number) => {
      frameTimes.push(now - last);
      last = now;
      if (now - start < SAMPLE_DURATION_MS) {
        requestAnimationFrame(tick);
        return;
      }
      // Hidden tabs / app switches produce giant deltas; drop them before the median.
      const sorted = frameTimes.filter((t) => t < 250).sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)] ?? 0;
      decide(median > LOW_POWER_MEDIAN_MS);
    };
    requestAnimationFrame(tick);
  }, SAMPLE_DELAY_MS);
}

export function useLowPowerMode(): boolean {
  const [lowPower, setLowPower] = useState<boolean>(() => {
    if (decided === null) decided = readStored();
    return decided ?? false;
  });

  useEffect(() => {
    if (decided !== null) {
      setLowPower(decided);
      return;
    }
    const listener = (value: boolean) => setLowPower(value);
    listeners.add(listener);
    startSampling();
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return lowPower;
}
