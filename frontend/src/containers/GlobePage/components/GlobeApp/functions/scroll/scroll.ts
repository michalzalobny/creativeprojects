import TWEEN, { Group } from '@tweenjs/tween.js';

import { lerp } from './utils/lerp';
import { handleEvents } from './functions/handleEvents';
import { MOMENTUM_DAMPING } from './constants';
import { applyScroll } from './functions/applyScroll';
import { initSeekTo, SeekTo } from './functions/seekTo';

export enum ScrollMode {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL',
}

const SCROLL_SPEED = 0.004;

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
  scrollMode: ScrollMode;
  TWEEN_GROUP_SEEK: Group;
  viewportSizes: Sizes;
  contentSizes: Sizes;
  progressRatio: number;
  isTouching: boolean;
  speed: number;
  direction: 'up' | 'down';
}

export interface ScrollReturn {
  update: (time: number) => void;
  destroy: () => void;
  init: () => void;
  scrollObj: ScrollObj;
  seekTo: (props: SeekTo) => void;
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
    scrollMode: ScrollMode.VERTICAL,
    TWEEN_GROUP_SEEK: new TWEEN.Group(),
    viewportSizes: viewportSizes,
    contentSizes: contentSizes,
    progressRatio: 0,
    isTouching: false,
    speed: SCROLL_SPEED,
    direction: 'up',
  };

  const {
    destroy: destroyHandleEvents,
    init: initHandleEvents,
  } = handleEvents({ scrollObj });

  const { seekTo } = initSeekTo(scrollObj);

  const init = () => {
    initHandleEvents();
  };

  const destroy = () => {
    destroyHandleEvents();
  };

  const update = (time: number) => {
    scrollObj.targetX += scrollObj.speed;

    if (scrollObj.currentX > scrollObj.lastX) {
      scrollObj.direction = 'down';
      scrollObj.speed = SCROLL_SPEED;
    } else if (scrollObj.currentX < scrollObj.lastX) {
      scrollObj.direction = 'up';
      scrollObj.speed = -SCROLL_SPEED;
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

    scrollObj.TWEEN_GROUP_SEEK.update(time);

    const timeFactor = Math.min(Math.max(time / (1000 / time), 1), 4);
    scrollObj.touchMomentumX *= Math.pow(MOMENTUM_DAMPING, timeFactor);
    scrollObj.touchMomentumY *= Math.pow(MOMENTUM_DAMPING, timeFactor);

    if (!scrollObj.useMomentum) {
      return;
    }

    if (Math.abs(scrollObj.touchMomentumX) >= 0.01) {
      applyScroll({
        verticalAmountPx: 0,
        horizontalAmountPx: scrollObj.touchMomentumX,
        scrollObj,
      });
    }

    if (Math.abs(scrollObj.touchMomentumY) >= 0.01) {
      applyScroll({
        verticalAmountPx: scrollObj.touchMomentumY,
        horizontalAmountPx: 0,
        scrollObj,
      });
    }
  };

  return {
    update,
    init,
    destroy,
    scrollObj,
    seekTo,
  };
};
