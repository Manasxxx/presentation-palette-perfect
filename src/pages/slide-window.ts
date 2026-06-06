export const getMountedSlideIndexes = (
  totalSlides: number,
  currentSlide: number,
  radius: number,
) => {
  const mounted = new Set<number>();
  const start = Math.max(0, currentSlide - radius);
  const end = Math.min(totalSlides - 1, currentSlide + radius);

  for (let index = start; index <= end; index += 1) {
    mounted.add(index);
  }

  return mounted;
};

export const getSlideIndexFromScroll = (
  scrollTop: number,
  slideHeight: number,
  totalSlides: number,
) => {
  if (slideHeight <= 0) return 0;

  const index = Math.round(scrollTop / slideHeight);
  return Math.max(0, Math.min(index, totalSlides - 1));
};
