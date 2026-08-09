export type DeckSnapConfig = {
  container: "y proximity" | "y mandatory";
  slideStop: "normal" | "always";
};

export const getDeckSnapConfig = (isMobile: boolean): DeckSnapConfig => ({
  container: "y mandatory",
  slideStop: isMobile ? "normal" : "always",
});
