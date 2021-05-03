import { springMedium } from 'components/Animations/framerTransitions';

const slideSize = '30vw';

export const slide = {
  variants: {
    initial: (direction: number) => {
      return {
        x: direction > 0 ? slideSize : `-${slideSize}`,
      };
    },
    animate: {
      x: 0,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? slideSize : `-${slideSize}`,
      };
    },
  },
  transition: {
    ...springMedium,
  },
};
