export const TR_DELAY = 0.5;

import { springMedium } from 'components/Animations/framerTransitions';

export const revealVariants = {
  initial: (reverse: boolean) => {
    return {
      y: reverse ? '-100%' : '100%',
      opacity: 1,
      transition: {
        ...springMedium,
      },
    };
  },
  animate: {
    y: '0%',
    opacity: 1,
    transition: {
      ...springMedium,
    },
  },
  exit: (reverse: boolean) => {
    return {
      y: reverse ? '100%' : '-100%',
      opacity: 0,
      transition: {
        ...springMedium,
      },
    };
  },
};
