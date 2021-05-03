export const TR_DURATION = 0.7;
export const TR_DELAY = TR_DURATION * 0.5;
export const TR_TYPE = 'tween';
export const ENTER_ANIMATION_DURATION = 1.5;

const revealTransition = {
  type: TR_TYPE,
  duration: TR_DURATION,
};

export const revealVariants = {
  initial: (reverse: boolean) => {
    return {
      x: reverse ? '-100%' : '100%',
      transition: {
        ...revealTransition,
      },
    };
  },
  animate: {
    x: 0,
    transition: {
      delay: TR_DELAY,
      ...revealTransition,
    },
  },
  exit: (reverse: boolean) => {
    return {
      x: reverse ? '100%' : '-100%',
      transition: {
        ...revealTransition,
      },
    };
  },
};
