export const FLOW_TRANSITION_DURATION = 0.6;
const HALF = FLOW_TRANSITION_DURATION / 2;
const INCOME = FLOW_TRANSITION_DURATION;

export const flowTransition = {
  variants: {
    initial: {
      opacity: 0,
      x: '-30%',
      scale: 0.85,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,

      transition: {
        delayChildren: FLOW_TRANSITION_DURATION + INCOME,
        duration: FLOW_TRANSITION_DURATION,

        type: 'tween',
        x: {
          duration: HALF,
          delay: INCOME,
          ease: 'easeInOut',
        },
        opacity: {
          duration: HALF,
          delay: INCOME,
        },
        scale: {
          delay: INCOME + HALF,
          duration: HALF,
          ease: 'easeInOut',
        },
      },
    },
    exit: {
      opacity: 0,
      x: '30%',
      scale: 0.85,

      transition: {
        delayChildren: 0,
        duration: FLOW_TRANSITION_DURATION,
        type: 'tween',
        x: {
          duration: HALF,
          delay: HALF,
          ease: 'easeInOut',
        },
        opacity: {
          duration: HALF,
          delay: HALF,
        },
        scale: { duration: HALF, ease: 'easeInOut' },
      },
    },
  },
};

const BASIC_TRANSITION_DURATION = 0.4;

export const basicTransition = {
  variants: {
    initial: {
      opacity: 0,
      x: '-15%',
      // scale: 1.1,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delayChildren: BASIC_TRANSITION_DURATION,
        duration: BASIC_TRANSITION_DURATION,
        type: 'tween',
      },
    },
    exit: {
      opacity: 0,
      x: '15%',
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
