export const defaultTransition = {
  type: 'tween',
  duration: 0.65,
  ease: 'easeInOut',
};

export const wrapperV = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const translateWrapperV = {
  initial: {
    y: '-100%',
  },
  animate: {
    y: '0%',
  },
  exit: {
    y: '-100%',

    transition: {
      delay: 0.15,
      ...defaultTransition,
    },
  },
};

export const modalBackgroundV = {
  initial: {
    scale: 0.95,
    x: '-50%',
    y: '-50%',
  },
  animate: {
    scale: 1,
    x: '-50%',
    y: '-50%',
  },
  exit: {
    scale: 0.95,
    x: '-50%',
    y: '-50%',
    transition: {
      delay: 0.15,
      ...defaultTransition,
    },
  },
};

export const modalWrapperV = {
  initial: {
    y: '100%',
  },
  animate: {
    y: '0%',
  },
  exit: {
    y: '100%',
    transition: {
      delay: 0.15,
      ...defaultTransition,
    },
  },
};
