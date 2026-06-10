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

/** The branded crest params, scrubbed by inter-slide scroll progress. */
export const signatureSweep = transitionSheet.object("signature sweep", {
  tealOpacity: types.number(0.8, { range: [0, 1], label: "Crest opacity" }),
  blurPx: types.number(18, { range: [0, 40], label: "Bloom blur (px)" }),
  glowScale: types.number(1, { range: [0.5, 2], label: "Crest scale" }),
});

export interface SignatureSweepValues {
  tealOpacity: number;
  blurPx: number;
  glowScale: number;
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
