export type FlickDirection = -1 | 0 | 1;

export const FLICK_GESTURE_GAP_MS = 180;
export const FLICK_WINDOW_MS = 260;
export const FLICK_DISTANCE_THRESHOLD = 42;
export const FLICK_PEAK_THRESHOLD = 24;
export const MOBILE_FLICK_WINDOW_MS = 320;
export const MOBILE_FLICK_DISTANCE_THRESHOLD = 28;
export const MOBILE_FLICK_PEAK_THRESHOLD = 16;

interface FlickSample {
  distance: number;
  peak: number;
  durationMs: number;
  windowMs?: number;
  distanceThreshold?: number;
  peakThreshold?: number;
}

/**
 * A fast, intentional trackpad or touch gesture should advance one slide even
 * when its physical travel ends before the halfway point. Slow drags still use
 * the normal nearest-slide settle.
 */
export const getFlickDirection = ({
  distance,
  peak,
  durationMs,
  windowMs = FLICK_WINDOW_MS,
  distanceThreshold = FLICK_DISTANCE_THRESHOLD,
  peakThreshold = FLICK_PEAK_THRESHOLD,
}: FlickSample): FlickDirection => {
  if (durationMs > windowMs) return 0;
  if (Math.abs(distance) < distanceThreshold && peak < peakThreshold) return 0;
  return Math.sign(distance) as FlickDirection;
};
