const BASIC_TRANSITION_DURATION = 0.6;

export const basicTransition = {
  variants: {
    initial: {
      opacity: 0,
      x: '0%',
      // scale: 1.1,
    },
    animate: {
      opacity: 1,
      x: '0%',
      // scale: 1,
      transition: {
        delayChildren: BASIC_TRANSITION_DURATION,
        duration: BASIC_TRANSITION_DURATION,
        type: 'tween',
      },
    },
    exit: {
      opacity: 0,
      x: '0%',
      // scale: 1.1,
      transition: {
        delayChildren: 0,
        duration: BASIC_TRANSITION_DURATION,
        type: 'tween',
      },
    },
  },
};

export const notInitialized = {
  variants: {
    initial: {},
    animate: {},
    exit: {},
  },
  transition: {
    duration: 0,
    delayChildren: 0,
    type: 'tween',
  },
};
