import { getProject, types } from "@theatre/core";

/**
 * Theatre.js project for the mobile signature transition (Phase B).
 *
 * The look of the slide-to-slide sweep is exposed as a single Theatre object so
 * it can be tuned visually in the studio during dev and persisted. The studio
 * is initialised ONLY in dev (guarded dynamic import) so it never ships to prod.
 *
 * Values currently come from the defaults below. Once tuned in studio, export
 * the project state and drop it in as `deck-state.json`, then pass it here via
 * `getProject("OwlSurf Deck", { state })` to ship the authored look.
 */
export const deckProject = getProject("OwlSurf Deck");

export const transitionSheet = deckProject.sheet("slide-transition");

/** The branded sweep params, scrubbed by inter-slide scroll progress. */
export const signatureSweep = transitionSheet.object("signature sweep", {
  tealOpacity: types.number(0.7, { range: [0, 1], label: "Teal opacity" }),
  travelY: types.number(50, { range: [0, 160], label: "Travel Y (px)" }),
  blurPx: types.number(10, { range: [0, 28], label: "Blur (px)" }),
  glowScale: types.number(1.25, { range: [0.6, 2], label: "Glow scale" }),
  markOpacity: types.number(0.7, { range: [0, 1], label: "Mark opacity" }),
});

export interface SignatureSweepValues {
  tealOpacity: number;
  travelY: number;
  blurPx: number;
  glowScale: number;
  markOpacity: number;
}

// Theatre studio (the dev-only authoring panel that renders a top toolbar) is
// intentionally NOT initialised — it cluttered the on-device view and the
// signature transition is parked for a later refinement pass. To author the
// sweep again, restore the guarded dev-only init below and tune in the panel:
//
//   if (import.meta.env.DEV) {
//     void import("@theatre/studio").then(({ default: studio }) => studio.initialize());
//   }
//
// The dynamic import keeps @theatre/studio out of the production bundle.
