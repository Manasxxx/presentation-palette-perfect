export interface TitleTextMotionProfile {
  wordmarkDuration: number;
  wordmarkDropY: number;
  wordmarkStagger: number;
  lineDuration: number;
  pillDuration: number;
  subcopyDelay: number;
  badgeDelay: number;
  lineStagger: number;
  pillStagger: number;
}

export const getTitleTextMotionProfile = (isMobile = false): TitleTextMotionProfile =>
  isMobile
    ? {
        wordmarkDuration: 620,
        wordmarkDropY: -12,
        wordmarkStagger: 0,
        lineDuration: 680,
        pillDuration: 720,
        subcopyDelay: 680,
        badgeDelay: 880,
        lineStagger: 64,
        pillStagger: 82,
      }
    : {
        wordmarkDuration: 700,
        wordmarkDropY: -16,
        wordmarkStagger: 0,
        lineDuration: 760,
        pillDuration: 800,
        subcopyDelay: 760,
        badgeDelay: 980,
        lineStagger: 74,
        pillStagger: 94,
      };
