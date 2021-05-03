export const variants = {
  carouselInitial: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    };
  },
  carouselAnimate: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  carouselExit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    };
  },
};
