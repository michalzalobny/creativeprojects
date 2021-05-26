import { lerp } from './utils/lerp';
import { handleEvents } from './functions/handleEvents';
import { MOMENTUM_DAMPING } from './constants';
import { applyScroll } from './functions/applyScroll';

const SCROLL_SPEED_X = 0.004;
const SCROLL_SPEED_Y = 0;
export interface ScrollObj {
  ease: number;
  currentX: number;
  targetX: number;
  lastX: number;
  currentY: number;
  targetY: number;
  lastY: number;
  currentStrengthY: number;
  targetStrengthY: number;
  lastStrengthY: number;
  currentStrengthX: number;
  targetStrengthX: number;
  lastStrengthX: number;
  useMomentum: boolean;
  touchMomentumX: number;
  touchMomentumY: number;
  lastTouchX: number;
  lastTouchY: number;
  viewportSizes: Sizes;
  contentSizes: Sizes;
  isTouching: boolean;
  speedX: number;
  speedY: number;
  directionX: -1 | 1;
  directionY: -1 | 1;
}

export interface ScrollReturn {
  update: (time: number) => void;
  destroy: () => void;
  init: () => void;
  scrollObj: ScrollObj;
}

interface Sizes {
  width: number;
  height: number;
}

export const scroll = (
  contentSizes: Sizes,
  viewportSizes: Sizes,
): ScrollReturn => {
  const scrollObj: ScrollObj = {
    ease: 0.04,
    currentX: 0,
    targetX: 0,
    lastX: 0,
    currentY: 0,
    targetY: 0,
    lastY: 0,
    currentStrengthY: 0,
    targetStrengthY: 0,
    lastStrengthY: 0,
    currentStrengthX: 0,
    targetStrengthX: 0,
    lastStrengthX: 0,
    useMomentum: false,
    touchMomentumX: 0,
    touchMomentumY: 0,
    lastTouchX: 0,
    lastTouchY: 0,
    viewportSizes: viewportSizes,
    contentSizes: contentSizes,
    isTouching: false,
    speedX: SCROLL_SPEED_X,
    speedY: SCROLL_SPEED_Y,
    directionX: 1,
    directionY: 1,
  };

  const {
    destroy: destroyHandleEvents,
    init: initHandleEvents,
  } = handleEvents({ scrollObj });

  const init = () => {
    initHandleEvents();
  };

  const destroy = () => {
    destroyHandleEvents();
  };

  const update = (time: number) => {
    scrollObj.targetX += scrollObj.speedX;

    if (scrollObj.currentX >= scrollObj.lastX) {
      scrollObj.directionX = 1;
      scrollObj.speedX = SCROLL_SPEED_X;
    } else {
      scrollObj.directionX = -1;
      scrollObj.speedX = -SCROLL_SPEED_X;
    }

    if (scrollObj.currentY >= scrollObj.lastY) {
      scrollObj.directionY = 1;
      scrollObj.speedY = SCROLL_SPEED_Y;
    } else {
      scrollObj.directionY = -1;
      scrollObj.speedY = -SCROLL_SPEED_Y;
    }

    scrollObj.lastX = scrollObj.currentX;
    scrollObj.currentX = lerp(
      scrollObj.currentX,
      scrollObj.targetX,
      scrollObj.ease,
    );

    scrollObj.lastY = scrollObj.currentY;
    scrollObj.currentY = lerp(
      scrollObj.currentY,
      scrollObj.targetY,
      scrollObj.ease,
    );

    //Update strengthY
    scrollObj.lastStrengthY = scrollObj.currentStrengthY;
    scrollObj.currentStrengthY = lerp(
      scrollObj.currentStrengthY,
      scrollObj.targetStrengthY,
      scrollObj.ease,
    );
    scrollObj.targetStrengthY = Math.abs(scrollObj.currentY - scrollObj.lastY);

    //Update strengthX
    scrollObj.lastStrengthX = scrollObj.currentStrengthX;
    scrollObj.currentStrengthX = lerp(
      scrollObj.currentStrengthX,
      scrollObj.targetStrengthX,
      scrollObj.ease,
    );
    scrollObj.targetStrengthX = Math.abs(scrollObj.currentX - scrollObj.lastX);

    const timeFactor = Math.min(Math.max(time / (1000 / time), 1), 4);
    scrollObj.touchMomentumX *= Math.pow(MOMENTUM_DAMPING, timeFactor);
    scrollObj.touchMomentumY *= Math.pow(MOMENTUM_DAMPING, timeFactor);

    if (!scrollObj.useMomentum) {
      return;
    }

    if (Math.abs(scrollObj.touchMomentumX) >= 0.01) {
      applyScroll({
        y: 0,
        x: scrollObj.touchMomentumX,
        scrollObj,
      });
    }

    if (Math.abs(scrollObj.touchMomentumY) >= 0.01) {
      applyScroll({
        y: scrollObj.touchMomentumY,
        x: 0,
        scrollObj,
      });
    }
  };

  return {
    update,
    init,
    destroy,
    scrollObj,
  };
};
