const ELEVATION = 3.5;

export const topVariants = {
  initial: {
    rotate: '0deg',
    y: 0,
  },
  animate: {
    rotate: '45deg',
    y: ELEVATION,
  },
};

export const middleVariants = {
  initial: {
    x: '15%',
    y: '-50%',
    scaleX: 1,
  },
  animate: {
    x: '50%',
    y: '-50%',
    scaleX: 0,
  },
};

export const bottomVariants = {
  initial: {
    rotate: '0deg',
    y: 0,
  },
  animate: {
    rotate: '-45deg',
    y: -ELEVATION,
  },
};
