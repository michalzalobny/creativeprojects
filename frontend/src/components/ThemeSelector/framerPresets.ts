import { BALL_SIZE, BUTTON_HEIGHT, BUTTON_WIDTH } from './constants';

export const BALL_VARIANTS = {
  initial: {
    x: (BUTTON_HEIGHT - BALL_SIZE) / 2,
    y: '-50%',
    backgroundColor: '#f3f3f3',
  },
  animate: {
    x: BUTTON_WIDTH - BALL_SIZE - (BUTTON_HEIGHT - BALL_SIZE) / 2,
    y: '-50%',
    backgroundColor: '#ffffff',
  },
};

export const GLOW_VARIANTS = {
  initial: {
    x: (BUTTON_HEIGHT - BALL_SIZE) / 2,
    y: '-50%',
    opacity: 0.4,
  },
  animate: {
    x: BUTTON_WIDTH - BALL_SIZE - (BUTTON_HEIGHT - BALL_SIZE) / 2,
    y: '-50%',
    opacity: 1,
  },
};
