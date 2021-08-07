import { springVerySlow } from 'components/Animations/framerTransitions';

export const revealVariants = {
  initial: (reverse: boolean) => {
    return {
      y: reverse ? '-100%' : '-100%',

      opacity: 0,
      transition: {
        ...springVerySlow,
      },
    };
  },
  animate: {
    y: '0%',
    opacity: 1,

    transition: {
      ...springVerySlow,
      delay: 0.2,
    },
  },
  exit: (reverse: boolean) => {
    return {
      y: reverse ? '100%' : '100%',

      opacity: 0,
      transition: {
        ...springVerySlow,
      },
    };
  },
};

export const notInitVariants = {
  initial: {
    transition: {
      duration: 0,
      delayChildren: 0,
      type: 'tween',
    },
  },
  animate: {
    transition: {
      duration: 0,
      delayChildren: 0,
      type: 'tween',
    },
  },
  exit: {
    transition: {
      duration: 0,
      delayChildren: 0,
      type: 'tween',
    },
  },
};
