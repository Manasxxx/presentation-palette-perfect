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
        wordmarkDuration: 760,
        wordmarkDropY: -24,
        wordmarkStagger: 0,
        lineDuration: 820,
        pillDuration: 940,
        subcopyDelay: 820,
        badgeDelay: 1080,
        lineStagger: 78,
        pillStagger: 105,
      }
    : {
        wordmarkDuration: 880,
        wordmarkDropY: -30,
        wordmarkStagger: 0,
        lineDuration: 920,
        pillDuration: 1050,
        subcopyDelay: 980,
        badgeDelay: 1280,
        lineStagger: 92,
        pillStagger: 125,
      };
