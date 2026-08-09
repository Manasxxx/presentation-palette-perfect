export interface SignatureSweepValues {
  tealOpacity: number;
  blurPx: number;
  glowScale: number;
}

const STATIC_SWEEP: SignatureSweepValues = {
  tealOpacity: 0.8,
  blurPx: 18,
  glowScale: 1,
};

/**
 * The old transition used Theatre only as a live editor for these three fixed
 * values. Loading an un-authored Theatre project throws on every mobile route,
 * so keep the exact visual defaults without starting the editor runtime.
 */
export const signatureSweep = {
  onValuesChange(listener: (values: SignatureSweepValues) => void) {
    listener(STATIC_SWEEP);
    return () => undefined;
  },
};
